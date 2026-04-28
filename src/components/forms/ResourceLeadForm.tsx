"use client"

import { FormEvent, useState } from 'react'
import { trackConsultationClick, trackLeadFormSubmit } from '@/lib/tracking'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function ResourceLeadForm() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubmitState>('idle')
  const [message, setMessage] = useState('')
  const bookingUrl = 'https://thesoulcarecounsellor.janeapp.com'
  const mailerLiteGroupId = process.env.NEXT_PUBLIC_MAILERLITE_GROUP_ID

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !firstName.trim()) return

    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
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
        setMessage(payload.message || 'We could not complete your request right now. Please try again.')
        return
      }

      setStatus('success')
      trackLeadFormSubmit({
        formName: 'resource-lead-form',
        source: 'resources',
        method: 'api_waitlist',
      })
      setMessage(payload.message || 'Thanks for signing up. Your resource updates are on the way.')
      setEmail('')
      setFirstName('')
    } catch {
      setStatus('error')
      setMessage('We could not complete your request right now. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-5 text-left ring-1 ring-charcoal/10">
        <h4 className="font-heading text-lg font-semibold">You are in, and we are glad you are here.</h4>
        <p className="mt-2 text-sm text-charcoal/80">
          {message} If you want support that is tailored to your story, you can book a consultation with Jessica.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConsultationClick({
                location: 'resource-lead-thank-you',
                label: 'Book a Consultation',
                url: bookingUrl,
              })
            }
            className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
          >
            Book a Consultation
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus('idle')
              setMessage('')
            }}
            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/15 hover:bg-charcoal/5"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-md mx-auto" data-mailerlite-embed="resources">
      <p className="text-sm text-charcoal/75">
        Receive practical, compassionate tools by email. We respect your inbox and you can unsubscribe any time.
      </p>
      {mailerLiteGroupId && <input type="hidden" name="ml_group_id" value={mailerLiteGroupId} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
          className="px-4 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent"
          autoComplete="given-name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent"
          autoComplete="email"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-6 py-2 bg-clay text-charcoal font-semibold rounded-md hover:bg-clay/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Saving your details...' : 'Send Me the Free Resources'}
        </button>
        <a
          href="/contact"
          className="px-6 py-2 bg-white text-charcoal font-semibold rounded-md ring-1 ring-charcoal/15 hover:bg-charcoal/5 transition-colors"
        >
          Request a specific resource
        </a>
      </div>

      <p
        className={`text-sm min-h-[1.25rem] ${
          status === 'error'
            ? 'text-red-700'
            : 'text-charcoal/70'
        }`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  )
}
