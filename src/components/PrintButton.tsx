"use client"

import React from 'react'

export default function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className || 'inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-sm font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-sand/90'}
      aria-label="Print or download this page"
    >
      Print / Save
    </button>
  )
}
