import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Soul Care Shop',
    default: 'Soul Care Shop'
  },
  description: 'Discover wellness products and resources to support your healing journey. Coming soon - curated items for your mental health and spiritual growth.',
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
