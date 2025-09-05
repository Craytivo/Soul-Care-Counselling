'use client'

import { useEffect, useState } from 'react'
import { getServicePage } from '@/lib/sanity-queries'
import { ServicePage } from '@/lib/sanity'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface SanityServicePageProps {
  slug: string
}

export default function SanityServicePage({ slug }: SanityServicePageProps) {
  const [page, setPage] = useState<ServicePage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPage() {
      try {
        const fetchedPage = await getServicePage(slug)
        setPage(fetchedPage)
      } catch (err) {
        console.error('Error fetching service page:', err)
        setError('Failed to load service page. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchPage()
  }, [slug])

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal/60">Loading service page...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal/60">Service page not found.</p>
      </div>
    )
  }

  const renderCtaButton = (cta: { text: string; url: string; external: boolean }, className: string) => {
    if (cta.external) {
      return (
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {cta.text}
        </a>
      )
    } else {
      return (
        <Link href={cta.url} className={className}>
          {cta.text}
        </Link>
      )
    }
  }

  const renderSection = (section: any, index: number) => {
    switch (section._type) {
      case 'textSection':
        return (
          <section key={index} className="mx-auto max-w-3xl mt-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">{section.title}</h2>
            <div className="mt-4 text-charcoal/90">
              <PortableText value={section.content} />
            </div>
          </section>
        )

      case 'detailsSection':
        return (
          <section key={index} className="mx-auto max-w-5xl mt-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">{section.title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {section.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="rounded-lg bg-white p-5 ring-1 ring-charcoal/10 shadow-sm">
                  <dt className="font-semibold">{item.label}</dt>
                  <dd className="mt-1 text-charcoal/90">{item.value}</dd>
                </div>
              ))}
            </div>
          </section>
        )

      case 'listSection':
        return (
          <section key={index} className="mx-auto max-w-5xl mt-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">{section.title}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )

      case 'ctaSection':
        return (
          <section key={index} className="mx-auto max-w-3xl mt-12">
            <div className="rounded-xl bg-bark text-cream p-6 ring-1 ring-cream/15">
              <h3 className="font-heading text-xl md:text-2xl font-bold">{section.title}</h3>
              {section.description && (
                <p className="mt-2 text-cream/90">{section.description}</p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                {section.primaryButton && renderCtaButton(
                  section.primaryButton,
                  "inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
                )}
                {section.secondaryButton && renderCtaButton(
                  section.secondaryButton,
                  "inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
                )}
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Page Hero */}
      <section className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          {page.badge}
        </span>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-charcoal">
          {page.mainTitle}
        </h1>
        
        {page.quote && (
          <blockquote className="mt-6 border-l-4 border-clay pl-4 text-charcoal/90 italic">
            &quot;{page.quote.text}&quot;
            <span className="not-italic font-semibold"> {page.quote.attribution}</span>
          </blockquote>
        )}
        
        <div className="mt-6 whitespace-pre-line text-charcoal/90 leading-relaxed">
          {page.heroDescription}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3">
          {renderCtaButton(
            page.primaryCta,
            "inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
          )}
          {renderCtaButton(
            page.secondaryCta,
            "inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
          )}
        </div>
      </section>

      {/* Render all sections */}
      {page.sections.map((section, index) => renderSection(section, index))}
    </>
  )
}
