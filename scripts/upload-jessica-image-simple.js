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

async function uploadJessicaImage() {
  try {
    console.log('Uploading Jessica Robinson-Grant\'s image...')
    
    // Use the first team image as Jessica's profile
    const imagePath = path.join(__dirname, '../public/assets/img/team/rs=w_365,h_365,cg_true,m.webp')
    
    if (!fs.existsSync(imagePath)) {
      console.error('Image file not found:', imagePath)
      return
    }

    const imageBuffer = fs.readFileSync(imagePath)
    
    // Upload the image
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'jessica-robinson-grant.webp',
      title: 'Jessica Robinson-Grant - Clinical Director'
    })
    
    console.log('Image uploaded successfully:', asset._id)
    
    // Get the About page
    const aboutPageQuery = `*[_type == "aboutPage"][0]`
    const aboutPage = await client.fetch(aboutPageQuery)
    
    if (aboutPage) {
      // Update the director image
      const updatedAboutPage = await client
        .patch(aboutPage._id)
        .set({
          'director.image': {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            },
            alt: 'Jessica Robinson-Grant - Clinical Director'
          }
        })
        .commit()
      
      console.log('About page updated with Jessica\'s image')
      console.log('Director image now set to:', updatedAboutPage.director.image)
    }
    
  } catch (error) {
    console.error('Error uploading Jessica\'s image:', error)
  }
}

uploadJessicaImage()
