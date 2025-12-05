# Vercel Deployment Guide - Portfolio CMS

## Quick Start

Your portfolio CMS is now ready to deploy to Vercel. Since you've already linked your GitHub repository, the deployment can happen automatically.

## Step 1: Set Up Database on Neon (PostgreSQL)

1. Visit [neon.tech](https://neon.tech) and sign up (free tier available)
2. Create a new project
3. In Neon dashboard, copy your connection string: `postgresql://username:password@host/database?sslmode=require`
4. Keep this safe - you'll need it in Step 3

## Step 2: Generate Session Secret

In your terminal, run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output - you'll need it in Step 3.

## Step 3: Configure Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your "SELF" project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Neon connection string from Step 1 |
   | `SESSION_SECRET` | The generated secret from Step 2 |
   | `NODE_ENV` | `production` |

5. Click "Save"

## Step 4: Trigger Deployment

The deployment will automatically trigger when you push to GitHub's main branch. You can also:

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest commit
3. Wait for the build to complete (usually 2-3 minutes)

## Step 5: Database Migration on Production

After deployment, run migrations on the production database:

1. In your terminal, set the DATABASE_URL to your production database:
```bash
$env:DATABASE_URL = "your_neon_connection_string"
npm run db:push
```

## Verifying Your Deployment

✅ **Frontend**: Visit your Vercel deployment URL - you should see your portfolio homepage
✅ **API**: Test `/api/projects` endpoint - should return project data
✅ **Admin Dashboard**: Visit `/admin` - login with `admin` / `admin123`
✅ **Database**: Check that all your portfolio data is visible

## Features Included

Your deployed portfolio includes:

### Public Features
- 🏠 **Homepage** - Hero section, project showcase, about section
- 📁 **Projects** - Interactive gallery with detailed case studies
- 👤 **About** - Professional bio, skills matrix, experience timeline
- 📧 **Contact** - Fully functional contact form
- 📱 **Responsive** - Perfect on mobile, tablet, and desktop

### Admin Dashboard (Protected)
- 🔐 **Authentication** - Secure admin login
- 📊 **Dashboard** - Overview of all content
- 🎨 **Projects Manager** - Create, edit, delete projects
- 💼 **Experience Manager** - Manage professional experience
- 🎓 **Skills Manager** - Organize and categorize skills
- 🌟 **Leadership Manager** - Showcase leadership roles
- 📧 **Contacts Viewer** - See submitted contact form messages

## Admin Dashboard Access

After deployment:

1. Visit `your-domain.vercel.app/admin`
2. Login with:
   - **Username**: `admin`
   - **Password**: `admin123`

⚠️ **Important**: Change these credentials in production! Update `server/vercelAuth.ts` with secure credentials and redeploy.

## Troubleshooting

### Build Fails - "DATABASE_URL not found"
- Make sure `DATABASE_URL` is set in Vercel Environment Variables
- Check that the connection string format is correct

### Build Fails - "SESSION_SECRET not found"
- Add `SESSION_SECRET` environment variable in Vercel
- Use the generated value from Step 2

### Admin Dashboard Returns 401
- Ensure you're logged in with correct credentials
- Check browser console for error messages

### Projects/Data Not Showing
- Database migrations may not have run
- Follow Step 5 to run `npm run db:push` on production database

## Production Checklist

- [ ] Database configured in Neon
- [ ] Environment variables set in Vercel
- [ ] Database migrations run on production
- [ ] Admin credentials changed from default
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled (automatic on Vercel)

## Performance Tips

Your portfolio is optimized for production:
- ✅ Code is minified and bundled
- ✅ React components are optimized
- ✅ Database queries are efficient
- ✅ Static assets are cached

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Project GitHub**: https://github.com/retrostyler/SELF

## Next Steps

1. ✅ Deploy to Vercel (automated from GitHub)
2. ✅ Set production environment variables
3. ✅ Run database migrations
4. ✅ Test all features
5. ✅ Update admin credentials for security
6. ✅ Configure custom domain (optional)
7. ✅ Set up email notifications for contact form (optional)
