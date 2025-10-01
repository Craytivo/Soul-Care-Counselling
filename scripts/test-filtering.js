const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL',
  apiVersion: '2025-09-05'
})

async function simulateFiltering() {
  try {
    console.log('🔍 Testing Men\'s mental health filtering logic...')
    
    const members = await client.fetch('*[_type == "teamMember"]{name, specialties, slug}')
    
    const targetFilter = "Men's mental health"
    const normalizedFilter = targetFilter.trim().toLowerCase()
    
    console.log(`\n🎯 Looking for exact match: "${normalizedFilter}"`)
    
    const filteredMembers = members.filter(member => 
      member.specialties?.some(x => x.trim().toLowerCase() === normalizedFilter)
    )
    
    console.log('\n📋 All team members with their specialties (focusing on Men\'s/Women\'s mental health):')
    members.forEach(member => {
      const mentalHealthSpecs = member.specialties?.filter(s => 
        s.toLowerCase().includes('mental health')
      ) || []
      
      if (mentalHealthSpecs.length > 0) {
        console.log(`\n${member.name}:`)
        mentalHealthSpecs.forEach(spec => {
          const isExactMatch = spec.trim().toLowerCase() === normalizedFilter
          console.log(`   "${spec}" ${isExactMatch ? '← EXACT MATCH!' : ''}`)
        })
      }
    })
    
    console.log('\n✅ Members that would show up in "Men\'s mental health" filter:')
    if (filteredMembers.length === 0) {
      console.log('   ❌ NONE - This is why the filter shows nothing!')
    } else {
      filteredMembers.forEach(member => {
        console.log(`   ✅ ${member.name} (/${member.slug?.current})`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

simulateFiltering()