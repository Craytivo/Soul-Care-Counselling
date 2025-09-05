const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-09-05'
})

// Map team members to their image files
const teamImageMapping = {
  'jessica-robinson-grant': 'rs=w_365,h_365,cg_true,m.webp',
  'davene': 'rs=w_365,h_365,cg_true,m (1).webp',
  'princeton': 'rs=w_365,h_365,cg_true,m (2).webp',
  'anita': 'rs=w_365,h_365,cg_true,m (3).webp',
  'baraka': 'rs=w_365,h_365,cg_true,m (4).webp',
  'josh': 'rs=w_365,h_365,cg_true,m (5).webp',
  'khadian': 'rs=w_365,h_365,cg_true,m (6).webp',
  'natalie': 'rs=w_365,h_365,cg_true,m (7).webp',
  'nigel': 'rs=w_365,h_365,cg_true,m (8).webp',
  'oluseye': 'rs=w_365,h_365,cg_true,m.webp'
}

async function uploadTeamImages() {
  try {
    console.log('🖼️  Starting to upload team images...')
    
    // First, get all team members
    const teamMembers = await client.fetch(`
      *[_type == "teamMember"] {
        _id,
        name,
        slug
      }
    `)
    
    console.log(`📋 Found ${teamMembers.length} team members`)
    
    for (const member of teamMembers) {
      const slug = member.slug?.current
      if (!slug || !teamImageMapping[slug]) {
        console.log(`⚠️  No image mapping found for ${member.name} (slug: ${slug})`)
        continue
      }
      
      const imageFileName = teamImageMapping[slug]
      const imagePath = path.join(process.cwd(), 'public', 'assets', 'img', 'team', imageFileName)
      
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  Image file not found: ${imagePath}`)
        continue
      }
      
      console.log(`📸 Uploading image for ${member.name}...`)
      
      // Read the image file
      const imageBuffer = fs.readFileSync(imagePath)
      
      // Upload the image to Sanity
      const imageAsset = await client.assets.upload('image', imageBuffer, {
        filename: `${member.name.toLowerCase().replace(/\s+/g, '-')}-profile.webp`
      })
      
      console.log(`✅ Image uploaded for ${member.name} (Asset ID: ${imageAsset._id})`)
      
      // Update the team member with the image
      await client
        .patch(member._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          }
        })
        .commit()
      
      console.log(`✅ Image assigned to ${member.name}`)
    }
    
    console.log('🎉 All team images have been uploaded and assigned!')
    console.log('🌐 Check your Sanity Studio at http://localhost:3000/studio')
    
  } catch (error) {
    console.error('❌ Error uploading team images:', error)
  }
}

// Run the script
uploadTeamImages()

