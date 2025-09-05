import type { Metadata } from 'next'
import SanityWorkshops from '@/components/SanityWorkshops'

export const metadata: Metadata = {
  title: 'Wellness Workshops — Soul Care Counselling',
  description: 'Missed our free monthly workshops, or want to register for an upcoming one? Find recordings of previous virtual workshops and registration information for future ones.',
}

export default function WorkshopsPage() {

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            Wellness Workshops
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Free Monthly Workshops</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Missed our free monthly workshops, or want to register for an upcoming one? You&apos;ve come to the right place.
          </p>
          <p className="mt-4 max-w-3xl text-cream/85">
            Below, you&apos;ll find recordings of all previous virtual workshops and registration information for future ones, each packed with valuable insights and practical tips from our dedicated therapists.
          </p>
        </div>
      </section>

      {/* Workshops from Sanity */}
      <SanityWorkshops />

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