const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicons() {
  const inputPath = path.join(__dirname, '..', 'public', 'assets', 'logo', 'logo-s-c-intertwined.png');
  const appDir = path.join(__dirname, '..', 'src', 'app');
  const publicDir = path.join(__dirname, '..', 'public');

  try {
    // Create 32x32 favicon for app directory
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(appDir, 'favicon.ico'));

    // Create icon.png for app directory
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(appDir, 'icon.png'));

    // Create public favicon
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));

    // Create apple touch icon
    await sharp(inputPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(appDir, 'apple-icon.png'));

    console.log('✅ Favicons created successfully!');
  } catch (error) {
    console.error('❌ Error creating favicons:', error);
  }
}

createFavicons();