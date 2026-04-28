'use client'

import { trackConsultationClick } from '@/lib/tracking'

interface ConsultationCtaProps {
  title: string
  description: string
  buttonText?: string
  bookingUrl?: string
  variant?: 'sand' | 'bark'
  className?: string
  trackingLocation: string
}

export default function ConsultationCta({
  title,
  description,
  buttonText = 'Book a Free Consultation',
  bookingUrl = 'https://thesoulcarecounsellor.janeapp.com',
  variant = 'sand',
  className = '',
  trackingLocation,
}: ConsultationCtaProps) {
  const isDark = variant === 'bark'

  return (
    <section
      className={`mt-16 rounded-2xl p-6 md:p-8 ring-1 ${isDark ? 'bg-bark text-cream ring-cream/15' : 'bg-sand text-charcoal ring-charcoal/10'} ${className}`}
    >
      <div className="grid gap-6 md:grid-cols-3 md:items-center">
        <div className="md:col-span-2">
          <h3 className="font-heading text-xl md:text-2xl font-semibold">{title}</h3>
          <p className={`mt-2 ${isDark ? 'text-cream/85' : 'text-charcoal/80'}`}>{description}</p>
        </div>
        <div className="md:justify-self-end">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConsultationClick({
                location: trackingLocation,
                label: buttonText,
                url: bookingUrl,
              })
            }
            className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 font-semibold ring-1 transition-colors ${
              isDark
                ? 'bg-clay text-charcoal ring-charcoal/10 hover:bg-clay/90'
                : 'bg-clay text-charcoal ring-charcoal/10 hover:bg-clay/90'
            }`}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  )
}
