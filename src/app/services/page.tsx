import type { Metadata } from 'next'

export const revalidate = 0
import SanityServices from '@/components/SanityServices'
import { getServicesPage } from '@/lib/sanity-queries'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | Soul Care Counselling',
  description: 'Faith-centered, culturally sensitive therapy. Virtual across Canada. Explore individual therapy, affordable therapy, single-session options, and group therapy.',
}


export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const servicesPageData = await getServicesPage()

  // Debug logging
  console.log('Services page data:', servicesPageData ? 'Found' : 'Not found')
  if (servicesPageData) {
    console.log('Services count:', servicesPageData.servicesList?.length || 0)
    console.log('Hero data:', servicesPageData.hero)
  }

  // Return fallback if no data
  if (!servicesPageData) {
    return (
      <div className="text-center py-12">
        <p className="text-bark/60">Services page content not found. Please create it in Sanity Studio.</p>
        <Link href="/studio" className="text-gold underline">Go to Sanity Studio</Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          {servicesPageData.hero.badge}
        </span>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">{servicesPageData.hero.heading}</h1>
        <div className="mt-3 text-charcoal/80">
          {servicesPageData.hero.priceHighlight ? (
            <>
              {servicesPageData.hero.priceHighlight.text} <span className="font-bold text-bark">{servicesPageData.hero.priceHighlight.price}</span> {servicesPageData.hero.priceHighlight.suffix}.<br />
              {servicesPageData.hero.description}
            </>
          ) : (
            <p>{servicesPageData.hero.description}</p>
          )}
        </div>
      </section>

      {/* Services from Sanity */}
      <SanityServices />

      {/* CTA Section */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">{servicesPageData.cta.title}</h3>
            <p className="mt-2 text-charcoal/80">{servicesPageData.cta.description}</p>
          </div>
          <div className="md:justify-self-end">
            {servicesPageData.cta.external ? (
              <a 
                href={servicesPageData.cta.buttonUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                {servicesPageData.cta.buttonText}
              </a>
            ) : (
              <Link
                href={servicesPageData.cta.buttonUrl}
                className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                {servicesPageData.cta.buttonText}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}