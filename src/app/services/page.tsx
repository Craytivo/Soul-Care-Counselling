import type { Metadata } from 'next'

export const revalidate = 300
import SanityServices from '@/components/SanityServices'
import { getServicesPage } from '@/lib/sanity-queries'
import Link from 'next/link'
import EmptyState from '@/components/ui/EmptyState'
import ConsultationCta from '@/components/cta/ConsultationCta'

export const metadata: Metadata = {
  title: 'Services | Soul Care Counselling',
  description: 'Faith-centered, culturally sensitive therapy. Virtual across Canada. Explore individual therapy, affordable therapy, single-session options, and group therapy.',
}

export default async function ServicesPage() {
  const servicesPageData = await getServicesPage()

  // Return fallback if no data
  if (!servicesPageData) {
    return (
      <EmptyState
        title="Services page content not found."
        description="Please create it in Sanity Studio."
        action={<Link href="/studio" className="ui-btn-primary">Go to Sanity Studio</Link>}
      />
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl"></div>
        <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-gradient-to-br from-blue/20 to-transparent blur-xl"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            {servicesPageData.hero.badge}
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">{servicesPageData.hero.heading}</h1>
          <div className="mt-3 max-w-3xl text-cream/85">
            {servicesPageData.hero.priceHighlight ? (
              <>
                {servicesPageData.hero.priceHighlight.text} <span className="font-bold text-cream">{servicesPageData.hero.priceHighlight.price}</span> {servicesPageData.hero.priceHighlight.suffix}.<br />
                {servicesPageData.hero.description}
              </>
            ) : (
              <p>{servicesPageData.hero.description}</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-3xl text-center">
        <p className="text-sm text-charcoal/75">
          Prefer to start with practical tools first? Visit our{' '}
          <Link href="/resources" className="underline decoration-charcoal/30 hover:decoration-charcoal">
            resources library
          </Link>
          . Have a question about fit or next steps?{' '}
          <Link href="/contact" className="underline decoration-charcoal/30 hover:decoration-charcoal">
            Contact our team
          </Link>
          .
        </p>
      </section>

      {/* Services from Sanity */}
      <SanityServices servicesData={servicesPageData} />

      {servicesPageData.cta.external ? (
        <ConsultationCta
          title={servicesPageData.cta.title}
          description={servicesPageData.cta.description}
          buttonText={servicesPageData.cta.buttonText}
          bookingUrl={servicesPageData.cta.buttonUrl}
          trackingLocation="services-bottom"
        />
      ) : (
        <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="font-heading text-xl md:text-2xl font-semibold">{servicesPageData.cta.title}</h3>
              <p className="mt-2 text-charcoal/80">{servicesPageData.cta.description}</p>
            </div>
            <div className="md:justify-self-end">
              <Link
                href={servicesPageData.cta.buttonUrl}
                className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                {servicesPageData.cta.buttonText}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
