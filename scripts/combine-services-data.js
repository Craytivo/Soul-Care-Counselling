require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2025-09-05',
  token: process.env.SANITY_API_TOKEN,
})

async function combineServicesData() {
  try {
    console.log('🔄 Starting services data migration...')

    // Fetch existing servicesPage data
    const servicesPage = await client.fetch(`
      *[_type == "servicesPage"][0] {
        title,
        metaDescription,
        hero,
        cta,
        isActive
      }
    `)

    // Fetch existing service documents
    const services = await client.fetch(`
      *[_type == "service"] | order(order asc) {
        title,
        slug,
        description,
        image,
        features,
        pricing,
        buttons,
        isActive
      }
    `)

    if (!servicesPage) {
      console.log('❌ No servicesPage found to migrate')
      return
    }

    console.log(`📄 Found servicesPage: ${servicesPage.title}`)
    console.log(`📝 Found ${services.length} service documents`)

    // Create the unified services document
    const unifiedServicesDoc = {
      _type: 'services',
      title: servicesPage.title || 'Services',
      metaDescription: servicesPage.metaDescription,
      hero: servicesPage.hero,
      servicesList: services.map(service => ({
        title: service.title,
        slug: service.slug,
        description: service.description,
        image: service.image,
        features: service.features,
        pricing: service.pricing,
        buttons: service.buttons,
        isActive: service.isActive !== false // Default to true if not specified
      })),
      cta: servicesPage.cta,
      isActive: servicesPage.isActive !== false
    }

    // Create the new unified document
    const result = await client.create(unifiedServicesDoc)
    console.log(`✅ Created unified services document: ${result._id}`)

    console.log('🎉 Services migration completed successfully!')
    console.log(`📊 Migrated:`)
    console.log(`   - 1 services page`)
    console.log(`   - ${services.length} individual services`)
    console.log(`   - Combined into 1 unified document`)

  } catch (error) {
    console.error('❌ Error during migration:', error)
  }
}

combineServicesData()