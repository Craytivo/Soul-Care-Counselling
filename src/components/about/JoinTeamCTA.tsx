import Link from 'next/link'

interface JoinTeamCTAProps {
  title?: string
  description?: string
}

export default function JoinTeamCTA({
  title = 'Join Our Team',
  description = 'We\'re looking for passionate graduate students and emerging therapists to join us as clinical interns. Gain meaningful experience in faith-centered, culturally responsive counselling.'
}: JoinTeamCTAProps) {
  return (
    <section className="mb-16 md:mb-20">
      <div className="rounded-3xl bg-gradient-to-br from-sand/60 via-sand/40 to-sand/30 ring-1 ring-charcoal/6 overflow-hidden">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-2 items-center p-8 md:p-12 lg:p-14">
          
          {/* LEFT: Content */}
          <div className="space-y-6">
            {/* Icon with background */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-clay/15 ring-1 ring-clay/30">
              <svg className="w-7 h-7 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.58l-.001-.031m10.364-4.669a12 12 0 01-4.4 0m-4.4 0a12 12 0 01-4.4 0m8.8 0a3 3 0 11-4.4 0m4.4 0a3 3 0 10-4.4 0m-8.8 0a3 3 0 11-4.4 0m4.4 0a3 3 0 10-4.4 0" />
              </svg>
            </div>

            {/* Heading */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-bark leading-tight">
                {title}
              </h2>
            </div>

            {/* Divider */}
            <div className="h-px w-12 bg-gradient-to-r from-clay/80 to-clay/0" />

            {/* Description */}
            <p className="text-lg leading-relaxed text-charcoal/85 max-w-xl">
              {description}
            </p>

            {/* Key benefits - subtle accent list */}
            <ul className="space-y-2.5 pt-2">
              {[
                'Mentorship from licensed clinicians',
                'Real-world experience in therapy',
                'Faith-centered, culturally responsive training'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-charcoal/80">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-clay flex-shrink-0" />
                  <span className="text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: CTA Buttons */}
          <div className="space-y-3 lg:flex lg:flex-col">
            <Link
              href="/intern-application"
              className="group relative overflow-hidden rounded-xl bg-clay px-7 py-4 font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition-all hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2 text-center"
            >
              <span className="relative flex items-center justify-center gap-2">
                Apply to be an Intern
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-charcoal/15 bg-white/60 px-7 py-4 font-semibold text-charcoal/75 ring-1 ring-charcoal/10 transition-all hover:border-charcoal/25 hover:bg-white/80 hover:ring-charcoal/15 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2 text-center backdrop-blur-sm"
            >
              Ask Us a Question
            </Link>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-clay/30 to-transparent" />
      </div>
    </section>
  )
}
