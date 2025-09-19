import type { Metadata } from 'next'
import SanityServicePage from '@/components/SanityServicePage'

export const metadata: Metadata = {
  title: 'Individual Therapy | Soul Care Counselling',
  description: 'Trauma-informed, faith-centered individual counselling focused on rest, restoration, and emotional wellness. Private online sessions (50 minutes, $170).',
}

export default function IndividualTherapyPage() {
  return <SanityServicePage slug="individual" />
}
