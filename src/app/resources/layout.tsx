import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources — Soul Care Counselling',
  description: 'Download helpful resources including worksheets, guides, and therapeutic materials from Soul Care.',
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}