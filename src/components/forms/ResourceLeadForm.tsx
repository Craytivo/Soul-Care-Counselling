"use client"

import { FormEvent, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function ResourceLeadForm() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubmitState>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return

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
        setMessage(payload.message || 'Unable to subscribe right now.')
        return
      }

      setStatus('success')
      setMessage(payload.message || 'You are subscribed.')
      setEmail('')
      setFirstName('')
    } catch {
      setStatus('error')
      setMessage('Unable to subscribe right now.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-md mx-auto">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name (optional)"
          className="px-4 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent"
          autoComplete="given-name"
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
          {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
        <a
          href="/contact"
          className="px-6 py-2 bg-white text-charcoal font-semibold rounded-md ring-1 ring-charcoal/15 hover:bg-charcoal/5 transition-colors"
        >
          Need something specific?
        </a>
      </div>

      <p
        className={`text-sm min-h-[1.25rem] ${
          status === 'error'
            ? 'text-red-700'
            : status === 'success'
              ? 'text-green-700'
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

