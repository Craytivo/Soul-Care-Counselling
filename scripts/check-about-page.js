const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

async function checkAboutPage() {
  try {
    console.log('Checking About page data...')
    
    const aboutPageQuery = `*[_type == "aboutPage"][0]`
    const aboutPage = await client.fetch(aboutPageQuery)
    
    if (aboutPage) {
      console.log('About page found:')
      console.log('Title:', aboutPage.hero?.title)
      console.log('Director name:', aboutPage.director?.name)
      console.log('Director image:', aboutPage.director?.image)
      console.log('Director credentials:', aboutPage.director?.credentials)
    } else {
      console.log('No About page found')
    }
    
  } catch (error) {
    console.error('Error checking About page:', error)
  }
}

checkAboutPage()
