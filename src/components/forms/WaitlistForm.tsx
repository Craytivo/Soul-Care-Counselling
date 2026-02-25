'use client'

import { FormEvent, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      email: String(formData.get('email') || ''),
      firstName: String(formData.get('firstName') || ''),
      source: 'shop',
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setStatus('error')
        setMessage(data?.message || 'Unable to join waitlist right now.')
        return
      }

      setStatus('success')
      setMessage(data?.message || 'You are on the waitlist.')
      form.reset()
    } catch {
      setStatus('error')
      setMessage('Unable to join waitlist right now.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 w-full max-w-2xl">
      <div className="grid gap-3 sm:grid-cols-[1fr_1.3fr_auto]">
        <input
          type="text"
          name="firstName"
          placeholder="First name (optional)"
          className="ui-input border-cream/30 bg-cream/10 text-cream placeholder:text-cream/65"
          autoComplete="given-name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="ui-input border-cream/30 bg-cream/10 text-cream placeholder:text-cream/65"
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="ui-btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </div>
      {message && (
        <p className={`mt-3 text-sm ${status === 'success' ? 'text-cream/95' : 'text-red-200'}`}>{message}</p>
      )}
    </form>
  )
}
