'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Quote } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { useState, useEffect, useRef } from 'react'

interface DirectorSectionProps {
  name: string
  credentials?: string
  badge?: string
  image?: any
  description: string
  quote?: string
  bookingLink?: string
  bookingText?: string
  psychologyTodayImage?: any
  psychologyTodayLink?: string
  slug?: string
}

export default function DirectorSection({
  name,
  credentials,
  badge,
  image,
  description,
  quote,
  bookingLink,
  bookingText = 'Book a Free Consultation',
  psychologyTodayImage,
  psychologyTodayLink,
  slug = 'jessica-robinson-grant'
}: DirectorSectionProps) {
  const paragraphs = description.split(/\n{2,}/).filter(Boolean)
  
  // Mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const portraitRef = useRef<HTMLDivElement>(null)
  
  // Reveal animation state
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Quote typing effect
  const [displayedQuote, setDisplayedQuote] = useState('')
  const quoteRef = useRef<HTMLDivElement>(null)
  const [quoteVisible, setQuoteVisible] = useState(false)

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    // Mouse move handler for parallax (desktop only) - very subtle
    const handleMouseMove = (e: MouseEvent) => {
      if (!portraitRef.current || window.innerWidth <= 768) return
      const rect = portraitRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / 80 // Reduced from 30 to 80 for much subtler effect
      const y = (e.clientY - centerY) / 80 // Reduced from 30 to 80 for much subtler effect
      setMousePosition({ x, y })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Intersection Observer for quote
    const quoteObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && quote) {
          setQuoteVisible(true)
          let index = 0
          const typeInterval = setInterval(() => {
            if (index < quote.length) {
              setDisplayedQuote(quote.slice(0, index + 1))
              index++
            } else {
              clearInterval(typeInterval)
            }
          }, 30)
          return () => clearInterval(typeInterval)
        }
      },
      { threshold: 0.5 }
    )

    if (quoteRef.current) {
      quoteObserver.observe(quoteRef.current)
    }

    return () => quoteObserver.disconnect()
  }, [quote])

  return (
    <section ref={sectionRef} className="section-spacing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        
        {/* Header: Portrait badge + name (clickable) */}
        <div className="mb-12 md:mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-8 md:gap-10 lg:gap-14">
            
            {/* Portrait badge - advanced parallax effect */}
            {image && (
              <div className="flex-shrink-0 flex justify-center">
                <Link href={`/about/${slug}`} className="group inline-block">
                  <div 
                    ref={portraitRef}
                    className="relative w-28 h-36 sm:w-32 sm:h-40 md:w-40 md:h-48 transition-transform duration-700 ease-out group-hover:scale-102"
                    style={{
                      transform: isLargeScreen 
                        ? `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)` 
                        : undefined
                    }}
                  >
                    {/* Subtle gradient glow */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-clay/10 via-transparent to-cream/10 opacity-0 group-hover:opacity-50 transition-opacity duration-700 blur-md" />
                    
                    {/* Outer glow frame */}
                    <div className="absolute inset-0 rounded-lg border-2 border-clay/20 opacity-40 blur-xs transition-all duration-700 group-hover:opacity-60" />
                    
                    {/* Main frame */}
                    <div className="absolute inset-0 rounded-lg border border-clay/80 overflow-hidden shadow-elevation-1 backdrop-blur-sm bg-white/5">
                      {/* Corner brackets - very subtle */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-clay/60 transition-all duration-700 group-hover:border-clay/80" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-clay/60 transition-all duration-700 group-hover:border-clay/80" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-clay/60 transition-all duration-700 group-hover:border-clay/80" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-clay/60 transition-all duration-700 group-hover:border-clay/80" />
                      
                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={urlFor(image).width(200).height(240).quality(95).url()}
                          alt={image.alt || name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          priority
                          sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
                        />
                        {/* Subtle vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent transition-opacity duration-700 group-hover:from-charcoal/20" />
                        
                        {/* Very subtle hover overlay */}
                        <div className="absolute inset-0 bg-clay/5 opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                      </div>
                    </div>
                    
                    {/* Subtle status indicator */}
                    <div className="absolute -bottom-2 -right-2">
                      <div className="w-6 h-6 bg-clay rounded-full border-2 border-cream shadow-lg flex items-center justify-center transition-all duration-700 group-hover:scale-105 group-hover:bg-bark">
                        <div className="w-2 h-2 bg-cream rounded-full" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Name section with reveal animation */}
            <div className="text-center flex flex-col items-center">
              <div className={`mb-6 md:mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="heading-xl mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <Link href={`/about/${slug}`} className="hover:underline decoration-2 underline-offset-4 decoration-clay/50 transition-all hover:text-clay">
                    {name}
                  </Link>
                </h2>
                {credentials && (
                  <p className="text-lg sm:text-xl text-clay font-semibold transition-opacity duration-500 hover:opacity-80">
                    {credentials}
                  </p>
                )}
                {/* Badge and link on same line */}
                <div className="flex items-center gap-4 mt-3 sm:mt-4 flex-wrap">
                  {badge && (
                    <p className="label-text inline-block w-fit px-3 py-1 bg-sand/50 rounded-full border border-clay/20 text-xs sm:text-sm">
                      {badge}
                    </p>
                  )}
                  {/* Stylish link to personal page */}
                  <Link
                    href={`/about/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-clay hover:text-bark transition-colors group relative"
                  >
                    <span className="relative z-10">View full profile</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-clay transition-all duration-300 group-hover:w-full" />
                    <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform relative z-10" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Bio content with staggered reveal */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8 mb-8 md:mb-12">
            {paragraphs.map((paragraph, idx) => (
              <p 
                key={idx} 
                className="body-text text-base sm:text-lg leading-relaxed transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${idx * 150}ms`
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quote section with typing effect */}
          {quote && (
            <div 
              ref={quoteRef}
              className="mb-8 md:mb-12 relative px-6 sm:px-8 py-4 sm:py-6 border-t-4 border-b-4 border-clay/30 hover:border-clay transition-colors duration-500"
            >
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-clay/20 mb-3 mx-auto" />
              <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-charcoal/80 leading-relaxed">
                "{displayedQuote}"
                <span className="inline-block w-0.5 h-5 sm:h-6 bg-clay ml-1 animate-pulse" />
              </p>
            </div>
          )}

          {/* Psychology Today badge with hover effect */}
          {psychologyTodayImage && psychologyTodayLink && (
            <div className={`mb-8 md:mb-12 flex justify-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
              <a
                href={psychologyTodayLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block relative group"
                aria-label="Verified on Psychology Today"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-clay/20 to-cream/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={urlFor(psychologyTodayImage).url()}
                  alt={psychologyTodayImage.alt || 'Verified on Psychology Today'}
                  width={320}
                  height={110}
                  className="h-10 sm:h-12 w-auto relative transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>
          )}

          {/* CTA Button with advanced hover effect */}
          {bookingLink && (
            <div className={`flex justify-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-clay text-cream font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2 text-sm sm:text-base"
              >
                <span className="relative z-10">{bookingText}</span>
                <svg className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
