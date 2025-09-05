import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas
import { teamMemberSchema } from './sanity/schemas/teamMember'
import { blogPostSchema } from './sanity/schemas/blogPost'
import { workshopSchema } from './sanity/schemas/workshop'
import { serviceSchema } from './sanity/schemas/service'
import { siteSettingsSchema } from './sanity/schemas/siteSettings'

export default defineConfig({
  name: 'soul-care-cms',
  title: 'Soul Care Counselling CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      teamMemberSchema,
      blogPostSchema,
      workshopSchema,
      serviceSchema,
      siteSettingsSchema,
    ],
  },
})
