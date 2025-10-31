import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL'
})

async function deleteAndRecreateServicePages() {
  console.log('🗑️  Deleting existing service pages...')
  
  try {
    // Get all existing service pages
    const existingPages = await client.fetch('*[_type == "servicePage"]')
    
    console.log(`📊 Found ${existingPages.length} existing service pages to delete`)
    
    // Delete all existing service pages
    for (const page of existingPages) {
      console.log(`🗑️  Deleting: ${page.title}`)
      await client.delete(page._id)
    }
    
    console.log('✅ All existing service pages deleted')
    
    // Now recreate them with correct slug structure
    console.log('🌱 Recreating service pages with correct slugs...')
    
    const servicePagesData = [
      {
        title: 'Individual Therapy',
        slug: {
          current: 'individual'
        },
        metaDescription: 'Trauma-informed, faith-centered individual counselling focused on rest, restoration, and emotional wellness. Private online sessions (50 minutes, $160).',
        badge: 'Individual Therapy',
        mainTitle: 'Rest, Restoration & Freedom',
        heroDescription: 'Emotional wellness is a key aspect of soul care, and as we live in a fast-paced world, we are often moving from one thing to the next. Seldom do we take the time to sit, reflect, and think about how we are feeling or how we are moving through life from day to day.\n\nJesus says that above all He wishes that our souls will prosper, and truth be told, many of us are prospering, but our souls are yearning for rest, restoration, and true freedom.\n\nSome signs of a soul that needs rest are anxiety, depression, burn out, stress and cynicism.',
        quote: {
          text: 'Are you tired? Worn out? Burned out on religion? Come to me. Get away with me and you\'ll recover your life. I\'ll show you how to take a real rest. Walk with me and work with me—watch how I do it. Learn the unforced rhythms of grace. I won\'t lay anything heavy or ill-fitting on you. Keep company with me and you\'ll learn to live freely and lightly.',
          attribution: 'Matthew 11:28-30'
        },
        primaryCta: {
          text: 'Book a Session',
          url: 'https://thesoulcarecounsellor.janeapp.com',
          external: true
        },
        secondaryCta: {
          text: 'Read Notes',
          url: '/notes',
          external: false
        },
        sections: [
          {
            _type: 'textSection',
            title: 'How We Work Together',
            content: [
              {
                _type: 'block',
                _key: 'how-we-work-1',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'how-we-work-1-text',
                    text: 'Through individual counselling, we journey together to address these issues and dig deeper to address the root causes. As your therapist, we will work together, inviting the Holy Spirit to show us what needs to be attended to through conversation, prayer and listening.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'how-we-work-2',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'how-we-work-2-text',
                    text: 'Our time together can look like a conversation, journaling, prayer, art, or even sitting in silence. Together we build a plan, set goals, and with the support of the Holy Spirit, pace ourselves to achieve them.'
                  }
                ]
              }
            ]
          },
          {
            _type: 'detailsSection',
            title: 'What a Session Looks Like',
            items: [
              { label: 'Length', value: 'Approximately 50 minutes' },
              { label: 'Cost', value: '$160.00 per session' },
              { label: 'Format', value: 'Confidential, private online sessions' },
              { label: 'Focus', value: 'Conversations centered on what you need' }
            ]
          },
          {
            _type: 'listSection',
            title: 'Top Concerns We Help to Address',
            items: [
              'Trauma-informed individual and group counselling',
              'Racial Identity',
              'Depression and anxiety support',
              'Emotional, physical, verbal and spiritual abuse',
              'Managing life transitions',
              'Stress management',
              'Identity development',
              'Relationship counselling',
              'Tools to leverage body and self care'
            ]
          },
          {
            _type: 'textSection',
            title: 'Our Objective',
            content: [
              {
                _type: 'block',
                _key: 'objective',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'objective-text',
                    text: 'Our main objective? To work together and create a future where you have attained an emotionally, mentally, socially and spiritually balanced life.'
                  }
                ]
              }
            ]
          },
          {
            _type: 'ctaSection',
            title: 'Ready to Begin?',
            description: 'Book a confidential online session. We\'ll pace the journey together.',
            primaryButton: {
              text: 'Book Now',
              url: 'https://thesoulcarecounsellor.janeapp.com',
              external: true
            },
            secondaryButton: {
              text: 'Contact Us',
              url: '/contact',
              external: false
            }
          }
        ],
        isActive: true
      },
      {
        title: 'Affordable Therapy',
        slug: {
          current: 'affordable'
        },
        metaDescription: 'Affordable therapy option: 50-minute individual sessions at $80. Canada residents only. Limited spots, first-come first-served. Trauma-informed and faith-centered care.',
        badge: 'Affordable Therapy Program',
        mainTitle: 'Accessible, faith-centered support',
        heroDescription: 'We understand that everyone is not able to afford therapy and this can be a barrier to receiving mental health support. As a result we have created space for individuals who may have financial barriers to accessing support.',
        primaryCta: {
          text: 'Check Availability / Apply',
          url: 'https://thesoulcarecounsellor.janeapp.com',
          external: true
        },
        secondaryCta: {
          text: 'Back to Services',
          url: '/services',
          external: false
        },
        sections: [
          {
            _type: 'detailsSection',
            title: 'Session Details',
            items: [
              { label: 'Individual Therapy Sessions', value: '50 minutes' },
              { label: 'Cost', value: '$80.00 per session (affordability rate)' }
            ]
          },
          {
            _type: 'listSection',
            title: 'Eligibility Criteria & Other Information',
            items: [
              'Resident of Canada',
              'Children (11–13) and youth (13–18): navigating behavioural issues, ADHD, anxiety, depression, trauma, etc.',
              'Adults: navigating depression, anxiety, childhood traumas, stress, burnout, transitions, workplace trauma, racial issues, decision making, etc.'
            ]
          },
          {
            _type: 'textSection',
            title: 'Therapeutic Modalities Used',
            content: [
              {
                _type: 'block',
                _key: 'modalities',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'modalities-text',
                    text: 'Solution Focused Therapy, DBT, CBT, and Narrative Therapy from a trauma-informed approach.'
                  }
                ]
              }
            ]
          },
          {
            _type: 'ctaSection',
            title: 'Important to Note',
            description: 'The Soul Care Affordability Program is a 6-month program where you can receive a maximum of 7 sessions at the affordability rate. After this, sessions increase to $100.00.\n\nThere are limited spots available for affordable therapy; services are provided on a first-come, first-served basis.',
            primaryButton: {
              text: 'Apply / Book at Affordable Rate',
              url: 'https://thesoulcarecounsellor.janeapp.com',
              external: true
            },
            secondaryButton: {
              text: 'Questions? Contact Us',
              url: '/contact',
              external: false
            }
          }
        ],
        isActive: true
      },
      {
        title: 'Single Session Program',
        slug: {
          current: 'single-session'
        },
        metaDescription: 'Low-Cost Therapy: Single Session Program (SSP). $20 per individual, up to 2 sessions. Choose a guided Soul Care Plan (Cohort 1) or targeted support for a specific concern (Cohort 2).',
        badge: 'Single Session Program (SSP)',
        mainTitle: 'Low-Cost, Focused Support — Exactly When You Need It',
        heroDescription: 'Life can often throw unexpected challenges our way, and finding immediate, affordable support isn\'t always easy. That\'s why we\'ve created a new Low-Cost Therapy Program, the Single Session Program (SSP) — a flexible and accessible way to get the care you need, when you need it most. Whether you\'re navigating a tough situation or seeking a little clarity in the moment, SSP is designed to offer instant support while overcoming common barriers to therapy.\n\nSSP sessions are facilitated by our student therapists, who bring compassion, expertise, and a holistic approach to mental wellness. Their goal is to provide you with the space, tools, and encouragement to navigate life\'s ups and downs with greater clarity and confidence.',
        primaryCta: {
          text: 'Book an SSP Session',
          url: 'https://thesoulcarecounsellor.janeapp.com',
          external: true
        },
        secondaryCta: {
          text: 'Back to Services',
          url: '/services',
          external: false
        },
        sections: [
          {
            _type: 'detailsSection',
            title: 'How It Works',
            items: [
              { label: 'Affordable Care', value: 'Each session is offered at $20 per individual, with a maximum of 2 sessions allowed.' },
              { label: 'Student-Therapist Led', value: 'Sessions are facilitated by our compassionate student therapists with a holistic, evidence-informed approach.' }
            ]
          },
          {
            _type: 'textSection',
            title: 'Choose Your Focus',
            content: [
              {
                _type: 'block',
                _key: 'cohort-1',
                style: 'h3',
                children: [
                  {
                    _type: 'span',
                    _key: 'cohort-1-title',
                    text: 'Cohort 1: Guided Soul Care Plan'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'cohort-1-desc',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'cohort-1-text',
                    text: 'Work with our team as they guide you through our tailored Soul Care Plan, designed to help you reflect, reset, and realign.'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'cohort-2',
                style: 'h3',
                children: [
                  {
                    _type: 'span',
                    _key: 'cohort-2-title',
                    text: 'Cohort 2: Targeted Support'
                  }
                ]
              },
              {
                _type: 'block',
                _key: 'cohort-2-desc',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'cohort-2-text',
                    text: 'Receive direct support in addressing specific presenting concerns or challenges, whether emotional, relational, or personal.'
                  }
                ]
              }
            ]
          },
          {
            _type: 'ctaSection',
            title: 'Ready for focused support?',
            description: 'Choose a cohort and book your low-cost single session today.',
            primaryButton: {
              text: 'Book Now',
              url: 'https://thesoulcarecounsellor.janeapp.com',
              external: true
            },
            secondaryButton: {
              text: 'Questions? Contact Us',
              url: '/contact',
              external: false
            }
          }
        ],
        isActive: true
      },
      {
        title: 'Group Therapy',
        slug: {
          current: 'group-therapy'
        },
        metaDescription: 'Heal in community through faith-centered group therapy. Join the interest list for upcoming groups and be the first to know when dates are announced.',
        badge: 'Group Therapy',
        mainTitle: 'Healing in Community',
        heroDescription: 'One of the most powerful aspects of healing is healing in community. Oftentimes we feel as though we are going through our current circumstance alone, and no one else has experienced what we have. This can sometimes lead to living in guilt and shame or suffering in silence. This is not God\'s plan for humanity. His heart is that we learn, grow and heal together; and group therapy is a great space to heal together in community.',
        primaryCta: {
          text: 'Join the Interest List',
          url: '/contact',
          external: false
        },
        secondaryCta: {
          text: 'Back to Services',
          url: '/services',
          external: false
        },
        sections: [
          {
            _type: 'textSection',
            title: 'Upcoming Group Dates',
            content: [
              {
                _type: 'block',
                _key: 'dates',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'dates-text',
                    text: 'Will be announced! Add your name to the interest list and we\'ll notify you as soon as dates open.'
                  }
                ]
              }
            ]
          },
          {
            _type: 'detailsSection',
            title: 'Group Therapy Features',
            items: [
              { label: 'Safe & Confidential', value: 'Facilitated by trained clinicians in a supportive, faith-informed environment.' },
              { label: 'Shared Growth', value: 'Normalize your experience and learn alongside others with similar journeys.' },
              { label: 'Practical Tools', value: 'Leave each session with simple practices for peace, renewal, and resilience.' }
            ]
          },
          {
            _type: 'ctaSection',
            title: 'Want to be first to know?',
            description: 'Join the interest list and we\'ll email you when groups open for registration.',
            primaryButton: {
              text: 'Join the Interest List',
              url: '/contact',
              external: false
            },
            secondaryButton: {
              text: 'Book a Free Consultation',
              url: 'https://thesoulcarecounsellor.janeapp.com',
              external: true
            }
          }
        ],
        isActive: true
      }
    ]
    
    for (const pageData of servicePagesData) {
      console.log(`📝 Creating service page: ${pageData.title}`)
      
      const result = await client.create({
        _type: 'servicePage',
        ...pageData
      })
      
      console.log(`✅ Created service page: ${pageData.title} (ID: ${result._id})`)
    }
    
    console.log('✅ Service pages recreated successfully!')
    
    // Verify the creation
    const pages = await client.fetch('*[_type == "servicePage"] | order(title asc)')
    console.log(`📊 Created ${pages.length} service pages:`)
    pages.forEach(page => {
      console.log(`  - ${page.title}: /${page.slug.current}`)
    })
    
  } catch (error) {
    console.error('❌ Error recreating service pages:', error)
  }
}

// Run the function
deleteAndRecreateServicePages()
