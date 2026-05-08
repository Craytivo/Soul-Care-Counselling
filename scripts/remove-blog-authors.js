const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'm1jhdvym',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-09-05',
})

async function removeAuthorReferences() {
  try {
    console.log('🔍 Fetching blog posts with author references...')

    // Fetch all blog posts that have author references
    const blogPosts = await client.fetch('*[_type == "blogPost" && defined(author)]')

    if (blogPosts.length === 0) {
      console.log('✅ No blog posts with author references found')
      return
    }

    console.log(`📄 Found ${blogPosts.length} blog post(s) with author references`)

    for (const post of blogPosts) {
      console.log(`📝 Removing author reference from: ${post.title || post._id}`)

      // Remove the author field
      await client.patch(post._id).unset(['author']).commit()

      console.log(`✅ Updated: ${post.title || post._id}`)
    }

    console.log('🎉 All author references removed successfully!')
  } catch (error) {
    console.error('❌ Error removing author references:', error)
  }
}

// Run the cleanup
console.log('🚀 Starting author reference cleanup...')
removeAuthorReferences()
