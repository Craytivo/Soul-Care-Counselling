import { getAboutPage } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import AboutTeamClient from './AboutTeamClient'
import { getTeamMembers } from '@/lib/sanity-queries'
export default async function SanityAboutPage() {
  const pageData = await getAboutPage();
  const teamMembers = await getTeamMembers();
  if (!pageData) {
    return <div className="container mx-auto py-12 text-center">No content available for this page.</div>;
  }

  const portableTextComponents = {
    block: {
      h3: (props: { children?: React.ReactNode }) => <h3 className="text-xl font-semibold mb-2">{props.children}</h3>,
      h4: (props: { children?: React.ReactNode }) => <h4 className="text-lg font-semibold mb-2">{props.children}</h4>,
      normal: (props: { children?: React.ReactNode }) => <p className="mb-4">{props.children}</p>,
    },
    list: {
      bullet: (props: { children?: React.ReactNode }) => <ul className="list-disc pl-5 mb-4">{props.children}</ul>,
      number: (props: { children?: React.ReactNode }) => <ol className="list-decimal pl-5 mb-4">{props.children}</ol>,
    },
    listItem: {
      bullet: (props: { children?: React.ReactNode }) => <li className="mb-2">{props.children}</li>,
      number: (props: { children?: React.ReactNode }) => <li className="mb-2">{props.children}</li>,
    },
  };

  return (
  <article className="container mx-auto py-10 px-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        {/* Background image */}
        {pageData.hero.backgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(pageData.hero.backgroundImage).url()}
              alt={pageData.hero.backgroundImage.alt || pageData.hero.title}
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-bark/90 via-bark/70 to-bark/50"></div>
        {/* Decorative gradient blur */}
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center px-6 py-10 md:px-10 md:py-14">
          {/* LEFT: Text */}
          <div>
            {pageData.hero.badge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
                {pageData.hero.badge}
              </span>
            )}
            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">
              {pageData.hero.title}
            </h1>
            <p className="mt-3 max-w-3xl text-cream/85">
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
          <div className="relative z-10 grid md:grid-cols-[1fr_32px_1.2fr] gap-0 md:gap-0 items-stretch min-h-[520px] rounded-2xl overflow-hidden shadow-lg">
            {/* Welcome Column */}
            <div className="flex flex-col h-full justify-center max-w-3xl px-6 py-10 md:py-14">
              <header className="mb-4 flex items-center gap-3">
                <span className="inline-block w-2 h-8 rounded bg-clay md:mr-2" />
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-bark drop-shadow-sm">{pageData.welcome.title}</h2>
              </header>
              <div className="space-y-6 text-lg text-charcoal/90 font-medium leading-relaxed prose prose-lg max-w-none">
                <PortableText value={pageData.welcome.content as import('@portabletext/types').TypedObject[]} components={portableTextComponents} />
              </div>
            </div>
            {/* Vertical Accent Divider */}
            <div className="hidden md:flex justify-center items-center">
              <div className="w-1 h-5/6 bg-gradient-to-b from-clay/80 via-bark/30 to-sand/0 rounded-full" />
            </div>
            {/* Pillars Column */}
            <div className="flex flex-col h-full justify-center px-6 py-10 md:py-14">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-bark mb-6 flex items-center gap-2">
                {pageData.pillars.title}
              </h3>
              <ul className="grid gap-6 sm:grid-cols-2">
                {pageData.pillars.pillarList.map((pillar, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-white/80 backdrop-blur p-4 ring-1 ring-clay/10 shadow h-full flex flex-col justify-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <div className="mb-1">
                      <h4 className="font-semibold text-base text-bark line-clamp-1">{pillar.title}</h4>
                    </div>
                    <p className="text-charcoal/80 text-sm leading-snug line-clamp-3">{pillar.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      {/* Director Section */}
  <section className="mt-12 md:mt-16">
  <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            {pageData.director.image && (
              <figure className="rounded-2xl bg-sand p-2 ring-1 ring-charcoal/10 shadow">
                <Image
                  src={urlFor(pageData.director.image).url()}
                  width={365}
                  height={365}
                  alt={pageData.director.image.alt || pageData.director.name}
                  className="block w-full h-auto rounded-xl object-cover aspect-square"
                />
              </figure>
            )}
          </div>
          <div className="md:col-span-7 max-w-3xl prose prose-lg text-charcoal/90">
            {pageData.director.badge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
                {pageData.director.badge}
              </span>
            )}
            <h3 className="mt-3 font-heading text-2xl md:text-3xl font-bold">
              {pageData.director.name}
              {pageData.director.credentials && (
                <span className="text-lg font-normal text-charcoal/80">, {pageData.director.credentials}</span>
              )}
            </h3>
            <p>
              {pageData.director.description}
            </p>
            {pageData.director.quote && (
              <blockquote className="mt-4 border-l-4 border-clay pl-4">
                <p className="italic">&ldquo;{pageData.director.quote}&rdquo;</p>
              </blockquote>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              {pageData.director.bookingLink && (
                <a 
                  href={pageData.director.bookingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
                >
                  {pageData.director.bookingText || 'Book a Free Consultation'}
                </a>
              )}
              {pageData.director.psychologyTodayImage && pageData.director.psychologyTodayLink && (
                <a 
                  href={pageData.director.psychologyTodayLink} 
                  target="_blank" 
                  rel="noopener noreferrer nofollow" 
                  className="inline-block" 
                  aria-label="Verified by Psychology Today"
                >
                  <Image
                    src={urlFor(pageData.director.psychologyTodayImage).url()}
                    alt={pageData.director.psychologyTodayImage.alt || 'Verified by Psychology Today'}
                    width={320}
                    height={110}
                    className="h-8 md:h-10 w-auto hover:opacity-90"
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
      {/* Final CTA */}
      {pageData.cta && (
        <section className="mt-12 md:mt-16 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="font-heading text-xl md:text-2xl font-semibold">{pageData.cta.title}</h3>
              <p className="mt-2 text-charcoal/80">{pageData.cta.description}</p>
            </div>
            {pageData.cta.buttonText && pageData.cta.buttonLink && (
              <div className="md:col-span-1 flex md:justify-end">
                <a
                  href={pageData.cta.buttonLink}
                  className="inline-block rounded-md bg-clay px-5 py-3 font-semibold text-white shadow hover:bg-bark transition-colors"
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


