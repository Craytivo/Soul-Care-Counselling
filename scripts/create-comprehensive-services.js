require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: process.env.SANITY_API_TOKEN,
});

async function createServices() {
  try {
    console.log('Creating comprehensive service documents...');

    const services = [
      {
        _type: 'service',
        _id: 'individual-therapy',
        title: 'Individual Therapy',
        slug: { current: 'individual' },
        description: 'One-on-one support tailored to your unique needs, integrating faith and evidence-based approaches for lasting healing.',
        features: [
          'Personalized treatment plans',
          'Faith-centered approach',
          'Evidence-based therapy methods'
        ],
        pricing: {
          displayType: 'custom',
          customText: 'Starting at $170.00 per session'
        },
        buttons: {
          learnMore: {
            show: true,
            text: 'Learn More',
            url: '/individual',
            external: false
          },
          bookNow: {
            show: true,
            text: 'Book Now',
            url: 'https://thesoulcarecounsellor.janeapp.com'
          }
        },
        order: 1,
        isActive: true
      },
      {
        _type: 'service',
        _id: 'affordable-therapy',
        title: 'Affordable Therapy',
        slug: { current: 'affordable' },
        description: 'Accessible mental health care with sliding scale options and flexible payment plans to ensure support is within reach.',
        features: [
          'Sliding scale pricing',
          'Flexible payment plans',
          'Income-based rates'
        ],
        pricing: {
          displayType: 'custom',
          customText: '$80.00 for 7 sessions'
        },
        buttons: {
          learnMore: {
            show: true,
            text: 'Learn More',
            url: '/affordable',
            external: false
          },
          bookNow: {
            show: true,
            text: 'Book Now',
            url: 'https://thesoulcarecounsellor.janeapp.com'
          }
        },
        order: 2,
        isActive: true
      },
      {
        _type: 'service',
        _id: 'single-session',
        title: 'Single Session Therapy',
        slug: { current: 'single-session' },
        description: 'Focused, solution-oriented support in a single session for immediate relief and practical next steps.',
        features: [
          'Immediate support',
          'Solution-focused approach',
          'Practical tools and strategies'
        ],
        pricing: {
          displayType: 'custom',
          customText: '$20.00 per session'
        },
        buttons: {
          learnMore: {
            show: true,
            text: 'Learn More',
            url: '/single-session',
            external: false
          },
          bookNow: {
            show: true,
            text: 'Book Now',
            url: 'https://thesoulcarecounsellor.janeapp.com'
          }
        },
        order: 3,
        isActive: true
      },
      {
        _type: 'service',
        _id: 'group-therapy',
        title: 'Group Therapy',
        slug: { current: 'group-therapy' },
        description: 'Connect with others on similar journeys in a supportive, faith-centered group setting for shared healing.',
        features: [
          'Peer support and connection',
          'Faith-centered group setting',
          'Shared experiences and healing'
        ],
        pricing: {
          displayType: 'hidden'
        },
        buttons: {
          learnMore: {
            show: true,
            text: 'Learn More',
            url: '/group-therapy',
            external: false
          },
          bookNow: {
            show: true,
            text: 'Book Now',
            url: 'https://thesoulcarecounsellor.janeapp.com'
          }
        },
        order: 4,
        isActive: true
      }
    ];

    for (const service of services) {
      const result = await client.createOrReplace(service);
      console.log(`✅ Created service: ${service.title} (ID: ${result._id})`);
    }

    console.log('\n🎉 All services created successfully!');
    console.log('You can now edit them in Sanity Studio at http://localhost:3333');
    
  } catch (error) {
    console.error('❌ Error creating services:', error.message);
    
    if (error.statusCode === 403) {
      console.log('\n💡 This might be due to insufficient permissions.');
      console.log('Try creating the documents manually in Sanity Studio:');
      console.log('1. Go to http://localhost:3333');
      console.log('2. Click on "Service" in the sidebar');
      console.log('3. Click the "+" button to create new services');
    }
  }
}

createServices();