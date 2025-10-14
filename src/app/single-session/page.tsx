import type { Metadata } from 'next'

export const revalidate = 0

export const dynamic = 'force-dynamic'
import SanityServicePage from '@/components/SanityServicePage'

export const metadata: Metadata = {
  title: 'Single Session Program (SSP) | Soul Care Counselling',
  description: 'Low-Cost Therapy: Single Session Program (SSP). $20 per individual, up to 2 sessions. Choose a guided Soul Care Plan (Cohort 1) or targeted support for a specific concern (Cohort 2).',
}

export default function SingleSessionPage() {
  return <SanityServicePage slug="single-session" />
}
