'use client'

import { cn } from '@/lib/cn'

const defaultClasses = 'inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-sm font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-sand/90'

export default function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(defaultClasses, className)}
      aria-label="Print or download this page"
    >
      Print / Save
    </button>
  )
}
