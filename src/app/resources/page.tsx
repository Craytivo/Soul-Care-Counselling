

export const revalidate = 300

import { getResources, getFeaturedResources } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import type { Resource } from '@/lib/sanity'
import EmptyState from '@/components/ui/EmptyState'
import ResourceLeadForm from '@/components/forms/ResourceLeadForm'
import GatedDownloadButton from '@/components/resources/GatedDownloadButton'
import Link from 'next/link'
import ConsultationCta from '@/components/cta/ConsultationCta'

const categories = [
  'All Resources',
  'Worksheets',
  'Guides', 
  'Assessment Tools',
  'Self-Care',
  'Trauma Resources',
  'Spiritual Care'
]

const forcedGatedResourceMarkers = [
  'sc thought record form',
  'reframing anxious thoughts',
  'pause method - emotional de-escalation',
  'emotional regulation guide',
]

function normalizeForMatch(value?: string) {
  return (value || '').toLowerCase().replace(/\s+/g, ' ').trim()
}

function isForcedGatedResource(resource: Resource) {
  const title = normalizeForMatch(resource.title)
  const originalFilename = normalizeForMatch(resource.pdfFile?.asset?.originalFilename)
  const imageAlt = normalizeForMatch(resource.previewImage?.alt)

  return forcedGatedResourceMarkers.some(
    (marker) =>
      title.includes(marker) ||
      originalFilename.includes(marker) ||
      imageAlt.includes(marker)
  )
}

function getResourceImageAlt(resource: Resource) {
  const trimmedAlt = resource.previewImage?.alt?.trim()
  return trimmedAlt || `${resource.title} resource preview`
}

