import type { ReactNode } from 'react'

export default function LoadingState({
  message = 'Loading...',
  className = 'min-h-[60vh]',
}: {
  message?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-clay"></div>
        <p className="mt-3 text-sm text-charcoal/60">{message}</p>
      </div>
    </div>
  )
}
