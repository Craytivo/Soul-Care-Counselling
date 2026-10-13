import Link from 'next/link'
import { ArrowRight, Globe2, GraduationCap, LockKeyhole, MapPin, ShieldCheck } from 'lucide-react'
import type { HomePage } from '@/lib/sanity'

interface HeroContentProps {
  homePageData: HomePage | null
}

type HeroButton = {
  text: string
  url: string
  external: boolean
}

const iconComponents = {
  lock: LockKeyhole,
  mapPin: MapPin,
  globe: Globe2,
  graduationCap: GraduationCap,
}

function HeroButtonLink({
  button,
  variant,
}: {
  button: HeroButton
  variant: 'primary' | 'secondary'
}) {
  const className =
    variant === 'primary'
      ? 'group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-clay px-5 py-3 text-sm font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-cream/70 focus:ring-offset-2 focus:ring-offset-charcoal sm:w-auto'
      : 'inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cream/70 focus:ring-offset-2 focus:ring-offset-charcoal sm:w-auto'

  const content = (
    <>
      {button.text}
      {variant === 'primary' && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  )

  if (button.external) {
    return (
      <a href={button.url} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return (
    <Link href={button.url} className={className}>
      {content}
    </Link>
  )
}

export default function HeroContent({ homePageData }: HeroContentProps) {
  if (!homePageData?.hero) {
    return null
  }

  const heroData = homePageData.hero
  const features = [...(heroData.features ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 4)

  return (
    <section className="bg-charcoal py-10 text-white sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <h1 className="text-balance font-heading text-2xl font-bold leading-[1.08] text-white sm:text-3xl lg:text-4xl">
              <span className="block">{heroData.mainHeading}</span>
              <span className="mt-1 block text-clay">{heroData.highlightText}</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-cream/90 sm:text-base sm:leading-7">
              {heroData.description}
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <HeroButtonLink button={heroData.ctaButtons.primaryButton} variant="primary" />
              <HeroButtonLink button={heroData.ctaButtons.secondaryButton} variant="secondary" />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-3 sm:gap-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:gap-3">
              {features.map((feature) => {
                const Icon = iconComponents[feature.icon] ?? ShieldCheck

                return (
                  <div
                    key={`${feature.icon}-${feature.text}`}
                    className="flex items-center gap-2.5 rounded-lg border border-white/20 bg-white/15 px-3 py-2 backdrop-blur-lg sm:rounded-xl sm:px-4 sm:py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-clay to-bark text-cream ring-1 ring-white/30 sm:h-9 sm:w-9 sm:rounded-xl">
                      <Icon className="h-[14px] w-[14px] sm:h-[18px] sm:w-[18px]" />
                    </span>
                    <span className="text-[11px] font-medium leading-tight tracking-wide text-white/90 sm:text-xs sm:leading-snug">
                      {feature.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {heroData.quote?.text && (
              <blockquote className="border-l-2 border-clay/80 pl-3 sm:pl-4">
                <p className="font-serif text-xs italic leading-5 text-white/95 sm:text-sm sm:leading-6">
                  &ldquo;{heroData.quote.text}&rdquo;
                </p>
                {heroData.quote.author && (
                  <footer className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sand/90 sm:text-xs">
                    {heroData.quote.author}
                  </footer>
                )}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
