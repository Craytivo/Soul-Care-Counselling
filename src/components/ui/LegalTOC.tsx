'use client'

import React, { useState } from 'react'

type Heading = { id: string; text: string; level: number }

export default function LegalTOC({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false)

  if (!headings || headings.length === 0) return null

  return (
    <div>
      {/* Toggle button (mobile only) */}
      <div className="mb-4 md:hidden">
        <button
          className="flex w-full items-center justify-between rounded-md bg-sand/60 px-4 py-2 text-sm font-semibold text-charcoal"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="legal-toc"
        >
          <span>Contents</span>
          <span className="text-charcoal/60">{open ? 'Hide' : 'Show'}</span>
        </button>
      </div>

      {/* Contents box: visible on md+ or when mobile toggle is open. Full width so it matches content width. */}
      <div className={`${open ? 'block' : 'hidden'} mb-6 md:block`} id="legal-toc">
        <div className="border-charcoal/8 w-full rounded-lg border bg-white/50 p-4">
          <strong className="mb-2 block text-sm text-charcoal/80">Contents</strong>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-charcoal/85 md:grid-cols-2">
            {(() => {
              const mid = Math.ceil(headings.length / 2)
              const left = headings.slice(0, mid)
              const right = headings.slice(mid)
              return (
                <>
                  <ul className="space-y-1">
                    {left.map((h) => (
                      <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                        <a href={`#${h.id}`} className="text-clay underline hover:text-bark">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {right.map((h) => (
                      <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                        <a href={`#${h.id}`} className="text-clay underline hover:text-bark">
                          {h.text}
                        </a>
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
