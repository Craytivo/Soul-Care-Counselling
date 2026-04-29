'use client'

import { useState, useMemo } from 'react'
import { Resource } from '@/lib/sanity'
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

// Inline ResourceCard component to avoid import issues
function InlineResourceCard({ resource }: { resource: Resource }) {
  const isGated = Boolean(resource.requiresEmailGate || isForcedGatedResource(resource))

  return (
    <article className="group h-full rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/20 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {resource.previewImage?.asset && (
        <div className="relative w-full overflow-hidden bg-sand/30" style={{ aspectRatio: '4/3', minHeight: '300px' }}>
          <Image
            src={urlFor(resource.previewImage).width(400).height(300).auto('format').url()}
            alt={getResourceImageAlt(resource)}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-102"
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      {!resource.previewImage?.asset && resource.pdfFile?.asset?.url && (
        <div className="relative h-56 bg-gradient-to-br from-sand to-cream flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-clay/20 to-clay/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-clay" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-charcoal">PDF Document</span>
            {resource.pdfFile?.asset?.size && (
              <div className="text-xs text-charcoal/60 mt-1">
                {formatFileSize(resource.pdfFile.asset.size)}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {resource.category && (
            <span className="px-2.5 py-1 bg-sand/50 text-charcoal text-xs font-medium rounded-full border border-sand/50">
              {resource.category}
            </span>
          )}
          {isGated && (
            <span className="px-2.5 py-1 bg-bark text-cream text-xs font-medium rounded-full">
              Email required
            </span>
          )}
          {resource.pdfFile?.asset?.size && (
            <span className="px-2.5 py-1 bg-charcoal/5 text-charcoal/70 text-xs font-medium rounded-full">
              {formatFileSize(resource.pdfFile.asset.size)}
            </span>
          )}
        </div>
      
        <h3 className="font-heading font-semibold mb-3 text-lg text-charcoal leading-tight">
          {resource.title}
        </h3>
        
        {resource.description && (
          <p className="text-charcoal/80 mb-4 leading-relaxed text-sm line-clamp-3">
            {resource.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-clay to-bark flex items-center justify-center shadow-md">
              <span className="text-cream font-bold text-xs">
                SC
              </span>
            </div>
            <div>
              <p className="font-medium text-xs text-charcoal">Soul Care Counselling</p>
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
              className="inline-flex items-center px-3 py-2 font-semibold text-cream bg-gradient-to-r from-clay to-bark hover:from-clay/90 hover:to-bark/90 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 text-sm"
            />
          )}
        </div>
      </div>
    </article>
  )
}

interface FeaturedResourceCardProps {
  resource: Resource
}

function FeaturedResourceCard({ resource }: FeaturedResourceCardProps) {
  const isGated = Boolean(resource.requiresEmailGate || isForcedGatedResource(resource))

  return (
    <div className="group rounded-3xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/20 transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="md:grid md:grid-cols-2 md:gap-0">
        {resource.previewImage?.asset && (
          <div className="relative w-full overflow-hidden bg-sand/30" style={{ aspectRatio: '4/3', minHeight: '300px' }}>
            <Image
              src={urlFor(resource.previewImage).width(400).height(300).auto('format').url()}
              alt={getResourceImageAlt(resource)}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-102"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
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
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = useMemo(() => {
    let filtered = allResources
    
    // Debug: Log available categories
    console.log('Available categories:', allResources.map(r => ({ title: r.title, category: r.category })))
    
    // Filter by category (case-insensitive and partial match)
    if (selectedCategory !== 'All Resources') {
      filtered = filtered.filter(resource => {
        const resourceCategory = resource.category?.toLowerCase().trim()
        const selectedCategoryLower = selectedCategory.toLowerCase().trim()
        
        // Exact match or partial match
        return resourceCategory === selectedCategoryLower ||
               resourceCategory?.includes(selectedCategoryLower) ||
               selectedCategoryLower.includes(resourceCategory)
      })
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.category?.toLowerCase().includes(query) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    console.log(`Filtered ${filtered.length} resources for category: ${selectedCategory}`)
    return filtered
  }, [allResources, selectedCategory, searchQuery])

  const filteredFeaturedResources = useMemo(() => {
    let filtered = featuredResources
    
    // Filter by category (case-insensitive and partial match)
    if (selectedCategory !== 'All Resources') {
      filtered = filtered.filter(resource => {
        const resourceCategory = resource.category?.toLowerCase().trim()
        const selectedCategoryLower = selectedCategory.toLowerCase().trim()
        
        // Exact match or partial match
        return resourceCategory === selectedCategoryLower ||
               resourceCategory?.includes(selectedCategoryLower) ||
               selectedCategoryLower.includes(resourceCategory)
      })
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.category?.toLowerCase().includes(query) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return filtered
  }, [featuredResources, selectedCategory, searchQuery])

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category)
    setSelectedCategory(category)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <>
      {/* Search and Filter Header */}
      <section className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-charcoal/10 py-4 -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search resources by title, description, or tags..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-clay/50 focus:border-clay/50 transition-all duration-200 text-charcoal placeholder-charcoal/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-charcoal/40 hover:text-charcoal/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                category === selectedCategory
                  ? 'bg-gradient-to-r from-clay to-bark text-cream shadow-md ring-1 ring-clay/30'
                  : 'bg-white text-charcoal/80 hover:text-charcoal ring-1 ring-charcoal/10 hover:ring-clay/20 hover:bg-clay/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Results Counter */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-charcoal/70">
            {searchQuery && `Found ${filteredResources.length} result${filteredResources.length !== 1 ? 's' : ''} for "${searchQuery}"`}
            {!searchQuery && selectedCategory === 'All Resources' && `Showing all ${allResources.length} resources`}
            {!searchQuery && selectedCategory !== 'All Resources' && `Showing ${filteredResources.length} ${selectedCategory.toLowerCase()}`}
          </p>
          {(searchQuery || selectedCategory !== 'All Resources') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All Resources')
              }}
              className="text-sm text-clay hover:text-clay/80 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
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
              We&apos;re preparing helpful resources to share with you. Check back soon for worksheets, guides, and therapeutic materials.
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
                  <InlineResourceCard key={resource._id} resource={resource} />
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
