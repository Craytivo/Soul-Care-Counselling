import { defineField, defineType } from 'sanity'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'URL path for this service page (e.g., /individual, /affordable)',
      validation: (Rule) => Rule.required(),
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
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small badge text shown above the main title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'Large heading on the page',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      description: 'Main description text in the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote (Optional)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Quote Text',
          type: 'text',
          rows: 3,
        },
        {
          name: 'attribution',
          title: 'Attribution',
          type: 'string',
          description: 'e.g., "Matthew 11:28-30"',
        },
      ],
      description: 'Optional quote or scripture verse',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Call-to-Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'external',
          title: 'External Link',
          type: 'boolean',
          description: 'Check if this opens in a new tab',
          initialValue: true,
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call-to-Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'Internal page path (e.g., /contact) or external URL',
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
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Number', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          type: 'object',
          name: 'detailsSection',
          title: 'Details Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'items',
              title: 'Detail Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          type: 'object',
          name: 'listSection',
          title: 'List Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'items',
              title: 'List Items',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'Call-to-Action Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'primaryButton',
              title: 'Primary Button',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'external',
                  title: 'External Link',
                  type: 'boolean',
                  initialValue: false,
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'secondaryButton',
              title: 'Secondary Button',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'external',
                  title: 'External Link',
                  type: 'boolean',
                  initialValue: false,
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this service page is published and visible',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection
      const status = isActive ? '✅' : '⏳'
      return {
        title: `${status} ${title}`,
        subtitle: `/${subtitle}`,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Slug A-Z',
      name: 'slugAsc',
      by: [{ field: 'slug.current', direction: 'asc' }],
    },
  ],
})
