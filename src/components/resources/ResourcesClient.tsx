'use client'

import { useState, useMemo } from 'react'
import { Resource } from '@/lib/sanity'
import ResourceCard from './ResourceCard'
import GatedDownloadButton from './GatedDownloadButton'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

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

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

interface FeaturedResourceCardProps {
  resource: Resource
}

function FeaturedResourceCard({ resource }: FeaturedResourceCardProps) {
  const isGated = Boolean(resource.requiresEmailGate || isForcedGatedResource(resource))

  return (
    <div className="group rounded-3xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-300 shadow-sm hover:shadow-lg">
      <div className="md:grid md:grid-cols-2 md:gap-0">
        {resource.previewImage?.asset && (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand/30">
            <Image
              src={urlFor(resource.previewImage).width(400).height(300).auto('format').url()}
              alt={getResourceImageAlt(resource)}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        {!resource.previewImage?.asset && resource.pdfFile?.asset?.url && (
          <div className="relative h-80 md:h-auto md:aspect-[4/3] bg-gradient-to-br from-sand to-cream flex items-center justify-center overflow-hidden">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-clay/20 to-clay/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-clay" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-charcoal">PDF Document</span>
              {resource.pdfFile?.asset?.size && (
                <div className="text-sm text-charcoal/60 mt-2">
                  {formatFileSize(resource.pdfFile.asset.size)}
                </div>
              )}
            </div>
          </div>
        )}
        <div className={`p-8 md:p-10 ${!resource.previewImage?.asset ? 'md:col-span-2' : ''}`}>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {resource.category && (
              <span className="px-3 py-1.5 bg-sand/50 text-charcoal text-xs font-medium rounded-full border border-sand/50">
                {resource.category}
              </span>
            )}
            {isGated && (
              <span className="px-3 py-1.5 bg-bark text-cream text-xs font-medium rounded-full">
                Email required
              </span>
            )}
            {resource.pdfFile?.asset?.size && (
              <span className="px-3 py-1.5 bg-charcoal/5 text-charcoal/70 text-xs font-medium rounded-full">
                {formatFileSize(resource.pdfFile.asset.size)}
              </span>
            )}
          </div>
          
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-charcoal leading-tight">
            {resource.title}
          </h3>
          
          {resource.description && (
            <p className="text-charcoal/80 mb-6 leading-relaxed text-lg line-clamp-3">
              {resource.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay to-bark flex items-center justify-center shadow-lg">
                <span className="text-cream font-bold text-sm">
                  SC
                </span>
              </div>
              <div>
                <p className="font-semibold text-charcoal">Soul Care Counselling</p>
                <p className="text-charcoal/60 text-sm">Professional Resources</p>
              </div>
            </div>
            
            {resource.pdfFile?.asset?.url && (
              <GatedDownloadButton
                requiresEmailGate={isGated}
                downloadUrl={resource.pdfFile.asset.url}
                fileName={resource.pdfFile.asset.originalFilename}
                resourceTitle={resource.title}
                resourceSlug={resource.slug.current}
                className="inline-flex items-center px-6 py-3 font-semibold text-cream bg-gradient-to-r from-clay to-bark hover:from-clay/90 hover:to-bark/90 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResourcesClientProps {
  allResources: Resource[]
  featuredResources: Resource[]
}

export default function ResourcesClient({ allResources, featuredResources }: ResourcesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Resources')

  const filteredResources = useMemo(() => {
    if (selectedCategory === 'All Resources') {
      return allResources
    }
    return allResources.filter(resource => resource.category === selectedCategory)
  }, [allResources, selectedCategory])

  const filteredFeaturedResources = useMemo(() => {
    if (selectedCategory === 'All Resources') {
      return featuredResources
    }
    return featuredResources.filter(resource => resource.category === selectedCategory)
  }, [featuredResources, selectedCategory])

  return (
    <>
      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-charcoal/10 py-4 -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === selectedCategory
                  ? 'bg-gradient-to-r from-clay to-bark text-cream shadow-lg ring-2 ring-clay/20'
                  : 'bg-white text-charcoal/80 hover:text-charcoal ring-1 ring-charcoal/10 hover:ring-clay/30 hover:bg-clay/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-charcoal/70">
          {selectedCategory === 'All Resources' 
            ? `Showing all ${allResources.length} resources`
            : `Showing ${filteredResources.length} ${selectedCategory.toLowerCase()}`
          }
        </p>
      </section>

      {allResources.length === 0 ? (
        <section className="mt-16">
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sand flex items-center justify-center">
              <svg className="w-10 h-10 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">No resources yet</h3>
            <p className="text-charcoal/70 mb-8 max-w-md mx-auto">
              We're preparing helpful resources to share with you. Check back soon for worksheets, guides, and therapeutic materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://thesoulcarecounsellor.janeapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-semibold text-cream bg-gradient-to-r from-clay to-bark hover:from-clay/90 hover:to-bark/90 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book a Free Consultation
              </a>
              <a href="/contact" className="inline-flex items-center px-6 py-3 font-semibold text-charcoal bg-white hover:bg-sand/50 rounded-full transition-all duration-300 ring-1 ring-charcoal/10 hover:ring-clay/30">
                Contact Our Team
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Resources */}
          {filteredFeaturedResources.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading text-3xl font-bold text-charcoal">
                  {selectedCategory === 'All Resources' ? 'Featured Resources' : `Featured ${selectedCategory}`}
                </h2>
                <div className="flex items-center gap-2 text-clay">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">Featured</span>
                </div>
              </div>
              <div className="space-y-8">
                {filteredFeaturedResources.map((resource) => (
                  <FeaturedResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            </section>
          )}

          {/* All Resources Grid */}
          <section className="mt-16">
            <h2 className="font-heading text-3xl font-bold mb-8 text-charcoal">
              {selectedCategory === 'All Resources' ? 'All Resources' : `All ${selectedCategory}`}
            </h2>
            {filteredResources.filter(resource => !resource.isFeatured).length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.filter(resource => !resource.isFeatured).map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-charcoal/70">
                  No {selectedCategory.toLowerCase()} available yet. Check back soon!
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </>
  )
}
