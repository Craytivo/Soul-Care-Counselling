'use client'

import type { Metadata } from 'next'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Soul Care — Contact',
  description: 'Contact Soul Care Christian Counselling. Book a free consultation, send a message, or reach us by email.',
}

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('Sending…')

    // Collect form data
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      // Open mail client prefilled (no backend)
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\nSubject: ${data.subject}\n\n${data.message}`
      )
      window.location.href = `mailto:info@thesoulcarecounsellor.com?subject=${encodeURIComponent('[Website] ' + data.subject)}&body=${body}`

      // Optimistic success UI
      setFormStatus('Opening your email app…')
      setTimeout(() => { 
        setFormStatus('Thanks! If your mail app did not open, please email us directly.') 
      }, 1500)
    } catch (err) {
      console.error(err)
      setFormStatus('Something went wrong—please email us directly.')
    }
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            Contact
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">We&apos;d love to hear from you</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Reach out with questions, request a free consultation, or send us a message. We typically respond within 1–2 business days.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a 
              href="mailto:info@thesoulcarecounsellor.com" 
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-cream/20"
            >
              Email Us
            </a>
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-cream/10 px-5 py-2.5 font-semibold text-cream hover:bg-cream/15 ring-1 ring-cream/20"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mt-14 md:mt-16 grid gap-10 md:grid-cols-12 md:items-start">
        {/* LEFT: Form */}
        <div className="md:col-span-7">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Send a message</h2>
          <form onSubmit={handleSubmit} className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold">Full name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="First and last name" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="you@example.com" 
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold">Phone (optional)</label>
                <input 
                  id="phone" 
                  name="phone" 
                  type="tel"
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="(555) 555-5555" 
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold">Subject</label>
                <input 
                  id="subject" 
                  name="subject" 
                  type="text" 
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="How can we help?" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={6} 
                required
                className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                placeholder="Share any context you'd like us to know."
              ></textarea>
            </div>

            <div className="flex items-start gap-2">
              <input 
                id="consent" 
                name="consent" 
                type="checkbox" 
                required 
                className="mt-1 h-4 w-4 rounded border-charcoal/30" 
              />
              <label htmlFor="consent" className="text-sm text-charcoal/85">
                I consent to be contacted about my inquiry. I understand this form is not for emergencies.
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button 
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-bark px-5 py-2.5 font-semibold text-cream hover:bg-bark/90 ring-1 ring-charcoal/10"
              >
                Send message
              </button>
              <p className="text-sm text-charcoal/80" role="status" aria-live="polite">
                {formStatus}
              </p>
            </div>
          </form>
          <p className="mt-3 text-xs text-charcoal/70">
            If you are in crisis, call 911 or go to your nearest emergency department.
          </p>
        </div>

        {/* RIGHT: Details aligned with form box */}
        <aside className="md:col-span-5 mt-10 md:mt-[3.25rem] space-y-6">
          <div className="rounded-2xl bg-sand p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">Quick contact</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a 
                  href="mailto:info@thesoulcarecounsellor.com" 
                  className="underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal"
                >
                  info@thesoulcarecounsellor.com
                </a>
              </li>
              <li>
                <a 
                  href="https://thesoulcarecounsellor.janeapp.com" 
                  target="_blank" 
                  className="underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal"
                >
                  Book a Free Consultation
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">Hours</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt>Mon–Fri</dt>
              <dd className="text-charcoal/80">9:00am – 6:00pm ET</dd>
              <dt>Sat</dt>
              <dd className="text-charcoal/80">By appointment</dd>
              <dt>Sun</dt>
              <dd className="text-charcoal/80">Closed</dd>
            </dl>
            <p className="mt-3 text-xs text-charcoal/70">Virtual care across Ontario; in-person options vary by clinician.</p>
          </div>
        </aside>
      </section>

      {/* Final CTA */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Prefer to talk it through?</h3>
            <p className="mt-2 text-charcoal/80">Book a free 15-minute consult to see if we&apos;re a fit.</p>
          </div>
          <div className="md:justify-self-end">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}