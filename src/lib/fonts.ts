import { Inter_Tight, Inter } from 'next/font/google'

/**
 * Headings: Inter Tight
 * A modern, geometric sans-serif with tight proportions
 * Perfect for confident, minimal typography
 */
export const interTight = Inter_Tight({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

/**
 * Body: Inter
 * Excellent readability at all sizes
 * Open letterforms and generous spacing
 */
export const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const fontVariables = `${interTight.variable} ${inter.variable}`
