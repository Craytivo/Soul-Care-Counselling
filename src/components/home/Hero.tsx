import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, MapPin, HeartHandshake, BookOpenCheck } from 'lucide-react'
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

const careHighlights = [
  { text: 'Private & secure telehealth', icon: LockKeyhole },
  { text: 'Virtual care, Canada-wide', icon: MapPin },
  { text: 'Culturally responsive team', icon: HeartHandshake },
  { text: 'Evidence-based, practical care', icon: BookOpenCheck },
]

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
  const imageMetadata = heroData.backgroundImage as { asset?: { _ref: string } }
  const imageRef = imageMetadata?.asset?._ref
  // Sanity image references use the format image-<id>-<width>x<height>-<format>.
  const dimensionMatch = imageRef?.match(/-(\d+)x(\d+)-/)
  const imageDimensions = dimensionMatch
    ? { width: Number(dimensionMatch[1]), height: Number(dimensionMatch[2]) }
    : null

  return (
    <section
      aria-labelledby="homepage-hero-heading"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-charcoal"
    >
      <div
        className="relative w-full overflow-hidden bg-charcoal"
        style={{
          // Match the source image's ratio so object-cover fills the frame without cropping it.
          aspectRatio: imageDimensions
            ? [imageDimensions.width, imageDimensions.height].join(' / ')
            : '16 / 9',
        }}
      >
        {backgroundImageSrc && (
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0 hidden bg-gradient-to-t from-charcoal/95 via-charcoal/75 via-[38%] to-transparent xl:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 pt-7 text-white sm:px-8 sm:pb-10 xl:absolute xl:inset-x-0 xl:bottom-0 xl:px-12 xl:pb-12 xl:pt-24">
        <div className="max-w-3xl">
          <h1
            id="homepage-hero-heading"
            className="text-balance font-heading text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl"
          >
            {heroData.mainHeading} <span className="text-clay">{heroData.highlightText}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/95 sm:mt-4 sm:text-base sm:leading-7">
            {heroData.description}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:gap-3">
            <HeroButtonLink button={heroData.ctaButtons.primaryButton} variant="primary" />
            <HeroButtonLink button={heroData.ctaButtons.secondaryButton} variant="secondary" />
          </div>
        </div>

        <ul
          aria-label="Our care commitments"
          className="mt-6 grid gap-x-5 gap-y-3 border-t border-white/20 pt-5 text-sm text-cream sm:grid-cols-2 xl:mt-7 xl:max-w-3xl xl:gap-y-3"
        >
          {careHighlights.map(({ text, icon: Icon }) => (
            <li key={text} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <blockquote className="mt-6 max-w-2xl border-l-2 border-clay pl-4 text-cream sm:mt-7">
          <p className="font-heading text-base italic leading-6 sm:text-lg">
            “It is the will of the Father that you are well”
          </p>
          <cite className="mt-2 block text-xs not-italic text-cream/75 sm:text-sm">
            Jessica Robinson-Grant
          </cite>
        </blockquote>
      </div>
    </section>
  )
}
