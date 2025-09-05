const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL'
})

// Services data based on the current services page
const servicesData = [
  {
    title: 'Individual Therapy',
    description: 'One-on-one support tailored to your unique needs, integrating faith and evidence-based approaches for lasting healing.',
    slug: 'individual-therapy',
    icon: '👤',
    features: [
      'Personalized treatment plans',
      'Faith-centered approach',
      'Evidence-based therapy methods',
      'Flexible scheduling',
      'Virtual sessions across Canada'
    ],
    pricing: 'Starting at $120/session',
    isActive: true,
    order: 1,
    learnMoreLink: '/individual',
    bookingLink: 'https://thesoulcarecounsellor.janeapp.com'
  },
  {
    title: 'Affordable Therapy',
    description: 'Accessible mental health care with sliding scale options and flexible payment plans to ensure support is within reach.',
    slug: 'affordable-therapy',
    icon: '💰',
    features: [
      'Sliding scale pricing',
      'Flexible payment plans',
      'Income-based rates',
      'No one turned away for financial reasons',
      'Payment assistance available'
    ],
    pricing: 'Sliding scale based on income',
    isActive: true,
    order: 2,
    learnMoreLink: '/affordable',
    bookingLink: 'https://thesoulcarecounsellor.janeapp.com'
  },
  {
    title: 'Single Session Therapy',
    description: 'Focused, solution-oriented support in a single session for immediate relief and practical next steps.',
    slug: 'single-session-therapy',
    icon: '⚡',
    features: [
      'Immediate support',
      'Solution-focused approach',
      'Practical tools and strategies',
      'No long-term commitment required',
      'Quick relief for urgent concerns'
    ],
    pricing: '$100 per session',
    isActive: true,
    order: 3,
    learnMoreLink: '/single-session',
    bookingLink: 'https://thesoulcarecounsellor.janeapp.com'
  },
  {
    title: 'Group Therapy',
    description: 'Connect with others on similar journeys in a supportive, faith-centered group setting for shared healing.',
    slug: 'group-therapy',
    icon: '👥',
    features: [
      'Peer support and connection',
      'Faith-centered group setting',
      'Shared experiences and healing',
      'Cost-effective option',
      'Regular group sessions'
    ],
    pricing: '$60 per session',
    isActive: true,
    order: 4,
    learnMoreLink: '/group-therapy',
    bookingLink: 'https://thesoulcarecounsellor.janeapp.com'
  }
]

async function seedServices() {
  console.log('🌱 Starting to seed services...')
  
  try {
    // Check if services already exist
    const existingServices = await client.fetch('*[_type == "service"]')
    
    if (existingServices.length > 0) {
      console.log(`⚠️  Found ${existingServices.length} existing services. Updating...`)
      
      // Update existing services
      for (const service of servicesData) {
        const existingService = existingServices.find(s => s.slug?.current === service.slug)
        
        if (existingService) {
          console.log(`📝 Updating service: ${service.title}`)
          await client
            .patch(existingService._id)
            .set({
              title: service.title,
              description: service.description,
              slug: { current: service.slug, _type: 'slug' },
              icon: service.icon,
              features: service.features,
              pricing: service.pricing,
              isActive: service.isActive,
              order: service.order,
              learnMoreLink: service.learnMoreLink,
              bookingLink: service.bookingLink
            })
            .commit()
        } else {
          console.log(`➕ Creating new service: ${service.title}`)
          await client.create({
            _type: 'service',
            ...service,
            slug: { current: service.slug, _type: 'slug' }
          })
        }
      }
    } else {
      console.log('➕ Creating new services...')
      
      // Create new services
      for (const service of servicesData) {
        console.log(`Creating service: ${service.title}`)
        await client.create({
          _type: 'service',
          ...service,
          slug: { current: service.slug, _type: 'slug' }
        })
      }
    }
    
    console.log('✅ Services seeded successfully!')
    
    // Verify the services were created
    const finalServices = await client.fetch('*[_type == "service"] | order(order asc)')
    console.log(`📊 Total services in Sanity: ${finalServices.length}`)
    finalServices.forEach(service => {
      console.log(`  - ${service.title} (${service.slug?.current})`)
    })
    
  } catch (error) {
    console.error('❌ Error seeding services:', error)
  }
}

// Run the seeding function
seedServices()
