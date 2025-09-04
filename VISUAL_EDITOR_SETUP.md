# 🎨 Visual Editor Setup Guide for Soul Care Counselling

This guide will help you set up visual editing capabilities for your Netlify CMS website.

## 🚀 Quick Setup (Recommended)

### Option 1: Netlify Visual Editor (Easiest)

1. **Enable in Netlify Dashboard:**
   - Go to your Netlify site dashboard
   - Navigate to **Site settings** → **Visual Editor**
   - Click **"Enable Visual Editor"**
   - Follow the setup wizard

2. **Access Visual Editor:**
   - Visit your site: `https://your-site.netlify.app`
   - Look for the **"Edit with Visual Editor"** button
   - Click to enter visual editing mode

### Option 2: Stackbit Visual Editor (Advanced)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Visual Editor Locally:**
   ```bash
   npm run stackbit:dev
   ```

3. **Access Visual Editor:**
   - Open `http://localhost:8090/_stackbit`
   - Edit your content visually

## 🎯 Visual Editor Features

### What You Can Edit Visually:

✅ **Hero Section**
- Main title and subtitle
- Call-to-action buttons
- Inspirational quote
- Feature list

✅ **Team Members**
- Add/remove team members
- Edit photos, names, titles
- Update booking links
- Manage tags for filtering

✅ **Site Settings**
- Brand name and description
- Contact information
- Navigation menus
- Footer content

✅ **Pages**
- About, Services, Contact pages
- Rich text content with markdown

### Visual Editing Benefits:

🎨 **See Changes Live** - Edit and see changes in real-time
🖱️ **Click to Edit** - Click any element to edit it directly
📱 **Mobile Preview** - See how changes look on mobile
🔄 **Auto-Save** - Changes are saved automatically
👥 **Collaborative** - Multiple editors can work together

## 🔧 Configuration Details

### Enhanced CMS Config (`admin/config.yml`)

The configuration now includes:
- **Preview paths** for each content type
- **Helpful hints** for each field
- **Visual editor compatibility**
- **Better organization** of content types

### Stackbit Config (`stackbit.config.ts`)

This enables:
- **Visual editing** of your content
- **Real-time preview** of changes
- **Component-based editing**
- **Git-based content management**

## 📱 How to Use Visual Editor

### 1. **Access the Editor:**
   - Go to your live site
   - Look for the "Edit" or "Visual Editor" button
   - Click to enter editing mode

### 2. **Edit Content:**
   - Click on any text to edit it
   - Use the sidebar to modify settings
   - Drag and drop to reorder elements
   - Add new content blocks

### 3. **Preview Changes:**
   - See changes in real-time
   - Switch between desktop and mobile views
   - Test interactive elements

### 4. **Save Changes:**
   - Changes auto-save as you type
   - Publish when ready
   - Changes go live immediately

## 🛠️ Troubleshooting

### Visual Editor Not Showing?

1. **Check Netlify Settings:**
   - Ensure Visual Editor is enabled
   - Verify your site is properly deployed

2. **Check Configuration:**
   - Ensure `admin/config.yml` is correct
   - Verify `stackbit.config.ts` exists

3. **Check Dependencies:**
   ```bash
   npm install
   ```

### Content Not Updating?

1. **Check Git Gateway:**
   - Ensure Git Gateway is enabled in Netlify
   - Verify repository permissions

2. **Check File Paths:**
   - Ensure content files exist in correct locations
   - Verify file permissions

## 🎨 Customization Options

### Adding New Content Types:

1. **Update `admin/config.yml`:**
   ```yaml
   - name: "new_content"
     label: "New Content"
     folder: "content/new_content"
     fields:
       - {label: "Title", name: "title", widget: "string"}
   ```

2. **Update `stackbit.config.ts`:**
   ```typescript
   {
     name: 'new_content',
     type: 'data',
     filePath: 'content/new_content/{slug}.md',
     fields: [
       { name: 'title', type: 'string', required: true }
     ]
   }
   ```

### Styling Visual Editor:

- Custom CSS can be added to `admin/index.html`
- Visual editor respects your site's existing styles
- Preview mode shows exactly how content will appear

## 📚 Additional Resources

- [Netlify Visual Editor Docs](https://docs.netlify.com/manage/visual-editor/)
- [Stackbit Documentation](https://docs.stackbit.com/)
- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)

## 🆘 Support

If you need help with visual editor setup:
1. Check the troubleshooting section above
2. Review Netlify's documentation
3. Contact Netlify support for technical issues

---

**Happy Editing! 🎉**

Your website now supports visual editing, making it easy to update content without touching code.
