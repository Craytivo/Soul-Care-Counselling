const { getTeamMembers } = require('./src/lib/sanity-queries')

async function testSanityData() {
  try {
    console.log('🧪 Testing Sanity data fetch...')
    
    const teamMembers = await getTeamMembers()
    
    console.log(`✅ Successfully fetched ${teamMembers.length} team members`)
    
    teamMembers.forEach((member, index) => {
      console.log(`\n${index + 1}. ${member.name}`)
      console.log(`   Role: ${member.role}`)
      console.log(`   Credentials: ${member.credentials || 'No credentials'}`)
      console.log(`   Accepts Bookings: ${member.acceptsBookings}`)
      console.log(`   Image: ${member.image ? 'Yes' : 'No'}`)
    })
    
  } catch (error) {
    console.error('❌ Error testing Sanity data:', error)
  }
}

testSanityData()
