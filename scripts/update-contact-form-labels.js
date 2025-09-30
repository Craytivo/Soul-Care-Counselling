const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false, // We want fresh data when updating
  token: process.env.SANITY_API_TOKEN, // Make sure you have this set
  apiVersion: '2025-09-05'
})

async function updateContactFormLabels() {
  try {
    console.log('🔍 Fetching contact page documents...')
    
    // Fetch all contact page documents
    const contactPages = await client.fetch('*[_type == "contactPage"]')
    
    if (contactPages.length === 0) {
      console.log('❌ No contact page documents found')
      return
    }

    console.log(`📄 Found ${contactPages.length} contact page document(s)`)

    for (const page of contactPages) {
      console.log(`📝 Updating contact page: ${page._id}`)
      
      // Update phone label to remove "(optional)"
      const updatedPage = {
        ...page,
        contactForm: {
          ...page.contactForm,
          fields: {
            ...page.contactForm.fields,
            phoneLabel: 'Phone'
          }
        }
      }

      // Update the document
      await client
        .patch(page._id)
        .set({
          'contactForm.fields.phoneLabel': 'Phone'
        })
        .commit()

      console.log(`✅ Updated contact page: ${page._id}`)
    }

    console.log('🎉 All contact page documents updated successfully!')
    
  } catch (error) {
    console.error('❌ Error updating contact form labels:', error)
  }
}

// Run the update
updateContactFormLabels()