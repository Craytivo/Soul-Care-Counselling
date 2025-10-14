"use client"
import { useState } from 'react'
import type { InternApplicationPage } from '@/lib/sanity'

interface InternApplicationFormProps {
  pageData: InternApplicationPage
}

export default function InternApplicationForm({ pageData }: InternApplicationFormProps) {
  const [formStatus, setFormStatus] = useState('')

  // Netlify Forms handles submission automatically

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
        setFormStatus('Application sent successfully!');
        form.reset();
      } else {
        setFormStatus('Error sending application.');
      }
    } catch (err) {
      setFormStatus('Error sending application.');
    }
  };

  return (
    <form 
      name="intern-application"
      encType="multipart/form-data"
      className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 space-y-6"
      onSubmit={handleSubmit}
    >
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
        <div className={`text-sm flex items-center gap-2 min-h-[1.5em] transition-all duration-200 ${formStatus === 'Sending...' ? 'text-bark' : formStatus.includes('successfully') ? 'text-green-700' : formStatus.includes('Error') ? 'text-red-600' : 'text-charcoal/80'}`}
          role="status" aria-live="polite">
          {formStatus === 'Sending...' && <svg className="w-4 h-4 animate-spin text-bark" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
          {formStatus.includes('successfully') && <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
          {formStatus.includes('Error') && <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
          <span>{formStatus}</span>
        </div>
      </div>
    </form>
  )
}