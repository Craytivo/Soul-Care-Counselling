import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mental Health Resources & Worksheets | Soul Care Counselling',
  description:
    'Access practical mental health worksheets, self-care guides, and therapeutic tools from Soul Care Counselling.',
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'Mental Health Resources & Worksheets | Soul Care Counselling',
    description:
      'Access practical mental health worksheets, self-care guides, and therapeutic tools from Soul Care Counselling.',
    url: 'https://thesoulcarecounsellor.ca/resources',
    siteName: 'Soul Care Counselling',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

