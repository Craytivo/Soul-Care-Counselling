'use client'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

type TrackingPayload = Record<string, unknown>

function pushEvent(event: string, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...payload,
  })
}

export function trackLeadFormSubmit(payload: {
  formName: string
  source: string
  method?: string
}) {
  pushEvent('lead_form_submit', payload)
}

export function trackConsultationClick(payload: {
  location: string
  label: string
  url: string
}) {
  pushEvent('consultation_click', payload)
}
