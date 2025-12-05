# Content Management Guide

This guide helps you manage your portfolio content through the admin dashboard after deployment.

## Accessing the Admin Dashboard

1. Navigate to: `https://your-domain.vercel.app/admin`
2. Login with your credentials
3. You'll see the main dashboard with 6 management sections

## 📂 Projects Manager

### Adding a New Project
1. Click **Projects** on the dashboard
2. Click **"+ Create Project"** button
3. Fill in the form:
   - **Title**: Project name (e.g., "EBAJA ATV Brake System")
   - **Slug**: URL-friendly version (auto-generated, e.g., "ebaja-atvbrake-system")
   - **Category**: Type of project (e.g., "Mechanical Engineering", "Product Management")
   - **Short Description**: 1-2 sentence overview
   - **Description**: Detailed case study
   - **Technologies**: Tools used (comma-separated)
   - **Thumbnail URL**: Project image link
   - **Role**: Your role in the project
   - **Results**: Key metrics or outcomes
   - **Timeline**: Project duration
   - **Featured**: Check if featured on homepage
   - **Published**: Check to make it public
4. Click **"Create Project"** - instantly appears on portfolio!

### Editing a Project
1. Go to **Projects** section
2. Find the project you want to edit
3. Click the **Edit** (pencil) icon
4. Make your changes
5. Click **"Update Project"**

### Deleting a Project
1. Go to **Projects** section
2. Find the project to delete
3. Click the **Delete** (trash) icon
4. Confirm deletion

## 💼 Experience Manager

### Adding Work Experience
1. Click **Experience** on dashboard
2. Click **"+ Create Experience"**
3. Fill in:
   - **Company**: Company name
   - **Role**: Job title
   - **Start Date**: When you started
   - **End Date**: When you left (leave blank if current)
   - **Description**: Responsibilities and achievements
   - **Published**: Check to display on portfolio
4. Click **"Create Experience"**

### Editing Experience
- Similar to projects - find entry and click edit icon
- Update any field and save

## 🎓 Skills Manager

### Adding Skills
1. Click **Skills** on dashboard
2. Click **"+ Create Skill"**
3. Fill in:
   - **Name**: Skill name (e.g., "Product Strategy")
   - **Category**: Categorize by type
   - **Proficiency**: Slider 0-100% (represents expertise level)
   - **Endorsed**: Check if well-established skill
   - **Published**: Check to display
4. Click **"Create Skill"**

### Organizing by Category
Skills can be categorized as:
- Product Management
- Analytics & Data
- Growth & Marketing
- UX & Design
- Tech Tools
- Programming
- CAD/CAE
- Manufacturing

## ⭐ Leadership Manager

### Adding Leadership Roles
1. Click **Leadership** on dashboard
2. Click **"+ Create Role"**
3. Fill in:
   - **Title**: Role title (e.g., "Director of PSI Racing")
   - **Organization**: Organization name
   - **Description**: What you did in this role
   - **Timeline**: When you held this role
   - **Published**: Check to display
4. Click **"Create Role"**

Good examples:
- PSI Racing - Director role
- TEDxNITTrichy - Organizer role
- Festember - Leadership position
- SAEINDIA - Committee role

## 👤 Site Content Editor

### Updating Bio & About Section
1. Click **About & Bio** on dashboard
2. Edit:
   - **Bio**: Your professional biography
   - **Professional Summary**: Career overview
3. Click **"Save Changes"**

These appear on the homepage About section.

## 📧 Contacts Viewer

### Viewing Contact Form Submissions
1. Click **Contact Messages** on dashboard
2. You'll see all messages submitted via contact form
3. Each shows:
   - Submitter name and email
   - Message content
   - Submission timestamp

**Note**: Currently messages are stored in database. For email notifications, you'd need to add email integration (optional enhancement).

## 💡 Pro Tips

### Formatting Descriptions
Use clear formatting in descriptions:
- Keep paragraphs short
- Use bullet points for lists
- Be specific with metrics/results
- Include links to projects or demos

