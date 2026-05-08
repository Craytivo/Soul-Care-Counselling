import type { Metadata } from 'next'
import Link from 'next/link'
import WaitlistForm from '@/components/forms/WaitlistForm'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Shop - Soul Care Counselling',
  description: 'Our shop is coming soon. Join the waitlist to be notified when it launches.',
}

export default function ShopPage() {
  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div
          className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-clay/50 to-cream/10 blur-2xl"
          aria-hidden="true"
        ></div>
        <div
          className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tr from-clay/35 to-transparent blur-2xl"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-[11px] uppercase tracking-[.22em] ring-1 ring-cream/30">
            Coming Soon
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Soul Care Shop</h1>
          <p className="mt-3 max-w-3xl leading-relaxed text-cream/85">
            We are building this page and will share updates as soon as it is ready. If you would
            like to be notified first, join the waitlist below.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 md:p-8">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h2 className="font-heading text-xl font-semibold md:text-2xl">
              Need support right now?
            </h2>
            <p className="mt-2 text-charcoal/80">
              While the shop is in progress, you can still access support through counselling and
              our free resource library.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
            <a
              href="https://thesoulcarecounsellor.janeapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-clay/90"
            >
              Book Consultation
            </a>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-md bg-sand px-5 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-sand/90"
            >
              View Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
