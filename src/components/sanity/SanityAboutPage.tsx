import { getAboutPage } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import AboutTeamClient from '@/components/AboutTeamClient'
import { getTeamMembers } from '@/lib/sanity-queries'
export default async function SanityAboutPage() {
  const pageData = await getAboutPage();
  const teamMembers = await getTeamMembers();
  if (!pageData) {
    return <div className="container mx-auto py-12 text-center">No content available for this page.</div>;
  }

  const portableTextComponents = {
    block: {
      h3: (props: { children?: React.ReactNode }) => <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-bark mt-8 mb-3">{props.children}</h3>,
      h4: (props: { children?: React.ReactNode }) => <h4 className="font-heading text-lg md:text-xl font-semibold tracking-tight text-bark mt-6 mb-2">{props.children}</h4>,
      normal: (props: { children?: React.ReactNode }) => <p className="mb-4 text-[0.98rem] md:text-[1.03rem] leading-7 text-charcoal/88 max-w-[66ch]">{props.children}</p>,
    },
    list: {
      bullet: (props: { children?: React.ReactNode }) => <ul className="space-y-1.5 mb-4 max-w-[66ch]">{props.children}</ul>,
      number: (props: { children?: React.ReactNode }) => <ol className="space-y-1.5 mb-4 list-decimal pl-5 max-w-[66ch]">{props.children}</ol>,
    },
    listItem: {
      bullet: (props: { children?: React.ReactNode }) => (
        <li className="flex items-start gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0 mt-2" />
          <span className="text-charcoal/75 leading-relaxed">{props.children}</span>
        </li>
      ),
      number: (props: { children?: React.ReactNode }) => <li className="text-charcoal/75 leading-relaxed">{props.children}</li>,
    },
  };

  return (
  <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        {/* Background image */}
        {pageData.hero.backgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(pageData.hero.backgroundImage).url()}
              alt={pageData.hero.backgroundImage.alt || pageData.hero.title}
              fill
              className="object-cover scale-105 will-change-transform duration-[3s] ease-out"
              priority
            />
          </div>
        )}
        {/* Home-consistent overlay stack for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/65 via-charcoal/35 to-transparent md:from-charcoal/55 md:via-charcoal/25" />
        <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-gradient-to-tr from-cream/10 to-clay/20 blur-2xl" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.04),rgba(0,0,0,0.22)_55%,rgba(0,0,0,0.38)_85%)] mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:3px_3px]" />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-10 items-center px-5 py-8 md:px-10 md:py-14">
          {/* LEFT: Text */}
          <div>
            {pageData.hero.badge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
                {pageData.hero.badge}
              </span>
            )}
            <h1 className="mt-3 font-heading text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.015em]">
              {pageData.hero.title}
            </h1>
            <p className="mt-3 max-w-[62ch] text-[0.98rem] md:text-[1.06rem] leading-relaxed text-cream/88">
              {pageData.hero.description}
            </p>
          </div>
          {/* RIGHT: Featured Image */}
          {pageData.hero.featuredImage && (
            <div className="relative flex justify-center overflow-hidden rounded-xl shadow-lg">
              <Image
                src={urlFor(pageData.hero.featuredImage).url()}
                alt={pageData.hero.featuredImage.alt || pageData.hero.title}
                width={600}
                height={400}
                className="w-full max-w-[600px] h-auto object-cover object-top"
                style={{ objectPosition: '0 -20%' }}
                priority
              />
            </div>
          )}
        </div>
      </section>
      {/* Welcome Section */}
        <section className="mt-10 md:mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-sand/60 via-white/80 to-clay/30 pointer-events-none rounded-2xl" />
          <div className="relative z-10 rounded-2xl overflow-hidden px-5 md:px-8 py-8 md:py-14">
              <header className="mb-4 flex items-center gap-3">
                <span className="inline-block w-2 h-8 rounded bg-clay md:mr-2" />
                <h2 className="font-heading text-[clamp(1.7rem,4.8vw,2.5rem)] font-semibold leading-tight tracking-tight text-bark">{pageData.welcome.title}</h2>
              </header>
              <div className="space-y-4 md:space-y-5 text-charcoal/90 prose prose-base md:prose-lg max-w-none">
                <PortableText value={pageData.welcome.content as import('@portabletext/types').TypedObject[]} components={portableTextComponents} />
              </div>
          </div>
        </section>

      {/* Pillars Section */}
      <section className="mt-10 md:mt-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2 h-8 rounded bg-clay" />
          <h2 className="font-heading text-[clamp(1.5rem,4.5vw,2rem)] font-semibold leading-tight tracking-tight text-bark">
            {pageData.pillars.title}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageData.pillars.pillarList.map((pillar, i) => (
            <div
              key={pillar.title}
              className="group relative rounded-2xl bg-white p-6 ring-1 ring-charcoal/5 hover:ring-clay/15 hover:shadow-lg hover:shadow-charcoal/[0.04] transition-all duration-300"
            >
              <span className="text-xs font-mono text-clay/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="mt-2 font-heading font-semibold text-bark leading-snug">{pillar.title}</h4>
              <p className="mt-2 text-charcoal/70 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Director Section */}
      <section className="mt-12 md:mt-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand/55 via-white to-clay/20 p-5 md:p-8 ring-1 ring-charcoal/5">
            <div className="grid items-center gap-5 md:grid-cols-[190px_minmax(0,1fr)] md:gap-6">
              {pageData.director.image && (
                <figure className="mx-auto w-full max-w-[190px] overflow-hidden rounded-xl bg-sand p-2 ring-1 ring-charcoal/10 md:mx-0">
                  <Image
                    src={urlFor(pageData.director.image).url()}
                    width={365}
                    height={365}
                    alt={pageData.director.image.alt || pageData.director.name}
                    className="block aspect-square h-auto w-full rounded-lg object-cover"
                  />
                </figure>
              )}

              <div className="min-w-0">
                {pageData.director.badge && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 text-[11px] uppercase tracking-[.22em] text-charcoal/80 ring-1 ring-charcoal/10">
                    {pageData.director.badge}
                  </span>
                )}
                <h3 className="mt-3 font-heading text-[clamp(1.6rem,4.2vw,2.2rem)] font-semibold leading-tight tracking-tight">
                  {pageData.director.name}
                </h3>
                {pageData.director.credentials && (
                  <p className="mt-1 text-sm font-medium text-charcoal/70 md:text-base">{pageData.director.credentials}</p>
                )}
              </div>
            </div>

            <div className="mt-5 h-px w-16 bg-clay/60" aria-hidden="true"></div>

            <div className="mt-5 space-y-4 md:space-y-5">
              {pageData.director.description
                .split(/\n{2,}/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p
                    key={`${pageData.director.name}-paragraph-${index}`}
                    className="whitespace-pre-line text-[1rem] leading-8 text-charcoal/88 md:text-[1.04rem] md:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>

            {pageData.director.quote && (
              <blockquote className="mt-6 border-l-4 border-clay pl-4">
                <p className="text-[1rem] italic leading-relaxed text-charcoal/85 md:text-[1.04rem]">&ldquo;{pageData.director.quote}&rdquo;</p>
              </blockquote>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {pageData.director.bookingLink && (
                <a
                  href={pageData.director.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn-primary"
                >
                  {pageData.director.bookingText || 'Book a Free Consultation'}
                </a>
              )}
              {pageData.director.psychologyTodayImage && pageData.director.psychologyTodayLink && (
                <a
                  href={pageData.director.psychologyTodayLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block rounded-lg bg-white/70 p-2 ring-1 ring-charcoal/10 transition-opacity hover:opacity-90"
                  aria-label="Verified by Psychology Today"
                >
                  <Image
                    src={urlFor(pageData.director.psychologyTodayImage).url()}
                    alt={pageData.director.psychologyTodayImage.alt || 'Verified by Psychology Today'}
                    width={320}
                    height={110}
                    className="h-8 w-auto md:h-10"
                  />
                </a>
              )}
            </div>
        </div>
      </section>
      {/* Meet the team - Now matches homepage */}
  <section className="mt-12 md:mt-16">
        <AboutTeamClient teamMembers={teamMembers} />
      </section>
      {/* Careers / Internship Section */}
      <section className="mt-12 md:mt-16 rounded-2xl bg-gradient-to-br from-sand/60 to-sand/40 backdrop-blur-sm p-8 md:p-10 ring-1 ring-charcoal/5">
        <div className="md:grid md:grid-cols-2 md:gap-10 md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-clay/15 mb-4">
              <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.58l-.001-.031m10.364-4.669a12 12 0 01-4.4 0m-4.4 0a12 12 0 01-4.4 0m8.8 0a3 3 0 11-4.4 0m4.4 0a3 3 0 10-4.4 0m-8.8 0a3 3 0 11-4.4 0m4.4 0a3 3 0 10-4.4 0" />
              </svg>
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2 tracking-tight">Join Our Team</h3>
            <p className="text-charcoal/75 leading-relaxed">
              Clinical internship opportunities for graduate students and emerging therapists — gain experience in faith-centered, culturally responsive counselling.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              href="/intern-application"
              className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-2.5 font-semibold text-cream hover:bg-clay/90 transition-colors text-sm"
            >
              Apply to be an Intern
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-medium text-charcoal/70 ring-1 ring-charcoal/10 hover:bg-charcoal/5 transition-colors text-sm"
            >
              Ask Us a Question
            </Link>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      {pageData.cta && (
        <section className="mt-16 rounded-2xl bg-gradient-to-br from-sand/60 to-sand/40 backdrop-blur-sm p-8 md:p-10 ring-1 ring-charcoal/5">
          <div className="md:grid md:grid-cols-2 md:gap-10 md:items-center">
            <div className="mb-6 md:mb-0">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-clay/15 mb-4">
                <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5l9 6 9-6" />
                </svg>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2 tracking-tight">{pageData.cta.title}</h3>
              <p className="text-charcoal/75 leading-relaxed">{pageData.cta.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              {pageData.cta.external ? (
                <a
                  href={pageData.cta.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-2.5 font-semibold text-cream hover:bg-clay/90 transition-colors text-sm"
                >
                  {pageData.cta.buttonText}
                </a>
              ) : (
                <Link
                  href={pageData.cta.buttonLink}
                  className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-2.5 font-semibold text-cream hover:bg-clay/90 transition-colors text-sm"
                >
                  {pageData.cta.buttonText}
                </Link>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-medium text-charcoal/70 ring-1 ring-charcoal/10 hover:bg-charcoal/5 transition-colors text-sm"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      )}
  </>
  );
}


