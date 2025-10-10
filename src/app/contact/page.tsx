
import { getContactPage } from '@/lib/sanity-queries'
import type { ContactPage } from '@/lib/sanity'
import ContactClient from './ContactClient'

export default async function ContactPage() {
  const pageData: ContactPage = await getContactPage()
  return <ContactClient pageData={pageData} />
}