import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL',
  apiVersion: '2025-09-05'
})

async function debugTeamData() {
  try {
    console.log('🔍 Getting exact data that frontend receives...')
    // Use exact same query as getTeamMembers()
    const teamMembers = await client.fetch(`
      *[_type == "teamMember"] | order(name asc) {
        _id,
        _type,
        name,
        credentials,
        role,
        image,
        bio,
        specialties,
        areasOfFocus,
        socialLinks,
        acceptsBookings,
        slug
      }
    `)

    // Print all team members and their specialties for debugging
    console.log('\n📋 All team members and specialties:')
    teamMembers.forEach(member => {
      console.log(`- ${member.name} (${member.slug?.current}):`)
      if (member.specialties && member.specialties.length > 0) {
        member.specialties.forEach((spec, i) => console.log(`   ${i + 1}. ${spec}`))
      } else {
        console.log('   (No specialties)')
      }
    })

    // Simulate the exact filtering logic from SanityTeamClient
    const specialtyTabs = [
      "Anxiety",
      "Depression", 
      "Trauma",
      "Stress management",
      "Youth",
      "Women's mental health",
      "Men's mental health",
      "Couples",
      "Family",
      "Addiction",
      "Religious trauma",
      "Spiritual abuse",
      "Workplace stress",
      "Bilingual",
      "Art therapy",
      "Affordable therapy",
      "Postpartum Mental Health",
      "Parent coaching",
      "Family coaching",
      "Parent workshops"
    ];
    // Calculate filter counts like the component does
    const filters = [
      { key: "all", label: "All Team Members", count: teamMembers.length },
      ...specialtyTabs.map(s => {
        const normalized = s.trim().toLowerCase();
        const count = teamMembers.filter(m => m.specialties?.some(x => x.trim().toLowerCase() === normalized)).length;
        return {
          key: s,
          label: s,
          count
        };
      })
    ];
    console.log('\n📋 Filter counts (as they would appear in the UI):')
    filters.forEach(filter => {
      if (filter.count > 0 || filter.key === 'all' || filter.key === "Men's mental health") {
        console.log(`   ${filter.label}: ${filter.count} ${filter.key === "Men's mental health" ? '← TARGET FILTER' : ''}`)
      }
    })
    // Test the specific Men's mental health filter
    const activeFilter = "Men's mental health"
    const normalizedFilter = activeFilter.trim().toLowerCase()
    const mensMentalHealthMembers = teamMembers.filter(member => 
      member.specialties?.some(x => x.trim().toLowerCase() === normalizedFilter)
    )
    console.log('\n🎯 Members for "Men\'s mental health" filter:')
    if (mensMentalHealthMembers.length === 0) {
      console.log('   ❌ NO MEMBERS FOUND')
    } else {
      mensMentalHealthMembers.forEach(member => {
        console.log(`   ✅ ${member.name}`)
        console.log(`      Slug: /${member.slug?.current}`)
        console.log(`      Specialties: ${member.specialties?.join(', ')}`)
      })
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error && error.message ? error.message : error);
    process.exit(1);
  }
  try {
    console.log('🔍 Getting exact data that frontend receives...')
    
    // Use exact same query as getTeamMembers()
    const teamMembers = await client.fetch(`
      *[_type == "teamMember"] | order(name asc) {
        _id,
        _type,
        name,
        credentials,
        role,
        image,
        bio,
        specialties,
        areasOfFocus,
        socialLinks,
        acceptsBookings,
        slug
      }
    `)
    
    console.log(`\n📊 Found ${teamMembers.length} team members`)
    
    // Simulate the exact filtering logic from SanityTeamClient
    const specialtyTabs = [
      "Anxiety",
      "Depression", 
      "Trauma",
      "Stress management",
      "Youth",
      "Women's mental health",
      "Men's mental health",
      "Couples",
      "Family",
      "Addiction",
      "Religious trauma",
      "Spiritual abuse",
      "Workplace stress",
      "Bilingual",
      "Art therapy",
      "Affordable therapy",
      "Parent coaching",
      "Family coaching",
      "Parent workshops"
    ];
    
    // Calculate filter counts like the component does
    const filters = [
      { key: "all", label: "All Team Members", count: teamMembers.length },
      ...specialtyTabs.map(s => {
        const normalized = s.trim().toLowerCase();
        const count = teamMembers.filter(m => m.specialties?.some(x => x.trim().toLowerCase() === normalized)).length;
        return {
          key: s,
          label: s,
          count
        };
      })
    ];
    
    console.log('\n📋 Filter counts (as they would appear in the UI):')
    filters.forEach(filter => {
      if (filter.count > 0 || filter.key === 'all' || filter.key === "Men's mental health") {
        console.log(`   ${filter.label}: ${filter.count} ${filter.key === "Men's mental health" ? '← TARGET FILTER' : ''}`)
      }
    })
    
    // Test the specific Men's mental health filter
    const activeFilter = "Men's mental health"
    const normalizedFilter = activeFilter.trim().toLowerCase()
    
    const mensMentalHealthMembers = teamMembers.filter(member => 
      member.specialties?.some(x => x.trim().toLowerCase() === normalizedFilter)
    )
    
    console.log('\n🎯 Members for "Men\'s mental health" filter:')
    if (mensMentalHealthMembers.length === 0) {
      console.log('   ❌ NO MEMBERS FOUND')
    } else {
      mensMentalHealthMembers.forEach(member => {
        console.log(`   ✅ ${member.name}`)
        console.log(`      Slug: /${member.slug?.current}`)
        console.log(`      Specialties: ${member.specialties?.join(', ')}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

debugTeamData()