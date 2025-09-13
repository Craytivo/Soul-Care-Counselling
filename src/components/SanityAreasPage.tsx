
import { getAreasPage } from '@/lib/sanity-queries'
import { PortableText } from '@portabletext/react'

export default async function SanityAreasPage() {
  const pageData = await getAreasPage()
  if (!pageData) {
    return <div className="container mx-auto py-12 text-center">No content available for this page.</div>
  }

  const portableTextComponents = {
    block: {
      h3: (props: any) => <h3 className="text-xl font-semibold mb-2">{props.children}</h3>,
      h4: (props: any) => <h4 className="text-lg font-semibold mb-2">{props.children}</h4>,
      normal: (props: any) => <p className="mb-4">{props.children}</p>,
    },
    list: {
      bullet: (props: any) => <ul className="list-disc pl-6 mb-4">{props.children}</ul>,
      number: (props: any) => <ol className="list-decimal pl-6 mb-4">{props.children}</ol>,
    },
    listItem: {
      bullet: (props: any) => <li className="mb-2">{props.children}</li>,
      number: (props: any) => <li className="mb-2">{props.children}</li>,
    },
  }

  return (
    <article className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
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
      </section>

      {/* Areas Content */}
      <section className="mt-14 md:mt-16 space-y-12">
        {pageData.areas.map((area, index) => (
          <article key={area.slug.current} id={area.slug.current} className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
            <h2 className="font-heading text-xl md:text-2xl font-semibold">{area.title}</h2>
            <div className="mt-3 space-y-4 text-charcoal/85">
              <PortableText value={area.content} components={portableTextComponents} />
            </div>
          </article>
        ))}

        {/* CTA Section */}
        {pageData.cta && (
          <section className="rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
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
      </section>
    </article>
  )
}


