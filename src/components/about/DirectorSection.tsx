import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface DirectorSectionProps {
  name: string
  credentials?: string
  badge?: string
  image?: any
  description: string
  quote?: string
  bookingLink?: string
  bookingText?: string
  psychologyTodayImage?: any
  psychologyTodayLink?: string
}

export default function DirectorSection({
  name,
  credentials,
  badge,
  image,
  description,
  quote,
  bookingLink,
  bookingText = 'Book a Free Consultation',
  psychologyTodayImage,
  psychologyTodayLink
}: DirectorSectionProps) {
  // Parse multi-paragraph description
  const paragraphs = description
    .split(/\n{2,}/)
    .filter(Boolean)

  return (
    <section className="mb-16 md:mb-20">
      {/* Section header */}
      <div className="mb-10 md:mb-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1.5 ring-1 ring-charcoal/10 uppercase tracking-[.18em] text-[10px] text-charcoal/70 font-semibold">
          Clinical Director
        </span>
      </div>

      {/* Main layout - Image left, content right */}
      <div className="grid gap-8 md:gap-12 lg:grid-cols-[380px_minmax(0,1fr)] items-start">
        
        {/* LEFT: Image with refined styling */}
        {image && (
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-charcoal/8 bg-sand shadow-elevation-2">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none z-10" />
              
              {/* Image container with aspect ratio */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={urlFor(image).width(500).height(667).quality(95).url()}
                  alt={image.alt || name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </div>

              {/* Credentials badge overlay at bottom */}
              {badge && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent p-5 md:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
                    {badge}
                  </p>
                </div>
              )}
            </div>

            {/* Psychology Today badge below image */}
            {psychologyTodayImage && psychologyTodayLink && (
              <a
                href={psychologyTodayLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-white/70 p-2.5 ring-1 ring-charcoal/10 transition-all hover:ring-charcoal/20 hover:shadow-elevation-2"
                aria-label="Verified on Psychology Today"
              >
                <Image
                  src={urlFor(psychologyTodayImage).url()}
                  alt={psychologyTodayImage.alt || 'Verified on Psychology Today'}
                  width={320}
                  height={110}
                  className="h-9 w-auto"
                />
              </a>
            )}
          </div>
        )}

        {/* RIGHT: Content with refined hierarchy */}
        <div className="space-y-8">
          
          {/* Name and credentials */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-bark leading-tight">
              {name}
            </h2>
            {credentials && (
              <p className="mt-3 text-lg md:text-xl font-semibold text-clay">
                {credentials}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-12 bg-gradient-to-r from-clay/80 to-clay/0" />

          {/* Main content paragraphs */}
          <div className="space-y-5 md:space-y-6">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base md:text-lg leading-relaxed text-charcoal/85"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quote - if present, display it elegantly */}
          {quote && (
            <div className="rounded-xl bg-gradient-to-br from-cream/60 to-sand/40 p-6 md:p-8 ring-1 ring-charcoal/8">
              <svg className="w-5 h-5 text-clay/60 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5m0 19h4c1.25 0 4 0.75 4-4V6c0-1-3-4-4-4" />
              </svg>
              <p className="text-base md:text-lg font-serif italic text-charcoal/80 leading-relaxed">
                {quote}
              </p>
            </div>
          )}

          {/* CTA Button - prominent placement */}
          {bookingLink && (
            <div className="pt-2">
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-lg bg-clay px-7 py-3.5 font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition-all hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2"
              >
                <span>{bookingText}</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
