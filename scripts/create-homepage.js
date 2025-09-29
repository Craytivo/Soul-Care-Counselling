require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: process.env.SANITY_API_TOKEN, // Use the API token from .env.local
});

async function createHomePage() {
  try {
    console.log('Creating homepage document...');

    const homePageDoc = {
      _type: 'homePage',
      _id: 'homepage-main',
      title: 'Soul Care Counselling - Homepage',
      metaDescription: 'Faith-centered, culturally sensitive therapy services across Canada. Expert-led virtual counselling with compassionate, evidence-based care.',
      hero: {
        mainHeading: 'Faith-centered therapy,',
        highlightText: 'culturally sensitive care',
        description: 'Experience compassionate, expert-led counselling designed for your story. Our diverse team offers virtual support across Canada, blending evidence-based methods with genuine care for lasting change.',
        features: [
          {
            text: 'Private & secure telehealth',
            icon: 'lock',
            order: 1
          },
          {
            text: 'Virtual care, Canada-wide',
            icon: 'mapPin',
            order: 2
          },
          {
            text: 'Culturally responsive team',
            icon: 'globe',
            order: 3
          },
          {
            text: 'Evidence-based, practical care',
            icon: 'graduationCap',
            order: 4
          }
        ],
        quote: {
          text: 'It is the will of the Father that you are well',
          author: 'Jessica Robinson-Grant'
        },
        ctaButtons: {
          primaryButton: {
            text: 'Book a Free Consultation',
            url: 'https://thesoulcarecounsellor.janeapp.com',
            external: true
          },
          secondaryButton: {
            text: 'View Services',
            url: '/services',
            external: false
          }
        }
      },
      isActive: true
    };

    const result = await client.createOrReplace(homePageDoc);
    console.log('✅ Homepage document created successfully!');
    console.log('Document ID:', result._id);
    console.log('You can now edit it in Sanity Studio at http://localhost:3333');
    
  } catch (error) {
    console.error('❌ Error creating homepage document:', error.message);
    
    if (error.statusCode === 403) {
      console.log('\n💡 This might be due to insufficient permissions.');
      console.log('Try creating the document manually in Sanity Studio:');
      console.log('1. Go to http://localhost:3333');
      console.log('2. Click on "Homepage" in the sidebar');
      console.log('3. Click the "+" button to create a new document');
    }
  }
}

createHomePage();