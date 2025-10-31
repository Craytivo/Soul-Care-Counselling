#!/usr/bin/env node
// Validate that legal pages (privacy & terms) have at least one H2/H3 heading for TOC
// Usage: NEXT_PUBLIC_SANITY_PROJECT_ID=... NEXT_PUBLIC_SANITY_DATASET=... node scripts/validate-legal-toc.mjs

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET

if (!projectId || !dataset) {
  console.error('Missing SANITY project/dataset env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (or SANITY_PROJECT_ID/SANITY_DATASET).')
  process.exit(2)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2025-09-05'
})

async function run() {
  const pages = await client.fetch(`*[_type in ["privacyPolicyPage","termsOfUsePage"]] { _id, _type, title, content }`)

  let ok = true

  for (const p of pages) {
    const content = Array.isArray(p.content) ? p.content : []
    const hasHeading = content.some(block => {
      if (typeof block !== 'object' || block === null) return false
      const b = block
      const type = b._type || b['_type']
      const style = b.style || b['style']
      return type === 'block' && (style === 'h2' || style === 'h3')
    })
    if (!hasHeading) {
      ok = false
      console.error(`Page missing headings: ${p._type} (${p.title || p._id})`)
    } else {
      console.log(`OK: ${p._type} (${p.title || p._id}) has headings`)
    }
  }

  if (!ok) {
    console.error('\nOne or more legal pages are missing H2/H3 headings for the TOC.')
    process.exit(1)
  }
  console.log('\nAll legal pages contain at least one H2/H3 heading.')
  process.exit(0)
}

run().catch(err => {
  console.error('Validation failed:', err)
  process.exit(2)
})
