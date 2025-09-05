const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL'
})

// Service slug to page mapping
const servicePageMapping = {
  'individual-therapy': '/individual',
  'affordable-therapy': '/affordable',
  'single-session-therapy': '/single-session',
  'group-therapy': '/group-therapy'
}

async function updateServiceLinks() {
  console.log('🔗 Starting to update service learn more links...')
  
  try {
    // Get all services
    const services = await client.fetch('*[_type == "service"]')
    
    console.log(`📊 Found ${services.length} services to update`)
    
    for (const service of services) {
      const slug = service.slug?.current
      const pagePath = servicePageMapping[slug]
      
      if (pagePath) {
        console.log(`📝 Updating ${service.title} learn more link to ${pagePath}`)
        
        await client
          .patch(service._id)
          .set({
            learnMoreLink: pagePath
          })
          .commit()
        
        console.log(`✅ Updated ${service.title}`)
      } else {
        console.log(`⚠️  No page mapping found for ${service.title} (slug: ${slug})`)
      }
    }
    
    console.log('✅ Service links updated successfully!')
    
    // Verify the updates
    const updatedServices = await client.fetch('*[_type == "service"] | order(order asc)')
    console.log(`📊 Updated services:`)
    updatedServices.forEach(service => {
      console.log(`  - ${service.title}: ${service.learnMoreLink}`)
    })
    
  } catch (error) {
    console.error('❌ Error updating service links:', error)
  }
}

// Run the update function
updateServiceLinks()
