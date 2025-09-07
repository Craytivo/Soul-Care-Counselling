const fs = require('fs')
const path = require('path')

function identifyTeamImages() {
  console.log('Team images available in public/assets/img/team/:')
  console.log('================================================')
  
  const teamImagesDir = path.join(__dirname, '../public/assets/img/team')
  
  if (!fs.existsSync(teamImagesDir)) {
    console.log('Team images directory not found!')
    return
  }
  
  const imageFiles = fs.readdirSync(teamImagesDir)
  
  imageFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`)
  })
  
  console.log('\nRecommendations:')
  console.log('- Jessica Robinson-Grant (Clinical Director) is likely the first image: rs=w_365,h_365,cg_true,m.webp')
  console.log('- Upload this image to Sanity Studio and assign it to the About Page director section')
  console.log('\nSteps:')
  console.log('1. Go to http://localhost:3000/studio')
  console.log('2. Click "Media" → "Upload"')
  console.log('3. Select: rs=w_365,h_365,cg_true,m.webp')
  console.log('4. Set title: "Jessica Robinson-Grant - Clinical Director"')
  console.log('5. Go to "About Page" → "Director" section')
  console.log('6. Assign the uploaded image to the director.image field')
}

identifyTeamImages()
