'use client'

import { Resource } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import GatedDownloadButton from './GatedDownloadButton'

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

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const isGated = Boolean(resource.requiresEmailGate || isForcedGatedResource(resource))

  return (
    <article className="group h-full rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {resource.previewImage?.asset && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand/30">
          <Image
            src={urlFor(resource.previewImage).width(400).height(300).auto('format').url()}
            alt={getResourceImageAlt(resource)}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
