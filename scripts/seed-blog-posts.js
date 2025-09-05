const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-05',
  token: 'ski2J8rW8E95bXXGsD49ZO4zb7psiDoEtxZCTYS9PqafmuMDsVB999XLYbpWt4cEex0PvNSo7JNUbK1z8uGRaGfjZ9VLekDUpgaeZo7pkOSGe5AWGqu3NHbpEwQMVYu41O0kwIqRsF2RuUEqikYMIpyYASUUTIyXkeg7VE7uorXiONLfDgVL'
})

// Sample blog posts data
const blogPostsData = [
  {
    title: 'Understanding Anxiety: A Faith-Centered Approach to Healing',
    excerpt: 'Learn how to navigate anxiety through a combination of evidence-based therapy techniques and spiritual practices that honor your faith journey.',
    slug: 'understanding-anxiety-faith-centered-approach',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Anxiety can feel overwhelming, but it doesn\'t have to control your life. In this post, we\'ll explore how combining professional therapy with your faith can create a powerful path to healing and peace.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'What is Anxiety?'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Anxiety is our body\'s natural response to stress and perceived threats. While it can be helpful in dangerous situations, chronic anxiety can interfere with daily life and relationships.'
          }
        ]
      }
    ],
    category: 'anxiety-depression',
    tags: ['anxiety', 'faith', 'healing', 'mental-health'],
    readingTime: 5,
    isFeatured: true,
    isPublished: true,
    publishedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    callToAction: {
      text: 'Book a Free Consultation',
      link: 'https://thesoulcarecounsellor.janeapp.com',
      type: 'consultation'
    }
  },
  {
    title: 'Building Healthy Relationships: Communication Tips for Couples',
    excerpt: 'Discover practical communication strategies that can strengthen your relationship and create deeper emotional intimacy with your partner.',
    slug: 'building-healthy-relationships-communication-tips',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Healthy relationships require intentional effort and effective communication. Whether you\'re newly married or have been together for decades, these strategies can help you build a stronger connection.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Foundation of Good Communication'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Effective communication starts with active listening and empathy. When we truly hear our partner\'s perspective, we create space for understanding and connection.'
          }
        ]
      }
    ],
    category: 'relationships',
    tags: ['relationships', 'communication', 'couples', 'marriage'],
    readingTime: 7,
    isFeatured: true,
    isPublished: true,
    publishedAt: new Date('2024-01-10T14:30:00Z').toISOString(),
    callToAction: {
      text: 'Learn About Our Couples Therapy',
      link: '/services',
      type: 'learn-more'
    }
  },
  {
    title: 'Self-Care for Caregivers: Nurturing Yourself While Helping Others',
    excerpt: 'If you\'re caring for others, you need care too. Learn practical self-care strategies that honor your calling while protecting your own wellbeing.',
    slug: 'self-care-caregivers-nurturing-yourself',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Caregivers often pour so much into others that they neglect their own needs. But sustainable caregiving requires that we also care for ourselves.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Why Self-Care Isn\'t Selfish'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Taking time for yourself isn\'t selfish—it\'s essential. When we\'re well-rested and emotionally healthy, we can give more effectively to those we care for.'
          }
        ]
      }
    ],
    category: 'self-care',
    tags: ['self-care', 'caregivers', 'wellness', 'burnout'],
    readingTime: 6,
    isFeatured: false,
    isPublished: true,
    publishedAt: new Date('2024-01-05T09:15:00Z').toISOString(),
    callToAction: {
      text: 'Get Support Today',
      link: 'https://thesoulcarecounsellor.janeapp.com',
      type: 'consultation'
    }
  },
  {
    title: 'Healing from Trauma: A Journey of Faith and Recovery',
    excerpt: 'Trauma recovery is possible with the right support and approach. Discover how faith and professional therapy can work together in your healing journey.',
    slug: 'healing-trauma-journey-faith-recovery',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Healing from trauma is a deeply personal journey that requires courage, support, and often, a combination of professional help and spiritual resources.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Understanding Trauma'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Trauma affects everyone differently, but there are common patterns in how our bodies and minds respond to overwhelming experiences.'
          }
        ]
      }
    ],
    category: 'trauma-healing',
    tags: ['trauma', 'healing', 'faith', 'recovery', 'ptsd'],
    readingTime: 8,
    isFeatured: true,
    isPublished: true,
    publishedAt: new Date('2024-01-01T12:00:00Z').toISOString(),
    callToAction: {
      text: 'Start Your Healing Journey',
      link: 'https://thesoulcarecounsellor.janeapp.com',
      type: 'consultation'
    }
  }
]

async function seedBlogPosts() {
  console.log('🌱 Starting to seed blog posts...')
  
  try {
    // First, get a team member to use as author
    const teamMembers = await client.fetch('*[_type == "teamMember"] | order(_createdAt asc) [0...1]')
    
    if (teamMembers.length === 0) {
      console.log('❌ No team members found. Please seed team members first.')
      return
    }
    
    const authorRef = {
      _type: 'reference',
      _ref: teamMembers[0]._id
    }
    
    // Check if blog posts already exist
    const existingPosts = await client.fetch('*[_type == "blogPost"]')
    
    if (existingPosts.length > 0) {
      console.log(`⚠️  Found ${existingPosts.length} existing blog posts. Updating...`)
      
      // Update existing posts
      for (const post of blogPostsData) {
        const existingPost = existingPosts.find(p => p.slug?.current === post.slug)
        
        if (existingPost) {
          console.log(`📝 Updating blog post: ${post.title}`)
          await client
            .patch(existingPost._id)
            .set({
              ...post,
              author: authorRef,
              slug: { current: post.slug, _type: 'slug' }
            })
            .commit()
        } else {
          console.log(`➕ Creating new blog post: ${post.title}`)
          await client.create({
            _type: 'blogPost',
            ...post,
            author: authorRef,
            slug: { current: post.slug, _type: 'slug' }
          })
        }
      }
    } else {
      console.log('➕ Creating new blog posts...')
      
      // Create new blog posts
      for (const post of blogPostsData) {
        console.log(`Creating blog post: ${post.title}`)
        await client.create({
          _type: 'blogPost',
          ...post,
          author: authorRef,
          slug: { current: post.slug, _type: 'slug' }
        })
      }
    }
    
    console.log('✅ Blog posts seeded successfully!')
    
    // Verify the posts were created
    const finalPosts = await client.fetch('*[_type == "blogPost"] | order(publishedAt desc)')
    console.log(`📊 Total blog posts in Sanity: ${finalPosts.length}`)
    finalPosts.forEach(post => {
      console.log(`  - ${post.title} (${post.slug?.current}) - ${post.isPublished ? 'Published' : 'Draft'}`)
    })
    
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error)
  }
}

// Run the seeding function
seedBlogPosts()
