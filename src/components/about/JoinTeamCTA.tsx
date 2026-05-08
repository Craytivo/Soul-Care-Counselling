import Link from 'next/link'

interface JoinTeamCTAProps {
  title?: string
  description?: string
}

export default function JoinTeamCTA({
  title = 'Join Our Team',
  description = "We're looking for passionate graduate students and emerging therapists to join us as clinical interns. Gain meaningful experience in faith-centered, culturally responsive counselling.",
}: JoinTeamCTAProps) {
  return (
    <section className="mb-16 md:mb-20">
      <div className="ring-charcoal/6 overflow-hidden rounded-3xl bg-gradient-to-br from-sand/60 via-sand/40 to-sand/30 ring-1">
        <div className="grid items-center gap-10 p-8 md:gap-14 md:p-12 lg:grid-cols-2 lg:p-14">
          {/* LEFT: Content */}
          <div className="space-y-6">
            {/* Icon with background */}
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-clay/15 ring-1 ring-clay/30">
              <svg
                className="h-7 w-7 text-clay"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.58l-.001-.031m10.364-4.669a12 12 0 01-4.4 0m-4.4 0a12 12 0 01-4.4 0m8.8 0a3 3 0 11-4.4 0m4.4 0a3 3 0 10-4.4 0m-8.8 0a3 3 0 11-4.4 0m4.4 0a3 3 0 10-4.4 0"
                />
              </svg>
            </div>

            {/* Heading */}
            <div>
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-bark md:text-4xl">
                {title}
              </h2>
            </div>

            {/* Divider */}
            <div className="h-px w-12 bg-gradient-to-r from-clay/80 to-clay/0" />

            {/* Description */}
            <p className="max-w-xl text-lg leading-relaxed text-charcoal/85">{description}</p>

            {/* Key benefits - subtle accent list */}
            <ul className="space-y-2.5 pt-2">
              {[
                'Mentorship from licensed clinicians',
                'Real-world experience in therapy',
                'Faith-centered, culturally responsive training',
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-charcoal/80">
                  <span className="inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay" />
                  <span className="text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: CTA Buttons */}
          <div className="space-y-3 lg:flex lg:flex-col">
            <Link
              href="/intern-application"
              className="group relative overflow-hidden rounded-xl bg-clay px-7 py-4 text-center font-semibold text-cream ring-1 ring-clay/40 transition-all shadow-elevation-2 hover:bg-bark hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2"
            >
              <span className="relative flex items-center justify-center gap-2">
                Apply to be an Intern
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-charcoal/15 bg-white/60 px-7 py-4 text-center font-semibold text-charcoal/75 ring-1 ring-charcoal/10 backdrop-blur-sm transition-all hover:border-charcoal/25 hover:bg-white/80 hover:ring-charcoal/15 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2"
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
