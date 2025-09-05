import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Notes from Soul Care — Soul Care Counselling',
  description: 'Insights, reflections, and guidance from our team of Christian counselors. Explore faith-centered perspectives on mental health, healing, and personal growth.',
}

// Sample blog posts - you can replace these with real content
const blogPosts = [
  {
    id: 'healing-trauma-faith',
    title: 'Healing Trauma Through Faith: A Journey of Restoration',
    excerpt: 'Trauma can leave deep wounds, but faith provides a foundation for healing. Discover how integrating spiritual practices with evidence-based therapy can lead to profound transformation.',
    author: 'Jessica Robinson-Grant',
    authorRole: 'Clinical Director',
    date: 'December 15, 2024',
    readTime: '5 min read',
    category: 'Trauma & Healing',
    image: '/assets/img/content/rs=w_600,h_600,cg_true.webp',
    featured: true
  },
  {
    id: 'mindfulness-christian-perspective',
    title: 'Mindfulness from a Christian Perspective',
    excerpt: 'How can Christians practice mindfulness while staying true to their faith? Explore the biblical foundations of present-moment awareness and contemplative prayer.',
    author: 'Davene Harris',
    authorRole: 'Registered Psychotherapist',
    date: 'December 10, 2024',
    readTime: '4 min read',
    category: 'Spiritual Care',
    image: '/assets/img/content/rs=w_600,h_600,cg_true.webp',
    featured: false
  },
  {
    id: 'building-healthy-boundaries',
    title: 'Building Healthy Boundaries in Relationships',
    excerpt: 'Learn how to establish and maintain healthy boundaries that honor both yourself and others. Practical strategies for protecting your emotional and spiritual well-being.',
    author: 'Princeton Grant',
    authorRole: 'Registered Psychotherapist',
    date: 'December 5, 2024',
    readTime: '6 min read',
    category: 'Relationships',
    image: '/assets/img/content/rs=w_600,h_600,cg_true.webp',
    featured: false
  },
  {
    id: 'anxiety-hope-scripture',
    title: 'Finding Hope in Scripture: Managing Anxiety with God\'s Word',
    excerpt: 'When anxiety feels overwhelming, Scripture offers comfort and strength. Discover biblical passages and prayer practices that can help calm anxious thoughts.',
    author: 'Anita Johnson',
    authorRole: 'Registered Psychotherapist',
    date: 'November 28, 2024',
    readTime: '5 min read',
    category: 'Anxiety & Depression',
    image: '/assets/img/content/rs=w_600,h_600,cg_true.webp',
    featured: false
  },
  {
    id: 'self-care-sabbath-rest',
    title: 'Self-Care as Sabbath Rest: Honoring God Through Rest',
    excerpt: 'Self-care isn\'t selfish—it\'s a form of worship. Learn how to practice Sabbath rest and self-care in ways that honor God and restore your soul.',
    author: 'Baraka Mwangi',
    authorRole: 'Registered Psychotherapist',
    date: 'November 20, 2024',
    readTime: '4 min read',
    category: 'Self-Care',
    image: '/assets/img/content/rs=w_600,h_600,cg_true.webp',
    featured: false
  },
  {
    id: 'grief-loss-christian-counseling',
    title: 'Walking Through Grief: A Christian Approach to Loss',
    excerpt: 'Grief is a natural response to loss, but it can feel overwhelming. Discover how Christian counseling can help you process grief while holding onto hope.',
    author: 'Josh Thompson',
    authorRole: 'Registered Psychotherapist',
    date: 'November 15, 2024',
    readTime: '7 min read',
    category: 'Grief & Loss',
    image: '/assets/img/content/rs=w_600,h_600,cg_true.webp',
    featured: false
  }
]

const categories = [
  'All Posts',
  'Trauma & Healing',
  'Spiritual Care',
  'Relationships',
  'Anxiety & Depression',
  'Self-Care',
  'Grief & Loss'
]

export default function NotesPage() {
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
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">Featured Post</h2>
        {(() => {
          const featuredPost = blogPosts.find(post => post.featured)
          if (!featuredPost) return null
          
          return (
            <article className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-charcoal/60 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">
                    <Link href={`/notes/${featuredPost.id}`} className="hover:text-clay transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-charcoal/85 mb-4 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                        <span className="text-charcoal font-semibold text-sm">
                          {featuredPost.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{featuredPost.author}</p>
                        <p className="text-charcoal/60 text-xs">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    <span className="text-charcoal/60 text-sm">{featuredPost.date}</span>
                  </div>
                </div>
              </div>
            </article>
          )
        })()}
      </section>

      {/* Blog Posts Grid */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold mb-6">Latest Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-charcoal/60 text-sm">{post.readTime}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  <Link href={`/notes/${post.id}`} className="hover:text-clay transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-charcoal/85 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center">
                      <span className="text-charcoal font-semibold text-xs">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-xs">{post.author}</p>
                    </div>
                  </div>
                  <span className="text-charcoal/60 text-xs">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
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