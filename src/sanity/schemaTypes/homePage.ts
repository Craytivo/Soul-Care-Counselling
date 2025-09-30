import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
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
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'highlightText',
          title: 'Highlight Text (Gold Color)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          description: 'Fullscreen background image for the hero section',
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'features',
          title: 'Feature List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Feature Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Lock (Security)', value: 'lock' },
                      { title: 'Map Pin (Location)', value: 'mapPin' },
                      { title: 'Globe (Culture)', value: 'globe' },
                      { title: 'Graduation Cap (Education)', value: 'graduationCap' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'order',
                  title: 'Display Order',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(1),
                }),
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'icon',
                  order: 'order',
                },
                prepare({ title, subtitle, order }) {
                  return {
                    title: `${order}. ${title}`,
                    subtitle: subtitle,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
        defineField({
          name: 'quote',
          title: 'Quote Section',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Quote Text',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Quote Author',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'ctaButtons',
          title: 'Call-to-Action Buttons',
          type: 'object',
          fields: [
            defineField({
              name: 'primaryButton',
              title: 'Primary Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'external',
                  title: 'External Link',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
            }),
            defineField({
              name: 'secondaryButton',
              title: 'Secondary Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'external',
                  title: 'External Link',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
            }),
          ],
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
        title: title || 'Homepage',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})