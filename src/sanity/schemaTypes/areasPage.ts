import { defineType, defineField } from 'sanity'

export const areasPage = defineType({
  name: 'areasPage',
  title: 'Areas of Focus Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Areas of Focus'
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Support for your season'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Explore the areas we commonly work with, delivered through faith-integrated, evidence-based care.'
        })
      ]
    }),
    defineField({
      name: 'areas',
      title: 'Areas of Focus',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'area',
          title: 'Area of Focus',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96
              },
              validation: Rule => Rule.required()
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
                    { title: 'H4', value: 'h4' }
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Number', value: 'number' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' }
                    ]
                  }
                }
              ]
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0
            })
          ],
          preview: {
            select: {
              title: 'title',
              order: 'order'
            },
            prepare(selection) {
              const { title, order } = selection
              return {
                title: title,
                subtitle: `Order: ${order || 0}`
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Ready to begin?'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Book a free 15-minute consultation to explore fit and next steps.'
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Book a Free Consultation'
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'url',
          initialValue: 'https://thesoulcarecounsellor.janeapp.com'
        }),
        defineField({
          name: 'external',
          title: 'External Link',
          type: 'boolean',
          initialValue: true
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'hero.title'
    },
    prepare(selection) {
      return {
        title: 'Areas of Focus Page',
        subtitle: selection.title
      }
    }
  }
})
