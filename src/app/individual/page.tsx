import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Individual Therapy | Soul Care Counselling',
  description: 'Trauma-informed, faith-centered individual counselling focused on rest, restoration, and emotional wellness. Private online sessions (50 minutes, $160).',
}

export default function IndividualTherapyPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          Individual Therapy
        </span>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-charcoal">
          Rest, Restoration &amp; Freedom
        </h1>
        <blockquote className="mt-6 border-l-4 border-clay pl-4 text-charcoal/90 italic">
          &quot;Are you tired? Worn out? Burned out on religion? Come to me. Get away with me and you&apos;ll recover your life. I&apos;ll show you how to take a real rest. Walk with me and work with me—watch how I do it. Learn the unforced rhythms of grace. I won&apos;t lay anything heavy or ill-fitting on you. Keep company with me and you&apos;ll learn to live freely and lightly.&quot;
          <span className="not-italic font-semibold">Matthew 11:28-30</span>
        </blockquote>
        <div className="mt-6 flex flex-wrap gap-3">
          <a 
            href="https://thesoulcarecounsellor.janeapp.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90"
          >
            Book a Session
          </a>
          <Link 
            href="/notes"
            className="inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90"
          >
            Read Notes
          </Link>
        </div>
      </section>

      {/* Framing */}
      <section className="mx-auto max-w-3xl mt-12">
        <p className="text-charcoal/90">
          <strong>Emotional wellness</strong> is a key aspect of soul care, and as we live in a fast-paced world, we are often moving from one thing to the next. Seldom do we take the time to sit, reflect, and think about how we are feeling or how we are moving through life from day to day.
        </p>
        <p className="mt-4 text-charcoal/90">
          Jesus says that above all He wishes that our souls will prosper, and truth be told, many of us are prospering, but our souls are yearning for rest, restoration, and true freedom.
        </p>
        <p className="mt-4 text-charcoal/90">
          Some signs of a soul that needs rest are <em>anxiety, depression, burn out, stress and cynicism.</em>
        </p>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-3xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">How We Work Together</h2>
        <p className="mt-4 text-charcoal/90">
          Through individual counselling, we journey together to address these issues and dig deeper to address the root causes. As your therapist, we will work together, inviting the Holy Spirit to show us what needs to be attended to through conversation, prayer and listening.
        </p>
        <p className="mt-4 text-charcoal/90">
          Our time together can look like a conversation, journaling, prayer, art, or even sitting in silence. Together we build a plan, set goals, and with the support of the Holy Spirit, pace ourselves to achieve them.
        </p>
      </section>

      {/* Session Details */}
      <section className="mx-auto max-w-5xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">What a Session Looks Like</h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-5 ring-1 ring-charcoal/10 shadow-sm">
            <dt className="font-semibold">Length</dt>
            <dd className="mt-1 text-charcoal/90">Approximately 50 minutes</dd>
          </div>
          <div className="rounded-lg bg-white p-5 ring-1 ring-charcoal/10 shadow-sm">
            <dt className="font-semibold">Cost</dt>
            <dd className="mt-1 text-charcoal/90">$160.00 per session</dd>
          </div>
          <div className="rounded-lg bg-white p-5 ring-1 ring-charcoal/10 shadow-sm">
            <dt className="font-semibold">Format</dt>
            <dd className="mt-1 text-charcoal/90">Confidential, private online sessions</dd>
          </div>
          <div className="rounded-lg bg-white p-5 ring-1 ring-charcoal/10 shadow-sm">
            <dt className="font-semibold">Focus</dt>
            <dd className="mt-1 text-charcoal/90">Conversations centered on what you need</dd>
          </div>
        </dl>
      </section>

      {/* Top Concerns */}
      <section className="mx-auto max-w-5xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">Top Concerns We Help to Address</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Trauma-informed individual and group counselling</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Racial Identity</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Depression and anxiety support</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Emotional, physical, verbal and spiritual abuse</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Managing life transitions</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Stress management</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Identity development</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Relationship counselling</li>
          <li className="flex items-start gap-3"><span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-bark"></span>Tools to leverage body and self care</li>
        </ul>
      </section>

      {/* Objective */}
      <section className="mx-auto max-w-3xl mt-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">Our Objective</h2>
        <p className="mt-4 text-charcoal/90">
          Our main objective? To work together and create a future where you have attained an emotionally, mentally, socially and spiritually balanced life.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl mt-12">
        <div className="rounded-xl bg-bark text-cream p-6 ring-1 ring-cream/15">
          <h3 className="font-heading text-xl md:text-2xl font-bold">Ready to Begin?</h3>
          <p className="mt-2 text-cream/90">Book a confidential online session. We&apos;ll pace the journey together.</p>
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
