import { defineType, defineField } from 'sanity'

export const workshopSchema = defineType({
  name: 'workshop',
  title: 'Workshop',
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
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., 7:00 PM - 8:30 PM'
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 90 minutes'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in dollars'
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or other video URL for recorded workshops'
    }),
    defineField({
      name: 'isRecorded',
      title: 'Is Recorded',
      type: 'boolean',
      description: 'Check if this is a recorded workshop'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Thumbnail image for the workshop'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'instructor',
      media: 'thumbnail'
    }
  }
})
