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
          {['Sessions', 'Pricing', 'Policies'].map((cat) => (
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

      {/* FAQ List — Sessions */}
      <section id="faq-sessions" className="mt-14 md:mt-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-charcoal/5" />
          <h2 className="font-heading text-xs uppercase tracking-[.2em] text-charcoal/40">Sessions</h2>
          <div className="h-px flex-1 bg-charcoal/5" />
        </div>
        <div className="space-y-3">
          {pageData.faqs.slice(0, Math.ceil(pageData.faqs.length / 3)).map((faq, i) => (
            <details
              key={`${faq.question}-${faq.order}`}
              className="group rounded-2xl bg-white ring-1 ring-charcoal/5 overflow-hidden hover:ring-charcoal/10 hover:shadow-lg hover:shadow-charcoal/[0.03] transition-all duration-300"
              open={i === 0}
            >
              <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer select-none list-none">
                <span className="flex items-start gap-3">
                  <span className="text-xs font-mono text-clay/50 mt-0.5 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-heading font-semibold text-charcoal leading-snug">{faq.question}</span>
                </span>
                <span className="relative flex-shrink-0 w-6 h-6">
                  <svg className="absolute inset-0 w-6 h-6 text-clay opacity-100 group-open:opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <svg className="absolute inset-0 w-6 h-6 text-clay opacity-0 group-open:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <div className="h-px bg-charcoal/5 mb-4" />
                <p className="text-charcoal/75 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* FAQ List — Pricing */}
      <section id="faq-pricing" className="mt-14 md:mt-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-charcoal/5" />
          <h2 className="font-heading text-xs uppercase tracking-[.2em] text-charcoal/40">Pricing</h2>
          <div className="h-px flex-1 bg-charcoal/5" />
        </div>
        <div className="space-y-3">
          {pageData.faqs.slice(Math.ceil(pageData.faqs.length / 3), Math.ceil(pageData.faqs.length * 2 / 3)).map((faq, i) => (
            <details
              key={`${faq.question}-${faq.order}`}
              className="group rounded-2xl bg-white ring-1 ring-charcoal/5 overflow-hidden hover:ring-charcoal/10 hover:shadow-lg hover:shadow-charcoal/[0.03] transition-all duration-300"
            >
              <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer select-none list-none">
                <span className="flex items-start gap-3">
                  <span className="text-xs font-mono text-clay/50 mt-0.5 tabular-nums">{String(Math.ceil(pageData.faqs.length / 3) + i + 1).padStart(2, '0')}</span>
                  <span className="font-heading font-semibold text-charcoal leading-snug">{faq.question}</span>
                </span>
                <span className="relative flex-shrink-0 w-6 h-6">
                  <svg className="absolute inset-0 w-6 h-6 text-clay opacity-100 group-open:opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <svg className="absolute inset-0 w-6 h-6 text-clay opacity-0 group-open:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <div className="h-px bg-charcoal/5 mb-4" />
                <p className="text-charcoal/75 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* FAQ List — Policies */}
      <section id="faq-policies" className="mt-14 md:mt-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-charcoal/5" />
          <h2 className="font-heading text-xs uppercase tracking-[.2em] text-charcoal/40">Policies</h2>
          <div className="h-px flex-1 bg-charcoal/5" />
        </div>
        <div className="space-y-3">
          {pageData.faqs.slice(Math.ceil(pageData.faqs.length * 2 / 3)).map((faq, i) => (
            <details
              key={`${faq.question}-${faq.order}`}
              className="group rounded-2xl bg-white ring-1 ring-charcoal/5 overflow-hidden hover:ring-charcoal/10 hover:shadow-lg hover:shadow-charcoal/[0.03] transition-all duration-300"
            >
              <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer select-none list-none">
                <span className="flex items-start gap-3">
                  <span className="text-xs font-mono text-clay/50 mt-0.5 tabular-nums">{String(Math.ceil(pageData.faqs.length * 2 / 3) + i + 1).padStart(2, '0')}</span>
                  <span className="font-heading font-semibold text-charcoal leading-snug">{faq.question}</span>
                </span>
                <span className="relative flex-shrink-0 w-6 h-6">
                  <svg className="absolute inset-0 w-6 h-6 text-clay opacity-100 group-open:opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <svg className="absolute inset-0 w-6 h-6 text-clay opacity-0 group-open:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <div className="h-px bg-charcoal/5 mb-4" />
                <p className="text-charcoal/75 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="mt-16 rounded-2xl bg-gradient-to-br from-sand/60 to-sand/40 backdrop-blur-sm p-8 md:p-10 ring-1 ring-charcoal/5">
        <div className="md:grid md:grid-cols-2 md:gap-10 md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-clay/15 mb-4">
              <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5l9 6 9-6" />
              </svg>
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2 tracking-tight">Still have questions?</h3>
            <p className="text-charcoal/75 leading-relaxed">
              We&apos;re happy to help. Book a free consultation or reach out to our team — no pressure, just support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <a
              href="https://thesoulcarecounsellor.janeapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-2.5 font-semibold text-cream hover:bg-clay/90 transition-colors text-sm"
            >
              Book a Free Consultation
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-medium text-charcoal/70 ring-1 ring-charcoal/10 hover:bg-charcoal/5 transition-colors text-sm"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
