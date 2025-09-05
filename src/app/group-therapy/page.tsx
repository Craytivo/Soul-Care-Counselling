import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Group Therapy | Soul Care Counselling',
  description: 'Heal in community through faith-centered group therapy. Join the interest list for upcoming groups and be the first to know when dates are announced.',
}

export default function GroupTherapyPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          Group Therapy
        </span>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Healing in Community</h1>
        <p className="mt-4 text-charcoal/90 leading-relaxed">
          One of the most powerful aspects of healing is healing in community. Oftentimes we feel as though we are going through our current circumstance alone, and no one else has experienced what we have. This can sometimes lead to living in guilt and shame or suffering in silence. This is not God&apos;s plan for humanity. His heart is that we learn, grow and heal together; and group therapy is a great space to heal together in community.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
          >
            Join the Interest List
          </Link>
          <Link 
            href="/services"
            className="inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
          >
            Back to Services
          </Link>
        </div>
      </section>

      {/* Status */}
      <section className="mx-auto max-w-3xl mt-12">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
          <h2 className="font-heading text-xl md:text-2xl font-bold">Upcoming Group Dates</h2>
          <p className="mt-2 text-charcoal/90">Will be announced!</p>
          <p className="mt-2 text-charcoal/80">
            Add your name to the interest list and we&apos;ll notify you as soon as dates open.
          </p>
          <div className="mt-5">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-sand px-4 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-sand/90"
            >
              Get Notified
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl mt-12">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
            <h3 className="font-heading text-lg font-bold">Safe & Confidential</h3>
            <p className="mt-2 text-charcoal/90">Facilitated by trained clinicians in a supportive, faith-informed environment.</p>
          </article>
          <article className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
            <h3 className="font-heading text-lg font-bold">Shared Growth</h3>
            <p className="mt-2 text-charcoal/90">Normalize your experience and learn alongside others with similar journeys.</p>
          </article>
          <article className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-sm">
            <h3 className="font-heading text-lg font-bold">Practical Tools</h3>
            <p className="mt-2 text-charcoal/90">Leave each session with simple practices for peace, renewal, and resilience.</p>
          </article>
        </div>
      </section>

      {/* CTA Band */}
      <section className="mx-auto max-w-3xl mt-16">
        <div className="rounded-2xl bg-bark text-cream p-6 md:p-8 ring-1 ring-cream/15">
          <h3 className="font-heading text-xl md:text-2xl font-bold">Want to be first to know?</h3>
          <p className="mt-2 text-cream/90">Join the interest list and we&apos;ll email you when groups open for registration.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
            >
              Join the Interest List
            </Link>
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
