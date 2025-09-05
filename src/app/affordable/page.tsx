import type { Metadata } from 'next'
import SanityServicePage from '@/components/SanityServicePage'

export const metadata: Metadata = {
  title: 'Affordable Therapy | Soul Care Counselling',
  description: 'Affordable therapy option: 50-minute individual sessions at $80. Canada residents only. Limited spots, first-come first-served. Trauma-informed and faith-centered care.',
}

export default function AffordableTherapyPage() {
  return <SanityServicePage slug="affordable" />
}
