import type { Metadata } from 'next'
import SanityServices from '@/components/SanityServices'

export const metadata: Metadata = {
  title: 'Services | Soul Care Counselling',
  description: 'Faith-centered, culturally sensitive therapy. Virtual across Canada. Explore individual therapy, affordable therapy, single-session options, and group therapy.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          Services
        </span>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Faith-Centered Care, Designed for You</h1>
        <p className="mt-3 text-charcoal/80">
          Explore the right level of support for your season—individual, affordable, single-session, and group therapy.
        </p>
      </section>

      {/* Services from Sanity */}
      <SanityServices />

      {/* CTA Section */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Ready to get started?</h3>
            <p className="mt-2 text-charcoal/80">Book a free consultation to explore which service is right for you.</p>
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