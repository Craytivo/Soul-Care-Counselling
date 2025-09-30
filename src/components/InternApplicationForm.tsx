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
    const data = Object.fromEntries(formData.entries())
    
    try {
      // Build email body from form questions
      let emailBody = 'Intern Application Submission\n\n'
      
      // Add all form fields
      pageData.formFields.formQuestions.forEach(question => {
        if (question.fieldType !== 'file') { // Skip file fields in email body
          const value = data[question._key] || (question.fieldType === 'checkbox' ? 'No' : '-')
          emailBody += `${question.label}:\n${value}\n\n`
        }
      })

      const subject = `Intern Application - ${data.fullName || 'New Application'}`
      const encodedBody = encodeURIComponent(emailBody)
      const encodedSubject = encodeURIComponent(subject)
      
      window.location.href = `mailto:info@soulcarecounselling.com?subject=${encodedSubject}&body=${encodedBody}`
      setFormStatus('Opening your email app…')
      setTimeout(() => { 
        setFormStatus('Thanks! If your mail app did not open, please email us directly.') 
      }, 1500)
    } catch (err) {
      console.error(err)
      setFormStatus('Something went wrong—please email us directly.')
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
            required={question.required}
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
            required={question.required}
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
              required={question.required}
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
            required={question.required}
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
            required={question.required}
            className={baseClasses}
            placeholder={question.placeholder}
          />
        )
    }
  }

  return (
    <form 
      onSubmit={handleInternSubmit} 
      className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 space-y-6" 
      encType="multipart/form-data"
    >
      {/* Dynamic form fields from Sanity */}
      <div className="space-y-4">
        {pageData.formFields.formQuestions.map((question, index) => (
          <div key={question._key} className={question.fieldType === 'checkbox' ? '' : 'space-y-1'}>
            {question.fieldType !== 'checkbox' && (
              <label htmlFor={`intern-${question._key}`} className="block text-sm font-semibold">
                {question.label}
                {!question.required && ' (optional)'}
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