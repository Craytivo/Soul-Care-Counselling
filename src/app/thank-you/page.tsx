import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Calendar, BookOpen, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You | Soul Care Counselling',
  description:
    'Thank you for connecting with Soul Care Counselling. Your request has been received and your follow-up resources are on the way.',
}

export default function ThankYouPage() {
  const bookingUrl =
    process.env.NEXT_PUBLIC_JANEAPP_BOOKING_URL || 'https://thesoulcarecounsellor.janeapp.com'

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sand to-white/50 p-8 md:p-12 shadow-2xl ring-1 ring-charcoal/10 hero-gradient-overlay">
        {/* Simplified decorative elements */}
        <div className="absolute top-0 right-0 h-24 w-24 -translate-y-6 translate-x-6 rounded-full bg-clay/15 blur-xl" />
        <div className="absolute top-16 left-8 h-20 w-20 translate-y-4 -translate-x-4 rounded-full bg-blue/10 blur-lg" />
        <div className="absolute bottom-16 right-16 h-16 w-16 translate-y-4 translate-x-4 rounded-full bg-green/10 blur-lg" style={{ animationDelay: '1s' }} />
        
        {/* Success indicator */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-green/20" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green/10 ring-4 ring-green/20">
              <CheckCircle className="h-8 w-8 text-green" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[.22em] text-charcoal/70 ring-1 ring-charcoal/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            Connection Successful
          </span>
          
          <h1 className="mt-8 font-heading text-3xl md:text-4xl font-semibold leading-tight text-charcoal">
            You&apos;re all set. <span className="text-gradient">Your journey begins now.</span>
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-charcoal/80 md:text-xl max-w-2xl mx-auto">
            You will receive your resource and follow-up emails shortly. Take your time, and when you feel ready,
            you can book a consultation at your own pace.
          </p>
        </div>

        {/* Action cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl bg-white/70 p-8 ring-1 ring-charcoal/10 card-hover-lift shadow-lg">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-clay/10 to-transparent blur-2xl rounded-full opacity-50" />
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/15 text-clay transition-transform group-hover:scale-105">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold text-charcoal">Book a Consultation</h3>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">
                  Speak with a counselor who understands your journey. Available at times that work for you.
                </p>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-clay/80 transition-colors"
                >
                  Schedule Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white/70 p-8 ring-1 ring-charcoal/10 card-hover-lift shadow-lg">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue/10 to-transparent blur-2xl rounded-full opacity-50" />
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/15 text-blue transition-transform group-hover:scale-105">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold text-charcoal">Explore Resources</h3>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">
                  Access our library of support materials, guides, and self-care resources.
                </p>
                <Link
                  href="/resources"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue hover:text-blue/80 transition-colors"
                >
                  Browse Resources
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary actions */}
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-white/30 p-6 text-center">
          <p className="text-sm text-charcoal/70 leading-relaxed">
            No rush. Take your time and return when you feel ready.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm mt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 text-charcoal hover:bg-white hover:text-charcoal transition-colors"
            >
              <Home className="h-4 w-4 text-clay" />
              Return Home
            </Link>
            <span className="text-charcoal/30">•</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 text-charcoal hover:bg-white hover:text-charcoal transition-colors"
            >
              Have Questions?
            </Link>
          </div>
        </div>

        {/* Bottom reassurance */}
        <div className="mt-8 text-center">
          <p className="text-xs text-charcoal/50">
            We&apos;re here to support you every step of the way. Your wellbeing is our priority.
          </p>
        </div>
      </div>
    </section>
  )
}
