
import { getAreasPage } from '@/lib/sanity-queries'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default async function SanityAreasPage() {
  const pageData = await getAreasPage()
  if (!pageData) {
    return <div className="py-12 text-center text-charcoal/60">No content available for this page.</div>
  }

  const portableTextComponents = {
    block: {
      h3: (props: { children?: React.ReactNode }) => <h3 className="font-heading text-lg font-semibold mb-2 text-charcoal">{props.children}</h3>,
      h4: (props: { children?: React.ReactNode }) => <h4 className="font-heading text-base font-semibold mb-1.5 text-charcoal/90">{props.children}</h4>,
      normal: (props: { children?: React.ReactNode }) => <p className="mb-3 text-charcoal/75 leading-relaxed">{props.children}</p>,
    },
    list: {
      bullet: (props: { children?: React.ReactNode }) => <ul className="space-y-1.5 mb-4">{props.children}</ul>,
      number: (props: { children?: React.ReactNode }) => <ol className="space-y-1.5 mb-4 list-decimal pl-5">{props.children}</ol>,
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
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true" />
        <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-gradient-to-tr from-cream/10 to-clay/20 blur-2xl" aria-hidden="true" />
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          {pageData.hero.badge && (
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
              {pageData.hero.badge}
            </span>
          )}
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold tracking-tight">
            {pageData.hero.title}
          </h1>
          <p className="mt-3 max-w-3xl text-cream/85 leading-relaxed">
            {pageData.hero.description}
          </p>
        </div>
      </section>

      {/* Quick-nav area pills */}
      {pageData.areas.length > 3 && (
        <section className="mt-8">
          <div className="flex flex-wrap gap-2">
            {pageData.areas.map((area) => (
              <a
                key={area.slug.current}
                href={`#${area.slug.current}`}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-white text-charcoal/80 ring-1 ring-charcoal/5 hover:ring-charcoal/15"
              >
                {area.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Areas Content */}
      <section className="mt-14 md:mt-16 space-y-4">
        {pageData.areas.map((area, i) => (
          <details
            key={area.slug.current}
            id={area.slug.current}
            className="group rounded-2xl bg-white ring-1 ring-charcoal/5 overflow-hidden hover:ring-charcoal/10 hover:shadow-lg hover:shadow-charcoal/[0.03] transition-all duration-300 scroll-mt-4"
            open={i === 0}
          >
            <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer select-none list-none">
              <span className="flex items-start gap-3">
                <span className="text-xs font-mono text-clay/50 mt-0.5 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-heading font-semibold text-charcoal leading-snug">{area.title}</span>
              </span>
              <span className="relative flex-shrink-0 w-6 h-6">
                <svg className="absolute inset-0 w-6 h-6 text-clay opacity-100 group-open:opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <svg className="absolute inset-0 w-6 h-6 text-clay opacity-0 group-open:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
                </svg>
              </span>
            </summary>
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="h-px bg-charcoal/5 mb-4" />
              <PortableText value={area.content as import('@portabletext/types').TypedObject[]} components={portableTextComponents} />
            </div>
          </details>
        ))}
      </section>

      {/* CTA Section */}
      {pageData.cta && (
        <section className="mt-16 rounded-2xl bg-gradient-to-br from-sand/60 to-sand/40 backdrop-blur-sm p-8 md:p-10 ring-1 ring-charcoal/5">
          <div className="md:grid md:grid-cols-2 md:gap-10 md:items-center">
            <div className="mb-6 md:mb-0">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-clay/15 mb-4">
                <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 2.163L12 6.987l4.726.343-3.48 2.86.995 4.627L12 12.287l-4.241 2.49.995-4.627-3.48-2.86 4.726-.343 1.813-4.824z" />
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
  )
}


