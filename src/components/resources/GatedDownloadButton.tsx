"use client"

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackLeadFormSubmit } from '@/lib/tracking'
import { createPortal } from 'react-dom'

interface GatedDownloadButtonProps {
  requiresEmailGate?: boolean
  downloadUrl: string
  fileName?: string
  resourceTitle: string
  resourceSlug: string
  className?: string
}

type GateStatus = 'idle' | 'submitting' | 'error'

export default function GatedDownloadButton({
  requiresEmailGate = false,
  downloadUrl,
  fileName,
  resourceTitle,
  resourceSlug,
  className,
}: GatedDownloadButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<GateStatus>('idle')
  const [message, setMessage] = useState('')

  const buttonClassName = useMemo(
    () =>
      className ||
      'inline-flex items-center px-4 py-2 text-sm font-semibold text-charcoal bg-clay hover:bg-clay/90 rounded-md transition-colors ring-1 ring-charcoal/10',
    [className]
  )

  if (!requiresEmailGate) {
    return (
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        download={fileName}
        className={buttonClassName}
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Download
      </a>
    )
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          source: `resource-download:${resourceSlug}`,
        }),
      })
      const payload = (await response.json().catch(() => ({}))) as { message?: string }
      if (!response.ok) {
        setStatus('error')
        setMessage(payload.message || 'We could not unlock this download right now. Please try again.')
        return
      }

      setOpen(false)
      setStatus('idle')
      setMessage('')
      trackLeadFormSubmit({
        formName: 'resource-gated-download',
        source: `resource-download:${resourceSlug}`,
        method: 'api_subscribe',
      })
      setEmail('')
      setFirstName('')
      window.open(downloadUrl, '_blank', 'noopener,noreferrer')
      router.push('/thank-you')
    } catch {
      setStatus('error')
      setMessage('We could not unlock this download right now. Please try again.')
    }
  }

  return (
    <>
      <button 
        type="button" 
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }} 
        className={buttonClassName}
      >
        Get Access
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white p-7 ring-1 ring-charcoal/5 shadow-xl transform transition-all duration-300 scale-100 opacity-100">
            {/* Close button */}
            <button
              onClick={() => {
                setOpen(false)
                setStatus('idle')
                setMessage('')
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors"
            >
              <svg className="w-4 h-4 text-charcoal/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header with resource preview */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-clay/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h4 className="font-heading text-xl font-semibold text-charcoal mb-1.5 tracking-tight">Get Instant Access</h4>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Download <span className="font-medium text-clay">&quot;{resourceTitle}&quot;</span> after signing up
              </p>
            </div>

            {/* Value proposition */}
            <div className="bg-sand/30 rounded-xl p-4 mb-6 ring-1 ring-charcoal/5">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0" />
                <span className="text-sm text-charcoal/80">Immediate download access</span>
              </div>
              <div className="flex items-center gap-3 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0" />
                <span className="text-sm text-charcoal/80">Weekly practical resources</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0" />
                <span className="text-sm text-charcoal/80">Unsubscribe anytime</span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-charcoal/70 mb-1">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Your first name"
                  className="w-full px-4 py-2.5 rounded-full border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-clay/40 focus:border-clay/40 transition-all duration-200 text-sm"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-charcoal/70 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-full border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-clay/40 focus:border-clay/40 transition-all duration-200 text-sm"
                  autoComplete="email"
                  required
                />
              </div>

              {message && (
                <div className="bg-red-50/80 border border-red-200/60 rounded-xl p-3">
                  <p className="text-sm text-red-700" role="status" aria-live="polite">
                    {message}
                  </p>
                </div>
              )}

              {/* Privacy assurance */}
              <p className="text-xs text-charcoal/50 leading-relaxed">
                We respect your privacy. Unsubscribe with one click.
              </p>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-clay px-6 py-2.5 font-semibold text-cream hover:bg-clay/90 disabled:opacity-70 transition-all duration-200 text-sm"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Preparing download...
                    </>
                  ) : (
                    'Get Instant Access'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setStatus('idle')
                    setMessage('')
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 font-medium text-charcoal/70 ring-1 ring-charcoal/10 hover:bg-charcoal/5 transition-all duration-200 text-sm"
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
