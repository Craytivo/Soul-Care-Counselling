"use client"

import React, { useState } from 'react'

type Heading = { id: string; text: string; level: number }

export default function LegalTOC({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false)

  if (!headings || headings.length === 0) return null

  return (
    <div>
      {/* Mobile: collapsible */}
      <div className="md:hidden mb-4">
        <button
          className="w-full flex items-center justify-between rounded-md bg-sand/60 px-4 py-2 text-sm font-semibold text-charcoal"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="legal-toc-mobile"
        >
          <span>Contents</span>
          <span className="text-charcoal/60">{open ? 'Hide' : 'Show'}</span>
        </button>
        {open && (
          <div id="legal-toc-mobile" className="mt-2 rounded-lg border border-charcoal/8 bg-white/50 p-3">
            <ul className="space-y-1 text-sm text-charcoal/85">
              {headings.map(h => (
                <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                  <a href={`#${h.id}`} className="underline text-clay hover:text-bark">{h.text}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop: sticky - render headings in two columns (balanced) */}
      <div className="hidden md:block md:sticky md:top-24 md:self-start mb-4 w-64">
        <div className="rounded-lg border border-charcoal/8 bg-white/50 p-4">
          <strong className="block text-sm text-charcoal/80 mb-2">Contents</strong>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-charcoal/85">
            {(() => {
              const mid = Math.ceil(headings.length / 2)
              const left = headings.slice(0, mid)
              const right = headings.slice(mid)
              return (
                <>
                  <ul className="space-y-1">
                    {left.map(h => (
                      <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                        <a href={`#${h.id}`} className="underline text-clay hover:text-bark">{h.text}</a>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {right.map(h => (
                      <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                        <a href={`#${h.id}`} className="underline text-clay hover:text-bark">{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
