'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-bark/90 text-cream supports-[backdrop-filter]:bg-bark/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LEFT: Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block h-9 w-9 rounded-md bg-cream/10 ring-1 ring-cream/20"></span>
            <span className="text-sm sm:text-base font-semibold tracking-wide">Soul Care Counselling</span>
          </Link>

          {/* CENTER: Desktop nav */}
          <nav className="hidden lg:flex items-center justify-center gap-6" aria-label="Primary">
            <Link href="/" className="uppercase tracking-[.2em] text-xs text-cream/90 hover:text-cream whitespace-nowrap">
              Home
            </Link>
            <Link href="/about" className="uppercase tracking-[.2em] text-xs text-cream/90 hover:text-cream whitespace-nowrap">
              About Us
            </Link>
            <Link href="/core-values" className="uppercase tracking-[.2em] text-xs text-cream/90 hover:text-cream whitespace-nowrap">
              Core Values
            </Link>
            <Link href="/services" className="uppercase tracking-[.2em] text-xs text-cream/90 hover:text-cream whitespace-nowrap">
              Services
            </Link>
            <Link href="/areas" className="uppercase tracking-[.2em] text-xs text-cream/90 hover:text-cream whitespace-nowrap">
              Areas of Focus
            </Link>
          </nav>

          {/* RIGHT: Hamburger */}
          <button
            onClick={toggleMenu}
            className="justify-self-end shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-md ring-1 ring-cream/20 hover:bg-cream/10"
            aria-controls="menuPanel" 
            aria-expanded={isMenuOpen} 
            aria-label="Open menu"
          >
            <svg className="h-5 w-5 text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/50 z-[59]" 
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <aside
        id="menuPanel"
        className={`fixed right-0 top-0 z-[60] h-screen w-[86%] max-w-sm bg-bark text-cream shadow-xl border-l border-cream/15 overflow-y-auto transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
        tabIndex={-1}
      >
        {/* Sticky header inside panel */}
        <div className="sticky top-0 bg-bark/95 backdrop-blur px-4 py-3 border-b border-cream/15 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide uppercase">Menu</span>
          <button 
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-md p-2 ring-1 ring-cream/20 hover:bg-cream/10" 
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-4 text-sm" aria-label="All pages">
          <Link href="/" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/about" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            About Us
          </Link>
          <Link href="/core-values" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Core Values
          </Link>
          <Link href="/services" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Services
          </Link>
          <Link href="/areas" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Areas of Focus
          </Link>

          <hr className="my-3 border-cream/15" />

          <Link href="/faq" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            FAQs
          </Link>
          <Link href="/notes" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Notes from Soul Care
          </Link>
          <Link href="/workshops" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Wellness Workshops
          </Link>
          <Link href="/contact" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Contact
          </Link>

          <a
            href="https://thesoulcarecounsellor.janeapp.com"
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold tracking-wide text-charcoal hover:bg-clay/90"
          >
            Book a Free Consultation
          </a>
        </nav>
      </aside>
    </>
  )
}


