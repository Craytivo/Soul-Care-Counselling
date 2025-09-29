require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2025-09-05',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function seedHomePage() {
  try {
    console.log('Creating homepage content...');

    const homePageData = {
      _type: 'homePage',
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

    const result = await client.create(homePageData);
    console.log('✅ Homepage content created:', result._id);

  } catch (error) {
    console.error('❌ Error creating homepage content:', error);
  }
}

seedHomePage();