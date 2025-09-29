require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: process.env.SANITY_API_TOKEN,
});

async function createServicesPage() {
  try {
    console.log('Creating services page document...');

    const servicesPageDoc = {
      _type: 'servicesPage',
      _id: 'services-page-main',
      title: 'Services | Soul Care Counselling',
      metaDescription: 'Faith-centered, culturally sensitive therapy. Virtual across Canada. Explore individual therapy, affordable therapy, single-session options, and group therapy.',
      hero: {
        badge: 'Services',
        heading: 'Faith-Centered Care, Designed for You',
        description: 'Explore the right level of support for your season—individual, affordable, single-session, and group therapy.',
        priceHighlight: {
          text: 'Individual therapy starts at',
          price: '$170.00',
          suffix: 'per session'
        }
      },
      cta: {
        title: 'Ready to get started?',
        description: 'Book a free consultation to explore which service is right for you.',
        buttonText: 'Book a Free Consultation',
        buttonUrl: 'https://thesoulcarecounsellor.janeapp.com',
        external: true
      },
      isActive: true
    };

    const result = await client.createOrReplace(servicesPageDoc);
    console.log('✅ Services page document created successfully!');
    console.log('Document ID:', result._id);
    console.log('You can now edit it in Sanity Studio at http://localhost:3333');
    
  } catch (error) {
    console.error('❌ Error creating services page document:', error.message);
    
    if (error.statusCode === 403) {
      console.log('\n💡 This might be due to insufficient permissions.');
      console.log('Try creating the document manually in Sanity Studio:');
      console.log('1. Go to http://localhost:3333');
      console.log('2. Click on "Services Page" in the sidebar');
      console.log('3. Click the "+" button to create a new document');
    }
  }
}

createServicesPage();