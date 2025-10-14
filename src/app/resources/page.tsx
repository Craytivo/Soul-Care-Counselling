

export const revalidate = 0

import { getResources, getFeaturedResources } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import type { Resource } from '@/lib/sanity'

const categories = [
  'All Resources',
  'Worksheets',
  'Guides', 
  'Assessment Tools',
  'Self-Care',
  'Trauma Resources',
  'Spiritual Care'
]


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

  const ResourceCard = ({ resource, featured = false }: { resource: Resource, featured?: boolean }) => (
    <article className={`rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200 ${featured ? '' : ''}`}>
      {resource.previewImage?.asset && (
        <div className={`relative ${featured ? 'h-64 md:h-auto' : 'h-48'}`}>
          <Image
            src={urlFor(resource.previewImage).width(featured ? 600 : 400).height(featured ? 400 : 300).url()}
            alt={resource.previewImage.alt || resource.title}
            fill
            className="object-cover"
            priority={featured}
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
            <a
              href={resource.pdfFile.asset.url}
              target="_blank"
              rel="noopener noreferrer"
              download={resource.pdfFile.asset.originalFilename}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-charcoal bg-clay hover:bg-clay/90 rounded-md transition-colors ring-1 ring-charcoal/10"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </a>
          )}
        </div>
      </div>
    </article>
  )

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
      </section>

  {allResources.length === 0 ? (
        /* Empty State */
        <section className="mt-16">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand flex items-center justify-center">
              <svg className="w-8 h-8 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">No resources yet</h3>
            <p className="text-charcoal/70 mb-6 max-w-md mx-auto">
              We&apos;re preparing helpful resources to share with you. Check back soon for worksheets, guides, and therapeutic materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                Book a Free Consultation
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 font-semibold text-charcoal hover:bg-sand ring-1 ring-charcoal/10"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Resources */}
          {featuredResources.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-2xl font-semibold mb-6">Featured Resources</h2>
              <div className="space-y-8">
                {featuredResources.map((resource) => (
                  <div key={resource._id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                      {resource.previewImage?.asset && (
                        <div className="relative h-64 md:h-auto">
                          <Image
                            src={urlFor(resource.previewImage).width(600).height(400).url()}
                            alt={resource.previewImage.alt || resource.title}
                            fill
                            className="object-cover"
                            priority
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
                            <a
                              href={resource.pdfFile.asset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={resource.pdfFile.asset.originalFilename}
                              className="inline-flex items-center px-4 py-2 font-semibold text-charcoal bg-clay hover:bg-clay/90 rounded-md transition-colors ring-1 ring-charcoal/10"
                            >
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
          <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">Stay Updated</h3>
          <p className="text-charcoal/80 mb-6">
            Get notified when new resources become available. Join our community for the latest therapeutic tools and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent"
            />
            <button className="px-6 py-2 bg-clay text-charcoal font-semibold rounded-md hover:bg-clay/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 rounded-2xl bg-bark text-cream p-6 md:p-8 ring-1 ring-cream/15">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Ready to begin your healing journey?</h3>
            <p className="mt-2 text-cream/85">Book a free consultation to explore how our faith-centered approach can support your growth.</p>
          </div>
          <div className="md:justify-self-end">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}