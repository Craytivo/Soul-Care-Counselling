import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import type { HomePage } from '@/lib/sanity'

interface HeroProps {
  homePageData: HomePage | null
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
      ? 'group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-clay px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-bark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto'
      : 'inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/70 bg-charcoal/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto'

  const content = (
    <>
      {button.text}
      {variant === 'primary' && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
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
      <section className="flex min-h-[60svh] items-center justify-center bg-gradient-to-br from-sand to-cream px-5 text-center">
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
    ? urlFor(heroData.backgroundImage).quality(90).url()
    : null
  const backgroundImageAlt = heroData.backgroundImage?.alt || 'Soul Care Counselling'

  return (
    <section
      aria-labelledby="homepage-hero-heading"
      className="relative isolate flex min-h-[650px] w-full items-center overflow-hidden bg-bark text-white sm:min-h-[680px] lg:min-h-[min(740px,calc(100svh-5rem))]"
    >
      {backgroundImageSrc && (
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/25"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/45 via-transparent to-charcoal/10" />

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-sm">
            Soul Care Christian Counselling
          </p>
          <h1
            id="homepage-hero-heading"
            className="max-w-3xl text-balance font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {heroData.mainHeading}{' '}
            <span className="text-[#e7c49a]">{heroData.highlightText}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            {heroData.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <HeroButtonLink button={heroData.ctaButtons.primaryButton} variant="primary" />
            <HeroButtonLink button={heroData.ctaButtons.secondaryButton} variant="secondary" />
          </div>
          <p className="mt-6 text-sm leading-6 text-white/75">
            Faith-centred care. Culturally responsive support. Virtual counselling across Canada.
          </p>
        </div>
      </div>
    </section>
  )
}
