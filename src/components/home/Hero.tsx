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

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10 pt-24 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-8">
          <div className="max-w-lg">
            <h1 className="text-balance font-heading text-2xl font-bold leading-[1.08] text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
              <span className="block">{heroData.mainHeading}</span>
              <span className="mt-0.5 block text-clay drop-shadow-md">
                {heroData.highlightText}
              </span>
            </h1>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <HeroButtonLink button={heroData.ctaButtons.primaryButton} variant="primary" />
              <HeroButtonLink button={heroData.ctaButtons.secondaryButton} variant="secondary" />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-2 sm:gap-3">
            <div className="grid gap-2 sm:grid-cols-2 lg:gap-2.5">
              {features.map((feature) => {
                const Icon = iconComponents[feature.icon] ?? ShieldCheck

                return (
                  <div
                    key={`${feature.icon}-${feature.text}`}
                    className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/15 px-3 py-2 shadow-lg backdrop-blur-lg sm:px-3.5 sm:py-2.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-clay to-bark text-cream shadow-md ring-1 ring-white/30 sm:h-8 sm:w-8">
                      <Icon className="h-[14px] w-[14px] sm:h-[16px] sm:w-[16px]" />
                    </span>
                    <span className="text-[11px] font-medium leading-tight tracking-wide text-white/90 sm:text-xs">
                      {feature.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
