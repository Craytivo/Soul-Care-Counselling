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
    ? urlFor(heroData.backgroundImage).width(2200).height(1400).quality(92).url()
    : null
  const backgroundImageAlt = heroData.backgroundImage?.alt || 'Soul Care Counselling team'
  const hotspot = (heroData.backgroundImage as { hotspot?: { x: number; y: number } })?.hotspot
  const objectPosition = hotspot
    ? `${(hotspot.x * 100).toFixed(2)}% ${(hotspot.y * 100).toFixed(2)}%`
    : '50% 42%'
  const features = [...(heroData.features ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 4)

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[86svh] w-screen overflow-hidden bg-charcoal text-white sm:min-h-[82svh] lg:min-h-[min(860px,92vh)]">
      {backgroundImageSrc && (
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,32,27,0.12)_0%,rgba(35,32,27,0.42)_42%,rgba(35,32,27,0.88)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,32,27,0.86)_0%,rgba(35,32,27,0.62)_42%,rgba(35,32,27,0.20)_100%)] opacity-80" />
      <div className="via-charcoal/18 absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/55 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[86svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-24 sm:min-h-[82svh] sm:px-8 sm:pb-24 lg:min-h-[min(860px,92vh)] lg:px-10 lg:pb-28">
        <div className="max-w-3xl">
          <div className="border-white/18 bg-white/12 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5" />
            Virtual counselling across Canada
          </div>

          <h1 className="mt-5 text-balance font-heading text-4xl font-bold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            <span className="block">{heroData.mainHeading}</span>
            <span className="mt-1 block text-clay">{heroData.highlightText}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-cream sm:text-lg">
            {heroData.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <HeroButtonLink button={heroData.ctaButtons.primaryButton} variant="primary" />
            <HeroButtonLink button={heroData.ctaButtons.secondaryButton} variant="secondary" />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconComponents[feature.icon] ?? ShieldCheck

            return (
              <div
                key={`${feature.icon}-${feature.text}`}
                className="border-white/14 flex items-center gap-3 rounded-xl border bg-white/10 px-3.5 py-3 backdrop-blur-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-clay/90 text-cream ring-1 ring-white/20">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="text-white/88 text-sm font-medium leading-snug">
                  {feature.text}
                </span>
              </div>
            )
          })}
        </div>

        {heroData.quote?.text && (
          <blockquote className="mt-5 max-w-2xl border-l border-clay/70 pl-4 text-[#FFFFFF]">
            <p className="font-serif text-sm italic leading-6 text-[#FFFFFF] sm:text-base">
              &ldquo;{heroData.quote.text}&rdquo;
            </p>
            {heroData.quote.author && (
              <footer className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-sand/80">
                {heroData.quote.author}
              </footer>
            )}
          </blockquote>
        )}
      </div>
    </section>
  )
}
