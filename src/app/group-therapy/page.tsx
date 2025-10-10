import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import SanityServicePage from '@/components/SanityServicePage'

export const metadata: Metadata = {
  title: 'Group Therapy | Soul Care Counselling',
  description: 'Heal in community through faith-centered group therapy. Join the interest list for upcoming groups and be the first to know when dates are announced.',
}

export default function GroupTherapyPage() {
  return <SanityServicePage slug="group-therapy" />
}
