const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL',
  apiVersion: '2025-09-05'
})

async function checkMensMentalHealth() {
  try {
    console.log('🔍 Checking Men\'s mental health specialties in Sanity...')
    
    const members = await client.fetch('*[_type == "teamMember"]{name, specialties, slug}')
    
    console.log('\n📋 All team members and their specialties:')
    members.forEach((member, index) => {
      console.log(`\n${index + 1}. ${member.name}:`)
      if (member.specialties && member.specialties.length > 0) {
        member.specialties.forEach((specialty, idx) => {
          const isMens = specialty.toLowerCase().includes('men\'s mental health')
          console.log(`   ${idx + 1}. "${specialty}" ${isMens ? '← MENS HEALTH!' : ''}`)
        })
      } else {
        console.log('   No specialties')
      }
    })
    
    const mensMentalHealthMembers = members.filter(m => 
      m.specialties?.some(s => s.toLowerCase().includes('men\'s mental health'))
    )
    
    console.log('\n🎯 Members with "Men\'s mental health":')
    if (mensMentalHealthMembers.length === 0) {
      console.log('   ❌ NONE FOUND - This is why the filter shows nothing!')
    } else {
      mensMentalHealthMembers.forEach(member => {
        console.log(`   ✅ ${member.name} (/${member.slug?.current})`)
      })
    }
    
    // Check exact match
    const exactMatch = members.filter(m => 
      m.specialties?.some(s => s.trim().toLowerCase() === 'men\'s mental health')
    )
    
    console.log('\n🔍 Exact match for "men\'s mental health":')
    if (exactMatch.length === 0) {
      console.log('   ❌ NO EXACT MATCHES')
    } else {
      exactMatch.forEach(member => {
        console.log(`   ✅ ${member.name}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

checkMensMentalHealth()