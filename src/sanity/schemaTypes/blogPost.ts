import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief excerpt for the blog post (used in previews and SEO)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'URL-friendly identifier for the blog post',
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
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
              {
                title: 'Internal Link',
                name: 'internalLink',
                type: 'object',
                fields: [
                  {
                    title: 'Reference',
                    name: 'reference',
                    type: 'reference',
                    to: [
                      { type: 'blogPost' },
                      { type: 'service' },
                      { type: 'workshop' },
                      { type: 'teamMember' },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main image for the blog post (used in previews and social sharing)',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'Select a team member as the author',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Publication date and time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      description: 'Whether this blog post is published and visible to the public',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mental Health', value: 'mental-health' },
          { title: 'Faith & Spirituality', value: 'faith-spirituality' },
          { title: 'Relationships', value: 'relationships' },
          { title: 'Trauma & Healing', value: 'trauma-healing' },
          { title: 'Anxiety & Depression', value: 'anxiety-depression' },
          { title: 'Addiction & Recovery', value: 'addiction-recovery' },
          { title: 'Family & Parenting', value: 'family-parenting' },
          { title: 'Self-Care', value: 'self-care' },
          { title: 'Professional Development', value: 'professional-development' },
          { title: 'Community', value: 'community' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing the blog post (e.g., "anxiety", "faith", "healing")',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Whether this post should be featured on the blog homepage',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom title for search engines (if different from main title)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Custom description for search engines (if different from excerpt)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }],
        },
      ],
      description: 'Other blog posts related to this one',
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string',
          description: 'Text for the call-to-action button',
        },
        {
          name: 'link',
          title: 'CTA Link',
          type: 'url',
          description: 'Link for the call-to-action button',
        },
        {
          name: 'type',
          title: 'CTA Type',
          type: 'string',
          options: {
            list: [
              { title: 'Book Consultation', value: 'consultation' },
              { title: 'Learn More', value: 'learn-more' },
              { title: 'Contact Us', value: 'contact' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'consultation',
        },
      ],
      description: 'Optional call-to-action at the end of the blog post',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      publishedAt: 'publishedAt',
      media: 'featuredImage',
      isPublished: 'isPublished',
    },
    prepare(selection) {
      const { title, author, publishedAt, isPublished } = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Not published'
      const status = isPublished ? '✅' : '⏳'
      return {
        title: `${status} ${title}`,
        subtitle: `by ${author} • ${date}`,
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
      title: 'Published Date (Oldest)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
})

