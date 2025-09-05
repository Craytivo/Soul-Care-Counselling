import { type SchemaTypeDefinition } from 'sanity'
import { blogPost } from './blogPost'
import { service } from './service'
import { servicePage } from './servicePage'
import { siteSettings } from './siteSettings'
import { teamMember } from './teamMember'
import { workshop } from './workshop'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    teamMember,
    workshop,
    service,
    servicePage,
    blogPost,
    siteSettings,
  ],
}
