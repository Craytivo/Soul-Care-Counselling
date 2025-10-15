import type { Metadata } from 'next'
import { getPrivacyPolicyPage } from '@/lib/sanity-queries'
import { PortableText } from '@portabletext/react'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Privacy Policy — Soul Care Counselling',
  description: 'Privacy Policy for Soul Care Counselling - Learn how we protect your personal information and maintain confidentiality in our faith-centered therapy services.',
}

export default async function Privacy() {
  const pageData = await getPrivacyPolicyPage();
  return (
    <div className="mx-auto max-w-4xl">
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15 mb-12">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{pageData?.title || 'Privacy Policy'}</h1>
        </div>
      </section>
      <div className="prose prose-lg max-w-none">
        {pageData?.content && <PortableText value={pageData.content} />}
      </div>
    </div>
  )
}
