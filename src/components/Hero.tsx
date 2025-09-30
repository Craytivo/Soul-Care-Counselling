import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import type { HomePage } from '@/lib/sanity'

interface HeroProps {
  homePageData: HomePage | null
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

export default function Hero({ homePageData }: HeroProps) {
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

  return (
    <section className="relative h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Background Image */}
      {backgroundImageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            className="object-cover w-full h-full"
            priority
            sizes="100vw"
          />
          {/* Clean overlay for text readability */}
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full py-8 sm:py-12 md:py-0">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full text-center">
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-6">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-in fade-in duration-700 delay-300">
                {heroData.mainHeading}{' '}
                <span className="text-clay">{heroData.highlightText}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-cream/90 max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-700 delay-500">
                {heroData.description}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 md:space-y-4 text-cream/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto animate-in slide-in-from-bottom duration-700 delay-700">
              {heroData.features.map((feature: any, index: number) => (
                <li key={index} className="flex items-start justify-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-clay text-cream shadow-md mt-0.5 flex-shrink-0">
                    {iconComponents[feature.icon as keyof typeof iconComponents]}
                  </span>
                  <span className="text-left">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <blockquote className="border-l-4 border-clay pl-4 md:pl-6 text-cream/90 max-w-2xl mx-auto text-left animate-in fade-in duration-700 delay-900">
              <p className="font-heading text-base sm:text-lg md:text-xl italic">
                &ldquo;{heroData.quote.text}&rdquo;
              </p>
              <div className="mt-2 text-xs sm:text-sm md:text-base text-sand">
                — {heroData.quote.author}
              </div>
            </blockquote>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 md:pt-6 justify-center animate-in slide-in-from-bottom duration-700 delay-1000">
                {heroData.ctaButtons.primaryButton.external ? (
                  <a 
                    href={heroData.ctaButtons.primaryButton.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center rounded-lg bg-clay px-8 py-4 font-semibold text-cream shadow-lg transition-all duration-200 hover:bg-clay/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 text-lg min-w-[200px]"
                  >
                    <span className="tracking-wide">{heroData.ctaButtons.primaryButton.text}</span>
                  </a>
                ) : (
                  <Link 
                    href={heroData.ctaButtons.primaryButton.url}
                    className="group inline-flex items-center justify-center rounded-lg bg-clay px-8 py-4 font-semibold text-cream shadow-lg transition-all duration-200 hover:bg-clay/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 text-lg min-w-[200px]"
                  >
                    <span className="tracking-wide">{heroData.ctaButtons.primaryButton.text}</span>
                  </Link>
                )}
                {heroData.ctaButtons.secondaryButton.external ? (
                  <a 
                    href={heroData.ctaButtons.secondaryButton.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center rounded-lg border-2 border-cream/80 px-8 py-4 font-semibold text-cream backdrop-blur-sm transition-all duration-200 hover:bg-cream/10 hover:border-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 text-lg min-w-[200px]"
                  >
                    <span className="tracking-wide">{heroData.ctaButtons.secondaryButton.text}</span>
                  </a>
                ) : (
                  <Link 
                    href={heroData.ctaButtons.secondaryButton.url}
                    className="group inline-flex items-center justify-center rounded-lg border-2 border-cream/80 px-8 py-4 font-semibold text-cream backdrop-blur-sm transition-all duration-200 hover:bg-cream/10 hover:border-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 text-lg min-w-[200px]"
                  >
                    <span className="tracking-wide">{heroData.ctaButtons.secondaryButton.text}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }