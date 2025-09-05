const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-09-05'
})

// Team members data based on your existing content
const teamMembers = [
  {
    _type: 'teamMember',
    name: 'Jessica Robinson Grant',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Jessica is a compassionate clinical social worker specializing in trauma therapy and faith-based counseling. She brings years of experience helping individuals and couples navigate life\'s challenges with a holistic, faith-centered approach.',
    specialties: ['Trauma Therapy', 'Faith-Based Counseling', 'Individual Therapy', 'Couples Counseling'],
    areasOfFocus: ['Anxiety', 'Depression', 'Relationship Issues', 'Grief and Loss', 'Spiritual Growth'],
    socialLinks: [
      {
        label: '@jessicarobinsongrant',
        url: 'https://instagram.com/jessicarobinsongrant',
        type: 'instagram'
      }
    ],
    acceptsBookings: true,
    slug: {
      current: 'jessica-robinson-grant'
    }
  },
  {
    _type: 'teamMember',
    name: 'Davene',
    credentials: 'Operations Manager',
    role: 'Operations Manager',
    bio: 'Davene manages the day-to-day operations of Soul Care Counselling, ensuring smooth coordination of services and supporting both clients and therapists in their journey.',
    specialties: ['Operations Management', 'Client Coordination', 'Administrative Support'],
    areasOfFocus: ['Process Improvement', 'Client Experience', 'Team Support'],
    socialLinks: [
      {
        label: '@HeyBelovedHey',
        url: 'https://instagram.com/HeyBelovedHey',
        type: 'instagram'
      }
    ],
    acceptsBookings: false,
    slug: {
      current: 'davene'
    }
  },
  {
    _type: 'teamMember',
    name: 'Princeton',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Princeton brings a compassionate and professional approach to therapy, helping clients work through their challenges with empathy and evidence-based techniques.',
    specialties: ['Individual Therapy', 'Group Therapy', 'Mental Health Support'],
    areasOfFocus: ['Personal Growth', 'Mental Wellness', 'Life Transitions'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'princeton'
    }
  },
  {
    _type: 'teamMember',
    name: 'Anita',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Anita is dedicated to providing supportive and effective therapy services, helping clients navigate their mental health journey with care and professionalism.',
    specialties: ['Individual Therapy', 'Counseling', 'Mental Health Support'],
    areasOfFocus: ['Emotional Wellness', 'Personal Development', 'Therapeutic Support'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'anita'
    }
  },
  {
    _type: 'teamMember',
    name: 'Baraka',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Baraka offers compassionate therapeutic services, focusing on helping clients achieve mental wellness and personal growth through evidence-based approaches.',
    specialties: ['Individual Therapy', 'Mental Health Counseling', 'Wellness Support'],
    areasOfFocus: ['Mental Health', 'Personal Growth', 'Therapeutic Care'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'baraka'
    }
  },
  {
    _type: 'teamMember',
    name: 'Josh',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Josh provides professional therapy services with a focus on helping clients work through their challenges and achieve their mental health goals.',
    specialties: ['Individual Therapy', 'Counseling', 'Mental Health Support'],
    areasOfFocus: ['Therapeutic Support', 'Personal Development', 'Mental Wellness'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'josh'
    }
  },
  {
    _type: 'teamMember',
    name: 'Khadian',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Khadian is committed to providing quality therapeutic services, helping clients navigate their mental health journey with empathy and professional expertise.',
    specialties: ['Individual Therapy', 'Mental Health Counseling', 'Wellness Support'],
    areasOfFocus: ['Mental Health', 'Personal Growth', 'Therapeutic Care'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'khadian'
    }
  },
  {
    _type: 'teamMember',
    name: 'Natalie',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Natalie brings a warm and professional approach to therapy, helping clients work through their challenges and achieve their mental health goals.',
    specialties: ['Individual Therapy', 'Counseling', 'Mental Health Support'],
    areasOfFocus: ['Therapeutic Support', 'Personal Development', 'Mental Wellness'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'natalie'
    }
  },
  {
    _type: 'teamMember',
    name: 'Nigel',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Nigel provides compassionate and effective therapy services, focusing on helping clients achieve mental wellness and personal growth.',
    specialties: ['Individual Therapy', 'Mental Health Counseling', 'Wellness Support'],
    areasOfFocus: ['Mental Health', 'Personal Growth', 'Therapeutic Care'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'nigel'
    }
  },
  {
    _type: 'teamMember',
    name: 'Oluseye',
    credentials: 'MSW, RSW',
    role: 'Clinical Social Worker',
    bio: 'Oluseye is dedicated to providing supportive and effective therapy services, helping clients navigate their mental health journey with care and professionalism.',
    specialties: ['Individual Therapy', 'Counseling', 'Mental Health Support'],
    areasOfFocus: ['Emotional Wellness', 'Personal Development', 'Therapeutic Support'],
    socialLinks: [],
    acceptsBookings: true,
    slug: {
      current: 'oluseye'
    }
  }
]

async function seedTeamMembers() {
  try {
    console.log('🚀 Starting to seed team members...')
    
    for (const member of teamMembers) {
      console.log(`📝 Creating team member: ${member.name}`)
      
      const result = await client.create(member)
      console.log(`✅ Created: ${member.name} (ID: ${result._id})`)
    }
    
    console.log('🎉 All team members have been created successfully!')
    console.log('🌐 Check your Sanity Studio at http://localhost:3000/studio')
    
  } catch (error) {
    console.error('❌ Error seeding team members:', error)
  }
}

// Run the script
seedTeamMembers()
