import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Single Session Program (SSP) | Soul Care Counselling',
  description: 'Low-Cost Therapy: Single Session Program (SSP). $20 per individual, up to 2 sessions. Choose a guided Soul Care Plan (Cohort 1) or targeted support for a specific concern (Cohort 2).',
}

export default function SingleSessionPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          Single Session Program (SSP)
        </span>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Low-Cost, Focused Support — Exactly When You Need It</h1>
        <p className="mt-4 text-charcoal/90 leading-relaxed">
          Life can often throw unexpected challenges our way, and finding immediate, affordable support isn&apos;t always easy. That&apos;s why we&apos;ve created a new Low-Cost Therapy Program, the Single Session Program (SSP) — a flexible and accessible way to get the care you need, when you need it most. Whether you&apos;re navigating a tough situation or seeking a little clarity in the moment, SSP is designed to offer instant support while overcoming common barriers to therapy.
        </p>
        <p className="mt-4 text-charcoal/90 leading-relaxed">
          SSP sessions are facilitated by our student therapists, who bring compassion, expertise, and a holistic approach to mental wellness. Their goal is to provide you with the space, tools, and encouragement to navigate life&apos;s ups and downs with greater clarity and confidence.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a 
            href="https://thesoulcarecounsellor.janeapp.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
          >
            Book an SSP Session
          </a>
          <Link 
            href="/services"
            className="inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
          >
            Back to Services
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="mx-auto max-w-5xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">How It Works</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Affordable Care */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
            <h3 className="font-heading text-lg md:text-xl font-bold">Affordable Care</h3>
            <p className="mt-2 text-charcoal/90">
              Each session is offered at <strong>$20 per individual</strong>, with a <strong>maximum of 2 sessions</strong> allowed.
            </p>
          </div>

          {/* Student-Facilitated */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
            <h3 className="font-heading text-lg md:text-xl font-bold">Student-Therapist Led</h3>
            <p className="mt-2 text-charcoal/90">
              Sessions are facilitated by our compassionate student therapists with a holistic, evidence-informed approach.
            </p>
          </div>
        </div>
      </section>

      {/* Choose Your Focus */}
      <section id="cohorts" className="mx-auto max-w-5xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Choose Your Focus</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Cohort 1 */}
          <article className="flex flex-col rounded-2xl bg-white ring-1 ring-charcoal/10 shadow-sm p-6">
            <header>
              <h3 className="font-heading text-xl font-bold">Cohort 1: Guided Soul Care Plan</h3>
            </header>
            <p className="mt-3 text-charcoal/90 leading-relaxed">
              Work with our team as they guide you through our tailored Soul Care Plan, designed to help you reflect, reset, and realign.
            </p>
            <div className="mt-auto pt-5">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-clay px-4 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-clay/90"
              >
                Book Cohort 1
              </a>
            </div>
          </article>

          {/* Cohort 2 */}
          <article className="flex flex-col rounded-2xl bg-white ring-1 ring-charcoal/10 shadow-sm p-6">
            <header>
              <h3 className="font-heading text-xl font-bold">Cohort 2: Targeted Support</h3>
            </header>
            <p className="mt-3 text-charcoal/90 leading-relaxed">
              Receive direct support in addressing specific presenting concerns or challenges, whether emotional, relational, or personal.
            </p>
            <div className="mt-auto pt-5">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-clay px-4 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-clay/90"
              >
                Book Cohort 2
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Band */}
      <section className="mx-auto max-w-3xl mt-16">
        <div className="rounded-2xl bg-bark text-cream p-6 md:p-8 ring-1 ring-cream/15">
          <h3 className="font-heading text-xl md:text-2xl font-bold">Ready for focused support?</h3>
          <p className="mt-2 text-cream/90">Choose a cohort and book your low-cost single session today.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
            >
              Book Now
            </a>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
            >
              Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
