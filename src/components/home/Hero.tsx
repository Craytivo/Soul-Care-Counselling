import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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

function HeroButtonLink({
  button,
  variant,
}: {
  button: HeroButton
  variant: 'primary' | 'secondary'
}) {
  const className =
    variant === 'primary'
      ? 'group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-clay px-5 py-3 text-sm font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-bark/50 focus:ring-offset-2 focus:ring-offset-cream sm:w-auto'
      : 'inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-bark/25 bg-transparent px-5 py-3 text-sm font-semibold text-bark transition hover:border-bark/50 hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-bark/50 focus:ring-offset-2 focus:ring-offset-cream sm:w-auto'

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
  const imageMetadata = heroData.backgroundImage as { asset?: { _ref: string } }
  const imageRef = imageMetadata?.asset?._ref
  // Sanity image references use the format image-<id>-<width>x<height>-<format>.
  const dimensionMatch = imageRef?.match(/-(\d+)x(\d+)-/)
  const imageDimensions = dimensionMatch
    ? { width: Number(dimensionMatch[1]), height: Number(dimensionMatch[2]) }
    : { width: 1600, height: 1000 }

  return (
    <section
      aria-labelledby="homepage-hero-heading"
      className="w-full bg-cream text-bark"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 py-8 sm:gap-10 sm:px-8 sm:py-12 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-16 xl:gap-16 xl:px-12 xl:py-20">
        <div className="order-1 min-w-0">
          <h1
            id="homepage-hero-heading"
            className="max-w-2xl text-balance font-heading text-3xl font-semibold leading-[1.08] text-bark sm:text-4xl md:text-5xl xl:text-6xl"
          >
            {heroData.mainHeading}{' '}
            <span className="text-clay">{heroData.highlightText}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-bark/80 sm:mt-5 sm:text-lg sm:leading-8">
            {heroData.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
            <HeroButtonLink button={heroData.ctaButtons.primaryButton} variant="primary" />
            <HeroButtonLink button={heroData.ctaButtons.secondaryButton} variant="secondary" />
          </div>
        </div>

        {backgroundImageSrc && (
          <div className="order-2 min-w-0 self-center lg:order-2">
            <Image
              src={backgroundImageSrc}
              alt={backgroundImageAlt}
              width={imageDimensions.width}
              height={imageDimensions.height}
              priority
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="block h-auto w-full rounded-xl object-contain"
            />
          </div>
        )}
      </div>
    </section>
  )
}
