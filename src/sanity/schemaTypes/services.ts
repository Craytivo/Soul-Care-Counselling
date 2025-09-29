import { defineField, defineType } from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Services',
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
      name: 'servicesList',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
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
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
              description: 'Toggle to show/hide this service on the website',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
              isActive: 'isActive',
            },
            prepare({ title, subtitle, media, isActive }) {
              return {
                title: title || 'Untitled Service',
                subtitle: isActive ? subtitle : `${subtitle || ''} (Inactive)`,
                media,
              }
            },
          },
        },
      ],
      options: {
        sortable: true,
      },
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
      servicesCount: 'servicesList',
    },
    prepare({ title, isActive, servicesCount }) {
      const count = servicesCount ? servicesCount.length : 0;
      return {
        title: title || 'Services Page',
        subtitle: `${count} services • ${isActive ? 'Active' : 'Inactive'}`,
      }
    },
  },
})