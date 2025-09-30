import { defineField, defineType } from 'sanity'

export const internApplicationPage = defineType({
  name: 'internApplicationPage',
  title: 'Intern Application Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Intern Application',
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
          initialValue: 'Internship',
        }),
        defineField({
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Welcome Future Interns:',
        }),
        defineField({
          name: 'description',
          title: 'Description Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'formFields',
      title: 'Form Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'fileUploadNote',
          title: 'File Upload Note',
          type: 'text',
          rows: 2,
          initialValue: 'Note: File uploads are sent as email attachments if your mail app supports it. For best results, email your resume/CV directly to info@soulcarecounselling.com after submitting the form.',
        }),
        defineField({
          name: 'formQuestions',
          title: 'Form Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Field Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'fieldType',
                  title: 'Field Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Short Text', value: 'text' },
                      { title: 'Long Text (Textarea)', value: 'textarea' },
                      { title: 'Email', value: 'email' },
                      { title: 'Phone', value: 'tel' },
                      { title: 'File Upload', value: 'file' },
                      { title: 'Dropdown Select', value: 'select' },
                      { title: 'Checkbox', value: 'checkbox' },
                    ],
                  },
                  initialValue: 'text',
                }),
                defineField({
                  name: 'placeholder',
                  title: 'Placeholder Text',
                  type: 'string',
                  hidden: ({ parent }) => parent?.fieldType === 'checkbox' || parent?.fieldType === 'file',
                }),
                defineField({
                  name: 'required',
                  title: 'Required Field',
                  type: 'boolean',
                  initialValue: true,
                }),
                defineField({
                  name: 'options',
                  title: 'Select Options',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'value', title: 'Value', type: 'string' },
                        { name: 'label', title: 'Label', type: 'string' },
                      ],
                    },
                  ],
                  hidden: ({ parent }) => parent?.fieldType !== 'select',
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'fieldType',
                  required: 'required',
                },
                prepare({ title, subtitle, required }) {
                  return {
                    title: title || 'Unnamed field',
                    subtitle: `${subtitle?.toUpperCase()} (Required)`,
                  }
                },
              },
            },
          ],
          options: {
            sortable: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'sidebar',
      title: 'Sidebar Content',
      type: 'object',
      fields: [
        defineField({
          name: 'aboutSection',
          title: 'About Our Internship Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'About Our Internship',
            }),
            defineField({
              name: 'benefits',
              title: 'Internship Benefits',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of benefits or features of the internship',
            }),
          ],
        }),
        defineField({
          name: 'questionsSection',
          title: 'Questions Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Questions?',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'contactEmail',
              title: 'Contact Email',
              type: 'email',
              initialValue: 'info@thesoulcarecounsellor.com',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Intern Application Page',
      }
    },
  },
})