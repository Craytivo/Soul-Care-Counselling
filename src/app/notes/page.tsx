import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts, getFeaturedBlogPosts } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Notes from Soul Care — Soul Care Counselling',
  description: 'Insights, reflections, and guidance from our team of Christian counselors. Explore faith-centered perspectives on mental health, healing, and personal growth.',
}

const categories = [
  'All Posts',
  'Trauma & Healing',
  'Spiritual Care', 
  'Relationships',
  'Anxiety & Depression',
  'Self-Care',
  'Grief & Loss'
]

// Map Sanity categories to display categories
const categoryMap: Record<string, string> = {
  'trauma-healing': 'Trauma & Healing',
  'faith-spirituality': 'Spiritual Care',
  'relationships': 'Relationships', 
  'anxiety-depression': 'Anxiety & Depression',
  'self-care': 'Self-Care',
  'mental-health': 'Grief & Loss', // Using this as fallback for now
}

// Disable caching for this page to ensure fresh data from Sanity
export const revalidate = 0

export default async function NotesPage() {
  const [allPosts, featuredPosts] = await Promise.all([
    getBlogPosts(),
    getFeaturedBlogPosts()
  ])

  const featuredPost = featuredPosts[0] // Get the first featured post

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            Notes from Soul Care
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Insights for Your Journey</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Explore faith-centered perspectives on mental health, healing, and personal growth from our team of Christian counselors.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All Posts'
                  ? 'bg-clay text-charcoal ring-1 ring-charcoal/20'
                  : 'bg-white text-charcoal/80 hover:bg-sand ring-1 ring-charcoal/10 hover:ring-charcoal/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold mb-6">Featured Post</h2>
          <article className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {featuredPost.featuredImage && (
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={urlFor(featuredPost.featuredImage).width(600).height(400).url()}
                    alt={featuredPost.featuredImage.alt || featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <div className={`p-6 md:p-8 ${!featuredPost.featuredImage ? 'md:col-span-2' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                    {categoryMap[featuredPost.category] || featuredPost.category}
                  </span>
                  <span className="text-charcoal/60 text-sm">{featuredPost.readingTime} min read</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">
                  <Link href={`/notes/${featuredPost.slug.current}`} className="hover:text-clay transition-colors">
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-charcoal/85 mb-4 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                      <span className="text-charcoal font-semibold text-sm">
                        {featuredPost.author.name?.split(' ').map((n: string) => n[0]).join('') || 'SC'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{featuredPost.author.name}</p>
                      <p className="text-charcoal/60 text-xs">{featuredPost.author.credentials}</p>
                    </div>
                  </div>
                  <span className="text-charcoal/60 text-sm">
                    {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold mb-6">Latest Posts</h2>
        {allPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.filter(post => !post.isFeatured).map((post) => (
              <article key={post._id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200">
                {post.featuredImage && (
                  <div className="relative h-48">
                    <Image
                      src={urlFor(post.featuredImage).width(400).height(300).url()}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                      {categoryMap[post.category] || post.category}
                    </span>
                    <span className="text-charcoal/60 text-sm">{post.readingTime} min read</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-3">
                    <Link href={`/notes/${post.slug.current}`} className="hover:text-clay transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-charcoal/85 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center">
                        <span className="text-charcoal font-semibold text-xs">
                          {post.author.name?.split(' ').map((n: string) => n[0]).join('') || 'SC'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-xs">{post.author.name}</p>
                      </div>
                    </div>
                    <span className="text-charcoal/60 text-xs">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand flex items-center justify-center">
              <svg className="w-8 h-8 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">No posts yet</h3>
            <p className="text-charcoal/70 mb-6 max-w-md mx-auto">
              We&apos;re preparing thoughtful content to share with you. Check back soon for insights and guidance from our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                Book a Free Consultation
              </a>
              <Link 
                href="/about"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 font-semibold text-charcoal hover:bg-sand ring-1 ring-charcoal/10"
              >
                Learn About Our Team
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="mt-16 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">Stay Connected</h3>
          <p className="text-charcoal/80 mb-6">
            Get the latest insights and encouragement delivered to your inbox. Join our community of faith-centered healing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent"
            />
            <button className="px-6 py-2 bg-clay text-charcoal font-semibold rounded-md hover:bg-clay/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 rounded-2xl bg-bark text-cream p-6 md:p-8 ring-1 ring-cream/15">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Ready to begin your healing journey?</h3>
            <p className="mt-2 text-cream/85">Book a free consultation to explore how our faith-centered approach can support your growth.</p>
          </div>
          <div className="md:justify-self-end">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}