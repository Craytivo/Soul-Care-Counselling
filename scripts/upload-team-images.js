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
  apiVersion: '2025-09-05',
})

// Map team members to their image files (using current Sanity slugs)
const teamImageMapping = {
  'jessica-robinson-grant': 'Jessica.jpg',
  'baraka-mwangi': 'Baraka.jpg',
  'khadian-williams': 'Khadian.jpg',
  'natalie-willis': 'Natalie.jpg',
  'nigel-miller': 'Nigel.jpg',
  'oluseye-olumide': 'Oluseye.jpg',
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
        filename: `${member.name.toLowerCase().replace(/\s+/g, '-')}-profile.webp`,
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
              _ref: imageAsset._id,
            },
          },
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
