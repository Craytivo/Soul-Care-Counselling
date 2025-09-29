import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or benefits (bullet points)',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        defineField({
          name: 'displayType',
          title: 'Pricing Display Type',
          type: 'string',
          options: {
            list: [
              { title: 'Custom Text', value: 'custom' },
              { title: 'Per Session', value: 'perSession' },
              { title: 'Package Deal', value: 'package' },
              { title: 'Hidden (No pricing display)', value: 'hidden' },
            ],
          },
          initialValue: 'custom',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'customText',
          title: 'Custom Pricing Text',
          type: 'string',
          description: 'e.g., "Starting at $170.00 per session"',
          hidden: ({ parent }) => parent?.displayType !== 'custom',
        }),
        defineField({
          name: 'amount',
          title: 'Price Amount',
          type: 'number',
          description: 'Numeric price value',
          hidden: ({ parent }) => parent?.displayType === 'custom' || parent?.displayType === 'hidden',
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: '$',
          hidden: ({ parent }) => parent?.displayType === 'custom' || parent?.displayType === 'hidden',
        }),
        defineField({
          name: 'suffix',
          title: 'Price Suffix',
          type: 'string',
          description: 'e.g., "per session", "for 7 sessions"',
          hidden: ({ parent }) => parent?.displayType === 'custom' || parent?.displayType === 'hidden',
        }),
        defineField({
          name: 'packageSessions',
          title: 'Number of Sessions',
          type: 'number',
          description: 'For package deals',
          hidden: ({ parent }) => parent?.displayType !== 'package',
        }),
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Action Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'learnMore',
          title: 'Learn More Button',
          type: 'object',
          fields: [
            defineField({
              name: 'show',
              title: 'Show Learn More Button',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Learn More',
              hidden: ({ parent }) => !parent?.show,
            }),
            defineField({
              name: 'url',
              title: 'Button URL',
              type: 'string',
              description: 'Internal link (e.g., /individual) or external URL',
              hidden: ({ parent }) => !parent?.show,
            }),
            defineField({
              name: 'external',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => !parent?.show,
            }),
          ],
        }),
        defineField({
          name: 'bookNow',
          title: 'Book Now Button',
          type: 'object',
          fields: [
            defineField({
              name: 'show',
              title: 'Show Book Now Button',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Book Now',
              hidden: ({ parent }) => !parent?.show,
            }),
            defineField({
              name: 'url',
              title: 'Booking URL',
              type: 'url',
              hidden: ({ parent }) => !parent?.show,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Order in which this service appears on the services page',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this service on the website',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, order, isActive }) {
      return {
        title: `${order}. ${title}`,
        subtitle: isActive ? subtitle : `${subtitle} (Inactive)`,
        media,
      }
    },
  },
})

