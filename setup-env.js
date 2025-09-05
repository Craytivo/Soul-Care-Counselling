const fs = require('fs')
const path = require('path')

// Create .env.local file with Sanity configuration
const envContent = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

# Note: Replace the values above with your actual Sanity project details
# You'll get these when you create your Sanity project
`

const envPath = path.join(__dirname, '.env.local')

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Created .env.local file')
  console.log('📝 Please update the Sanity project details in .env.local')
} else {
  console.log('⚠️  .env.local already exists')
}

console.log('\n🚀 Next steps:')
console.log('1. Run: npx sanity@latest init --template clean --create-project "soul-care-cms"')
console.log('2. Update .env.local with your Sanity project details')
console.log('3. Run: npm run sanity:dev (to start Sanity Studio)')
console.log('4. Run: npm run dev (to start Next.js)')
