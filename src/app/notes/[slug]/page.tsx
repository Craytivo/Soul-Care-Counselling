import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getBlogPost, getBlogPosts } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Soul Care Counselling',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.seoTitle || `${post.title} | Soul Care Counselling`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name || 'Soul Care Team'],
      images: post.featuredImage 
        ? [{ url: urlFor(post.featuredImage).width(1200).height(630).url() }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage 
        ? [urlFor(post.featuredImage).width(1200).height(630).url()]
        : undefined,
    },
  }
}

// Generate static paths for published blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

// Map Sanity categories to display categories
const categoryMap: Record<string, string> = {
  'trauma-healing': 'Trauma & Healing',
  'faith-spirituality': 'Spiritual Care',
  'relationships': 'Relationships',
  'anxiety-depression': 'Anxiety & Depression',
  'self-care': 'Self-Care',
  'mental-health': 'Mental Health',
  'addiction-recovery': 'Addiction & Recovery',
  'family-parenting': 'Family & Parenting',
  'professional-development': 'Professional Development',
  'community': 'Community',
}

// Custom components for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Blog post image'}
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
        />
        {value.caption && (
          <p className="text-sm text-charcoal/60 mt-2 text-center italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-clay underline hover:text-clay/80 transition-colors"
      >
        {children}
      </a>
    ),
    internalLink: ({ children, value }: any) => {
      // Handle internal links to other blog posts, services, etc.
      const href = value.reference?._type === 'blogPost' 
        ? `/notes/${value.reference.slug?.current}`
        : value.reference?._type === 'teamMember'
        ? `/${value.reference.slug?.current}`
        : '#'
      
      return (
        <Link href={href} className="text-clay underline hover:text-clay/80 transition-colors">
          {children}
        </Link>
      )
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-heading text-2xl font-semibold mt-8 mb-4 text-charcoal">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-heading text-xl font-semibold mt-6 mb-3 text-charcoal">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-heading text-lg font-semibold mt-4 mb-2 text-charcoal">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-clay pl-6 py-2 my-6 bg-sand/30 rounded-r-lg italic text-charcoal/90">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-charcoal/90">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-charcoal/90">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-charcoal/90">
        {children}
      </ol>
    ),
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-charcoal/60">
          <li>
            <Link href="/" className="hover:text-charcoal transition-colors">
              Home
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-2">
            <Link href="/notes" className="hover:text-charcoal transition-colors">
              Notes
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-2 text-charcoal">
            {post.title}
          </li>
        </ol>
      </nav>

      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-sand text-charcoal text-sm font-medium rounded-full">
              {categoryMap[post.category] || post.category}
            </span>
            <span className="text-charcoal/60 text-sm">{post.readingTime} min read</span>
            {post.tags && post.tags.length > 0 && (
              <div className="hidden sm:flex items-center gap-1 ml-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white text-charcoal/70 text-xs rounded-full ring-1 ring-charcoal/10">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-charcoal leading-tight">
            {post.title}
          </h1>
          
          <p className="text-lg md:text-xl text-charcoal/80 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between py-4 border-t border-charcoal/10">
            <div className="flex items-center gap-4">
              {post.author.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(post.author.image).width(96).height(96).url()}
                    alt={post.author.name || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-charcoal">{post.author.name}</p>
                <p className="text-sm text-charcoal/60">{post.author.credentials}</p>
              </div>
            </div>
            <time className="text-sm text-charcoal/60">{publishedDate}</time>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(600).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {post.featuredImage.caption && (
              <p className="text-sm text-charcoal/60 mt-3 text-center italic">
                {post.featuredImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.content} components={portableTextComponents} />
        </div>

        {/* Call to Action */}
        {post.callToAction && (
          <div className="mt-12 p-6 bg-sand rounded-2xl ring-1 ring-charcoal/10">
            <div className="text-center">
              <h3 className="font-heading text-xl font-semibold mb-3">
                Ready to take the next step?
              </h3>
              <p className="text-charcoal/80 mb-4">
                Our team is here to support you on your journey toward healing and growth.
              </p>
              <a
                href={post.callToAction.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-clay px-6 py-3 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10 transition-colors"
              >
                {post.callToAction.text || 'Book a Free Consultation'}
              </a>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mt-16">
            <h3 className="font-heading text-2xl font-semibold mb-6">Related Posts</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {post.relatedPosts.slice(0, 3).map((relatedPost) => (
                <article key={relatedPost._id} className="rounded-xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200">
                  <div className="p-6">
                    <h4 className="font-heading text-lg font-semibold mb-2">
                      <Link href={`/notes/${relatedPost.slug?.current}`} className="hover:text-clay transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-charcoal/10">
          <Link 
            href="/notes"
            className="inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    </>
  )
}