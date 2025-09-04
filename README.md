# Soul Care Counselling Website

A simple, clean website built specifically for Netlify CMS management.

## Features

- ✅ **Clean, Simple Design** - Easy to understand and maintain
- ✅ **Netlify CMS Integration** - Edit content through admin panel
- ✅ **Completely Secure** - No editing capabilities on live site
- ✅ **Responsive Design** - Works on all devices
- ✅ **Fast Loading** - Optimized for performance

## Content Management

All content is managed through Netlify CMS at `/admin/`:

### Site Settings
- **General Settings** - Site title, description, contact info
- **Hero Section** - Main banner content and call-to-action
- **Team Section** - Team members and their information
- **Footer** - Footer content and branding

### How to Edit Content

1. **Access Admin Panel:**
   - Go to `https://your-site.netlify.app/admin/`
   - Log in with your Netlify Identity credentials

2. **Edit Content:**
   - Click on any section (General, Hero, Team, Footer)
   - Make your changes
   - Click "Save" to publish

3. **View Changes:**
   - Changes appear on your live site immediately
   - No build process required

## Security

- **No Live Editing** - Users cannot edit content on the live site
- **Admin Only** - Only authenticated users can access `/admin/`
- **Git-Based** - All changes are tracked in your repository

## Setup

1. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Enable Git Gateway in Netlify settings
   - Enable Identity in Netlify settings

2. **Configure Admin Access:**
   - Set Identity registration to "Invite only"
   - Invite yourself as an admin user
   - Access admin panel at `/admin/`

## File Structure

```
/
├── index.html              # Main website file
├── admin/
│   ├── index.html          # CMS admin interface
│   └── config.yml          # CMS configuration
├── content/
│   └── settings/           # Content files
│       ├── general.json    # General site settings
│       ├── hero.json       # Hero section content
│       ├── team.json       # Team section content
│       └── footer.json     # Footer content
├── netlify.toml            # Netlify configuration
└── README.md               # This file
```

## Customization

The website is designed to be easily expandable:

- **Add New Sections** - Update `index.html` and `admin/config.yml`
- **Add New Content Types** - Create new collections in CMS config
- **Modify Styling** - Update Tailwind classes in `index.html`
- **Add Pages** - Create new HTML files and add to navigation

## Support

For questions or issues:
1. Check Netlify documentation
2. Review CMS configuration
3. Verify Identity and Git Gateway settings