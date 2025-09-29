import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'priceHighlight',
          title: 'Price Highlight',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Price Text',
              type: 'string',
              description: 'e.g., "Individual therapy starts at"',
            }),
            defineField({
              name: 'price',
              title: 'Price Amount',
              type: 'string',
              description: 'e.g., "$170.00"',
            }),
            defineField({
              name: 'suffix',
              title: 'Price Suffix',
              type: 'string',
              description: 'e.g., "per session"',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'external',
          title: 'External Link',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to publish/unpublish this page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title || 'Services Page',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})