'use client'

import { useEffect, useState } from 'react'
import { getAboutPage } from '@/lib/sanity-queries'
import { AboutPage, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import SanityTeam from './SanityTeam'

const SanityAboutPage = () => {
  const [pageData, setPageData] = useState<AboutPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true)
        const data = await getAboutPage()
        if (data) {
          setPageData(data)
        } else {
          setError('About page not found.')
        }
      } catch (err) {
        console.error('Error fetching about page:', err)
        setError('Failed to load about page content.')
      } finally {
        setLoading(false)
      }
    }

    fetchPageData()
  }, [])

  if (loading) {
    return <div className="container mx-auto py-12 text-center">Loading about page...</div>
  }

  if (error) {
    return <div className="container mx-auto py-12 text-center text-red-500">{error}</div>
  }

  if (!pageData) {
    return <div className="container mx-auto py-12 text-center">No content available for this page.</div>
  }

  const portableTextComponents = {
    block: {
      h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
      h4: ({ children }: { children: React.ReactNode }) => <h4 className="text-lg font-semibold mb-2">{children}</h4>,
      normal: ({ children }: { children: React.ReactNode }) => <p className="mb-4">{children}</p>,
    },
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
      number: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: { children: React.ReactNode }) => <li className="mb-2">{children}</li>,
      number: ({ children }: { children: React.ReactNode }) => <li className="mb-2">{children}</li>,
    },
  }

  return (
    <article className="container mx-auto py-12 px-4">
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
      <section className="mt-14 md:mt-16">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          
          {/* LEFT: Welcome */}
          <div>
            <header className="max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{pageData.welcome.title}</h2>
            </header>
            <div className="mt-4 space-y-4 text-charcoal/85">
              <PortableText value={pageData.welcome.content} components={portableTextComponents} />
            </div>
          </div>

          {/* RIGHT: Pillars */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-semibold">{pageData.pillars.title}</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {pageData.pillars.pillarList.map((pillar, index) => (
                <li key={index} className="rounded-xl bg-sand p-5 ring-1 ring-charcoal/10">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-bark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v18M6 9l6-6 6 6"/>
                    </svg>
                    <div>
                      <h4 className="font-semibold">{pillar.title}</h4>
                      <p className="mt-1 text-sm text-charcoal/80">{pillar.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="mt-16 md:mt-20">
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
          <div className="md:col-span-7">
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
            <p className="mt-3 text-charcoal/85">
              {pageData.director.description}
            </p>
            {pageData.director.quote && (
              <blockquote className="mt-4 border-l-4 border-clay pl-4 text-charcoal/90">
                <p className="font-heading italic">&ldquo;{pageData.director.quote}&rdquo;</p>
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

      {/* Meet the team - Now powered by Sanity CMS */}
      <SanityTeam />

      {/* Final CTA */}
      {pageData.cta && (
        <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="font-heading text-xl md:text-2xl font-semibold">{pageData.cta.title}</h3>
              <p className="mt-2 text-charcoal/80">{pageData.cta.description}</p>
            </div>
            <div className="md:justify-self-end">
              <a 
                href={pageData.cta.buttonLink}
                target={pageData.cta.external ? '_blank' : '_self'}
                rel={pageData.cta.external ? 'noopener noreferrer' : ''}
                className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                {pageData.cta.buttonText}
              </a>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}

export default SanityAboutPage
