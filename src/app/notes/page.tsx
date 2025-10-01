import { Suspense } from 'react'
import { getBlogPosts, getFeaturedBlogPosts } from '@/lib/sanity-queries'
import NotesClient from './NotesClient'

// Force dynamic rendering and disable static generation
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable caching in development

// This is now a Server Component that fetches data on the server
export default async function NotesPage() {
  // Fetch data on the server (no CORS issues)
  const [allPosts, featuredPosts] = await Promise.all([
    getBlogPosts(),
    getFeaturedBlogPosts()
  ])

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clay"></div>
      </div>
    }>
      <NotesClient allPosts={allPosts} featuredPosts={featuredPosts} />
    </Suspense>
  )
}