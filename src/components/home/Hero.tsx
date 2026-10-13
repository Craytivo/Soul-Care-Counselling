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
    : 'center center'
  const imageMetadata = heroData.backgroundImage as { asset?: { _ref: string } }
  const imageRef = imageMetadata?.asset?._ref
  const imageDimensions = imageRef
    ? {
        width: parseInt(imageRef.split('-')[2], 10),
        height: parseInt(imageRef.split('-')[3], 10),
      }
    : null
  const aspectRatio = imageDimensions ? imageDimensions.width / imageDimensions.height : 16 / 9

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-charcoal"
      style={{
        height: aspectRatio ? `${100 / aspectRatio}vw` : '60vh',
        minHeight: '40vh',
        maxHeight: '80vh',
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
          style={{ objectPosition }}
        />
      )}
    </section>
  )
}
