import { defineField, defineType } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'The title of the resource (e.g., "Anxiety Management Guide")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Brief description of what this resource contains',
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
      description: 'URL-friendly identifier for the resource',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['palette'],
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'Describe the image for accessibility',
        }),
      ],
      validation: (Rule) => Rule.required(),
      description: 'Preview image showing the first page or cover of the resource',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required(),
      description: 'The PDF file that users will download',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mental Health', value: 'mental-health' },
          { title: 'Spiritual Wellness', value: 'spiritual-wellness' },
          { title: 'Relationship Support', value: 'relationship-support' },
          { title: 'Self-Care', value: 'self-care' },
          { title: 'Faith & Healing', value: 'faith-healing' },
          { title: 'Worksheets', value: 'worksheets' },
          { title: 'Guides', value: 'guides' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Category to help organize resources',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags for filtering resources (e.g., "anxiety", "depression", "mindfulness")',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      description: 'Whether this resource is published and visible to the public',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this resource should be featured prominently',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this resource was published',
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size (MB)',
      type: 'number',
      description: 'Approximate file size in MB (for user reference)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'previewImage',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured',
    },
    prepare({ title, category, media, isPublished, isFeatured }) {
      const status = isPublished ? '✅' : '⏳'
      const featured = isFeatured ? '⭐' : ''
      const categoryLabel = category?.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Uncategorized'
      
      return {
        title: `${status}${featured} ${title}`,
        subtitle: categoryLabel,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})