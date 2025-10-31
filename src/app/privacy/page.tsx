

import type { Metadata } from 'next'
import { getPrivacyPolicyPage } from '@/lib/sanity-queries'
import { PortableText } from '@portabletext/react'
import PrintButton from '@/components/PrintButton'
import LegalTOC from '@/components/LegalTOC'

const slugify = (text?: string) =>
  (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function extractHeadings(content: unknown[] | undefined) {
  if (!Array.isArray(content)) return []
  const headings: { id: string; text: string; level: number }[] = []
  for (const block of content) {
    if (typeof block !== 'object' || block === null) continue
    const maybeBlock = block as { _type?: string; style?: string; children?: unknown[] }
    if (maybeBlock._type !== 'block') continue
    const style = maybeBlock.style || 'normal'
    if (style === 'h2' || style === 'h3') {
      const children = Array.isArray(maybeBlock.children) ? maybeBlock.children : []
      const text = children.map((c) => ((c as { text?: string }).text || '')).join('') || ''
      const id = slugify(text)
      headings.push({ id, text, level: style === 'h2' ? 2 : 3 })
    }
  }
  return headings
}

const portableTextComponents = {
  block: {
    h2: (props: { children?: React.ReactNode }) => {
      const text = String(props.children || '')
      return <h2 id={slugify(text)} className="mt-10 mb-4 text-2xl md:text-3xl font-bold text-bark font-heading">{props.children}</h2>
    },
    h3: (props: { children?: React.ReactNode }) => {
      const text = String(props.children || '')
      return <h3 id={slugify(text)} className="mt-8 mb-3 text-xl md:text-2xl font-semibold text-bark font-heading">{props.children}</h3>
    },
    h4: (props: { children?: React.ReactNode }) => <h4 className="mt-6 mb-2 text-lg font-semibold text-bark font-heading">{props.children}</h4>,
    normal: (props: { children?: React.ReactNode }) => <p className="mb-4 text-charcoal/90 leading-relaxed text-lg">{props.children}</p>,
    blockquote: (props: { children?: React.ReactNode }) => <blockquote className="border-l-4 border-clay pl-4 italic text-charcoal/80 my-6">{props.children}</blockquote>,
  },
  list: {
    bullet: (props: { children?: React.ReactNode }) => <ul className="list-disc pl-6 mb-4 text-charcoal/90">{props.children}</ul>,
    number: (props: { children?: React.ReactNode }) => <ol className="list-decimal pl-6 mb-4 text-charcoal/90">{props.children}</ol>,
  },
  listItem: {
    bullet: (props: { children?: React.ReactNode }) => <li className="mb-2">{props.children}</li>,
    number: (props: { children?: React.ReactNode }) => <li className="mb-2">{props.children}</li>,
  },
  marks: {
    strong: (props: { children?: React.ReactNode }) => <strong className="font-semibold text-bark">{props.children}</strong>,
    em: (props: { children?: React.ReactNode }) => <em className="italic text-clay">{props.children}</em>,
    link: (props: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a href={props.value?.href} className="underline text-clay hover:text-bark transition-colors" target="_blank" rel="noopener noreferrer">{props.children}</a>
    ),
  },
};

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Privacy Policy — Soul Care Counselling',
  description: 'Privacy Policy for Soul Care Counselling - Learn how we protect your personal information and maintain confidentiality in our faith-centered therapy services.',
}

export default async function Privacy() {
  const pageData = await getPrivacyPolicyPage();
  const headings = extractHeadings(pageData?.content)
  // Plain-language summary: use pageData.summary or derive from first paragraph
  const deriveSummary = () => {
    if (pageData?.summary) {
      if (Array.isArray(pageData.summary)) return pageData.summary
      if (typeof pageData.summary === 'string') return pageData.summary.split('\n').map((s: string) => s.trim()).filter(Boolean)
    }
    type BlockChild = { text?: string }
    type BlockLike = { _type?: string; style?: string; children?: BlockChild[] }
    const firstBlock = Array.isArray(pageData?.content) ? pageData.content.find((b: unknown) => typeof b === 'object' && b !== null && ((b as BlockLike)._type === 'block')) : null
    if (firstBlock) {
      const maybe = firstBlock as BlockLike
      const children = Array.isArray(maybe.children) ? maybe.children : []
      const text = children.map((c: BlockChild) => (c.text || '')).join(' ')
      const sentences = text.split(/(?<=[.?!])\s+/).map((s: string) => s.trim()).filter(Boolean)
      return sentences.slice(0, 3)
    }
    return []
  }
  const summaryItems = deriveSummary()
  return (
    <div className="mx-auto max-w-4xl">
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15 mb-6 no-print">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{pageData?.title || 'Privacy Policy'}</h1>
        </div>
      </section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-charcoal/80">
        <div>
          Effective: <strong>{pageData?.effectiveDate ?? (pageData?._updatedAt ? new Date(pageData._updatedAt).toLocaleDateString() : '—')}</strong>
        </div>
        <div>•</div>
        <div>
          Last updated: {pageData?._updatedAt ? <time dateTime={pageData._updatedAt}>{new Date(pageData._updatedAt).toLocaleDateString()}</time> : '—'}
        </div>
        <div className="ml-0 sm:ml-auto flex items-center gap-3">
          <a href="/contact" className="underline text-clay">Contact us about this policy</a>
          <PrintButton />
        </div>
      </div>

      {/* Grid: main content + sticky TOC on desktop. On mobile the LegalTOC shows as collapsible above content. */}
      <div className="md:grid md:grid-cols-[1fr_18rem] md:gap-8">
        <div className="md:col-start-1">
          {/* Plain-language summary */}
          {summaryItems && summaryItems.length > 0 && (
            <div className="mb-4 rounded-lg bg-sand/50 p-4 ring-1 ring-charcoal/10">
              <strong className="block text-sm text-charcoal/80 mb-2">Quick summary</strong>
              <ul className="list-disc pl-5 text-sm text-charcoal/85 space-y-1">
                {summaryItems.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mobile TOC (LegalTOC renders mobile collapse when in the document flow) */}
          {headings.length > 0 && <div className="md:hidden mb-4"><LegalTOC headings={headings} /></div>}

          <main className="prose prose-lg max-w-none md:columns-2 md:gap-8">
            {pageData?.content && (
              <PortableText value={pageData.content} components={portableTextComponents} />
            )}
          </main>
        </div>

        {/* Desktop sticky TOC */}
        <aside className="hidden md:block md:col-start-2">
          <div className="md:sticky md:top-24">
            <LegalTOC headings={headings} />
          </div>
        </aside>
      </div>
    </div>
  )
}
