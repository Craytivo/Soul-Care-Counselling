"use client"
import { useState, useEffect, useRef } from 'react'
import type { ContactPage } from '@/lib/sanity'

export default function ContactClient({ pageData }: { pageData: ContactPage }) {
  const [formStatus, setFormStatus] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [submitName, setSubmitName] = useState('')
  const [animateIn, setAnimateIn] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  const closeModal = () => {
    setAnimateIn(false)
    // wait for animation then unmount
    setTimeout(() => setModalOpen(false), 200)
  }

  useEffect(() => {
    if (!modalOpen) return
    setAnimateIn(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen])

  useEffect(() => {
    if (animateIn) closeBtnRef.current?.focus()
  }, [animateIn])

  // Custom handler for async form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('Sending...');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const nameVal = formData.get('name')?.toString() || '';
        setSubmitName(nameVal);
        setModalOpen(true);
        setFormStatus('');
        form.reset();
      } else {
        setFormStatus('Error sending message.');
      }
    } catch (err) {
      setFormStatus('Error sending message.');
    }
  };

  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clay mx-auto"></div>
          <p className="mt-2 text-charcoal/60">Loading contact page...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            {pageData.hero.badge}
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">{pageData.hero.heading}</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            {pageData.hero.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a 
              href={`mailto:${pageData.contactInfo.quickContact.emailAddress}`}
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-cream/20"
            >
              {pageData.hero.emailButtonText}
            </a>
            <a 
              href={pageData.contactInfo.quickContact.bookingUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-cream/10 px-5 py-2.5 font-semibold text-cream hover:bg-cream/15 ring-1 ring-cream/20"
            >
              {pageData.hero.consultationButtonText}
            </a>
          </div>
        </div>
      </section>
      {/* Submission modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} aria-hidden="true"></div>
          <div className="relative w-full max-w-lg mx-4">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-clay text-charcoal">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold">Thanks, {submitName || 'there'}!</h3>
                  <p className="mt-2 text-charcoal/80">We have received your message and will get back to you shortly. This confirmation was sent to the site team.</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button ref={closeBtnRef} onClick={closeModal} className="inline-flex items-center justify-center rounded-md bg-bark px-4 py-2 font-semibold text-cream hover:bg-bark/90 ring-1 ring-charcoal/10">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact content */}
      <section className="mt-14 md:mt-16 grid gap-10 md:grid-cols-12 md:items-start">
        {/* LEFT: Forms */}
        <div className="md:col-span-7">
          {/* General Contact Form */}
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-semibold">{pageData.contactForm.heading}</h2>
            <form 
              name="contact" 
              method="POST" 
              encType="multipart/form-data"
              className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold">{pageData.contactForm.fields.fullNameLabel}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                    placeholder={pageData.contactForm.fields.fullNamePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold">{pageData.contactForm.fields.emailLabel}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                    placeholder={pageData.contactForm.fields.emailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold">{pageData.contactForm.fields.phoneLabel}</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                    placeholder={pageData.contactForm.fields.phonePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold">{pageData.contactForm.fields.subjectLabel}</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                    placeholder={pageData.contactForm.fields.subjectPlaceholder}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold">{pageData.contactForm.fields.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder={pageData.contactForm.fields.messagePlaceholder}
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
                  {pageData.contactForm.consentText}
                </label>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-bark px-5 py-2.5 font-semibold text-cream hover:bg-bark/90 ring-1 ring-charcoal/10"
                >
                  {pageData.contactForm.submitButtonText}
                </button>
                <div className={`text-sm flex items-center gap-2 min-h-[1.5em] transition-all duration-200 ${formStatus === 'Sending...' ? 'text-bark' : formStatus.includes('Error') ? 'text-red-600' : 'text-charcoal/80'}`}
                  role="status" aria-live="polite">
                  {formStatus === 'Sending...' && <svg className="w-4 h-4 animate-spin text-bark" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
                  {formStatus.includes('Error') && <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
                  <span>{formStatus}</span>
                </div>
              </div>
            </form>
            <p className="mt-3 text-xs text-charcoal/70">
              {pageData.contactForm.crisisNotice}
            </p>
          </div>
        </div>

        {/* RIGHT: Details aligned with form box */}
        <aside className="md:col-span-5 mt-10 md:mt-[3.25rem] space-y-6">
          <div className="rounded-2xl bg-sand p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">{pageData.contactInfo.quickContact.heading}</h3>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <p className="font-medium text-charcoal mb-1">{pageData.contactInfo.quickContact.emailLabel}</p>
                <a 
                  href={`mailto:${pageData.contactInfo.quickContact.emailAddress}`}
                  className="underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal"
                >
                  {pageData.contactInfo.quickContact.emailAddress}
                </a>
              </div>
              <div>
                <p className="font-medium text-charcoal mb-1">{pageData.contactInfo.quickContact.phoneLabel}</p>
                  <a 
                    href={`tel:+1-${pageData.contactInfo.quickContact.phoneNumber.replace(/\D/g, '')}`}
                    className="underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal"
                  >
                    {pageData.contactInfo.quickContact.phoneNumber}
                  </a>
              </div>
              <div>
                <p className="font-medium text-charcoal mb-1">{pageData.contactInfo.quickContact.bookingLabel}</p>
                <a 
                  href={pageData.contactInfo.quickContact.bookingUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal"
                >
                  {pageData.contactInfo.quickContact.bookingText}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">{pageData.contactInfo.hours.heading}</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {pageData.contactInfo.hours.schedule.map((item, index) => (
                <>
                  <dt key={`${index}-day`}>{item.days}</dt>
                  <dd key={`${index}-hours`} className="text-charcoal/80">{item.hours}</dd>
                </>
              ))}
            </dl>
            <p className="mt-3 text-xs text-charcoal/70">{pageData.contactInfo.hours.note}</p>
          </div>
        </aside>
      </section>

      {/* Final CTA */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">{pageData.finalCta.heading}</h3>
            <p className="mt-2 text-charcoal/80">{pageData.finalCta.description}</p>
          </div>
          <div className="md:justify-self-end">
            <a 
              href={pageData.finalCta.buttonUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              {pageData.finalCta.buttonText}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
