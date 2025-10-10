
export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import SanityServicePage from '@/components/SanityServicePage'

export const metadata: Metadata = {
  title: 'Affordable Therapy | Soul Care Counselling',
  description: 'Affordable therapy: $80.00 for 7 sessions. 50-minute individual sessions. Canada residents only. Limited spots, first-come first-served. Trauma-informed and faith-centered care.',
}

export default function AffordableTherapyPage() {
  return <SanityServicePage slug="affordable" />
}
