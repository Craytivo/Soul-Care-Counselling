const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

async function uploadAllTeamImages() {
  try {
    console.log('Uploading all team images...')
    
    const teamImagesDir = path.join(__dirname, '../public/assets/img/team')
    const imageFiles = fs.readdirSync(teamImagesDir)
    
    console.log('Found team images:', imageFiles)
    
    for (const imageFile of imageFiles) {
      if (imageFile.endsWith('.webp')) {
        const imagePath = path.join(teamImagesDir, imageFile)
        console.log(`\nUploading: ${imageFile}`)
        
        try {
          const imageBuffer = fs.readFileSync(imagePath)
          
          // Upload the image
          const asset = await client.assets.upload('image', imageBuffer, {
            filename: imageFile,
            title: `Team member image - ${imageFile}`
          })
          
          console.log(`✅ Uploaded: ${imageFile} -> ${asset._id}`)
          
        } catch (error) {
          console.error(`❌ Failed to upload ${imageFile}:`, error.message)
        }
      }
    }
    
    console.log('\nTeam image upload process completed!')
    
  } catch (error) {
    console.error('Error uploading team images:', error)
  }
}

uploadAllTeamImages()
