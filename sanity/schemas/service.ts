import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Service icon image'
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'List of service features'
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'string',
      description: 'e.g., $150/session, Sliding scale available'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pricing',
      media: 'icon'
    }
  }
})
