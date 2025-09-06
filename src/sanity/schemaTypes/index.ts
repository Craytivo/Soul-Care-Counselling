import { type SchemaTypeDefinition } from 'sanity'
import { aboutPage } from './aboutPage'
import { blogPost } from './blogPost'
import { coreValuesPage } from './coreValuesPage'
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
    coreValuesPage,
    aboutPage,
    blogPost,
    siteSettings,
  ],
}
