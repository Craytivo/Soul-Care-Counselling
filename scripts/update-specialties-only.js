const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL',
  apiVersion: '2025-09-05'
})

// Specialties data extracted from individual page files
const teamMemberSpecialties = {
  'jessica-robinson-grant': [
    "Trauma-informed individual and group counselling",
    "Racial identity",
    "Depression and anxiety support",
    "Abuse",
    "Managing life transitions",
    "Stress management",
    "Identity development",
    "Relationship counselling",
    "Tools to leverage body and self care"
  ],
  'anita': [
    "Anxiety & Depression",
    "Stress Management",
    "Academic & Career Counselling",
    "Bilingual Services (EN/FR)"
  ],
  'baraka': [
    "Life transitions",
    "Relationship issues",
    "Anxiety & depression",
    "Stress at work or school",
    "Narrative, CBT & family systems",
    "Trauma-informed, strengths-based lens",
    "Faith-integrated care"
  ],
  'davene': [
    "Practice operations & administration",
    "Team coordination & support",
    "Client services management",
    "Process improvement & efficiency",
    "Faith-integrated organizational leadership"
  ],
  'josh': [
    "Addictions & recovery",
    "Anxiety & emotional regulation",
    "Identity & self-esteem",
    "Faith & spirituality",
    "Trauma & attachment; adoptee trauma",
    "Burnout & life transitions",
    "DBT, CBT, Narrative, Solution-Focused, Parts work"
  ],
  'khadian': [
    "Anxiety & depression",
    "Emotional regulation",
    "Spirituality & life transitions",
    "Trauma-informed care",
    "CBT, Narrative, Solution-Focused therapy",
    "Individual, family & youth counselling"
  ],
  'natalie': [
    "Life transitions & burnout",
    "Anxiety & depression support",
    "Trauma-informed care",
    "Identity development",
    "Cognitive-Behavioural strategies",
    "Strengths-based approach"
  ],
  'nigel': [
    "Teens, adults & couples",
    "Life transitions",
    "Anxiety & depression",
    "Emotional regulation",
    "Trauma-informed care",
    "Spirituality & meaning",
    "CBT, Solution-Focused, Narrative therapy",
    "Identity, masculinity & social justice"
  ],
  'oluseye': [
    "Parenting & couples",
    "Christian family life",
    "Marriage & identity",
    "Spiritual growth & purpose",
    "Holistic, faith-integrated approach",
    "Evidence-based practices"
  ],
  'princeton': [
    "Early childhood development",
    "Parent coaching",
    "Family support & education",
    "Child–parent relationship building"
  ]
}

async function updateSpecialtiesOnly() {
  console.log('🎯 Updating specialties only for team members...')
  
  try {
    // First, get all existing team members
    const existingMembers = await client.fetch('*[_type == "teamMember"]')
    console.log(`Found ${existingMembers.length} existing team members`)
    
    let updatedCount = 0
    
    for (const member of existingMembers) {
      const slug = member.slug?.current
      
      if (slug && teamMemberSpecialties[slug]) {
        const newSpecialties = teamMemberSpecialties[slug]
        
        console.log(`\n📝 Updating specialties for ${member.name}...`)
        console.log(`   Current specialties: ${member.specialties?.length || 0} items`)
        console.log(`   New specialties: ${newSpecialties.length} items`)
        
        try {
          await client
            .patch(member._id)
            .set({
              specialties: newSpecialties
            })
            .commit()
          
          console.log(`✅ Updated specialties for ${member.name}`)
          updatedCount++
        } catch (error) {
          console.error(`❌ Error updating ${member.name}:`, error.message)
        }
      } else {
        console.log(`⚠️  No specialties data found for ${member.name} (slug: ${slug})`)
      }
    }
    
    console.log(`\n🎉 Specialties update completed!`)
    console.log(`📊 Updated ${updatedCount} team members`)
    
    // Verify the results
    const finalMembers = await client.fetch('*[_type == "teamMember"]')
    console.log(`\n📋 Final team member specialties:`)
    
    for (const member of finalMembers) {
      console.log(`\n👤 ${member.name}:`)
      console.log(`   Specialties: ${member.specialties?.length || 0} items`)
      if (member.specialties && member.specialties.length > 0) {
        member.specialties.forEach((specialty, index) => {
          console.log(`   ${index + 1}. ${specialty}`)
        })
      }
    }
    
  } catch (error) {
    console.error('❌ Error during specialties update:', error)
  }
}

// Run the update
updateSpecialtiesOnly()
