import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (for internal use)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (for SEO)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160).warning('Should be under 160 characters for SEO'),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text (e.g., "About Us")',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            }),
          ],
        }),
        defineField({
          name: 'featuredImage',
          title: 'Featured Image (right side)',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'welcome',
      title: 'Welcome Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
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
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'pillars',
      title: 'Foundational Pillars',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'pillarList',
          title: 'Pillars',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Pillar Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'order',
                  title: 'Order',
                  type: 'number',
                  initialValue: 0,
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'director',
      title: 'Clinical Director Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text (e.g., "Clinical Director")',
          type: 'string',
        }),
        defineField({
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'credentials',
          title: 'Credentials (e.g., "MSW, RSW")',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'image',
          title: 'Portrait Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            }),
          ],
        }),
        defineField({
          name: 'bookingLink',
          title: 'Booking Link',
          type: 'url',
        }),
        defineField({
          name: 'bookingText',
          title: 'Booking Button Text',
          type: 'string',
        }),
        defineField({
          name: 'psychologyTodayImage',
          title: 'Psychology Today Verification Image',
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
        defineField({
          name: 'psychologyTodayLink',
          title: 'Psychology Today Link',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'url',
        }),
        defineField({
          name: 'external',
          title: 'External Link?',
          type: 'boolean',
          description: 'Check if this link goes to an external website.',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Set to true to display this page on the website.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title,
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})
