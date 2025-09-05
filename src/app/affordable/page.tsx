import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affordable Therapy | Soul Care Counselling',
  description: 'Affordable therapy option: 50-minute individual sessions at $80. Canada residents only. Limited spots, first-come first-served. Trauma-informed and faith-centered care.',
}

export default function AffordableTherapyPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          Affordable Therapy Program
        </span>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-charcoal">Accessible, faith-centered support</h1>
        <p className="mt-4 text-charcoal/90 leading-relaxed">
          We understand that everyone is not able to afford therapy and this can be a barrier to receiving mental health support. As a result we have created space for individuals who may have financial barriers to accessing support.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a 
            href="https://thesoulcarecounsellor.janeapp.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
          >
            Check Availability / Apply
          </a>
          <Link 
            href="/services"
            className="inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
          >
            Back to Services
          </Link>
        </div>
      </section>

      {/* Session + Cost */}
      <section className="mx-auto max-w-5xl mt-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
            <h2 className="font-heading text-xl md:text-2xl font-bold">Individual Therapy Sessions</h2>
            <p className="mt-2 text-charcoal/90">50 minutes</p>
          </div>
          <div className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
            <h2 className="font-heading text-xl md:text-2xl font-bold">Cost</h2>
            <p className="mt-2 text-charcoal/90">$80.00 per session (affordability rate)</p>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="mx-auto max-w-5xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Eligibility Criteria & Other Information</h2>
        <ul className="mt-6 space-y-3">
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>
            <span><strong>Resident of Canada</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>
            <span>
              <strong>Children (11–13) and youth (13–18):</strong> navigating behavioural issues, ADHD, anxiety, depression, trauma, etc.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>
            <span>
              <strong>Adults:</strong> navigating depression, anxiety, childhood traumas, stress, burnout, transitions, workplace trauma, racial issues, decision making, etc.
            </span>
          </li>
        </ul>
      </section>

      {/* Modalities */}
      <section className="mx-auto max-w-5xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Therapeutic Modalities Used</h2>
        <p className="mt-4 text-charcoal/90">
          Solution Focused Therapy, DBT, CBT, and Narrative Therapy from a trauma-informed approach.
        </p>
      </section>

      {/* Important Note */}
      <section className="mx-auto max-w-5xl mt-12">
        <div className="rounded-2xl bg-bark text-cream p-6 ring-1 ring-cream/15">
          <h2 className="font-heading text-xl md:text-2xl font-bold">Important to Note</h2>
          <ul className="mt-4 space-y-3 text-cream/95">
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-cream"></span>
              <span>
                The Soul Care Affordability Program is a <strong>6-month program</strong> where you can receive a <strong>maximum of 7 sessions</strong> at the affordability rate. After this, sessions <strong>increase to $100.00</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-cream"></span>
              <span>
                There are <strong>limited spots</strong> available for affordable therapy; services are provided on a <strong>first-come, first-served</strong> basis.
              </span>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
            >
              Apply / Book at Affordable Rate
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
