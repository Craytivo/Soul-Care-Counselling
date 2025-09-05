import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soul Care — Contact',
  description: 'Contact Soul Care Christian Counselling. Book a free consultation, send a message, or reach us by email.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
