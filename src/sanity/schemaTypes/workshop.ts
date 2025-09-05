import { defineField, defineType } from 'sanity'

export const workshop = defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the workshop',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
      description: 'Name of the workshop instructor',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Workshop date',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Workshop time (e.g., "7:00 PM - 8:30 PM")',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Workshop duration (e.g., "90 minutes")',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Workshop price (e.g., "Free", "$25", "Pay what you can")',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'Link to register for the workshop',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or other video URL for workshop preview',
    }),
    defineField({
      name: 'isRecorded',
      title: 'Is Recorded',
      type: 'boolean',
      description: 'Whether this is a recorded workshop',
      initialValue: false,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail image for the workshop',
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
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
        },
      ],
      description: 'Detailed workshop content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'instructor',
      media: 'thumbnail',
    },
  },
})

