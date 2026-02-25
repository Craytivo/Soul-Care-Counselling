import { defineField, defineType } from 'sanity'

export const waitlistSignup = defineType({
  name: 'waitlistSignup',
  title: 'Waitlist Signup',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'shop',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'submittedCount',
      title: 'Submitted Count',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastSubmittedAt',
      title: 'Last Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'source',
    },
  },
})
