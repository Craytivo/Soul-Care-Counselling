import { Globe2, GraduationCap, LockKeyhole, MapPin, ShieldCheck } from 'lucide-react'
import type { HomePage } from '@/lib/sanity'

interface HeroContentProps {
  homePageData: HomePage | null
}

const iconComponents = {
  lock: LockKeyhole,
  mapPin: MapPin,
  globe: Globe2,
  graduationCap: GraduationCap,
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
    <section className="bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10" aria-label="What to expect">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = iconComponents[feature.icon] ?? ShieldCheck

          return (
            <div
              key={`${feature.icon}-${feature.text}`}
              className="flex items-center gap-3 border-l-2 border-clay/70 py-2 pl-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-bark">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium leading-snug text-charcoal/85">
                {feature.text}
              </span>
            </div>
          )
        })}
      </div>
      {heroData.quote?.text && (
        <blockquote className="mx-auto mt-8 max-w-3xl text-center">
          <p className="mx-auto font-serif text-base italic leading-relaxed text-bark/80 sm:text-lg">
            &ldquo;{heroData.quote.text}&rdquo;
          </p>
          {heroData.quote.author && (
            <footer className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-bark/60">
              {heroData.quote.author}
            </footer>
          )}
        </blockquote>
      )}
    </section>
  )
}
