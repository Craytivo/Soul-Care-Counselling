# Soul Care Counselling Website

A fully editable recreation of the actual Soul Care Counselling website with easy-to-use content editing features. This matches the exact design and structure of the original site while adding powerful editing capabilities.

## Features

### ✨ Easy Content Editing
- **Click to Edit**: All text content is editable by clicking on it
- **Visual Feedback**: Editable areas are highlighted when you hover over them
- **Auto-save**: Changes are automatically saved to your browser's local storage
- **Edit Mode Toggle**: Use the "Edit Mode" button to enable/disable editing

### 🎨 Authentic Design
- **Exact Recreation**: Matches the original Soul Care Counselling website design
- **Tailwind CSS**: Uses the same Tailwind CSS framework as the original
- **Earthy Color Palette**: Authentic cream, sand, clay, bark, and charcoal colors
- **Professional Typography**: Poppins headings and Inter body text
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices

### 🛠️ Advanced Features
- **Netlify CMS Integration**: Web-based content management system for easy editing
- **Team Search & Filtering**: Search team members by name, role, or credentials
- **Mobile Navigation**: Responsive hamburger menu with backdrop
- **Content Backup**: Export your content as JSON for backup
- **Content Import**: Import previously saved content
- **Smooth Navigation**: Smooth scrolling between sections
- **Accessibility**: Full keyboard navigation support and focus indicators

## How to Use

### Option 1: Netlify CMS (Recommended)
1. Deploy the website to Netlify
2. Enable Identity and Git Gateway in Netlify settings
3. Visit `/admin/` on your website to access the CMS
4. Edit all content through the web-based interface
5. Changes are automatically saved and deployed

### Option 2: Direct Editing
1. Open `index.html` in your web browser
2. Click the "Edit Mode" button in the bottom-right corner
3. Click on any text to edit it directly
4. Press Ctrl+S (or Cmd+S on Mac) to save changes
5. Click "Save Changes" to exit edit mode

### Advanced Features
- **Auto-save**: Changes are automatically saved after 2 seconds of inactivity
- **Export Content**: Use `exportContent()` in the browser console to download a backup
- **Import Content**: Use `importContent()` in the browser console to restore from backup
- **Keyboard Shortcuts**: Use Tab to navigate, Enter to confirm edits, Escape to cancel

### Content Areas
The website includes editable content in these sections:
- **Navigation**: Menu items and brand name
- **Hero Section**: Badge, main title, subtitle, call-to-action buttons, and features
- **Team Section**: Team member names, titles, descriptions, and booking buttons
- **Team Search**: Search functionality and filter tags
- **Footer**: Company description, quick links, and resources
- **All Text Elements**: Every piece of text is editable including quotes, descriptions, and labels

## File Structure

```
soulcare-netlify/
├── index.html              # Main HTML file with Tailwind CSS
├── demo.html               # Demo page explaining features
├── admin/
│   ├── config.yml          # Netlify CMS configuration
│   └── index.html          # CMS admin interface
├── content/
│   ├── hero/
│   │   └── hero.md         # Hero section content
│   ├── team/
│   │   ├── sarah-johnson.md
│   │   ├── michael-chen.md
│   │   └── maria-rodriguez.md
│   └── settings/
│       ├── general.json
│       ├── navigation.json
│       ├── team_section.json
│       └── footer.json
├── netlify.toml            # Netlify configuration
├── NETLIFY_CMS_SETUP.md    # Detailed CMS setup guide
└── README.md               # This file
```

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup with contenteditable attributes
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **Vanilla JavaScript**: No external dependencies
- **Google Fonts**: Poppins and Inter fonts
- **Local Storage**: Browser-based content persistence

### Key Features
- **Contenteditable**: Native HTML5 editing capability
- **Local Storage**: Browser-based content saving
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant navigation and focus management
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Customization

### Colors
The website uses the authentic Soul Care Counselling color palette:
- Cream: `#F8F5EC` (background)
- Sand: `#E6DDC6` (secondary background)
- Clay: `#C49A6C` (primary accent)
- Bark: `#6E4B3A` (dark brown)
- Charcoal: `#23201B` (text)

### Fonts
- Headings: Poppins (600, 700 weights)
- Body: Inter (400, 600 weights)
- Responsive font sizes with proper scaling

### Layout
- Maximum width: 1200px
- Responsive breakpoints: 768px, 480px
- Grid and flexbox layouts for modern browsers

## Deployment

### Local Development
1. Download all files to a folder
2. Open `index.html` in your browser
3. Start editing!

### Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. The website will work on any standard web hosting service

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command to: (leave empty)
3. Set publish directory to: (root)
4. Deploy!

## Support

For questions or issues:
1. Check the browser console for error messages
2. Ensure JavaScript is enabled
3. Try refreshing the page and re-entering edit mode
4. Use the export function to backup your content regularly

## License

This project is open source and available under the MIT License.

---

**Note**: This website is designed to be easily editable by non-technical users. All content is stored locally in your browser and will persist between sessions. For production use, consider implementing a proper content management system or database backend.
