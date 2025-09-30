import { type SchemaTypeDefinition } from 'sanity'
import { aboutPage } from './aboutPage'
import { areasPage } from './areasPage'
import { blogPost } from './blogPost'
import contactPage from './contactPage'
import { coreValuesPage } from './coreValuesPage'
import { faqPage } from './faqPage'
import { homePage } from './homePage'
import { internApplicationPage } from './internApplicationPage'
import { resource } from './resource'
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
    internApplicationPage,
    faqPage,
    contactPage,
    blogPost,
    resource,
    siteSettings,
  ],
}
