import { getAboutPage } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
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
      bullet: (props: { children?: React.ReactNode }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-charcoal/88 max-w-[66ch]">{props.children}</ul>,
      number: (props: { children?: React.ReactNode }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-charcoal/88 max-w-[66ch]">{props.children}</ol>,
    },
    listItem: {
      bullet: (props: { children?: React.ReactNode }) => <li className="mb-2">{props.children}</li>,
      number: (props: { children?: React.ReactNode }) => <li className="mb-2">{props.children}</li>,
    },
  };

  return (
  <article className="mx-auto max-w-7xl py-8 md:py-10 px-4">
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
      {/* Welcome + Pillars Section */}
        <section className="mt-10 md:mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-sand/60 via-white/80 to-clay/30 pointer-events-none rounded-2xl" />
          <div className="relative z-10 grid md:grid-cols-[1fr_32px_1.2fr] gap-0 items-stretch min-h-[520px] rounded-2xl overflow-hidden shadow-lg">
            {/* Welcome Column */}
            <div className="flex flex-col h-full justify-center max-w-3xl px-5 md:px-6 py-8 md:py-14">
              <header className="mb-4 flex items-center gap-3">
                <span className="inline-block w-2 h-8 rounded bg-clay md:mr-2" />
                <h2 className="font-heading text-[clamp(1.7rem,4.8vw,2.5rem)] font-semibold leading-tight tracking-tight text-bark">{pageData.welcome.title}</h2>
              </header>
              <div className="space-y-4 md:space-y-5 text-charcoal/90 prose prose-base md:prose-lg max-w-none">
                <PortableText value={pageData.welcome.content as import('@portabletext/types').TypedObject[]} components={portableTextComponents} />
              </div>
            </div>
            {/* Vertical Accent Divider */}
            <div className="hidden md:flex justify-center items-center">
              <div className="w-1 h-5/6 bg-gradient-to-b from-clay/80 via-bark/30 to-sand/0 rounded-full" />
            </div>
            {/* Pillars Column */}
            <div className="flex flex-col h-full justify-center px-5 md:px-6 py-8 md:py-14">
              <h3 className="font-heading text-[clamp(1.5rem,4.5vw,2rem)] font-semibold text-bark mb-5 flex items-center gap-2">
                {pageData.pillars.title}
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {pageData.pillars.pillarList.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="rounded-xl bg-white/80 backdrop-blur p-4 ring-1 ring-clay/10 shadow h-full flex flex-col justify-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <div className="mb-1">
                      <h4 className="font-semibold text-base text-bark line-clamp-1">{pillar.title}</h4>
                    </div>
                    <p className="text-charcoal/80 text-sm leading-relaxed line-clamp-4">{pillar.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      {/* Director Section */}
      <section className="mt-12 md:mt-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand/55 via-white to-clay/20 p-4 ring-1 ring-charcoal/10 md:p-6">
          <div className="ui-card p-5 text-charcoal/90 md:p-8">
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
        </div>
      </section>
      {/* Meet the team - Now matches homepage */}
  <section className="mt-12 md:mt-16">
        <AboutTeamClient teamMembers={teamMembers} />
      </section>
      {/* Careers / Internship Section */}
      <section className="mt-12 md:mt-16 rounded-2xl bg-gradient-to-br from-sand/55 via-white to-clay/20 p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="ui-card p-5 text-charcoal/90 md:p-8">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-clay/15 text-clay">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-bark">Join Our Team</h3>
              <p className="mt-2 text-charcoal/80 max-w-[60ch]">
                We offer clinical internship opportunities for graduate students and emerging therapists looking to gain experience in faith-centered, culturally responsive counselling.
              </p>
              <div className="mt-4">
                <a
                  href="/intern-application"
                  className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream shadow-md ring-1 ring-clay/60 hover:shadow-lg transition-all"
                >
                  Apply to be an Intern
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      {pageData.cta && (
        <section className="mt-12 md:mt-16 rounded-2xl bg-sand p-5 md:p-8 ring-1 ring-charcoal/10">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-tight">{pageData.cta.title}</h3>
              <p className="mt-2 text-charcoal/80 max-w-[60ch]">{pageData.cta.description}</p>
            </div>
            {pageData.cta.buttonText && pageData.cta.buttonLink && (
              <div className="md:col-span-1 flex md:justify-end">
                <a
                  href={pageData.cta.buttonLink}
                  className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream shadow-md ring-1 ring-clay/60 hover:shadow-lg transition-all"
                >
                  {pageData.cta.buttonText}
                </a>
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
}


