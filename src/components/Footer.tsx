import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-24 bg-bark text-cream">
      {/* Pre-CTA band */}
      <div className="border-b border-cream/15">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-lg md:text-xl font-semibold">Ready to take the next step?</h2>
            <p className="text-cream/80 text-sm mt-1">Faith-centered, culturally responsive therapy. Virtual care across Canada.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              Book a Free Consultation
            </a>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-cream/10 px-4 py-2 font-semibold text-cream hover:bg-cream/15 ring-1 ring-cream/20"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand / summary */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/assets/logo/logo-s-c-intertwined.png"
                  alt="Soul Care Counselling Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base font-semibold tracking-wide">Soul Care Counselling</span>
            </Link>
            <p className="mt-3 text-sm text-cream/80">
              Warm, practical counselling grounded in evidence-based care and Christian faith.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-cream/80">
              <li>Virtual appointments across Canada</li>
              <li>
                <Link href="/contact" className="underline decoration-cream/40 underline-offset-4 hover:text-cream">
                  Get in touch
                </Link>
              </li>
            </ul>

            {/* Psychology Today verification badge */}
            <div className="mt-5">
              <a 
                href="https://www.psychologytoday.com/" 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                aria-label="Verified by Psychology Today" 
                className="inline-block"
              >
                <Image
                  src="/assets/img/icons/psychology-today.png"
                  alt="Verified by Psychology Today"
                  className="h-8 md:h-10 w-auto"
                  width={320} 
                  height={110}
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-cream/90">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="text-cream/80 hover:text-cream">Home</Link></li>
              <li><Link href="/about" className="text-cream/80 hover:text-cream">About Us</Link></li>
              <li><Link href="/core-values" className="text-cream/80 hover:text-cream">Core Values</Link></li>
              <li><Link href="/services" className="text-cream/80 hover:text-cream">Services</Link></li>
              <li><Link href="/areas" className="text-cream/80 hover:text-cream">Areas of Focus</Link></li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-cream/90">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/faq" className="text-cream/80 hover:text-cream">FAQs</Link></li>
              <li><Link href="/notes" className="text-cream/80 hover:text-cream">Notes from Soul Care</Link></li>
              <li><Link href="/workshops" className="text-cream/80 hover:text-cream">Wellness Workshops</Link></li>
              <li>
                <a 
                  href="https://thesoulcarecounsellor.janeapp.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream/80 hover:text-cream"
                >
                  Client Booking (Jane)
                </a>
              </li>
            </ul>
          </nav>

          {/* Policies / small print */}
          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-cream/90">Policies</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/privacy" className="text-cream/80 hover:text-cream">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-cream/80 hover:text-cream">Terms of Use</Link></li>
              <li><Link href="/contact" className="text-cream/80 hover:text-cream">Accessibility</Link></li>
            </ul>
            <p className="mt-4 text-xs text-cream/60">
              Not for crisis support. If you&apos;re in immediate danger, call 911 or local emergency services.
            </p>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-sm text-cream/70">
            &copy; {new Date().getFullYear()} Soul Care Counselling. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href="/privacy" className="text-cream/70 hover:text-cream">Privacy</Link>
            <Link href="/terms" className="text-cream/70 hover:text-cream">Terms</Link>
            <a href="#" className="text-cream/70 hover:text-cream">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
