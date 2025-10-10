
import { getContactPage } from '@/lib/sanity-queries'
import type { ContactPage } from '@/lib/sanity'
import ContactClient from './ContactClient'

export default async function ContactPage() {
  const pageData = await getContactPage();
  if (!pageData) {
    return <div className="p-10 text-center text-red-600">Contact page data not found.</div>;
  }
  return <ContactClient pageData={pageData} />;
}