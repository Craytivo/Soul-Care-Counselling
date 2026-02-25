import type { ReactNode } from 'react'

export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="ui-card p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sand ring-1 ring-charcoal/10">
        <svg className="h-7 w-7 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-heading text-lg font-semibold text-charcoal">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-charcoal/70">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
