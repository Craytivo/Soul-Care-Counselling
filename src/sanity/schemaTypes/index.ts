import { type SchemaTypeDefinition } from 'sanity'
import { aboutPage } from './aboutPage'
import { areasPage } from './areasPage'
import { blogPost } from './blogPost'
import { coreValuesPage } from './coreValuesPage'
import { homePage } from './homePage'
import { servicePage } from './servicePage'
import { services } from './services'
import { siteSettings } from './siteSettings'
import { teamMember } from './teamMember'
import { workshop } from './workshop'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    teamMember,
    workshop,
    services,
    servicePage,
    coreValuesPage,
    aboutPage,
    areasPage,
    homePage,
    blogPost,
    siteSettings,
  ],
}
