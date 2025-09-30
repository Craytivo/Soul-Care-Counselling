'use client'
import { useState } from 'react'
import type { InternApplicationPage } from '@/lib/sanity'

interface InternApplicationFormProps {
  pageData: InternApplicationPage
}

export default function InternApplicationForm({ pageData }: InternApplicationFormProps) {
  const [formStatus, setFormStatus] = useState('')

  const handleInternSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('Sending…')
    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('https://formspree.io/f/xqayqokw', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setFormStatus('Thank you! Your internship application has been submitted successfully. We\'ll review it and get back to you soon.')
        e.currentTarget.reset()
      } else {
        const errorData = await response.json()
        if (errorData.errors) {
          setFormStatus('Please check your form for errors and try again.')
        } else {
          setFormStatus('There was an issue submitting your application. Please try again.')
        }
      }
    } catch (err) {
      console.error(err)
      setFormStatus('Something went wrong—please try again or email us directly.')
    }
  }

  // Render form field based on type
  const renderFormField = (question: InternApplicationPage['formFields']['formQuestions'][0]) => {
    const baseClasses = "mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
    
    switch (question.fieldType) {
      case 'textarea':
        return (
          <textarea
            id={`intern-${question._key}`}
            name={question._key}
            rows={4}
            required
            className={baseClasses}
            placeholder={question.placeholder}
          />
        )
      case 'file':
        return (
          <input
            id={`intern-${question._key}`}
            name={question._key}
            type="file"
            accept=".pdf,.doc,.docx"
            required
            className={baseClasses}
          />
        )
      case 'checkbox':
        return (
          <div className="flex items-start gap-2">
            <input
              id={`intern-${question._key}`}
              name={question._key}
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-charcoal/30"
            />
            <label htmlFor={`intern-${question._key}`} className="text-sm text-charcoal/85">
              {question.label}
            </label>
          </div>
        )
      case 'select':
        return (
          <select
            id={`intern-${question._key}`}
            name={question._key}
            required
            className={baseClasses}
          >
            <option value="">Choose an option</option>
            {question.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      default:
        return (
          <input
            id={`intern-${question._key}`}
            name={question._key}
            type={question.fieldType}
            required
            className={baseClasses}
            placeholder={question.placeholder}
          />
        )
    }
  }

  return (
    <form 
      onSubmit={handleInternSubmit} 
      action="https://formspree.io/f/xqayqokw"
      method="POST"
      className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 space-y-6" 
      encType="multipart/form-data"
    >
      {/* Hidden fields for Formspree */}
      <input type="hidden" name="_subject" value="New Intern Application Submission" />
      <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
      {/* Honeypot for spam protection */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} />
      {/* Dynamic form fields from Sanity */}
      <div className="space-y-4">
        {pageData.formFields.formQuestions.map((question, index) => (
          <div key={question._key} className={question.fieldType === 'checkbox' ? '' : 'space-y-1'}>
            {question.fieldType !== 'checkbox' && (
              <label htmlFor={`intern-${question._key}`} className="block text-sm font-semibold">
                {question.label}
              </label>
            )}
            {renderFormField(question)}
          </div>
        ))}
      </div>

      {/* Submit button and status */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-bark px-5 py-2.5 font-semibold text-cream hover:bg-bark/90 ring-1 ring-charcoal/10"
        >
          Send application
        </button>
        <p className="text-sm text-charcoal/80" role="status" aria-live="polite">
          {formStatus}
        </p>
      </div>
    </form>
  )
}