const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL',
  apiVersion: '2025-09-05'
})

async function checkSlugs() {
  console.log('🔍 Checking Sanity team member slugs...')
  
  try {
    const members = await client.fetch('*[_type == "teamMember"]{name, slug, _id}')
    
    console.log(`\n📋 Found ${members.length} team members:`)
    
    members.forEach((member, index) => {
      console.log(`\n${index + 1}. ${member.name}`)
      console.log(`   ID: ${member._id}`)
      console.log(`   Slug: ${member.slug?.current || 'No slug'}`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkSlugs()
