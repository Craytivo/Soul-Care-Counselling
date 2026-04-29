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
          <div className="relative w-full max-w-lg mx-4 rounded-3xl bg-white p-8 ring-1 ring-charcoal/10 shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-clay to-bark flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h4 className="font-heading text-2xl font-bold text-charcoal mb-2">Get Instant Access</h4>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Download <span className="font-semibold text-clay">&quot;{resourceTitle}&quot;</span> immediately after signing up
              </p>
            </div>

            {/* Value proposition */}
            <div className="bg-gradient-to-r from-sand/50 to-cream/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-charcoal">Immediate download access</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-charcoal">Weekly practical resources</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-charcoal">Unsubscribe anytime</span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-1">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:border-clay/50 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:border-clay/50 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  autoComplete="email"
                  required
                />
              </div>

              {message && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm text-red-700" role="status" aria-live="polite">
                    {message}
                  </p>
                </div>
              )}

              {/* Privacy assurance */}
              <div className="flex items-start gap-2 text-xs text-charcoal/60">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-4.25 9.5-9.5 9.5s-9.5-4.275-9.5-9.5c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>We respect your privacy and will never share your information. Unsubscribe with one click.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-clay to-bark px-6 py-3 font-semibold text-cream hover:from-clay/90 hover:to-bark/90 disabled:opacity-70 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Preparing your download...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Get Instant Access
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setStatus('idle')
                    setMessage('')
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-charcoal ring-1 ring-charcoal/15 hover:bg-charcoal/5 transition-all duration-200"
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
