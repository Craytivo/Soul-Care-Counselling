import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// API route for revalidating content when Sanity content changes
export async function POST(request: NextRequest) {
  try {
    // Get the secret from query parameters or headers
    const secret = request.nextUrl.searchParams.get('secret') || request.headers.get('authorization')
    
    // Check for secret to confirm this is a valid request
    if (secret !== process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_API_TOKEN) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate the notes page to fetch fresh content
    revalidatePath('/notes')
    
    // Also revalidate individual blog post pages
    const body = await request.json()
    if (body?.slug?.current) {
      revalidatePath(`/notes/${body.slug.current}`)
    }

    return NextResponse.json({ 
      revalidated: true, 
      message: 'Content revalidated successfully',
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
  const secret = request.nextUrl.searchParams.get('secret')
  
  if (secret !== process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidatePath('/notes')
    return NextResponse.json({ 
      message: 'Notes page revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}