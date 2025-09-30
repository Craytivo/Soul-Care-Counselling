import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact',
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
          initialValue: 'Contact',
        }),
        defineField({
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'emailButtonText',
          title: 'Email Button Text',
          type: 'string',
          initialValue: 'Email Us',
        }),
        defineField({
          name: 'consultationButtonText',
          title: 'Consultation Button Text',
          type: 'string',
          initialValue: 'Book a Free Consultation',
        }),
      ],
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Form Heading',
          type: 'string',
          initialValue: 'Send a message',
        }),
        defineField({
          name: 'fields',
          title: 'Form Fields',
          type: 'object',
          fields: [
            defineField({
              name: 'fullNameLabel',
              title: 'Full Name Label',
              type: 'string',
              initialValue: 'Full name',
            }),
            defineField({
              name: 'fullNamePlaceholder',
              title: 'Full Name Placeholder',
              type: 'string',
              initialValue: 'First and last name',
            }),
            defineField({
              name: 'emailLabel',
              title: 'Email Label',
              type: 'string',
              initialValue: 'Email',
            }),
            defineField({
              name: 'emailPlaceholder',
              title: 'Email Placeholder',
              type: 'string',
              initialValue: 'you@example.com',
            }),
            defineField({
              name: 'phoneLabel',
              title: 'Phone Label',
              type: 'string',
              initialValue: 'Phone (optional)',
            }),
            defineField({
              name: 'phonePlaceholder',
              title: 'Phone Placeholder',
              type: 'string',
              initialValue: '(555) 555-5555',
            }),
            defineField({
              name: 'subjectLabel',
              title: 'Subject Label',
              type: 'string',
              initialValue: 'Subject',
            }),
            defineField({
              name: 'subjectPlaceholder',
              title: 'Subject Placeholder',
              type: 'string',
              initialValue: 'How can we help?',
            }),
            defineField({
              name: 'messageLabel',
              title: 'Message Label',
              type: 'string',
              initialValue: 'Message',
            }),
            defineField({
              name: 'messagePlaceholder',
              title: 'Message Placeholder',
              type: 'string',
              initialValue: "Share any context you'd like us to know.",
            }),
          ],
        }),
        defineField({
          name: 'consentText',
          title: 'Consent Checkbox Text',
          type: 'text',
          initialValue: 'I consent to be contacted about my inquiry. I understand this form is not for emergencies.',
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Send message',
        }),
        defineField({
          name: 'crisisNotice',
          title: 'Crisis Notice',
          type: 'text',
          initialValue: 'If you are in crisis, call 911 or go to your nearest emergency department.',
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information Sidebar',
      type: 'object',
      fields: [
        defineField({
          name: 'quickContact',
          title: 'Quick Contact Section',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              initialValue: 'Quick contact',
            }),
            defineField({
              name: 'emailLabel',
              title: 'Email Label',
              type: 'string',
              initialValue: 'Email us',
            }),
            defineField({
              name: 'emailAddress',
              title: 'Email Address',
              type: 'string',
              initialValue: 'info@thesoulcarecounsellor.com',
            }),
            defineField({
              name: 'phoneLabel',
              title: 'Phone Label',
              type: 'string',
              initialValue: 'Call us',
            }),
            defineField({
              name: 'phoneNumber',
              title: 'Phone Number',
              type: 'string',
              initialValue: '647-394-0525',
            }),
            defineField({
              name: 'bookingLabel',
              title: 'Booking Label',
              type: 'string',
              initialValue: 'Book online',
            }),
            defineField({
              name: 'bookingText',
              title: 'Booking Link Text',
              type: 'string',
              initialValue: 'Free 15-min consultation',
            }),
            defineField({
              name: 'bookingUrl',
              title: 'Booking URL',
              type: 'url',
              initialValue: 'https://thesoulcarecounsellor.janeapp.com',
            }),
          ],
        }),
        defineField({
          name: 'hours',
          title: 'Hours Section',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              initialValue: 'Hours',
            }),
            defineField({
              name: 'schedule',
              title: 'Schedule',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'days',
                      title: 'Days',
                      type: 'string',
                    }),
                    defineField({
                      name: 'hours',
                      title: 'Hours',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'days',
                      subtitle: 'hours',
                    },
                  },
                },
              ],
              initialValue: [
                { days: 'Mon–Fri', hours: '9:00am – 9:00pm EST' },
                { days: 'Sat', hours: 'By appointment' },
                { days: 'Sun', hours: 'Closed' },
              ],
            }),
            defineField({
              name: 'note',
              title: 'Additional Note',
              type: 'text',
              initialValue: 'Virtual care across Ontario; in-person options vary by clinician.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'finalCta',
      title: 'Final Call-to-Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Prefer to talk it through?',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: "Book a free 15-minute consult to see if we're a fit.",
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Book a Free Consultation',
        }),
        defineField({
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'url',
          initialValue: 'https://thesoulcarecounsellor.janeapp.com',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          initialValue: 'Soul Care — Contact',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          initialValue: 'Contact Soul Care Christian Counselling. Book a free consultation, send a message, or reach us by email.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Contact Page',
      }
    },
  },
})