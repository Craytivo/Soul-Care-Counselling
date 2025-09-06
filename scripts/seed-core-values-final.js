const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL'
})

// Core values page data WITHOUT image reference
const coreValuesPageData = {
  title: 'Soul Care — Core Values',
  metaDescription: 'Our core values: Mindfullness, Body care, Spiritual Care, Self-Love and Acceptance, and Community.',
  hero: {
    badge: 'Core Values',
    title: 'The pillars that shape our care',
    description: 'These fundamental values serve as integral pillars that shape our approach when partnering with clients on their transformative journey through the healing process.'
  },
  values: [
    {
      title: 'Mindfulness',
      description: 'Very seldom do we have time to be aware, be still, or to reflect. The hustle and bustle of the 21st Century can be a barrier to an introspective and intuitive posture. As a community of racialized bodies that has experienced cumulative and compounded traumas, taking time for stillness and solitude can be holistically restorative. It can also create space for us to process emotions and be present. As a collective of Black therapists who have experienced various types of trauma, mindfulness has been a significant part of our healing journeys. It is also an important aspect that we invite clients to be a part of on their healing journey as well. You can engage in mindfulness by practicing gratitude daily, journaling, taking walks, connecting with nature, or simply sitting in silence.',
      order: 1
    },
    {
      title: 'Body care',
      description: 'Black and racialized bodies store trauma in various ways. According to Dr. Bessel Van Der Kolk, a world-renowned psychiatrist and trauma researcher, if not dealt with and resolved, when we have traumatic experiences, the impact can have long-lasting effects on our body and brain. Essentially, as he proclaims in the title of his book, "The Body Keeps the Score". We believe it is important for us to take care of our bodies and cherish these beautiful vessels that hold life. How does the body store trauma? Neck pains, tension headaches, nausea, chest pains, or other types of body pains.',
      order: 2
    },
    {
      title: 'Spiritual Care',
      description: 'Spirituality has always been an important part of our community. Traditionally and within a contemporary context, it has been the undergirding of who we are, and what we do. As Black bodies we have experienced varying levels of displacement, but we have always brought our spirituality with us wherever we go. I believe that the most powerful aspect of our spirituality is the infusion of our diaspora, as it exudes fragrances of our cultures and traditions. As a collective of Black christian therapists we hold dear to this element of spirituality and to the Christian tradition. It is deeply intertwined in the work that we do as a therapist. As a result, our work with clients focuses on emotional wholeness and emotionally healthy spirituality from a faith-based perspective. If you don\'t consider yourself a religious or spiritual person, this is still a welcomed space for you. Focusing on emotional wholeness and health also means that we prioritize working with people from all walks of life. Regardless of how you identify, we want to work with you!',
      order: 3
    },
    {
      title: 'Self -Love and Acceptance',
      description: 'As a maid responsible for taking care of and raising young children, Aibileen Clark, a protagonist in the book and movie The Help, had a phrase she regularly taught to the little girl in her care: "you is kind, you is smart, you is important". As black people who often face varying forms of injustice, it\'s crucial we understand that we are seen, we are loved, and we are valued. Our beautiful melanin skin was carefully constructed, the hairs on our head individually numbered, and the kink in each strand was intentional. Society constantly tells us that we deserve to be oppressed because of our skin colour; but that is a lie. Once we learn that societal constructs and standards of beauty and acceptance are false, we will stand in truth and acceptance of who we are, and who we were created to be. Our lives matter, and the world will only accept that once we fully accept ourselves.',
      order: 4
    },
    {
      title: 'Community',
      description: 'We are firm believers in spaces of belonging for Black bodies, these spaces are essential for the health and wealth of our souls. We define community as spaces where you feel loved, appreciated and supported. Spaces where you feel safe. Spaces where you experience true joy and pure tranquillity. Spaces that make you smile, spaces that are warm, healthy spaces cultivated to process emotions. This can be found among trusted friends, family, spouses/partners, or among other like-minded individuals.',
      order: 5
    }
  ],
  cta: {
    title: 'Explore our services',
    description: 'See how these values come to life in care that meets you where you are.',
    buttonText: 'View Services',
    buttonLink: '/services',
    external: false
  },
  isActive: true
}

async function seedCoreValuesPage() {
  console.log('🌱 Starting to seed core values page...')
  
  try {
    // First, check if a core values page already exists
    const existingPage = await client.fetch('*[_type == "coreValuesPage"][0]')
    
    if (existingPage) {
      console.log('📝 Updating existing core values page...')
      await client
        .patch(existingPage._id)
        .set(coreValuesPageData)
        .commit()
      console.log(`✅ Updated core values page (ID: ${existingPage._id})`)
    } else {
      console.log('📝 Creating new core values page...')
      const result = await client.create({
        _type: 'coreValuesPage',
        ...coreValuesPageData
      })
      console.log(`✅ Created core values page (ID: ${result._id})`)
    }
    
    console.log('✅ Core values page seeded successfully!')
    console.log('ℹ️  Note: You can add the hero image through Sanity Studio')
    
    // Verify the creation/update
    const page = await client.fetch('*[_type == "coreValuesPage"][0]')
    console.log(`📊 Core values page:`)
    console.log(`  - Title: ${page.title}`)
    console.log(`  - Values: ${page.values.length} values`)
    console.log(`  - Active: ${page.isActive ? 'Yes' : 'No'}`)
    
  } catch (error) {
    console.error('❌ Error seeding core values page:', error)
  }
}

// Run the function
seedCoreValuesPage()