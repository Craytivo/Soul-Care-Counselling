import type { Metadata } from 'next'
import { getFAQPage } from '@/lib/sanity-queries'
import Link from 'next/link'
import EmptyState from '@/components/ui/EmptyState'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getFAQPage()
  
  return {
    title: pageData?.title ? `${pageData.title} | Soul Care Counselling` : 'FAQs | Soul Care Counselling',
    description: pageData?.metaDescription || 'Frequently Asked Questions about Soul Care Counselling services.',
    alternates: {
      canonical: '/faq',
    },
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

// ISR with tag revalidation for Sanity-driven content
export const revalidate = 300

export default async function FAQPage() {
  const pageData = await getFAQPage()

  // Return fallback if no data
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
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            {pageData.hero.badge}
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">{pageData.hero.heading}</h1>
          <p className="mt-3 max-w-3xl text-cream/85">{pageData.hero.description}</p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="mt-14 md:mt-16 space-y-4">
        {pageData.faqs.map((faq) => (
          <details key={`${faq.question}-${faq.order}`} className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
            <summary className="font-heading font-semibold cursor-pointer">{faq.question}</summary>
            <p className="mt-3 text-charcoal/85">{faq.answer}</p>
          </details>
        ))}
      </section>
    </>
  )
}
