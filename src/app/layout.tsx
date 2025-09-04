import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Soul Care Counselling — Home',
  description: 'Faith-centered, culturally sensitive therapy. Virtual across Canada.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-cream text-charcoal font-body antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-12 min-h-[60vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}