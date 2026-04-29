

export const revalidate = 60

import { getResources, getFeaturedResources } from '@/lib/sanity-queries'
import type { Resource } from '@/lib/sanity'
import ResourceLeadForm from '@/components/forms/ResourceLeadForm'
import ResourcesClient from '@/components/resources/ResourcesClient'
import ConsultationCta from '@/components/cta/ConsultationCta'

export default async function ResourcesPage() {
  const [allResources, featuredResources] = await Promise.all([
    getResources(),
    getFeaturedResources()
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bark to-charcoal text-cream ring-1 ring-cream/15 mb-8">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-gradient-to-br from-blue/20 to-transparent blur-xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-12 md:px-10 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px] font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Resources
          </span>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl font-bold leading-tight">
            Helpful Resources
          </h1>
          <p className="mt-4 max-w-3xl text-cream/90 text-lg md:text-xl leading-relaxed">
            Download worksheets, guides, and therapeutic materials to support your mental health journey and personal growth.
          </p>
        </div>
      </section>

      {/* Interactive Content */}
      <ResourcesClient 
        allResources={allResources} 
        featuredResources={featuredResources} 
      />

      {/* Newsletter Signup */}
      <section className="mt-20 rounded-3xl bg-gradient-to-br from-sand to-cream p-8 md:p-12 ring-1 ring-charcoal/10 shadow-lg">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-clay to-bark text-white shadow-lg">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-charcoal">
            Your Private Wellness Library
          </h3>
          <p className="text-charcoal/80 mb-8 text-lg leading-relaxed">
            Join our community to receive thoughtfully curated worksheets, guides, and practical tools designed for steady emotional growth.
          </p>
          <ResourceLeadForm />
        </div>
      </section>

      <ConsultationCta
        title="Ready for personalized support?"
        description="If these resources resonate with you, a consultation can help you choose the right next step in a supportive, no-pressure way."
        trackingLocation="resources-bottom"
        variant="bark"
      />
    </>
  )
}
