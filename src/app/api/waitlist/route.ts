import { createClient } from 'next-sanity'
import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

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

    return NextResponse.json({
      success: true,
      alreadyRegistered: Boolean(existing),
      message: existing
        ? 'You are already on the waitlist. We updated your latest signup.'
        : 'You are on the waitlist. We will notify you at launch.',
    })
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json({ message: 'Unable to join waitlist right now.' }, { status: 500 })
  }
}
