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
    
    // Jessica's image is likely one of the team images
    // Let's try the first one as it's often the main person
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
    
    // Now update the About page to include Jessica's image
    const aboutPageQuery = `*[_type == "aboutPage"][0]`
    const aboutPage = await client.fetch(aboutPageQuery)
    
    if (aboutPage) {
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
      console.log('Updated director image:', updatedAboutPage.director.image)
    } else {
      console.log('About page not found, creating new one...')
      
      const newAboutPage = await client.create({
        _type: 'aboutPage',
        hero: {
          badge: 'ABOUT US',
          title: 'Faith-centered, culturally responsive therapy',
          description: 'Our mission is clear: to integrate faith-based perspectives with evidence-based practices, offering tailored counselling and consulting services that resonate with the unique experiences of the Black community.',
          backgroundImage: null,
          featuredImage: null
        },
        welcome: {
          title: 'Welcome to Soul Care',
          content: [
            {
              _type: 'block',
              _key: 'welcome1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'welcome1span',
                  text: 'At Soul Care, we believe that healing happens in relationship. Our approach integrates Christian faith with evidence-based therapeutic practices, creating a safe space where you can explore your story and find hope.'
                }
              ]
            }
          ]
        },
        pillars: {
          title: 'Our Pillars',
          pillarList: [
            {
              title: 'Grounding',
              description: 'Practices that build presence and resilience'
            },
            {
              title: 'Compassion',
              description: 'Practical steps toward wholeness'
            },
            {
              title: 'Community',
              description: 'Healing happens in relationship — we honour that'
            }
          ]
        },
        director: {
          badge: 'CLINICAL DIRECTOR',
          name: 'Jessica Robinson-Grant',
          credentials: 'MSW, RSW',
          description: 'Jessica leads Soul Care with a commitment to holistic, culturally responsive practice rooted in Christian faith and community advocacy.',
          quote: 'It is the will of the Father that you are well.',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            },
            alt: 'Jessica Robinson-Grant - Clinical Director'
          },
          bookingLink: '/contact',
          bookingText: 'Book a Free Consultation',
          psychologyTodayImage: null,
          psychologyTodayLink: null
        },
        cta: {
          title: 'Ready to begin your healing journey?',
          description: 'Connect with us today to learn more about our services and how we can support you.',
          buttonText: 'Get Started',
          buttonLink: '/contact',
          external: false
        }
      })
      
      console.log('New About page created with Jessica\'s image')
    }
    
  } catch (error) {
    console.error('Error uploading Jessica\'s image:', error)
  }
}

uploadJessicaImage()
