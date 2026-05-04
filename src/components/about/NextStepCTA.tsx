import Link from 'next/link'

interface NextStepCTAProps {
  joinTeamTitle?: string
  joinTeamDescription?: string
}

export default function NextStepCTA({
  joinTeamTitle = 'Ready to Take the Next Step?',
  joinTeamDescription = 'Whether you\'re seeking therapy, exploring an internship, or have questions about our services, we\'re here to support you.'
}: NextStepCTAProps) {
  return (
    <section className="mb-0">
      {/* Decorative top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-clay/40 to-transparent mb-16 md:mb-20" />

      {/* Main CTA Container */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Background with subtle gradient and patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/40 via-cream/20 to-clay/10 opacity-60" />
        
        {/* Decorative geometric elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-clay/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-sand/8 to-transparent rounded-full blur-3xl" />
        
        {/* Grid background pattern */}
        <div className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(0deg,transparent_24%,rgba(196,154,108,.05)_25%,rgba(196,154,108,.05)_26%,transparent_27%,transparent_74%,rgba(196,154,108,.05)_75%,rgba(196,154,108,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(196,154,108,.05)_25%,rgba(196,154,108,.05)_26%,transparent_27%,transparent_74%,rgba(196,154,108,.05)_75%,rgba(196,154,108,.05)_76%,transparent_77%,transparent)] [background-size:50px_50px]" />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            
            {/* Section heading with icon */}
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-clay to-clay/70 shadow-elevation-2">
                  <svg className="w-6 h-6 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-bark leading-tight">
                  {joinTeamTitle}
                </h2>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="h-1 w-16 bg-gradient-to-r from-clay to-clay/0 rounded-full mb-8" />

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed text-charcoal/85 mb-12 max-w-2xl">
              {joinTeamDescription}
            </p>

            {/* Three-column action grid */}
            <div className="grid gap-5 md:gap-6 md:grid-cols-3">
              
              {/* Action 1: Book Therapy */}
              <div className="group rounded-2xl border border-charcoal/10 bg-white/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-clay/30 hover:shadow-elevation-2 hover:bg-white/80 hover:-translate-y-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-clay/10 ring-1 ring-clay/30 mb-4">
                  <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-bark mb-2">Begin Therapy</h3>
                <p className="text-sm text-charcoal/70 mb-4 leading-relaxed">
                  Schedule your first session and start your healing journey.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-clay font-semibold text-sm hover:text-bark transition-colors group-hover:gap-1 gap-0"
                >
                  Book now
                  <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Action 2: Clinical Internship */}
              <div className="group rounded-2xl border border-charcoal/10 bg-white/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-clay/30 hover:shadow-elevation-2 hover:bg-white/80 hover:-translate-y-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-clay/10 ring-1 ring-clay/30 mb-4">
                  <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C6.5 6.253 3 9.756 3 12.253v13m0 0c5.5 0 9 3.503 9 6.256V19.253m0-13c5.5 0 9 3.756 9 9v4m0-4v6m0 0c-5.5 2.753-9 6.256-9 6.256" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-bark mb-2">Become an Intern</h3>
                <p className="text-sm text-charcoal/70 mb-4 leading-relaxed">
                  Join our team as a clinical intern and gain meaningful experience.
                </p>
                <Link
                  href="/intern-application"
                  className="inline-flex items-center text-clay font-semibold text-sm hover:text-bark transition-colors group-hover:gap-1 gap-0"
                >
                  Apply today
                  <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Action 3: Get in Touch */}
              <div className="group rounded-2xl border border-charcoal/10 bg-white/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-clay/30 hover:shadow-elevation-2 hover:bg-white/80 hover:-translate-y-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-clay/10 ring-1 ring-clay/30 mb-4">
                  <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-bark mb-2">Ask a Question</h3>
                <p className="text-sm text-charcoal/70 mb-4 leading-relaxed">
                  Have questions? Our team is here to help and support you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-clay font-semibold text-sm hover:text-bark transition-colors group-hover:gap-1 gap-0"
                >
                  Contact us
                  <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Trust message */}
            <div className="mt-12 pt-10 border-t border-charcoal/10">
              <p className="text-center text-sm font-medium text-charcoal/60 tracking-wide">
                💙 Every step matters. We&apos;re here to meet you with compassion and expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
