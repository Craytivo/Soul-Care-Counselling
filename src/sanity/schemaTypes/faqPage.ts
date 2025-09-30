import { defineField, defineType } from 'sanity'

export const faqPage = defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'FAQs',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      initialValue: 'Frequently Asked Questions about Soul Care Counselling services.',
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
          initialValue: 'FAQs',
        }),
        defineField({
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Frequently Asked Questions',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
          initialValue: 'Answers to common questions about sessions, rates, policies, and more.',
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
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
              title: 'question',
              subtitle: 'answer',
              order: 'order',
            },
            prepare({ title, subtitle, order }) {
              return {
                title: `${order}. ${title}`,
                subtitle: subtitle ? `${subtitle.substring(0, 60)}...` : '',
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
        title: title || 'FAQ Page',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})