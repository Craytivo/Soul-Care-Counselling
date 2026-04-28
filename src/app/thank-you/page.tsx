import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You | Soul Care Counselling',
  description:
    'Thank you for connecting with Soul Care Counselling. Your request has been received and your follow-up resources are on the way.',
}

export default function ThankYouPage() {
  const bookingUrl =
    process.env.NEXT_PUBLIC_JANEAPP_BOOKING_URL || 'https://thesoulcarecounsellor.janeapp.com'

  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
          Thank You
        </span>
        <h1 className="mt-3 font-heading text-2xl md:text-3xl font-semibold">
          You&apos;re all set. Your request has been received.
        </h1>
        <p className="mt-3 text-charcoal/80 leading-relaxed">
          You will receive your resource and follow-up emails shortly. If and when you feel ready,
          you can book a consultation at your own pace.
        </p>

        <div className="mt-6 rounded-xl bg-white/70 p-4 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-lg font-semibold">Choose your next step</h2>
          <p className="mt-2 text-sm text-charcoal/80">
            If speaking with someone now would feel helpful, you can book a consultation. If not,
            you can return to the homepage and continue when you are ready.
          </p>
        </div>

        <div className="mt-5">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
          >
            Book a Consultation
          </a>
        </div>

        <p className="mt-4 text-sm text-charcoal/75">
          You can also continue exploring support resources before booking.
        </p>
        <p className="mt-1 text-sm text-charcoal/75">
          <Link
            href="/resources"
            className="underline decoration-charcoal/30 hover:decoration-charcoal"
          >
            Continue with resources
          </Link>
          {' '}or{' '}
          <Link href="/" className="underline decoration-charcoal/30 hover:decoration-charcoal">
            Return to homepage
          </Link>
        </p>
      </div>
    </section>
  )
}
