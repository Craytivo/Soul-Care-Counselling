const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function addSnehaChristiana() {
  try {
    console.log('🌱 Adding Sneha and Christiana to team members...')

    const newMembers = [
      {
        _type: 'teamMember',
        name: 'Sneha Christian',
        credentials: 'MSW, RSW',
        role: 'Clinical Social Worker',
        bio: 'Sneha is a dedicated clinical social worker with a passion for helping individuals navigate life\'s challenges. She brings a compassionate and evidence-based approach to therapy, specializing in supporting clients through difficult transitions and mental health concerns.',
        specialties: [
          'Individual Therapy',
          'Mental Health Counseling',
          'Life Transitions',
          'Anxiety & Depression',
          'Trauma-Informed Care',
          'CBT & DBT Approaches'
        ],
        areasOfFocus: [
          'Anxiety & Depression',
          'Life Transitions',
          'Trauma Recovery',
          'Emotional Regulation',
          'Self-Esteem & Identity',
          'Stress Management'
        ],
        socialLinks: [],
        acceptsBookings: true,
        slug: {
          _type: 'slug',
          current: 'sneha-christian'
        }
      },
      {
        _type: 'teamMember',
        name: 'Christiana',
        credentials: 'MSW, RSW',
        role: 'Clinical Social Worker',
        bio: 'Christiana is a compassionate clinical social worker committed to providing holistic mental health support. She combines evidence-based therapeutic approaches with a deep understanding of cultural and spiritual factors that impact mental wellness.',
        specialties: [
          'Individual Therapy',
          'Couples Counseling',
          'Family Therapy',
          'Cultural Competency',
          'Faith-Based Counseling',
          'Solution-Focused Therapy'
        ],
        areasOfFocus: [
          'Relationship Issues',
          'Family Dynamics',
          'Cultural Identity',
          'Spiritual Growth',
          'Communication Skills',
          'Conflict Resolution'
        ],
        socialLinks: [],
        acceptsBookings: true,
        slug: {
          _type: 'slug',
          current: 'christiana'
        }
      }
    ]

    for (const member of newMembers) {
      console.log(`📝 Creating team member: ${member.name}`)
      
      const result = await client.create(member)
      console.log(`✅ Created: ${member.name} (ID: ${result._id})`)
    }

    console.log('🎉 Sneha and Christiana have been added successfully!')
    console.log('🌐 Check your Sanity Studio at http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ Error adding team members:', error)
    if (error.message.includes('permission')) {
      console.log('🔑 Permission error - you may need to update your API token permissions in Sanity')
    }
  }
}

addSnehaChristiana()
