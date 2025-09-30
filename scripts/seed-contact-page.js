const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function seedContactPage() {
  try {
    console.log('🏗️  Creating contact page data...')

    const contactPageData = {
      _type: 'contactPage',
      _id: 'contact-page-001',
      title: 'Contact',
      hero: {
        badge: 'Contact',
        heading: "We'd love to hear from you",
        description: 'Reach out with questions, request a free consultation, or send us a message. We typically respond within 1–2 business days.',
        emailButtonText: 'Email Us',
        consultationButtonText: 'Book a Free Consultation',
      },
      contactForm: {
        heading: 'Send a message',
        fields: {
          fullNameLabel: 'Full name',
          fullNamePlaceholder: 'First and last name',
          emailLabel: 'Email',
          emailPlaceholder: 'you@example.com',
          phoneLabel: 'Phone (optional)',
          phonePlaceholder: '(555) 555-5555',
          subjectLabel: 'Subject',
          subjectPlaceholder: 'How can we help?',
          messageLabel: 'Message',
          messagePlaceholder: "Share any context you'd like us to know.",
        },
        consentText: 'I consent to be contacted about my inquiry. I understand this form is not for emergencies.',
        submitButtonText: 'Send message',
        crisisNotice: 'If you are in crisis, call 911 or go to your nearest emergency department.',
      },
      contactInfo: {
        quickContact: {
          heading: 'Quick contact',
          emailLabel: 'Email us',
          emailAddress: 'info@thesoulcarecounsellor.com',
          phoneLabel: 'Call us',
          phoneNumber: '647-394-0525',
          bookingLabel: 'Book online',
          bookingText: 'Free 15-min consultation',
          bookingUrl: 'https://thesoulcarecounsellor.janeapp.com',
        },
        hours: {
          heading: 'Hours',
          schedule: [
            { days: 'Mon–Fri', hours: '9:00am – 9:00pm EST' },
            { days: 'Sat', hours: 'By appointment' },
            { days: 'Sun', hours: 'Closed' },
          ],
          note: 'Virtual care across Ontario; in-person options vary by clinician.',
        },
      },
      finalCta: {
        heading: 'Prefer to talk it through?',
        description: "Book a free 15-minute consult to see if we're a fit.",
        buttonText: 'Book a Free Consultation',
        buttonUrl: 'https://thesoulcarecounsellor.janeapp.com',
      },
      seo: {
        metaTitle: 'Soul Care — Contact',
        metaDescription: 'Contact Soul Care Christian Counselling. Book a free consultation, send a message, or reach us by email.',
      },
    }

    // Check if contact page already exists
    const existingPage = await client.fetch(`*[_type == "contactPage"][0]`)
    
    if (existingPage) {
      console.log('📝 Contact page already exists, updating...')
      const result = await client
        .patch(existingPage._id)
        .set(contactPageData)
        .commit()
      
      console.log('✅ Contact page updated successfully!')
      console.log(`   Document ID: ${result._id}`)
    } else {
      console.log('📝 Creating new contact page...')
      const result = await client.create(contactPageData)
      
      console.log('✅ Contact page created successfully!')
      console.log(`   Document ID: ${result._id}`)
    }

    console.log('\n🎯 Contact page is now ready!')
    console.log('You can now edit the contact page content through Sanity Studio.')
    
  } catch (error) {
    console.error('❌ Error creating contact page:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
  }
}

seedContactPage()