export default async function ResourcesPage() {
  const [allResources, featuredResources] = await Promise.all([
    getResources(),
    getFeaturedResources()
  ]);
  const selectedCategory = 'All Resources';
  const filteredResources = allResources;

  // Server components can't use interactive category selection, so default to 'All Resources'.

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const ResourceCard = ({ resource, featured = false }: { resource: Resource, featured?: boolean }) => {
    const isGated = Boolean(resource.requiresEmailGate || isForcedGatedResource(resource))
    return (
    <article className={`rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200 ${featured ? '' : ''}`}>
      {resource.previewImage?.asset && (
        <div className={`relative ${featured ? 'h-64 md:h-auto' : 'h-48'}`}>
          <Image
            src={urlFor(resource.previewImage).width(featured ? 600 : 400).height(featured ? 400 : 300).auto('format').url()}
            alt={getResourceImageAlt(resource)}
            fill
            className="object-cover"
            priority={featured}
            quality={75}
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          />
        </div>
      )}
      {!resource.previewImage?.asset && resource.pdfFile?.asset?.url && (
        <div className={`relative ${featured ? 'h-64 md:h-auto' : 'h-48'} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-red-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">PDF Document</span>
            {resource.pdfFile?.asset?.size && (
              <div className="text-xs text-gray-500 mt-1">
                {formatFileSize(resource.pdfFile.asset.size)}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={`${featured ? 'p-6 md:p-8' : 'p-6'}`}>
          <div className="flex items-center gap-2 mb-3">
            {resource.category && (
              <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                {resource.category}
              </span>
            )}
            {isGated && (
              <span className="px-3 py-1 bg-bark text-cream text-xs font-medium rounded-full">
                Email required
              </span>
            )}
            {resource.pdfFile?.asset?.size && (
              <span className="text-charcoal/60 text-sm">{formatFileSize(resource.pdfFile.asset.size)}</span>
            )}
          </div>
        
        <h3 className={`font-heading font-semibold mb-3 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
          {resource.title}
        </h3>
        
        {resource.description && (
          <p className={`text-charcoal/85 mb-4 leading-relaxed ${featured ? '' : 'text-sm line-clamp-3'}`}>
            {resource.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-full bg-clay flex items-center justify-center ${featured ? 'w-10 h-10' : 'w-8 h-8'}`}>
              <span className={`text-cream font-semibold ${featured ? 'text-sm' : 'text-xs'}`}>
                SC
              </span>
            </div>
            <div>
              <p className={`font-medium ${featured ? 'text-sm' : 'text-xs'}`}>Soul Care Counselling</p>
              {featured && <p className="text-charcoal/60 text-xs">Professional Resources</p>}
            </div>
          </div>
          
          {resource.pdfFile?.asset?.url && (
            <GatedDownloadButton
              requiresEmailGate={isGated}
              downloadUrl={resource.pdfFile.asset.url}
              fileName={resource.pdfFile.asset.originalFilename}
              resourceTitle={resource.title}
              resourceSlug={resource.slug.current}
            />
          )}
        </div>
      </div>
    </article>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            Resources
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Helpful Resources</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Download worksheets, guides, and therapeutic materials to support your mental health journey and personal growth.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === selectedCategory
                  ? 'bg-clay text-charcoal ring-1 ring-charcoal/20'
                  : 'bg-white text-charcoal/80 ring-1 ring-charcoal/10'
              }`}
            >
              {category}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-charcoal/75">
          Looking for deeper support as you apply these tools? Explore our{' '}
          <Link href="/services" className="underline decoration-charcoal/30 hover:decoration-charcoal">
            counselling services
          </Link>{' '}
          or{' '}
          <Link href="/contact" className="underline decoration-charcoal/30 hover:decoration-charcoal">
            speak with our team
          </Link>
          .
        </p>
      </section>

  {allResources.length === 0 ? (
        /* Empty State */
        <section className="mt-16">
          <EmptyState
            title="No resources yet"
            description="We're preparing helpful resources to share with you. Check back soon for worksheets, guides, and therapeutic materials."
            action={
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://thesoulcarecounsellor.janeapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-primary"
                >
                  Book a Free Consultation
                </a>
                <a href="/contact" className="ui-btn-ghost">
                  Contact Our Team
                </a>
              </div>
            }
          />
        </section>
      ) : (
        <>
          {/* Featured Resources */}
          {featuredResources.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-2xl font-semibold mb-6">Featured Resources</h2>
              <div className="space-y-8">
                {featuredResources.map((resource) => (
                  (() => {
                    const isGated = Boolean(resource.requiresEmailGate || isForcedGatedResource(resource))
                    return (
                  <div key={resource._id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                      {resource.previewImage?.asset && (
                        <div className="relative h-64 md:h-auto">
                          <Image
                            src={urlFor(resource.previewImage).width(600).height(400).auto('format').url()}
                            alt={getResourceImageAlt(resource)}
                            fill
                            className="object-cover"
                            priority
                            quality={75}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      {!resource.previewImage?.asset && resource.pdfFile?.asset?.url && (
                        <div className="relative h-64 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <svg className="w-20 h-20 mx-auto text-red-600 mb-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            <span className="text-lg font-semibold text-gray-700">PDF Document</span>
                            {resource.pdfFile?.asset?.size && (
                              <div className="text-sm text-gray-500 mt-2">
                                {formatFileSize(resource.pdfFile.asset.size)}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className={`p-6 md:p-8 ${!resource.previewImage?.asset ? 'md:col-span-2' : ''}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {resource.category && (
                            <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                              {resource.category}
                            </span>
                          )}
                          {isGated && (
                            <span className="px-3 py-1 bg-bark text-cream text-xs font-medium rounded-full">
                              Email required
                            </span>
                          )}
                          {resource.pdfFile?.asset?.size && (
                            <span className="text-charcoal/60 text-sm">{formatFileSize(resource.pdfFile.asset.size)}</span>
                          )}
                        </div>
                        <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">
                          {resource.title}
                        </h3>
                        {resource.description && (
                          <p className="text-charcoal/85 mb-4 leading-relaxed">{resource.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-clay flex items-center justify-center">
                              <span className="text-cream font-semibold text-sm">
                                SC
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Soul Care Counselling</p>
                              <p className="text-charcoal/60 text-xs">Professional Resources</p>
                            </div>
                          </div>
                          {resource.pdfFile?.asset?.url && (
                            <GatedDownloadButton
                              requiresEmailGate={isGated}
                              downloadUrl={resource.pdfFile.asset.url}
                              fileName={resource.pdfFile.asset.originalFilename}
                              resourceTitle={resource.title}
                              resourceSlug={resource.slug.current}
                              className="inline-flex items-center px-4 py-2 font-semibold text-charcoal bg-clay hover:bg-clay/90 rounded-md transition-colors ring-1 ring-charcoal/10"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                    )
                  })()
                ))}
              </div>
            </section>
          )}

          {/* All Resources Grid */}
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold mb-6">All Resources</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.filter(resource => !resource.isFeatured).map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Newsletter Signup */}
      <section className="mt-16 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">Your Private Wellness Library</h3>
          <p className="text-charcoal/80 mb-6">
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
