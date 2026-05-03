import Link from 'next/link'

interface ReadyToHealCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  isExternal?: boolean
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export default function ReadyToHealCTA({
  title = 'Ready to Begin Healing?',
  description = 'Take the first step towards a more peaceful, authentic life. Our compassionate team is here to support your journey.',
  buttonText = 'Book Your First Session',
  buttonLink = '/contact',
  isExternal = false,
  secondaryButtonText = 'Learn More',
  secondaryButtonLink = '/areas'
}: ReadyToHealCTAProps) {
  
  const PrimaryButton = isExternal ? 'a' : Link
  const SecondaryButton = Link

  return (
    <section className="mb-0">
      {/* Decorative top gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-clay/40 to-transparent mb-16 md:mb-20" />

      <div className="relative rounded-3xl overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-clay/12 via-sand/8 to-cream opacity-40" />
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-clay/8 to-transparent rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-sand/10 to-transparent rounded-full blur-3xl -ml-36 -mb-36" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 md:px-10 py-16 md:py-20 lg:py-24">
          
          {/* Icon accent above heading */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-clay/10 ring-1 ring-clay/25">
              <svg className="w-6 h-6 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Main heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-bark leading-tight mb-5">
            {title}
          </h2>

          {/* Divider */}
          <div className="flex justify-center mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-clay/0 via-clay to-clay/0 rounded-full" />
          </div>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl leading-relaxed text-charcoal/80">
            {description}
          </p>

          {/* CTA Buttons - stacked on mobile, side-by-side on larger screens */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            {isExternal ? (
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-clay px-8 py-4 font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition-all hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2"
              >
                {buttonText}
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ) : (
              <Link
                href={buttonLink}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-clay px-8 py-4 font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition-all hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2"
              >
                {buttonText}
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
            
            <SecondaryButton
              href={secondaryButtonLink}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-charcoal/15 bg-white/70 px-8 py-4 font-semibold text-charcoal/75 ring-1 ring-charcoal/10 transition-all hover:border-charcoal/25 hover:bg-white/90 hover:ring-charcoal/15 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2 backdrop-blur-sm"
            >
              {secondaryButtonText}
            </SecondaryButton>
          </div>

          {/* Trust statement */}
          <p className="mt-8 text-sm font-medium text-charcoal/60 tracking-wide">
            💙 Your wellbeing is our priority. Every session is confidential and tailored to you.
          </p>
        </div>
      </div>
    </section>
  )
}
