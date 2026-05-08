const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: 'skoo9csT',
  dataset: 'production',
  useCdn: false,
  token:
    'skoo9csTIJ0SihaMJhJeIDsLudpXn9AV0FKk9DFJzKzbjulMd3SPQrZ4XABPfLsrCd39PJ8uUYhNQF6aAGRpHkiluSnk8iKIM4gvX1ywX0ZGrcNdJWmUL5jy0hJTV9yH0kZzlp9Mj0IcIR4FbKbIjjFs24Bwstd1pzsBkAckCQeaPGxd9wg',
  apiVersion: '2025-09-05',
})

async function testConnection() {
  console.log('🔍 Testing Sanity connection...')
  console.log('Project ID:', 'skoo9csT')
  console.log('Dataset:', 'production')
  console.log('API Version:', '2025-09-05')

  try {
    // Try to fetch project info
    console.log('\n📡 Testing basic connection...')
    const result = await client.fetch('count(*)')
    console.log('✅ Connection successful! Total documents:', result)

    // Try to fetch team members specifically
    console.log('\n👥 Testing team member query...')
    const teamMembers = await client.fetch('*[_type == "teamMember"]')
    console.log('✅ Team members found:', teamMembers.length)

    if (teamMembers.length > 0) {
      console.log('📋 First team member:', teamMembers[0].name)
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message)

    if (error.statusCode === 401) {
      console.log('\n🔑 Authorization issue detected:')
      console.log('- Check if your token is valid')
      console.log('- Verify token permissions in Sanity dashboard')
      console.log('- Make sure token has read/write access to the dataset')
    }

    if (error.statusCode === 404) {
      console.log('\n🏗️ Project/dataset not found:')
      console.log('- Verify project ID is correct')
      console.log('- Check if dataset "production" exists')
    }
  }
}

testConnection()
