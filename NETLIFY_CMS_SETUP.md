# Netlify CMS Setup Guide

This guide will help you set up Netlify CMS for easy content editing of the Soul Care Counselling website.

## 🚀 Quick Setup

### 1. Deploy to Netlify

1. **Connect your repository to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket repository
   - Set build command: (leave empty)
   - Set publish directory: (leave empty or set to root)

2. **Enable Identity:**
   - In your Netlify dashboard, go to Site settings > Identity
   - Click "Enable Identity"
   - Under "Registration preferences", select "Invite only" or "Open"
   - Under "External providers", you can enable GitHub, Google, etc.

3. **Enable Git Gateway:**
   - In Site settings > Identity > Services, click "Enable Git Gateway"
   - This allows the CMS to commit changes to your repository

### 2. Access the CMS

1. **Visit your admin panel:**
   - Go to `https://your-site-name.netlify.app/admin/`
   - You'll see the Netlify Identity login screen

2. **Create your first user:**
   - If you enabled "Open" registration, you can sign up directly
   - If you enabled "Invite only", you need to invite users first:
     - Go to Site settings > Identity > Invite users
     - Enter email addresses and send invitations

3. **Start editing:**
   - Once logged in, you'll see the CMS interface
   - You can edit all content through the web interface

## 📝 Content Management

### Available Content Types

#### Hero Section
- **Location:** Hero Section collection
- **Fields:** Badge text, main title, subtitle, button texts, quote, features
- **File:** `content/hero/hero.md`

#### Team Members
- **Location:** Team Members collection
- **Fields:** Name, title, description, booking button, tags
- **Files:** `content/team/*.md`
- **Tags:** therapist, coach, bilingual, director, qualifying

#### Site Settings
- **General Settings:** Site title, description, contact info
- **Navigation:** Main and footer navigation links
- **Team Section:** Team section header content
- **Footer:** Footer content and links

### Adding New Team Members

1. Go to "Team Members" in the CMS
2. Click "New Team Member"
3. Fill in the required fields:
   - **Name:** Full name
   - **Title:** Professional title/credentials
   - **Description:** Brief bio/specialties
   - **Booking Button Text:** Text for the booking button
   - **Booking URL:** Link to booking system
   - **Tags:** Add relevant tags (therapist, coach, bilingual, etc.)

### Editing Content

1. **Hero Section:** Edit the main page content, quotes, and features
2. **Team Members:** Add, edit, or remove team members
3. **Settings:** Update site-wide settings like contact info and navigation
4. **Pages:** Create and edit additional pages (About, Services, Contact)

## 🔧 Technical Details

### File Structure
```
├── admin/
│   ├── config.yml          # CMS configuration
│   └── index.html          # Admin interface
├── content/
│   ├── hero/
│   │   └── hero.md         # Hero section content
│   ├── team/
│   │   ├── sarah-johnson.md
│   │   ├── michael-chen.md
│   │   └── maria-rodriguez.md
│   ├── settings/
│   │   ├── general.json
│   │   ├── navigation.json
│   │   ├── team_section.json
│   │   └── footer.json
│   └── pages/
│       ├── about.md
│       ├── services.md
│       └── contact.md
├── netlify.toml            # Netlify configuration
└── public/
    └── _redirects          # URL redirects
```

### How It Works

1. **Content Storage:** All content is stored as Markdown and JSON files in the `content/` directory
2. **Dynamic Loading:** The website loads content from these files when it loads
3. **Live Updates:** Changes made in the CMS are immediately reflected on the website
4. **Version Control:** All changes are committed to your Git repository

### Customization

#### Adding New Content Types

1. Edit `admin/config.yml`
2. Add a new collection with the desired fields
3. Create the corresponding content files
4. Update the JavaScript to load the new content

#### Modifying Fields

1. Edit the field definitions in `admin/config.yml`
2. The CMS interface will automatically update
3. Existing content will be preserved

## 🛠️ Troubleshooting

### Common Issues

#### "Git Gateway not enabled"
- Go to Netlify dashboard > Site settings > Identity > Services
- Click "Enable Git Gateway"

#### "Cannot access admin panel"
- Make sure you're visiting `/admin/` (with trailing slash)
- Check that Identity is enabled in Netlify settings
- Verify you're logged in with a valid account

#### "Changes not appearing on website"
- Check that the content files are being created in the correct location
- Verify the JavaScript is loading the content files correctly
- Check browser console for any errors

#### "Permission denied"
- Make sure Git Gateway is enabled
- Check that your Netlify account has access to the repository
- Verify the repository is properly connected to Netlify

### Getting Help

1. **Netlify Documentation:** [docs.netlify.com](https://docs.netlify.com)
2. **Netlify CMS Documentation:** [netlifycms.org](https://netlifycms.org)
3. **Community Support:** [Netlify Community](https://community.netlify.com)

## 🎯 Best Practices

### Content Management
- Use descriptive names for team members and content
- Keep descriptions concise but informative
- Use consistent formatting across similar content types
- Test changes on a staging site before going live

### Team Management
- Use consistent tag naming (lowercase, no spaces)
- Keep team member photos consistent in size and style
- Update booking URLs when team members change
- Archive old team members instead of deleting them

### Site Maintenance
- Regularly backup your content
- Keep the CMS configuration updated
- Monitor site performance after content changes
- Test the website on different devices and browsers

## 🔐 Security

### Access Control
- Use "Invite only" registration for better security
- Regularly review who has access to the CMS
- Use strong passwords for all accounts
- Enable two-factor authentication where possible

### Content Security
- Never store sensitive information in the CMS
- Regularly review and update content
- Monitor for unauthorized changes
- Keep backups of important content

---

**Need help?** Check the troubleshooting section above or refer to the official Netlify CMS documentation.
