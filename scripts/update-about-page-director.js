const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

async function updateAboutPageDirector() {
  try {
    console.log('Updating About page director section...')
    
    // First, let's see what's currently in the About page
    const aboutPageQuery = `*[_type == "aboutPage"][0]`
    const aboutPage = await client.fetch(aboutPageQuery)
    
    if (aboutPage) {
      console.log('Current About page director data:')
      console.log('- Name:', aboutPage.director?.name)
      console.log('- Credentials:', aboutPage.director?.credentials)
      console.log('- Image:', aboutPage.director?.image)
      console.log('- Description:', aboutPage.director?.description)
      
      // Let's check if there are any existing images in Sanity we can use
      const existingImages = await client.fetch(`*[_type == "sanity.imageAsset"][0..5]`)
      console.log('\nExisting images in Sanity:')
      existingImages.forEach((img, index) => {
        console.log(`${index + 1}. ${img.originalFilename} - ${img._id}`)
      })
      
      // If we find a suitable image, we can update the About page
      if (existingImages.length > 0) {
        const firstImage = existingImages[0]
        console.log(`\nUsing first available image: ${firstImage.originalFilename}`)
        
        const updatedAboutPage = await client
          .patch(aboutPage._id)
          .set({
            'director.image': {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: firstImage._id
              },
              alt: 'Jessica Robinson-Grant - Clinical Director'
            }
          })
          .commit()
        
        console.log('✅ About page updated with director image!')
        console.log('Director image now set to:', updatedAboutPage.director.image)
      } else {
        console.log('❌ No images found in Sanity. You need to upload Jessica\'s image first.')
        console.log('\nManual steps:')
        console.log('1. Go to http://localhost:3000/studio')
        console.log('2. Click "Media" → "Upload"')
        console.log('3. Select: public/assets/img/team/rs=w_365,h_365,cg_true,m.webp')
        console.log('4. Set title: "Jessica Robinson-Grant - Clinical Director"')
        console.log('5. Go to "About Page" → "Director" section')
        console.log('6. Assign the uploaded image to the director.image field')
      }
    } else {
      console.log('❌ No About page found in Sanity')
    }
    
  } catch (error) {
    console.error('Error updating About page:', error)
  }
}

updateAboutPageDirector()
