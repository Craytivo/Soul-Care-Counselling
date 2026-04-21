import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
  metadataBase: new URL('https://thesoulcarecounsellor.ca'),
  title: 'Soul Care Christian Counselling â€” Home',
  description: 'Faith-centered, culturally sensitive therapy. Virtual across Canada.',
  verification: {
    google: 'I46F2T5WNf56MEhLHRDB3fqOl3oLXSj_UJgHt4A0SH4',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png?v=2', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: [
      { url: '/apple-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Soul Care Counselling',
  url: 'https://thesoulcarecounsellor.ca',
  email: 'info@thesoulcarecounsellor.com',
  logo: 'https://thesoulcarecounsellor.ca/icon.png',
  sameAs: ['https://www.instagram.com/heybelovedhey'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R5VV79YXXB"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-R5VV79YXXB');`}
        </Script>
      </head>
      <body className="bg-cream text-charcoal font-body antialiased">
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-12 min-h-[60vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
