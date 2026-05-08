'use client'

// CTA component for booking consultations
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
      className={`mt-16 rounded-2xl p-6 ring-1 shadow-elevation-2 md:p-8 ${isDark ? 'text-cream ring-cream/20 glass-dark' : 'text-charcoal ring-charcoal/10 glass'} ${className}`}
    >
      <div className="grid gap-6 md:grid-cols-3 md:items-center">
        <div className="md:col-span-2">
          <h3 className="font-heading text-xl font-semibold md:text-2xl">{title}</h3>
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
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold ring-1 transition-all duration-200 shadow-elevation-1 hover:scale-[1.02] hover:shadow-elevation-2 ${
              isDark
                ? 'bg-clay text-charcoal ring-clay hover:bg-clay/90'
                : 'bg-clay text-cream ring-clay/50 hover:bg-clay/90'
            }`}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  )
}
