const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL'
})

// About page data
const aboutPageData = {
  title: 'Soul Care — About Us',
  metaDescription: 'About Soul Care Counselling — faith-centered, culturally responsive therapy. Our mission, pillars, and team.',
  hero: {
    badge: 'About Us',
    title: 'Faith-centered therapy, culturally responsive care',
    description: 'We integrate Christian faith with evidence-based practice to support the whole person—mind, body, and spirit—within a culturally safe, welcoming space.'
  },
  welcome: {
    title: 'Welcome',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Welcome to Soul Care Christian Counselling, a space dedicated to nurturing the mental and spiritual well-being of the Black community. With a profound understanding of the intricate relationship between faith and mental health in our community, our practice is rooted in compassion, empathy, and culturally sensitive care. As a team of devoted mental health professionals we are committed to providing holistic support that honours the diverse intersections of faith and mental wellness.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our mission is clear: to integrate faith-based perspectives with evidence-based practices, offering tailored counselling and consulting services that resonate with the unique experiences of the Black community.'
          }
        ]
      }
    ]
  },
  pillars: {
    title: 'Foundational pillars',
    pillarList: [
      {
        title: 'Spiritual care',
        description: 'Faith is welcomed in the room and integrated at your pace.',
        order: 1
      },
      {
        title: 'Body care',
        description: 'Attending to how stress and trauma live in the body.',
        order: 2
      },
      {
        title: 'Mindfulness',
        description: 'Grounding practices that build presence and resilience.',
        order: 3
      },
      {
        title: 'Self-love',
        description: 'Compassionate, practical steps toward wholeness.',
        order: 4
      },
      {
        title: 'Community',
        description: 'Healing happens in relationship—we honour that.',
        order: 5
      }
    ]
  },
  director: {
    badge: 'Clinical Director',
    name: 'Jessica Robinson-Grant',
    credentials: 'MSW, RSW',
    description: 'Jessica leads Soul Care with a commitment to holistic, culturally responsive practice rooted in Christian faith and community advocacy.',
    quote: 'It is the will of the Father that you are well.',
    bookingLink: 'https://thesoulcarecounsellor.janeapp.com',
    bookingText: 'Book a Free Consultation',
    psychologyTodayLink: 'https://www.psychologytoday.com/'
  },
  cta: {
    title: 'Let\'s take the next step together',
    description: 'Free 15-minute consultation to see if we\'re a fit.',
    buttonText: 'Book a Free Consultation',
    buttonLink: 'https://thesoulcarecounsellor.janeapp.com',
    external: true
  },
  isActive: true
}

async function seedAboutPage() {
  console.log('🌱 Starting to seed about page...')
  
  try {
    // First, check if an about page already exists
    const existingPage = await client.fetch('*[_type == "aboutPage"][0]')
    
    if (existingPage) {
      console.log('📝 Updating existing about page...')
      await client
        .patch(existingPage._id)
        .set(aboutPageData)
        .commit()
      console.log(`✅ Updated about page (ID: ${existingPage._id})`)
    } else {
      console.log('📝 Creating new about page...')
      const result = await client.create({
        _type: 'aboutPage',
        ...aboutPageData
      })
      console.log(`✅ Created about page (ID: ${result._id})`)
    }
    
    console.log('✅ About page seeded successfully!')
    console.log('ℹ️  Note: You can add images through Sanity Studio')
    
    // Verify the creation/update
    const page = await client.fetch('*[_type == "aboutPage"][0]')
    console.log(`📊 About page:`)
    console.log(`  - Title: ${page.title}`)
    console.log(`  - Pillars: ${page.pillars.pillarList.length} pillars`)
    console.log(`  - Active: ${page.isActive ? 'Yes' : 'No'}`)
    
  } catch (error) {
    console.error('❌ Error seeding about page:', error)
  }
}

// Run the function
seedAboutPage()
