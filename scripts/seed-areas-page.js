const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function seedAreasPage() {
  try {
    console.log('🌱 Seeding Areas of Focus page...')

    const areasPageData = {
      _type: 'areasPage',
      hero: {
        badge: 'Areas of Focus',
        title: 'Support for your season',
        description: 'Explore the areas we commonly work with, delivered through faith-integrated, evidence-based care.'
      },
      areas: [
        {
          title: 'Trauma',
          slug: {
            _type: 'slug',
            current: 'trauma'
          },
          content: [
            {
              _type: 'block',
              _key: 'trauma-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-intro-text',
                  text: 'Trauma is a word that is often thrown around in conversation today, but today\'s generation is in tuned with what trauma is and how it can affect day to day living. However, one of the most difficult aspects of trauma is working through it, especially when life seems a little overwhelming.'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'trauma-explore',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-explore-text',
                  text: 'As we journey through healing from trauma, there are a few areas that we can explore:'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'trauma-list',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-list-1',
                  text: 'Developmental trauma'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'trauma-list-2',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-list-2-text',
                  text: 'Emotional and psychological traumas'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'trauma-list-3',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-list-3-text',
                  text: 'Intergenerational trauma'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'trauma-list-4',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-list-4-text',
                  text: 'Complex trauma'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'trauma-impact',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-impact-text',
                  text: 'Trauma tends to show up in our everyday lives as we navigate through different types of relationships. Sometimes we may find ourselves in a cycle of unhealthy relationships, whether romantic or platonic. Trauma shows up in the way we view ourselves and the world around us. It shows up in how we balance our priorities, how much we prioritize ourselves and our ability to cope with everyday stress. As we work together, we will work towards post-traumatic growth and change, realizing that there is life after trauma.'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'trauma-closing',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'trauma-closing-text',
                  text: 'Together we will work on your strengths and we will meet you where you\'re at.'
                }
              ]
            }
          ],
          order: 1
        },
        {
          title: 'Life Transition',
          slug: {
            _type: 'slug',
            current: 'life-transition'
          },
          content: [
            {
              _type: 'block',
              _key: 'transition-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-intro-text',
                  text: 'Feeling stuck? Not sure of next steps? Feel like everyone around you is "winning" and you\'re going in circles? Or do you feel like you need a change? This is called a transition. Life comes with many ups and downs, and it is quite the journey. Along the way, we can experience many difficult transitions, particularly when you don\'t have a strong support system or a clear view of where you want to go.'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-support',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-support-text',
                  text: 'If you need support navigating through:'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-list-1',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-list-1-text',
                  text: 'Day to day life as a youth or young adult'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-list-2',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-list-2-text',
                  text: 'Career or academic changes'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-list-3',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-list-3-text',
                  text: 'Relationships'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-list-4',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-list-4-text',
                  text: 'New church environments'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-list-5',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-list-5-text',
                  text: 'Engagement and marriage'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-list-6',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-list-6-text',
                  text: 'A new life change'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'transition-closing',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'transition-closing-text',
                  text: 'We would love to journey with you. Together we will work on a roadmap and vision for your life; we will set some goals and at your own pace, with a clear view in mind this transition just may become a little easier.'
                }
              ]
            }
          ],
          order: 2
        },
        {
          title: 'Identity',
          slug: {
            _type: 'slug',
            current: 'identity'
          },
          content: [
            {
              _type: 'block',
              _key: 'identity-content',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'identity-content-text',
                  text: 'When we have a healthy view of ourselves, having a healthy view of others and the world around us will become a little easier. Our identity is not only about what we see on the outside; it is more about what is taking place on the inside. When we are comfortable and at peace with the different expressions of who we are, whether it\'s our spiritual beliefs, gender, race or even our profession, we begin to show up differently in the world. Our confidence shifts, we are no longer afraid to prioritize our needs and we accept ourselves with all our flaws and imperfections. As we work together to rebuild identity and good self-esteem, we will get to the core of who you are, and who you were created to be.'
                }
              ]
            }
          ],
          order: 3
        },
        {
          title: 'Relationships',
          slug: {
            _type: 'slug',
            current: 'relationships'
          },
          content: [
            {
              _type: 'block',
              _key: 'relationships-content',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'relationships-content-text',
                  text: 'Relationships, whether romantic, platonic or family, can be quite complex and complicated. Our relationships are a good reflection of who we are, and where we are at in our lives. Are your relationships unhealthy and toxic? Do you find yourself in these relationships more often than you would like? Let\'s work through this together. In order to create a foundation for healthy relationships, the way we view ourselves will need to shift. This can be achieved through building healthy boundaries, healthy communication, and a positive sense of self.'
                }
              ]
            }
          ],
          order: 4
        },
        {
          title: 'Anxiety',
          slug: {
            _type: 'slug',
            current: 'anxiety'
          },
          content: [
            {
              _type: 'block',
              _key: 'anxiety-content',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'anxiety-content-text',
                  text: 'We have all experienced various levels of fear, or something that keeps us up at night. However, sometimes these levels of fear, or the things that keep us up at night can become more than we can handle. We find that our body is a little more tense than usual, our chest is tight, our palms are sweaty, or we just can\'t focus on our present day to day activities. Anxiety is not uncommon, and neither is the ability to cope. With the right tools and support we can work through controlling anxious thoughts that may affect day to day life.'
                }
              ]
            }
          ],
          order: 5
        },
        {
          title: 'Depression',
          slug: {
            _type: 'slug',
            current: 'depression'
          },
          content: [
            {
              _type: 'block',
              _key: 'depression-content',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'depression-content-text',
                  text: 'A lack of joy, hopelessness, or the ability to get out of bed to perform day to day activities are some common signs of depression. Unfortunately, individuals who experience depression often think this is it- enjoying the things they once loved or feeling hopeful again is not an option. On our journey together we will navigate through some of the root causes of your experience, and we will address those root causes. Consequently, we will aim to rebuild hope, finding meaning in life and navigate through what brings you joy. You deserve the ability to have hope, dream again and wake up with purpose each and everyday.'
                }
              ]
            }
          ],
          order: 6
        },
        {
          title: 'Stress Management',
          slug: {
            _type: 'slug',
            current: 'stress-management'
          },
          content: [
            {
              _type: 'block',
              _key: 'stress-content',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'stress-content-text',
                  text: 'We all have a degree of stress that we can manage. There is positive stress which helps motivate you, challenges you to be better and drives you towards achieving your life goals. Of course, there is also negative stress. The type of stress that creates an inability to cope. The type of stress that results in you feeling overworked and burned out. Managing this negative stress can be difficult, but it\'s not impossible. With the proper support and right tools, we will aim to determine the root of your current stressors, creating balance and putting systems in place to navigate your current season of life.'
                }
              ]
            }
          ],
          order: 7
        }
      ],
      cta: {
        title: 'Ready to begin?',
        description: 'Book a free 15-minute consultation to explore fit and next steps.',
        buttonText: 'Book a Free Consultation',
        buttonLink: 'https://thesoulcarecounsellor.janeapp.com',
        external: true
      }
    }

    // Check if areas page already exists
    const existingPage = await client.fetch('*[_type == "areasPage"][0]')
    
    if (existingPage) {
      console.log('📝 Updating existing Areas of Focus page...')
      const result = await client
        .patch(existingPage._id)
        .set(areasPageData)
        .commit()
      console.log('✅ Areas of Focus page updated successfully!')
      console.log('📄 Document ID:', result._id)
    } else {
      console.log('🆕 Creating new Areas of Focus page...')
      const result = await client.create(areasPageData)
      console.log('✅ Areas of Focus page created successfully!')
      console.log('📄 Document ID:', result._id)
    }

    console.log('🎉 Areas of Focus page seeding completed!')
    console.log('🌐 You can now view it at: http://localhost:3000/areas')
    console.log('✏️  Edit it in Sanity Studio at: http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ Error seeding Areas of Focus page:', error)
    if (error.message.includes('permission')) {
      console.log('🔑 Permission error - you may need to update your API token permissions in Sanity')
    }
  }
}

seedAreasPage()