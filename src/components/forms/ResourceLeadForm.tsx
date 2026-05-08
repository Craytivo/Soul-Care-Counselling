'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackLeadFormSubmit } from '@/lib/tracking'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

export default function ResourceLeadForm() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState<SubmitState>('idle')
  const [message, setMessage] = useState('')
  const mailerLiteGroupId = process.env.NEXT_PUBLIC_MAILERLITE_GROUP_ID

  const isFormValid = firstName.trim() && validateEmail(email)

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
          source: 'resources',
        }),
      })

      const payload = (await response.json().catch(() => ({}))) as { message?: string }
      if (!response.ok) {
        setStatus('error')
        setMessage(
          payload.message || 'We could not complete your request right now. Please try again.'
        )
        return
      }

      trackLeadFormSubmit({
        formName: 'resource-lead-form',
        source: 'resources',
        method: 'api_subscribe',
      })
      router.push('/thank-you')
    } catch {
      setStatus('error')
      setMessage('We could not complete your request right now. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" data-mailerlite-embed="resources">
      <p className="mb-1 text-xs text-charcoal/50">
        Receive practical, compassionate tools by email. Unsubscribe any time.
      </p>
      {mailerLiteGroupId && <input type="hidden" name="ml_group_id" value={mailerLiteGroupId} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="relative">
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
            className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-clay/30 focus:outline-none focus:ring-2 focus:ring-clay/50"
            autoComplete="given-name"
            required
            aria-label="First name"
          />
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
            onBlur={handleEmailBlur}
            placeholder="Enter your email"
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
              emailError
                ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                : 'border-charcoal/15 focus:border-clay/30 focus:ring-clay/50'
            }`}
            autoComplete="email"
            required
            aria-label="Email address"
            aria-invalid={emailError ? 'true' : 'false'}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {emailError}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting' || !isFormValid}
        className="w-full rounded-xl bg-clay px-6 py-3 text-sm font-semibold text-cream shadow-md transition-all duration-200 hover:bg-bark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Subscribing...
          </span>
        ) : (
          'Get Free Resources'
        )}
      </button>

      <p
        className={`min-h-[1.25rem] text-sm ${
          status === 'error' ? 'text-red-700' : 'text-charcoal/70'
        }`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  )
}
