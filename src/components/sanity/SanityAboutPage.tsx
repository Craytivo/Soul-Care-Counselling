import { getAboutPage } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import AboutTeamClient from '@/components/AboutTeamClient'
import DirectorSection from '@/components/about/DirectorSection'
import NextStepCTA from '@/components/about/NextStepCTA'
import { getTeamMembers } from '@/lib/sanity-queries'

export default async function SanityAboutPage() {
  const pageData = await getAboutPage();
  const teamMembers = await getTeamMembers();
  
  if (!pageData) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 md:px-10 xl:px-12">
        <p className="text-charcoal/70">No content available for this page.</p>
      </div>
    );
  }

  const portableTextComponents = {
    block: {
      h3: (props: { children?: React.ReactNode }) => <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-bark mt-8 mb-3">{props.children}</h3>,
      h4: (props: { children?: React.ReactNode }) => <h4 className="font-heading text-lg md:text-xl font-semibold tracking-tight text-bark mt-6 mb-2">{props.children}</h4>,
      normal: (props: { children?: React.ReactNode }) => <p className="mb-4 text-[0.95rem] md:text-[1.01rem] leading-7 text-charcoal/85 max-w-65ch">{props.children}</p>,
    },
    list: {
      bullet: (props: { children?: React.ReactNode }) => <ul className="space-y-2 mb-4">{props.children}</ul>,
      number: (props: { children?: React.ReactNode }) => <ol className="space-y-2 mb-4 list-decimal pl-6">{props.children}</ol>,
    },
    listItem: {
      bullet: (props: { children?: React.ReactNode }) => (
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0 mt-2" />
          <span className="text-charcoal/80 leading-relaxed max-w-65ch">{props.children}</span>
        </li>
      ),
      number: (props: { children?: React.ReactNode }) => <li className="text-charcoal/80 leading-relaxed max-w-65ch">{props.children}</li>,
    },
  };

  return (
    <div className="-mx-4 -my-12 bg-cream">
      {/* HERO SECTION - Full bleed dark background */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-charcoal text-white">
        {/* Background image with overlay */}
        {pageData.hero.backgroundImage && (
          <Image
            src={urlFor(pageData.hero.backgroundImage).width(2200).height(1400).quality(92).url()}
            alt={pageData.hero.backgroundImage.alt || pageData.hero.title}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: '50% 42%' }}
          />
        )}
        {/* Gradient overlays for text contrast */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,32,27,0.12)_0%,rgba(35,32,27,0.42)_42%,rgba(35,32,27,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,32,27,0.86)_0%,rgba(35,32,27,0.62)_42%,rgba(35,32,27,0.20)_100%)] opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/55 via-charcoal/18 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-24 sm:min-h-[72vh] sm:px-8 lg:min-h-[min(820px,90vh)] lg:px-10 lg:pb-28">
          <div className="max-w-3xl">
            {pageData.hero.badge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur-md">
                {pageData.hero.badge}
              </div>
            )}

            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.04] text-white text-balance sm:text-5xl lg:text-6xl">
              {pageData.hero.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-cream sm:text-lg">
              {pageData.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-clay px-5 py-3 text-sm font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition hover:bg-bark hover:shadow-elevation-3 sm:w-auto"
              >
                Book a Consultation
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/20 sm:w-auto"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content container - matches homepage structure */}
      <section className="relative z-20 -mt-14 rounded-t-[2rem] border-t border-white/70 bg-cream shadow-[0_-22px_55px_rgba(35,32,27,0.16)] sm:-mt-16 sm:rounded-t-[2.5rem] lg:-mt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay/35 to-transparent" />
        
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:py-16 xl:px-12">
          {/* OUR STORY / WELCOME SECTION */}
          <section className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block w-2 h-8 rounded bg-clay" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-bark">
                Our Story
              </h2>
            </div>
            <p className="mb-6 text-base md:text-lg leading-relaxed text-charcoal/85 max-w-3xl">
              {pageData.welcome.title}
            </p>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <div className="space-y-4">
                <PortableText value={pageData.welcome.content as import('@portabletext/types').TypedObject[]} components={portableTextComponents} />
              </div>
              {/* CTA Buttons Column */}
              <div className="flex flex-col gap-4 justify-start">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-lg bg-clay px-6 py-4 text-sm font-semibold text-cream shadow-elevation-2 ring-1 ring-clay/40 transition hover:bg-bark hover:shadow-elevation-3"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Book a Consultation
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-3 rounded-lg border border-clay/40 bg-clay/10 px-6 py-4 text-sm font-semibold text-bark transition hover:bg-clay/20 hover:border-clay/60"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Explore Our Services
                </Link>
                <Link
                  href="/areas"
                  className="inline-flex items-center justify-center gap-3 rounded-lg border border-charcoal/15 bg-white px-6 py-4 text-sm font-semibold text-bark transition hover:bg-sand hover:border-charcoal/20"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Areas We Specialize In
                </Link>
              </div>
            </div>
          </section>

          {/* OUR APPROACH / PILLARS - Card Grid */}
          <section className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-2 h-8 rounded bg-clay" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-bark">
                {pageData.pillars.title}
              </h2>
            </div>
            <p className="mb-8 text-base text-charcoal/80 max-w-3xl">
              Our foundation is built on compassion, evidence, and your unique needs.
            </p>
            <div className="grid gap-5 md:grid-cols-3 md:gap-6">
              {pageData.pillars.pillarList.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="group relative rounded-2xl bg-white p-6 md:p-7 ring-1 ring-charcoal/8 hover:ring-clay/25 hover:shadow-elevation-2 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span className="text-xs font-mono text-clay/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-heading font-semibold text-bark leading-snug text-lg">{pillar.title}</h3>
                  <p className="mt-3 text-charcoal/75 text-sm md:text-base leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOUNDER / DIRECTOR SECTION */}
          <DirectorSection
            name={pageData.director.name}
            credentials={pageData.director.credentials}
            badge={pageData.director.badge}
            image={pageData.director.image}
            description={pageData.director.description}
            quote={pageData.director.quote}
            bookingLink={pageData.director.bookingLink}
            bookingText={pageData.director.bookingText}
            psychologyTodayImage={pageData.director.psychologyTodayImage}
            psychologyTodayLink={pageData.director.psychologyTodayLink}
          />

          {/* MEET THE TEAM SECTION */}
          <section className="mb-16 md:mb-20">
            <AboutTeamClient teamMembers={teamMembers} />
          </section>

          {/* WHY CLIENTS CHOOSE US - Trust Building Section */}
          <section className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block w-2 h-8 rounded bg-clay" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-bark">
                Why Clients Choose Us
              </h2>
            </div>
            <p className="mb-8 text-base text-charcoal/80 max-w-3xl">
              Soul Care Counsellor stands out through our commitment to safety, expertise, and your whole wellbeing.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
              {[
                {
                  title: "Confidential & Safe",
                  description: "Your privacy is sacred. Every conversation is secure and protected by professional standards."
                },
                {
                  title: "Culturally Responsive",
                  description: "We understand and honor your background, values, and unique life experience."
                },
                {
                  title: "Faith-Informed Care",
                  description: "For those who value it, we integrate your faith perspective into therapeutic work."
                },
                {
                  title: "Flexible Sessions",
                  description: "Virtual counselling across Canada with appointment times that fit your life."
                },
                {
                  title: "Experienced Team",
                  description: "Licensed clinicians with specialized training in trauma, anxiety, relationships, and more."
                },
                {
                  title: "Personalized Approach",
                  description: "Treatment plans designed for your specific goals and needs, not a one-size-fits-all model."
                }
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-5 md:p-6 ring-1 ring-charcoal/8 hover:ring-clay/25 hover:shadow-elevation-2 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <h3 className="font-heading font-semibold text-bark text-lg mb-2">{benefit.title}</h3>
                  <p className="text-charcoal/75 text-sm md:text-base leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INTERNSHIP / CAREERS SECTION - Combined with final CTA */}
          {pageData.cta && (
            <NextStepCTA
              joinTeamTitle="Ready to Take the Next Step?"
              joinTeamDescription="Whether you're seeking therapy, exploring an internship, or have questions about our services, we're here to support you."
            />
          )}
        </div>
      </section>
    </div>
  );
}


