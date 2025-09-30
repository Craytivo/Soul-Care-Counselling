import type { Metadata } from 'next'
import { getInternApplicationPage } from '@/lib/sanity-queries'
import InternApplicationForm from '@/components/InternApplicationForm'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getInternApplicationPage()
  
  return {
    title: pageData?.title ? `${pageData.title} | Soul Care Counselling` : 'Intern Application | Soul Care Counselling',
    description: pageData?.metaDescription || 'Apply for an internship with Soul Care Counselling. Join our faith-centered team and gain hands-on experience in therapeutic practice.',
  }
}

// Disable caching for this page to ensure fresh data from Sanity
export const revalidate = 0

export default async function InternApplicationPage() {
  const pageData = await getInternApplicationPage()

  // Return fallback if no data
  if (!pageData) {
    return (
      <div className="text-center py-12">
        <p className="text-bark/60">Intern application page content not found. Please create it in Sanity Studio.</p>
        <Link href="/studio" className="text-gold underline">Go to Sanity Studio</Link>
      </div>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15 mb-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            {pageData.hero.badge}
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold mb-2">
            {pageData.hero.heading}
          </h1>
          {pageData.hero.description.map((paragraph, index) => (
            <p key={index} className="mt-3 max-w-3xl text-cream/85">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-14 md:mt-16 grid gap-10 md:grid-cols-12 md:items-start">
        {/* LEFT: Intern Application Form */}
        <div className="md:col-span-7">
          <InternApplicationForm pageData={pageData} />
          <p className="mt-4 text-xs text-charcoal/70">
            {pageData.formFields.fileUploadNote}
          </p>
        </div>

        {/* RIGHT: Intern Info Side Column */}
        <aside className="md:col-span-5 mt-10 md:mt-[3.25rem] space-y-6">
          <div className="rounded-2xl bg-sand p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">{pageData.sidebar.aboutSection.title}</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {pageData.sidebar.aboutSection.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">{pageData.sidebar.questionsSection.title}</h3>
            <p className="mt-3 text-sm text-charcoal/80">
              {pageData.sidebar.questionsSection.description.split(pageData.sidebar.questionsSection.contactEmail).map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <a 
                      href={`mailto:${pageData.sidebar.questionsSection.contactEmail}`} 
                      className="underline decoration-charcoal/30 hover:decoration-charcoal"
                    >
                      {pageData.sidebar.questionsSection.contactEmail}
                    </a>
                  )}
                </span>
              ))}
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}