const fs = require('fs')
const path = require('path')

// Environment variables for Sanity
const envContent = `NEXT_PUBLIC_SANITY_PROJECT_ID=m1jhdvym
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-05`

const envPath = path.join(__dirname, '..', '.env.local')

try {
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Created .env.local file with Sanity configuration')
  console.log('📝 Environment variables set:')
  console.log('  - NEXT_PUBLIC_SANITY_PROJECT_ID=m1jhdvym')
  console.log('  - NEXT_PUBLIC_SANITY_DATASET=production')
  console.log('  - NEXT_PUBLIC_SANITY_API_VERSION=2025-09-05')
  console.log('🔄 Please restart your development server for changes to take effect')
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message)
  console.log('📝 Please manually create .env.local file with the following content:')
  console.log(envContent)
}
