import type { Metadata } from 'next'
import { getFAQPage } from '@/lib/sanity-queries'
import Link from 'next/link'
import EmptyState from '@/components/ui/EmptyState'
import { FAQSection, CTASection } from '@/components/faq'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getFAQPage()

  return {
    title: pageData?.title ? `${pageData.title} | Soul Care Counselling` : 'FAQs | Soul Care Counselling',
    description: pageData?.metaDescription || 'Frequently Asked Questions about Soul Care Counselling services.',
    alternates: { canonical: '/faq' },
    openGraph: {
      title: pageData?.title ? `${pageData.title} | Soul Care Counselling` : 'FAQs | Soul Care Counselling',
      description: pageData?.metaDescription || 'Frequently Asked Questions about Soul Care Counselling services.',
      url: 'https://thesoulcarecounsellor.ca/faq',
      siteName: 'Soul Care Counselling',
      locale: 'en_CA',
      type: 'website',
    },
  }
}

export const revalidate = 300

export default async function FAQPage() {
  const pageData = await getFAQPage()

  if (!pageData) {
    return (
      <EmptyState
        title="FAQ page content not found."
        description="Please create it in Sanity Studio."
        action={<Link href="/studio" className="ui-btn-primary">Go to Sanity Studio</Link>}
      />
    )
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const categories = ['Sessions', 'Pricing', 'Policies']
  const third = Math.ceil(pageData.faqs.length / 3)
  const faqGroups = [
    { title: 'Sessions', id: 'faq-sessions', faqs: pageData.faqs.slice(0, third), startIndex: 0 },
    { title: 'Pricing', id: 'faq-pricing', faqs: pageData.faqs.slice(third, third * 2), startIndex: third },
    { title: 'Policies', id: 'faq-policies', faqs: pageData.faqs.slice(third * 2), startIndex: third * 2 },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true" />
        <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-gradient-to-tr from-cream/10 to-clay/20 blur-2xl" aria-hidden="true" />
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            {pageData.hero.badge}
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold tracking-tight">{pageData.hero.heading}</h1>
          <p className="mt-3 max-w-3xl text-cream/85 leading-relaxed">{pageData.hero.description}</p>
        </div>
      </section>

      {/* Quick-nav category pills */}
      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#faq-${cat.toLowerCase()}`}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-white text-charcoal/80 ring-1 ring-charcoal/5 hover:ring-charcoal/15"
            >
              {cat}
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Sections */}
      {faqGroups.map((group) => (
        <FAQSection key={group.id} {...group} />
      ))}

      {/* CTA */}
      <CTASection icon="question" />
    </>
  )
}
