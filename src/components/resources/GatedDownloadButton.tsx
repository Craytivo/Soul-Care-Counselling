'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackLeadFormSubmit } from '@/lib/tracking'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

interface GatedDownloadButtonProps {
  requiresEmailGate?: boolean
  downloadUrl: string
  fileName?: string
  resourceTitle: string
  resourceSlug: string
  className?: string
}

type GateStatus = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

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
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState<GateStatus>('idle')
  const [message, setMessage] = useState('')

  const isFormValid = firstName.trim() && validateEmail(email)

  const defaultButtonClasses =
    'inline-flex items-center px-4 py-2 text-sm font-semibold text-charcoal bg-clay hover:bg-clay/90 rounded-md transition-colors ring-1 ring-charcoal/10'

  if (!requiresEmailGate) {
    return (
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        download={fileName}
        className={cn(defaultButtonClasses, className)}
      >
        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError && validateEmail(value)) {
      setEmailError('')
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Client-side validation
    if (!isFormValid) {
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address')
      }
      return
    }

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
        setMessage(
          payload.message || 'We could not unlock this download right now. Please try again.'
        )
        return
      }

      // Show success state first
      setStatus('success')
      trackLeadFormSubmit({
        formName: 'resource-gated-download',
        source: `resource-download:${resourceSlug}`,
        method: 'api_subscribe',
      })

      // Sequential flow: wait for user to see success, then download and redirect
      setTimeout(() => {
        // Open download in new tab
        const downloadWindow = window.open(downloadUrl, '_blank', 'noopener,noreferrer')

        // If popup blocked, show message to user
        if (
          !downloadWindow ||
          downloadWindow.closed ||
          typeof downloadWindow.closed === 'undefined'
        ) {
          setStatus('error')
          setMessage(
            'Download started! If it did not open, please check your popup settings or click the link in your email.'
          )
          return
        }

        // Wait then redirect to thank-you page
        setTimeout(() => {
          setOpen(false)
          setStatus('idle')
          setMessage('')
          setEmail('')
          setFirstName('')
          setEmailError('')
          router.push('/thank-you')
        }, 500)
      }, 1500)
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
        className={cn(defaultButtonClasses, className)}
      >
        Get Access
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="relative mx-4 w-full max-w-md scale-100 transform rounded-2xl bg-white p-7 opacity-100 shadow-xl ring-1 ring-charcoal/5 transition-all duration-300">
              {/* Close button */}
              <button
                onClick={() => {
                  setOpen(false)
                  setStatus('idle')
                  setMessage('')
                }}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5 transition-colors hover:bg-charcoal/10"
              >
                <svg
                  className="h-4 w-4 text-charcoal/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header with resource preview */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-clay/10">
                  <svg
                    className="h-5 w-5 text-clay"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
                <h4 className="mb-1.5 font-heading text-xl font-semibold tracking-tight text-charcoal">
                  Get Instant Access
                </h4>
                <p className="text-sm leading-relaxed text-charcoal/70">
                  Download{' '}
                  <span className="font-medium text-clay">&quot;{resourceTitle}&quot;</span> after
                  signing up
                </p>
              </div>

              {/* Value proposition */}
              <div className="mb-6 rounded-xl bg-sand/30 p-4 ring-1 ring-charcoal/5">
                <div className="mb-2.5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay" />
                  <span className="text-sm text-charcoal/80">Immediate download access</span>
                </div>
                <div className="mb-2.5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay" />
                  <span className="text-sm text-charcoal/80">Weekly practical resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay" />
                  <span className="text-sm text-charcoal/80">Unsubscribe anytime</span>
                </div>
              </div>

              {status === 'success' ? (
                <div className="py-8 text-center">
                  <div className="bg-green/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg
                      className="text-green h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="mb-2 font-heading text-lg font-semibold text-charcoal">
                    All set!
                  </h4>
                  <p className="text-sm text-charcoal/70">
                    Check your inbox for the download link and more resources.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1 block text-xs font-medium text-charcoal/70"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Your first name"
                      className="w-full rounded-full border border-charcoal/10 px-4 py-2.5 text-sm transition-all duration-200 focus:border-clay/40 focus:outline-none focus:ring-2 focus:ring-clay/40"
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-xs font-medium text-charcoal/70"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => handleEmailChange(event.target.value)}
                      onBlur={handleEmailBlur}
                      placeholder="Your email address"
                      className={`w-full rounded-full border px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
                        emailError
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                          : 'border-charcoal/10 focus:border-clay/40 focus:ring-clay/40'
                      }`}
                      autoComplete="email"
                      required
                      aria-invalid={emailError ? 'true' : 'false'}
                      aria-describedby={emailError ? 'email-error' : undefined}
                    />
                    {emailError && (
                      <p id="email-error" className="mt-1 text-xs text-red-600">
                        {emailError}
                      </p>
                    )}
                  </div>

                  {message && (
                    <div className="rounded-xl border border-red-200/60 bg-red-50/80 p-3">
                      <p className="text-sm text-red-700" role="status" aria-live="polite">
                        {message}
                      </p>
                    </div>
                  )}

                  {/* Privacy assurance */}
                  <p className="text-xs leading-relaxed text-charcoal/50">
                    We respect your privacy. Unsubscribe with one click.
                  </p>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={status === 'submitting' || !isFormValid}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-cream transition-all duration-200 hover:bg-clay/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg
                            className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
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
                        setEmailError('')
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-charcoal/70 ring-1 ring-charcoal/10 transition-all duration-200 hover:bg-charcoal/5"
                    >
                      Maybe Later
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
