"use client"

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackLeadFormSubmit } from '@/lib/tracking'

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
      <button type="button" onClick={() => setOpen(true)} className={buttonClassName}>
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm-7 8v-3a4 4 0 014-4h6a4 4 0 014 4v3"
          />
        </svg>
        Get Instant Access
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-lg">
            <h4 className="font-heading text-xl font-semibold">Get Premium Access</h4>
            <p className="mt-2 text-sm text-charcoal/80">
              Enter your first name and email for immediate access to <span className="font-medium">{resourceTitle}</span>. We only send practical resources and you can unsubscribe any time.
            </p>

            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First name"
                className="w-full px-3 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay"
                autoComplete="given-name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="w-full px-3 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay"
                autoComplete="email"
                required
              />

              {message && (
                <p className="text-sm text-red-700" role="status" aria-live="polite">
                  {message}
                </p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center rounded-md bg-bark px-4 py-2 font-semibold text-cream hover:bg-bark/90 disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Preparing access...' : 'Unlock My Download'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setStatus('idle')
                    setMessage('')
                  }}
                  className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 font-semibold text-charcoal ring-1 ring-charcoal/15 hover:bg-charcoal/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
