'use client'

import { useState } from 'react'
import { Resource } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import GatedDownloadButton from './GatedDownloadButton'

interface ResourcePreviewModalProps {
  resource: Resource | null
  isOpen: boolean
  onClose: () => void
}

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

export default function ResourcePreviewModal({ resource, isOpen, onClose }: ResourcePreviewModalProps) {
  const isGated = Boolean(resource?.requiresEmailGate || (resource && isForcedGatedResource(resource)))

  if (!resource || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      
      <div className="relative w-full max-w-4xl mx-4 rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg ring-1 ring-charcoal/10 transition-all duration-200"
        >
          <svg className="w-5 h-5 text-charcoal/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-[4/3] w-full bg-sand/30 overflow-hidden">
            {resource.previewImage?.asset && (
              <Image
                src={urlFor(resource.previewImage).width(600).height(450).auto('format').url()}
                alt={getResourceImageAlt(resource)}
                fill
                className="object-contain"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {!resource.previewImage?.asset && resource.pdfFile?.asset?.url && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
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
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-10 flex flex-col">
            {/* Badges */}
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

            {/* Title */}
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-tight">
              {resource.title}
            </h2>

            {/* Description */}
            {resource.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-charcoal mb-2">Description</h3>
                <p className="text-charcoal/80 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-charcoal mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-clay/10 text-clay text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* File Info */}
            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-2">File Information</h3>
              <div className="space-y-1 text-sm text-charcoal/70">
                <p>Format: PDF Document</p>
                {resource.pdfFile?.asset?.size && (
                  <p>Size: {formatFileSize(resource.pdfFile.asset.size)}</p>
                )}
                <p>Type: {resource.category || 'Resource'}</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-auto pt-6">
              {resource.pdfFile?.asset?.url && (
                <GatedDownloadButton
                  requiresEmailGate={isGated}
                  downloadUrl={resource.pdfFile.asset.url}
                  fileName={resource.pdfFile.asset.originalFilename}
                  resourceTitle={resource.title}
                  resourceSlug={resource.slug.current}
                  className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-cream bg-gradient-to-r from-clay to-bark hover:from-clay/90 hover:to-bark/90 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
