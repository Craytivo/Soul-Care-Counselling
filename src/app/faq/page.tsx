import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soul Care — FAQs',
  description: 'Frequently Asked Questions about Soul Care Counselling services.',
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            FAQs
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-3 max-w-3xl text-cream/85">Answers to common questions about sessions, rates, policies, and more.</p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="mt-14 md:mt-16 space-y-4">
        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">How long are sessions?</summary>
          <p className="mt-3 text-charcoal/85">Individual therapy sessions are typically 50 minutes, while group sessions may be 60-90 minutes depending on the program.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">What are your rates?</summary>
          <p className="mt-3 text-charcoal/85">Our rates vary by service and clinician. We offer sliding scale options and flexible payment plans to make care accessible.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">Do I need a referral?</summary>
          <p className="mt-3 text-charcoal/85">No referral is required. You can book directly through our online system or contact us for a free consultation.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">What payment methods do you accept?</summary>
          <p className="mt-3 text-charcoal/85">We accept credit cards, e-transfers, and some insurance plans. Payment is typically due at the time of service.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">What is your cancellation policy?</summary>
          <p className="mt-3 text-charcoal/85">We require 24 hours notice for cancellations. Late cancellations may be subject to a fee.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">Do you work with faith-based clients?</summary>
          <p className="mt-3 text-charcoal/85">Yes, we integrate Christian faith into our practice while respecting each client&apos;s spiritual journey and preferences.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">Where are you located?</summary>
          <p className="mt-3 text-charcoal/85">We provide virtual care across Canada. Some clinicians may offer in-person options in specific locations.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">Do you see clients outside of Canada?</summary>
          <p className="mt-3 text-charcoal/85">Currently, we only provide services to clients within Canada due to licensing requirements.</p>
        </details>

        <details className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10">
          <summary className="font-heading font-semibold cursor-pointer">How many sessions do I need to commit to?</summary>
          <p className="mt-3 text-charcoal/85">There&apos;s no minimum commitment. We work with you to determine the right approach, whether that&apos;s single sessions or ongoing therapy.</p>
        </details>
      </section>
    </>
  )
}