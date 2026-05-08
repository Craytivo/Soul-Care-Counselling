import { createClient } from 'next-sanity'
import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter
// In production with multiple servers, use Redis or similar
type RateLimitEntry = {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes

function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetTime) {
    // Reset or create new entry
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    })
    return { allowed: true }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }

  entry.count++
  return { allowed: true }
}

const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-05',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
})

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function syncMailerLiteSubscriber(email: string, firstName: string, groupId: string) {
  const apiToken = process.env.MAILERLITE_API_TOKEN

  if (!apiToken || !groupId) return false

  const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      fields: {
        name: firstName || undefined,
      },
      groups: [groupId],
      status: 'active',
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('MailerLite sync failed:', response.status, errorText)
    return false
  }

  return true
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json({ message: 'Waitlist service is not configured.' }, { status: 500 })
    }

    const body = await request.json().catch(() => ({}))
    const email = normalizeEmail(String(body?.email || ''))
    const firstName = String(body?.firstName || '').trim()
    const source = String(body?.source || 'shop').trim() || 'shop'

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Rate limiting check
    const rateLimitKey = `signup:${email}`
    const rateLimitResult = checkRateLimit(rateLimitKey)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          message: `Please wait ${Math.ceil(rateLimitResult.retryAfter! / 60)} minutes before trying again.`,
        },
        { status: 429 }
      )
    }

    const idSuffix = createHash('sha256').update(email).digest('hex').slice(0, 24)
    const docId = `waitlistSignup.${idSuffix}`
    const now = new Date().toISOString()

    const existing = await sanityWriteClient.fetch<{ _id: string } | null>(
      `*[_id == $id][0]{ _id }`,
      { id: docId }
    )

    const transaction = sanityWriteClient.transaction()
    transaction.createIfNotExists({
      _id: docId,
      _type: 'waitlistSignup',
      email,
      firstName,
      source,
      status: 'active',
      createdAt: now,
      submittedCount: 0,
    })

    transaction.patch(docId, (patch) =>
      patch
        .setIfMissing({
          source,
          status: 'active',
          createdAt: now,
          submittedCount: 0,
        })
        .set({
          firstName: firstName || undefined,
          lastSubmittedAt: now,
          userAgent: request.headers.get('user-agent') || undefined,
        })
        .inc({ submittedCount: 1 })
    )

    await transaction.commit()
    const groupId =
      source === 'shop'
        ? process.env.MAILERLITE_SHOP_GROUP_ID || process.env.MAILERLITE_GROUP_ID!
        : process.env.MAILERLITE_GROUP_ID!
    const mailerLiteSynced = await syncMailerLiteSubscriber(email, firstName, groupId).catch(
      () => false
    )

    return NextResponse.json({
      success: true,
      alreadyRegistered: Boolean(existing),
      mailerLiteSynced,
      message: existing
        ? 'You are already subscribed. We updated your latest signup.'
        : 'Thanks for subscribing. Please check your inbox for your next resource.',
    })
  } catch (error) {
    console.error('Waitlist signup error:', error)
    const details =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unknown server error.'
    return NextResponse.json(
      { message: `Unable to join waitlist right now: ${details}` },
      { status: 500 }
    )
  }
}