### Project Thumbnails
For thumbnail images:
- Use direct image URLs (e.g., from Imgur, Cloudinary, GitHub)
- Size: 16:9 aspect ratio works best
- Keep under 1MB for performance
- Example: `https://example.com/project-image.jpg`

### Slug Auto-Generation
The slug (URL part) is auto-generated from title:
- "EBAJA ATV Brake System" → "ebaja-atvbrake-system"
- Used in project URLs: `/projects/ebaja-atvbrake-system`
- Make sure it's URL-friendly

### Featured vs Published
- **Published**: Shows on portfolio if enabled
- **Featured**: Appears in featured section on homepage

A project can be published but not featured.

## 🔄 Workflow for New Project

Follow this order for best results:

1. **Create Project** - Add basic info
2. **Edit Project** - Add detailed description and case study
3. **Set Featured** - If it's a showcase piece
4. **Publish** - Make it live to the world
5. **Share** - Update your GitHub/social media links

## ⚡ Bulk Operations (Future Feature)

Currently supported:
- ✅ Edit individual entries
- ✅ Delete entries one at a time
- ✅ Create multiple entries

Future enhancements could include:
- Bulk import/export
- Drag-to-reorder
- Bulk status change

## 🔐 Security Reminders

- **Don't share your login credentials**
- **Change default password immediately**
- **Session expires after 7 days** - you'll need to log in again
- **All data is encrypted** in transit
- **Passwords are hashed** - we never store plain text

## 🆘 Common Issues

### Can't See Changes on Homepage
- Make sure **Published** is checked
- Refresh your browser (Ctrl+F5)
- Check that data saved successfully

### Error Saving Entry
- Check all required fields are filled
- Verify URLs are valid (for images/links)
- Check browser console for error messages

### Thumbnails Not Loading
- Verify image URL is complete and working
- Try a different image hosting service
- Check that URL doesn't have special characters

### Can't Upload Images
- Use external image hosting (Imgur, Cloudinary, etc.)
- Paste direct image URL in form
- Site doesn't have direct upload yet

## 📱 Mobile Admin Dashboard

The admin dashboard is fully responsive:
- Works on phone and tablet
- Same functionality as desktop
- Touch-friendly controls
- Optimized layouts

## 🎨 Formatting Examples

### Good Project Description
```
Led development of brake system optimization achieving 40% heat 
dissipation improvement through advanced CAD simulation. Collaborated 
with 5-member team using finite element analysis and conducted 
extensive testing protocols.

Key Results:
• 40% improvement in heat dissipation
• 15% weight reduction
• Passed SAE validation testing
• 2nd place EBAJA competition
```

### Good Experience Entry
```
Led product strategy and client success, driving 15% increase in 
client retention through personalized engagement strategies. Managed 
cross-functional team of 4, spearheaded product roadmap development, 
and executed data-driven growth initiatives resulting in 60% engagement 
boost across platforms.
```

## 🚀 Publishing Workflow

For each piece of content:

1. **Draft** - Create with basic info
2. **Enhance** - Add rich descriptions and media
3. **Preview** - Check how it looks
4. **Publish** - Make it public
5. **Monitor** - Track views/engagement (future feature)

## 📊 Content Statistics

Your portfolio currently includes:
- Multiple projects with case studies
- Work experience across 4+ companies
- 10+ skills across 8 categories
- Leadership roles and initiatives
- Professional bio

Manage all of it through this dashboard!

## ✨ Best Practices

1. **Keep content current** - Update regularly
2. **Be specific** - Include metrics and results
3. **Show your work** - Use multiple projects to showcase variety
4. **Tell stories** - Describe the impact, not just the task
5. **Use visuals** - Add project images
6. **Highlight wins** - Feature your best work

---

**Need help?** Check your specific admin page for field descriptions and tooltips.

Happy managing your portfolio! 🎉
