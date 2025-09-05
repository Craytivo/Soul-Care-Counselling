# Sanity CMS Setup for Soul Care Counselling

## 🚀 Quick Setup Guide

### 1. Create Sanity Project

```bash
# Initialize Sanity project
npx sanity@latest init --template clean --create-project "soul-care-cms"

# Follow the prompts:
# - Choose "Clean project with no predefined schemas"
# - Choose "Production" dataset
# - Choose "Yes" to configure a custom project ID
# - Enter your desired project ID (e.g., "soul-care-counselling")
```

### 2. Update Environment Variables

Create `.env.local` file in your project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

Replace the values with your actual Sanity project details.

### 3. Start Sanity Studio

```bash
# Start the Sanity Studio (admin interface)
npm run sanity:dev

# Or if you prefer to run it separately
npx sanity dev
```

The Sanity Studio will be available at `http://localhost:3333`

### 4. Start Next.js Development Server

```bash
# In a separate terminal
npm run dev
```

Your website will be available at `http://localhost:3000`

## 📝 Content Types Available

### Team Members
- Name, credentials, role
- Profile image with hotspot
- Rich text bio
- Specialties and areas of focus
- Social links
- Booking availability

### Blog Posts (Notes)
- Title, excerpt, content
- Author information
- Featured image
- Tags and categories
- Publication date

### Workshops
- Title, description, instructor
- Date, time, duration
- Price and registration link
- Video URL for recorded sessions
- Thumbnail image

### Services
- Title, description
- Icon image
- Features list
- Pricing information

### Site Settings
- Site title and description
- Contact information
- Logo and hero images
- Global site content

## 🎨 For Non-Technical Users

### Accessing the CMS
1. Go to `http://localhost:3333` (when Sanity Studio is running)
2. Log in with your Sanity account
3. Start editing content!

### Editing Content
- **Rich Text Editor**: Edit content like a Word document
- **Image Upload**: Drag and drop images
- **Live Preview**: See changes instantly
- **Version History**: Undo any changes
- **Publishing**: Save as draft or publish immediately

### Adding Team Members
1. Go to "Team Members" in the sidebar
2. Click "Create" button
3. Fill in all required fields
4. Upload profile image
5. Save and publish

### Adding Blog Posts
1. Go to "Blog Posts" in the sidebar
2. Click "Create" button
3. Write your content using the rich text editor
4. Add featured image
5. Set publication date
6. Save and publish

## 🔧 Technical Details

### API Integration
The website automatically fetches content from Sanity using:
- `src/lib/sanity.ts` - Sanity client configuration
- `src/lib/sanity-queries.ts` - Data fetching functions
- Components automatically update when content changes

### Image Optimization
- All images are automatically optimized
- Responsive images with different sizes
- WebP format for better performance

### Content Management
- Real-time updates
- Draft and published states
- Content validation
- User permissions

## 🚀 Deployment

### Sanity Studio
Deploy to Sanity's hosting:
```bash
npx sanity deploy
```

### Next.js Website
Deploy to Vercel, Netlify, or your preferred hosting:
```bash
npm run build
```

## 📞 Support

If you need help with the CMS setup or content management, refer to:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Contact the development team

## 🎯 Next Steps

1. **Set up your Sanity project** using the commands above
2. **Add your content** through the Sanity Studio
3. **Customize the schemas** if needed
4. **Train your team** on using the CMS
5. **Deploy both** Sanity Studio and your website

Your Soul Care Counselling website is now ready for easy content management!
