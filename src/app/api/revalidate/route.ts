import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const typeToTags: Record<string, string[]> = {
  privacyPolicyPage: ['privacy-policy-page'],
  termsOfUsePage: ['terms-of-use-page'],
  accessibilityPage: ['accessibility-page'],
  teamMember: ['team-members'],
  workshop: ['workshops'],
  services: ['services'],
  servicePage: ['service-pages'],
  blogPost: ['blog-posts'],
  coreValuesPage: ['core-values-page'],
  aboutPage: ['about-page'],
  areasPage: ['areas-page'],
  siteSettings: ['site-settings'],
  homePage: ['home-page'],
  internApplicationPage: ['intern-application-page'],
  faqPage: ['faq-page'],
  contactPage: ['contact-page'],
  resource: ['resources'],
}

function getRequestSecret(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return request.nextUrl.searchParams.get('secret') || authHeader
}

// API route for revalidating content when Sanity content changes
export async function POST(request: NextRequest) {
  try {
    const secret = getRequestSecret(request)
    
    // Check for secret to confirm this is a valid request
    if (secret !== process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_API_TOKEN) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const slug = body?.slug?.current
    const type = body?._type
    const category = body?.category
    const tags = new Set<string>(['sanity'])

    if (type && typeToTags[type]) {
      for (const tag of typeToTags[type]) {
        tags.add(tag)
      }
    }

    if (slug && typeof slug === 'string') {
      if (type === 'blogPost') tags.add(`blog-post:${slug}`)
      if (type === 'teamMember') tags.add(`team-member:${slug}`)
      if (type === 'servicePage') tags.add(`service-page:${slug}`)
      if (type === 'resource') tags.add(`resource:${slug}`)
    }

    if (category && typeof category === 'string') {
      tags.add(`blog-category:${category}`)
      tags.add(`resource-category:${category}`)
    }

    if (Array.isArray(body?.tags)) {
      for (const tag of body.tags) {
        if (typeof tag === 'string') {
          tags.add(`blog-tag:${tag}`)
        }
      }
    }

    for (const tag of tags) {
      revalidateTag(tag)
    }

    // Keep path-level revalidation for current webhook payload behavior.
    if (type === 'blogPost') {
      revalidatePath('/notes')
      if (slug && typeof slug === 'string') {
        revalidatePath(`/notes/${slug}`)
      }
    }

    return NextResponse.json({ 
      revalidated: true, 
      tags: Array.from(tags),
      message: 'Content revalidated successfully via tags',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ 
      message: 'Error revalidating content',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Allow GET requests for testing
export async function GET(request: NextRequest) {
  const secret = getRequestSecret(request)
  
  if (secret !== process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidateTag('sanity')
    revalidatePath('/notes')
    return NextResponse.json({ 
      message: 'Sanity tags revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
