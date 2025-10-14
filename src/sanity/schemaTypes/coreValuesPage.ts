import { defineField, defineType } from 'sanity'

export const coreValuesPage = defineType({
  name: 'coreValuesPage',
  title: 'Core Pillars Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO description for search engines',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: (Rule) => Rule.required().max(100),
        },
        {
          name: 'description',
          title: 'Hero Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Important for SEO and accessibility',
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'values',
  title: 'Core Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'value',
          title: 'Core Value',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Value Description',
              type: 'text',
              rows: 6,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which values appear (lower numbers first)',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              title: 'title',
              order: 'order',
            },
            prepare(selection) {
              const { title, order } = selection
              return {
                title: title,
                subtitle: `Order: ${order || 0}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          description: 'Internal page path (e.g., /services) or external URL',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'external',
          title: 'External Link',
          type: 'boolean',
          description: 'Check if this opens in a new tab',
          initialValue: false,
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this page is published and visible',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, isActive } = selection
      const status = isActive ? '✅' : '⏳'
      return {
        title: `${status} ${title}`,
  subtitle: 'Core Pillars Page',
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
