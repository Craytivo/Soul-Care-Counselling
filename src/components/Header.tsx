
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-bark shadow-lg border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LEFT: Brand */}
          <Link href="/" className="flex items-center gap-3">
            {/* Logo on black circle */}
            <span className="relative w-16 h-16 flex items-center justify-center">
              <svg
                className="absolute inset-0 w-full h-full z-0"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="50" fill="#fff" stroke="#F5D07B" strokeWidth="2" />
              </svg>
              <span className="relative z-10 w-12 h-12 flex items-center justify-center">
                <Image
                  src="/assets/logo/logo-s-c-intertwined.png"
                  alt="Soul Care Counselling Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </span>
            </span>
          </Link>

          {/* CENTER: Desktop nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8" aria-label="Primary">
              <Link href="/" className="uppercase tracking-[.15em] text-sm font-medium text-bark/80 hover:text-gold transition-colors duration-200 whitespace-nowrap">
                Home
              </Link>
              <Link href="/about" className="uppercase tracking-[.15em] text-sm font-medium text-bark/80 hover:text-gold transition-colors duration-200 whitespace-nowrap">
                About Us
              </Link>
              <Link href="/core-values" className="uppercase tracking-[.15em] text-sm font-medium text-bark/80 hover:text-gold transition-colors duration-200 whitespace-nowrap">
                Core Values
              </Link>
              <Link href="/services" className="uppercase tracking-[.15em] text-sm font-medium text-bark/80 hover:text-gold transition-colors duration-200 whitespace-nowrap">
                Services
              </Link>
              <Link href="/areas" className="uppercase tracking-[.15em] text-sm font-medium text-bark/80 hover:text-gold transition-colors duration-200 whitespace-nowrap">
                Areas of Focus
              </Link>
              <Link href="/intern-application" className="uppercase tracking-[.15em] text-sm font-medium text-bark/80 hover:text-gold transition-colors duration-200 whitespace-nowrap">
                Apply to be an Intern
              </Link>
              <Link href="/resources" className="uppercase tracking-[.15em] text-sm font-medium text-bark/80 hover:text-gold transition-colors duration-200 whitespace-nowrap">
                Resources
              </Link>
            </nav>

          {/* RIGHT: Hamburger */}
          <button
            type="button"
            onClick={toggleMenu}
            className={`justify-self-end shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-xl ring-1 ring-bark/20 hover:bg-gold/10 hover:ring-gold/40 transition-all duration-200 ${isMenuOpen ? 'scale-110 bg-gold/10 ring-gold/40' : ''}`}
            aria-controls="menuPanel"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu();
              }
            }}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={`relative w-6 h-6 block ${isMenuOpen ? 'opacity-70' : ''}`}> 
              {/* Hamburger to X animation */}
              <span
                className={`absolute left-0 top-1 w-6 h-0.5 bg-bark rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3 bg-bark' : ''}`}
                style={{ transitionProperty: 'transform, top, background' }}
              ></span>
              <span
                className={`absolute left-0 top-3 w-6 h-0.5 bg-bark rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
                style={{ transitionProperty: 'opacity' }}
              ></span>
              <span
                className={`absolute left-0 top-5 w-6 h-0.5 bg-bark rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3 bg-bark' : ''}`}
                style={{ transitionProperty: 'transform, top, background' }}
              ></span>
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/50 z-[59] animate-fade-in" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <aside
        id="menuPanel"
  className={`fixed right-0 top-0 z-[60] h-screen w-[86%] max-w-sm bg-bark/95 text-cream shadow-xl border-l border-cream/15 overflow-y-auto transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
        tabIndex={-1}
      >
        {/* Sticky header inside panel */}
  <div className="sticky top-0 bg-bark/95 backdrop-blur px-4 py-3 border-b border-cream/15 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide uppercase">Menu</span>
          <button 
            type="button"
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-md p-2 ring-1 ring-cream/20 hover:bg-cream/10" 
            aria-label="Close menu panel"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                closeMenu();
              }
            }}
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
          <Link href="/intern-application" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Apply to be an Intern
          </Link>

          <hr className="my-3 border-cream/15" />

          <Link href="/faq" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            FAQs
          </Link>
          <Link href="/notes" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Notes from Soul Care
          </Link>
          <Link href="/workshops" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Wellness Webinars
          </Link>
          <Link href="/resources" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Resources
          </Link>
          <Link href="/shop" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Shop
          </Link>
          <Link href="/contact" className="block py-2 uppercase tracking-[.15em] text-sm text-cream/90 hover:text-cream" onClick={closeMenu}>
            Contact
          </Link>

          <a
            href="https://thesoulcarecounsellor.janeapp.com"
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 font-bold tracking-wide text-bark hover:bg-gold/90 shadow-lg transition-all duration-200 hover:scale-105"
          >
            Book a Free Consultation
          </a>
        </nav>
      </aside>
    </>
  )
}


