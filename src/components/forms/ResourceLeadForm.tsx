"use client"

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackLeadFormSubmit } from '@/lib/tracking'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function ResourceLeadForm() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubmitState>('idle')
  const [message, setMessage] = useState('')
  const mailerLiteGroupId = process.env.NEXT_PUBLIC_MAILERLITE_GROUP_ID

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !firstName.trim()) return

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
        setMessage(payload.message || 'We could not complete your request right now. Please try again.')
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
      <p className="text-xs text-charcoal/50 mb-1">
        Receive practical, compassionate tools by email. Unsubscribe any time.
      </p>
      {mailerLiteGroupId && <input type="hidden" name="ml_group_id" value={mailerLiteGroupId} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
          className="px-4 py-2.5 rounded-full border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent text-sm"
          autoComplete="given-name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2.5 rounded-full border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent text-sm"
          autoComplete="email"
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-6 py-2.5 bg-clay text-charcoal font-semibold rounded-full hover:bg-clay/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
      >
        {status === 'submitting' ? 'Saving your details...' : 'Send Me the Free Resources'}
      </button>

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
