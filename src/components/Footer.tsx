import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
  <footer className="mt-24 bg-white text-bark">
      {/* Pre-CTA band */}
  <div className="border-b border-bark/10">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* No text, logo only for branding consistency */}
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gold/10 px-4 py-2 font-semibold text-bark hover:bg-gold/20 ring-1 ring-gold/20"
            >
              Book a Free Consultation
            </a>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-bark/5 px-4 py-2 font-semibold text-bark hover:bg-bark/10 ring-1 ring-bark/10"
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
              <span className="relative w-12 h-12 flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full z-0"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="50" r="50" fill="#fff" />
                </svg>
                <span className="relative z-10 w-10 h-10 flex items-center justify-center">
                  <Image
                    src="/assets/logo/soulcare-logo.png"
                    alt="Soul Care Counselling Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </span>
              </span>
            </Link>
            <div className="mt-3">
              <a
                href="https://www.instagram.com/thesoulcaretherapists/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 text-bark/80 hover:text-bark text-base font-medium"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-text-bottom"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
                <span>Instagram</span>
              </a>
            </div>
            <p className="mt-3 text-sm text-bark/80">
              Warm, practical counselling grounded in evidence-based care and Christian faith.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-bark/80">
              <li>Virtual appointments across Canada</li>
              <li>
                <Link href="/contact" className="underline decoration-bark/40 underline-offset-4 hover:text-bark">
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
            <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-bark/90">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="text-bark/80 hover:text-bark">Home</Link></li>
              <li><Link href="/about" className="text-bark/80 hover:text-bark">About Us</Link></li>
              <li><Link href="/core-values" className="text-bark/80 hover:text-bark">Core Values</Link></li>
              <li><Link href="/services" className="text-bark/80 hover:text-bark">Services</Link></li>
              <li><Link href="/areas" className="text-bark/80 hover:text-bark">Areas of Focus</Link></li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-bark/90">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/faq" className="text-bark/80 hover:text-bark">FAQs</Link></li>
              <li><Link href="/notes" className="text-bark/80 hover:text-bark">Notes from Soul Care</Link></li>
              <li><Link href="/workshops" className="text-bark/80 hover:text-bark">Wellness Webinars</Link></li>
              <li>
                <a 
                  href="https://thesoulcarecounsellor.janeapp.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-bark/80 hover:text-bark"
                >
                  Client Booking (Jane)
                </a>
              </li>
            </ul>
          </nav>

          {/* Policies / small print */}
          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-bark/90">Policies</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/privacy" className="text-bark/80 hover:text-bark">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-bark/80 hover:text-bark">Terms of Use</Link></li>
              <li><Link href="/contact" className="text-bark/80 hover:text-bark">Accessibility</Link></li>
            </ul>
            <p className="mt-4 text-xs text-bark/60">
              Not for crisis support. If you&apos;re in immediate danger, call 911 or local emergency services.
            </p>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bark/10">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-sm text-bark/70">
            &copy; {new Date().getFullYear()} Soul Care Counselling. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm items-center">
            <Link href="/privacy" className="text-bark/70 hover:text-bark">Privacy</Link>
            <Link href="/terms" className="text-bark/70 hover:text-bark">Terms</Link>
            <a href="#" className="text-bark/70 hover:text-bark">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
