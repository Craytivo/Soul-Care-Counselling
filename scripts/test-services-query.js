require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2025-09-05',
  token: process.env.SANITY_API_TOKEN,
})

async function testServicesQuery() {
  try {
    console.log('🔍 Testing services query...')
    
    const result = await client.fetch(`
      *[_type == "services"] {
        _id,
        _type,
        _updatedAt,
        title,
        isActive,
        hero {
          badge,
          heading,
          description
        },
        "servicesCount": length(servicesList[])
      }
    `)
    
    console.log(`📊 Found ${result.length} services documents:`)
    result.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.title || 'Untitled'}`)
      console.log(`     ID: ${doc._id}`)
      console.log(`     Active: ${doc.isActive}`)
      console.log(`     Services count: ${doc.servicesCount}`)
      console.log(`     Last updated: ${doc._updatedAt}`)
      console.log(`     Hero heading: ${doc.hero?.heading || 'No heading'}`)
      console.log('')
    })

    if (result.length === 0) {
      console.log('❌ No services documents found!')
      console.log('💡 Make sure you have created a services document in Sanity Studio')
    }

  } catch (error) {
    console.error('❌ Error testing query:', error)
  }
}

testServicesQuery()