import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe2, GraduationCap, LockKeyhole, MapPin, ShieldCheck } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import type { HomePage } from '@/lib/sanity'

interface HeroProps {
  homePageData: HomePage | null
  variant?: 'elevated' | 'legacy'
  layout?: 'left' | 'centerLow' | 'split'
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

export default function Hero({ homePageData }: HeroProps) {
  if (!homePageData?.hero) {
    return (
      <section className="relative flex min-h-[70svh] items-center justify-center bg-gradient-to-br from-sand to-cream px-5 text-center">
        <div className="text-bark/70">
          <p className="text-lg font-semibold">Please create homepage content in Sanity Studio</p>
          <p className="mt-2 text-sm">
            Visit{' '}
            <Link href="/studio" className="text-bark underline underline-offset-4">
              Sanity Studio
            </Link>{' '}
            to add homepage content
          </p>
        </div>
      </section>
    )
  }

  const heroData = homePageData.hero
  const backgroundImageSrc = heroData.backgroundImage
    ? urlFor(heroData.backgroundImage).quality(92).url()
    : null
  const backgroundImageAlt = heroData.backgroundImage?.alt || 'Soul Care Counselling team'
  const hotspot = (heroData.backgroundImage as { hotspot?: { x: number; y: number } })?.hotspot
  const objectPosition = hotspot
    ? `${(hotspot.x * 100).toFixed(2)}% ${(hotspot.y * 100).toFixed(2)}%`
    : 'center 30%'
  const imageMetadata = heroData.backgroundImage as { asset?: { _ref: string } }
  const imageRef = imageMetadata?.asset?._ref
  const imageDimensions = imageRef
    ? {
        width: parseInt(imageRef.split('-')[2], 10),
        height: parseInt(imageRef.split('-')[3], 10),
      }
    : null
  const aspectRatio = imageDimensions ? imageDimensions.width / imageDimensions.height : 16 / 9
  const features = [...(heroData.features ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 4)

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-charcoal text-white"
      style={{
        height: aspectRatio ? `${100 / aspectRatio}vw` : '86svh',
        minHeight: '60vh',
        maxHeight: '100vh',
      }}
    >
      {backgroundImageSrc && (
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-contain md:object-cover"
          style={{ objectPosition }}
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,32,27,0.02)_0%,rgba(35,32,27,0.15)_40%,rgba(35,32,27,0.80)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,32,27,0.70)_0%,rgba(35,32,27,0.25)_30%,rgba(35,32,27,0.25)_70%,rgba(35,32,27,0.70)_100%)]" />
      <div className="via-charcoal/18 absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/60 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 pt-24 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28">
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <h1 className="text-balance font-heading text-3xl font-bold leading-[1.06] text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
              <span className="block">{heroData.mainHeading}</span>
              <span className="mt-1 block text-clay drop-shadow-md">{heroData.highlightText}</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-cream/90 sm:text-base">
              {heroData.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <HeroButtonLink button={heroData.ctaButtons.primaryButton} variant="primary" />
              <HeroButtonLink button={heroData.ctaButtons.secondaryButton} variant="secondary" />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 sm:gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/95 shadow-lg backdrop-blur-lg">
              <ShieldCheck className="h-3.5 w-3.5" />
              Virtual counselling across Canada
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
              {features.map((feature) => {
                const Icon = iconComponents[feature.icon] ?? ShieldCheck

                return (
                  <div
                    key={`${feature.icon}-${feature.text}`}
                    className="sm:px-4.5 flex items-center gap-3 rounded-xl border border-white/20 bg-white/15 px-4 py-3 shadow-lg backdrop-blur-lg sm:py-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-clay to-bark text-cream shadow-md ring-1 ring-white/30 sm:h-10 sm:w-10">
                      <Icon className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
                    </span>
                    <span className="text-xs font-medium leading-snug tracking-wide text-white/90 sm:text-sm">
                      {feature.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {heroData.quote?.text && (
              <blockquote className="border-l-2 border-clay/80 pl-4 text-[#FFFFFF] sm:pl-5">
                <p className="font-serif text-xs italic leading-5 text-[#FFFFFF]/95 sm:text-sm sm:leading-6">
                  &ldquo;{heroData.quote.text}&rdquo;
                </p>
                {heroData.quote.author && (
                  <footer className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sand/90 sm:text-xs">
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
