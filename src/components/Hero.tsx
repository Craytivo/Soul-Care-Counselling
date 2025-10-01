import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import type { HomePage } from '@/lib/sanity'

interface HeroProps {
  homePageData: HomePage | null
  /** Presentation style */
  variant?: 'elevated' | 'legacy'
  /** Content layout style */
  layout?: 'left' | 'centerLow' | 'split'
}

const iconComponents = {
  lock: (
    <svg className="h-5 w-5 text-cream flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  ),
  mapPin: (
    <svg className="h-5 w-5 text-cream flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11.5A7 7 0 005 9.5C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" fill="currentColor" />
    </svg>
  ),
  globe: (
    <svg className="h-5 w-5 text-cream flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16c1.5-2 7.5-2 9 0" />
    </svg>
  ),
  graduationCap: (
    <svg className="h-5 w-5 text-cream flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9-4 9 4-9 4-9-4zm0 0v6a9 9 0 0018 0V8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6" />
    </svg>
  ),
}

export default function Hero({ homePageData, variant = 'elevated', layout = 'centerLow' }: HeroProps) {
  // Return early if no homepage data is available
  if (!homePageData || !homePageData.hero) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sand to-cream">
        <div className="text-center text-bark/60">
          <p className="text-lg">Please create homepage content in Sanity Studio</p>
          <p className="text-sm mt-2">Visit <a href="/studio" className="text-gold underline">Sanity Studio</a> to add homepage content</p>
        </div>
      </section>
    )
  }

  const heroData = homePageData.hero
  const backgroundImageSrc = heroData.backgroundImage 
    ? urlFor(heroData.backgroundImage).width(1920).height(1080).quality(90).url()
    : null
  const backgroundImageAlt = heroData.backgroundImage?.alt || 'Hero background'

  // Sanity hotspot support for better focal visibility
  const hotspot = (heroData.backgroundImage as any)?.hotspot
  const objectPosition = hotspot
    ? `${(hotspot.x * 100).toFixed(2)}% ${(hotspot.y * 100).toFixed(2)}%`
    : '50% 50%'

  const isLegacy = variant === 'legacy'

  return (
    <section className="relative h-[min(100vh,900px)] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Background Image */}
      {backgroundImageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            style={{ objectPosition }}
            className="hero-bg-img object-cover w-full h-full scale-105 will-change-transform duration-[3s] ease-out"
            priority
            sizes="100vw"
          />
          {isLegacy ? (
            <div className="absolute inset-0 bg-charcoal/70" />
          ) : (
            <>
              {/* Lightened directional gradient for improved image visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/65 via-charcoal/35 to-transparent md:from-charcoal/55 md:via-charcoal/25" />
              {/* Softer radial vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.04),rgba(0,0,0,0.22)_55%,rgba(0,0,0,0.38)_85%)] mix-blend-multiply" />
              {/* Subtle noise layer for texture (optional) */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:3px_3px]" />
            </>
          )}
        </div>
      )}

      {/* Content Wrapper */}
      {/* Bottom Content Band (40% height) */}
      {layout === 'split' && (
        <div className="absolute inset-0 md:inset-x-0 md:bottom-0 md:top-auto h-full md:h-[50%] min-h-[360px] z-10 flex items-center md:items-stretch py-6 md:py-0">
          <div className="w-full mx-auto px-6 md:px-10 lg:px-14 xl:px-20 max-w-7xl flex">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center md:items-stretch w-full justify-center">
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="pr-1">
                  <header className="space-y-2 text-center md:text-left">
                    <h1 className="font-heading text-[2.2rem] sm:text-4xl lg:text-[2.9rem] font-bold leading-[1.05] tracking-tight text-white">
                      <span className="block">{heroData.mainHeading}</span>
                      <span className="bg-gradient-to-r from-clay via-cream to-clay bg-clip-text text-transparent">{heroData.highlightText}</span>
                    </h1>
                    <p className="max-w-2xl mx-auto md:mx-0 text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed line-clamp-none md:line-clamp-2 [text-wrap:balance]">
                      {heroData.description}
                    </p>
                  </header>
                  {/* Features two columns (left aligned) */}
                  <div className="mt-6 mb-2 flex flex-col sm:flex-row gap-6 md:gap-10 lg:gap-12 justify-start md:justify-center md:mx-auto w-full max-w-2xl">
                    <div className="flex flex-col gap-3 min-w-[200px] items-start">
                      {heroData.features.slice(0,2).map((feature: any, index: number) => (
                        <div key={index} className="flex items-start gap-5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay/90 text-cream ring-1 ring-white/25 flex-shrink-0">
                            {iconComponents[feature.icon as keyof typeof iconComponents]}
                          </span>
                          <span className="text-[12px] sm:text-[13px] text-white/90 leading-snug max-w-[14rem] text-left">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 min-w-[200px] items-start">
                      {heroData.features.slice(2,4).map((feature: any, index: number) => (
                        <div key={index} className="flex items-start gap-5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay/90 text-cream ring-1 ring-white/25 flex-shrink-0">
                            {iconComponents[feature.icon as keyof typeof iconComponents]}
                          </span>
                          <span className="text-[12px] sm:text-[13px] text-white/90 leading-snug max-w-[14rem] text-left">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Mobile quote (reintroduced) */}
                  <blockquote className="hidden mt-5 md:hidden mx-auto max-w-md text-white/85">
                    <p className="font-heading text-sm sm:text-base leading-snug italic">“{heroData.quote.text}”</p>
                    <footer className="mt-1 text-[11px] text-sand/70">— {heroData.quote.author}</footer>
                  </blockquote>
                </div>
                <div className="mt-6 flex flex-col xs:flex-row flex-wrap gap-3 md:gap-3 justify-start">
                  {heroData.ctaButtons.primaryButton.external ? (
                    <a
                      href={heroData.ctaButtons.primaryButton.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm sm:text-sm md:px-9 md:py-4 md:text-base font-semibold text-cream shadow-md ring-1 ring-clay/60 hover:shadow-lg transition-all w-full xs:w-auto"
                    >
                      <span className="tracking-wide">{heroData.ctaButtons.primaryButton.text}</span>
                    </a>
                  ) : (
                    <Link
                      href={heroData.ctaButtons.primaryButton.url}
                      className="group inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm sm:text-sm md:px-9 md:py-4 md:text-base font-semibold text-cream shadow-md ring-1 ring-clay/60 hover:shadow-lg transition-all w-full xs:w-auto"
                    >
                      <span className="tracking-wide">{heroData.ctaButtons.primaryButton.text}</span>
                    </Link>
                  )}
                  {heroData.ctaButtons.secondaryButton.external ? (
                    <a
                      href={heroData.ctaButtons.secondaryButton.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center rounded-full border border-white/35 bg-white/15 px-7 py-3.5 text-sm md:px-8 md:py-4 md:text-base font-medium text-cream backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all w-full xs:w-auto"
                    >
                      {heroData.ctaButtons.secondaryButton.text}
                    </a>
                  ) : (
                    <Link
                      href={heroData.ctaButtons.secondaryButton.url}
                      className="group inline-flex items-center justify-center rounded-full border border-white/35 bg-white/15 px-7 py-3.5 text-sm md:px-8 md:py-4 md:text-base font-medium text-cream backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all w-full xs:w-auto"
                    >
                      {heroData.ctaButtons.secondaryButton.text}
                    </Link>
                  )}
                </div>
              </div>
              {/* Right Column Quote (hidden on mobile) */}
              <div className="lg:col-span-5 h-full hidden md:flex">
                <div className="relative backdrop-blur-md bg-charcoal/35 ring-1 ring-white/15 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.55)] w-full flex flex-col justify-between">
                  <blockquote className="space-y-3">
                    <p className="font-heading text-lg sm:text-xl lg:text-2xl font-semibold text-white/95 leading-snug line-clamp-4">
                      “{heroData.quote.text}”
                    </p>
                    <footer className="text-[11px] sm:text-xs md:text-sm text-sand/80 tracking-wide uppercase">— {heroData.quote.author}</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORIGINAL (centerLow / left) Layouts */}
      {layout !== 'split' && (
        <div className="absolute inset-x-0 bottom-0 md:inset-x-0 md:bottom-0 md:top-auto h-auto md:h-[50%] min-h-[340px] z-10 flex items-end md:items-stretch py-6 md:py-0">
          <div className={[
            'w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 flex',
            layout === 'centerLow' ? 'justify-center' : 'items-end'
          ].join(' ')}>
            <div className={[
              layout === 'centerLow'
                ? 'mx-auto text-center max-w-4xl'
                : 'max-w-xl md:max-w-lg lg:max-w-xl'
            ].join(' ')}>
              <div className="relative p-4 sm:p-5 md:p-6 lg:p-7 rounded-2xl backdrop-blur-md bg-charcoal/45 ring-1 ring-white/10 space-y-3 h-full">
                <header className="space-y-2 text-left sm:text-center">
                  <h1 className="font-heading text-3xl sm:text-[2.3rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white/95">
                    <span className="block">{heroData.mainHeading}</span>
                    <span className="bg-gradient-to-r from-clay via-cream to-clay bg-clip-text text-transparent">{heroData.highlightText}</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-[17px] text-white/90 leading-relaxed line-clamp-none md:line-clamp-2 [text-wrap:balance]">
                    {heroData.description}
                  </p>
                </header>
                {/* Mobile quote - positioned below header */}
                <blockquote className="block sm:hidden mt-4 border-l-2 border-clay/60 pl-3 text-left">
                  <p className="font-heading text-sm italic text-white/85 line-clamp-2">"{heroData.quote.text}"</p>
                  <footer className="mt-1 text-[11px] text-sand/80">— {heroData.quote.author}</footer>
                </blockquote>
                <div className="hidden sm:flex mt-5 mb-2 flex-col sm:flex-row gap-6 md:gap-10 lg:gap-12 justify-start md:justify-center md:mx-auto w-full max-w-2xl">
                  <div className="flex flex-col gap-3 min-w-[200px] items-start">
                    {heroData.features.slice(0,2).map((feature: any, index: number) => (
                      <div key={index} className="flex items-start gap-5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-clay/85 text-cream ring-1 ring-white/20 flex-shrink-0">
                          {iconComponents[feature.icon as keyof typeof iconComponents]}
                        </span>
                        <span className="text-[11px] sm:text-xs md:text-[13px] text-white/85 leading-snug max-w-[13rem] text-left">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 min-w-[200px] items-start">
                    {heroData.features.slice(2,4).map((feature: any, index: number) => (
                      <div key={index} className="flex items-start gap-5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-clay/85 text-cream ring-1 ring-white/20 flex-shrink-0">
                          {iconComponents[feature.icon as keyof typeof iconComponents]}
                        </span>
                        <span className="text-[11px] sm:text-xs md:text-[13px] text-white/85 leading-snug max-w-[13rem] text-left">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <blockquote className="hidden sm:block border-l-2 border-clay/60 pl-3 text-left">
                  <p className="font-heading text-sm sm:text-base md:text-[17px] italic text-white/85 line-clamp-2">“{heroData.quote.text}”</p>
                  <footer className="mt-1 text-[11px] sm:text-xs md:text-[13px] text-sand/80">— {heroData.quote.author}</footer>
                </blockquote>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {heroData.ctaButtons.primaryButton.external ? (
                    <a
                      href={heroData.ctaButtons.primaryButton.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm sm:text-sm md:px-9 md:py-4 md:text-base font-semibold text-cream shadow-md ring-1 ring-clay/60 hover:shadow-lg transition-all w-full sm:w-auto"
                    >
                      <span className="tracking-wide">{heroData.ctaButtons.primaryButton.text}</span>
                    </a>
                  ) : (
                    <Link
                      href={heroData.ctaButtons.primaryButton.url}
                      className="group inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm sm:text-sm md:px-9 md:py-4 md:text-base font-semibold text-cream shadow-md ring-1 ring-clay/60 hover:shadow-lg transition-all w-full sm:w-auto"
                    >
                      <span className="tracking-wide">{heroData.ctaButtons.primaryButton.text}</span>
                    </Link>
                  )}
                  {heroData.ctaButtons.secondaryButton.external ? (
                    <a
                      href={heroData.ctaButtons.secondaryButton.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center rounded-full border border-white/35 bg-white/15 px-7 py-3.5 text-sm md:px-8 md:py-4 md:text-base font-medium text-cream backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all w-full sm:w-auto"
                    >
                      {heroData.ctaButtons.secondaryButton.text}
                    </a>
                  ) : (
                    <Link
                      href={heroData.ctaButtons.secondaryButton.url}
                      className="group inline-flex items-center justify-center rounded-full border border-white/35 bg-white/15 px-7 py-3.5 text-sm md:px-8 md:py-4 md:text-base font-medium text-cream backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all w-full sm:w-auto"
                    >
                      {heroData.ctaButtons.secondaryButton.text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Desktop object-position tweak to push image lower */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .hero-bg-img { object-position: 50% 60% !important; }
        }
        /* Subtle gradient to improve text legibility in bottom band without covering faces above */
        section > .hero-bottom-gradient:after {content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(12,12,12,0.78),rgba(18,18,18,0.55) 35%,rgba(24,24,24,0.25) 65%,rgba(32,32,32,0));pointer-events:none;}
      `}</style>
    </section>
  )
  }