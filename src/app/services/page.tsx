import type { Metadata } from 'next'
import Link from 'next/link'

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

      {/* Service Grid */}
      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h3 className="font-heading text-xl font-semibold">Individual Therapy</h3>
          <p className="mt-3 text-charcoal/85">
            One-on-one support tailored to your unique needs, integrating faith and evidence-based approaches for lasting healing.
          </p>
          <div className="mt-4">
            <Link href="/individual" className="text-sm font-semibold underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">
              Learn More
            </Link>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h3 className="font-heading text-xl font-semibold">Affordable Therapy</h3>
          <p className="mt-3 text-charcoal/85">
            Accessible mental health care with sliding scale options and flexible payment plans to ensure support is within reach.
          </p>
          <div className="mt-4">
            <Link href="/affordable" className="text-sm font-semibold underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">
              Learn More
            </Link>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h3 className="font-heading text-xl font-semibold">Single Session Therapy</h3>
          <p className="mt-3 text-charcoal/85">
            Focused, solution-oriented support in a single session for immediate relief and practical next steps.
          </p>
          <div className="mt-4">
            <Link href="/single-session" className="text-sm font-semibold underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">
              Learn More
            </Link>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h3 className="font-heading text-xl font-semibold">Group Therapy</h3>
          <p className="mt-3 text-charcoal/85">
            Connect with others on similar journeys in a supportive, faith-centered group setting for shared healing.
          </p>
          <div className="mt-4">
            <Link href="/group-therapy" className="text-sm font-semibold underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">
              Learn More
            </Link>
          </div>
        </article>
      </section>

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