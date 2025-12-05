# Deployment Checklist for Vercel

Complete this checklist to ensure smooth deployment of your portfolio to Vercel.

## Pre-Deployment ✓

- [x] Code pushed to GitHub main branch (commit: 31b3d83)
- [x] TypeScript compilation passes (`npm run check`)
- [x] Production build succeeds (`npm run build`)
- [x] Dev server runs locally (`npm run dev`)
- [x] Admin dashboard accessible at `/admin`
- [x] All API endpoints responding
- [x] Database migrations working locally

## Vercel Setup

- [ ] GitHub repository linked to Vercel ← **You said you've done this**
- [ ] Vercel project created for SELF repository

## Environment Configuration

**Action Required**: In Vercel Dashboard → Project Settings → Environment Variables:

- [ ] Set `DATABASE_URL`
  - Get from Neon: https://neon.tech/app/projects
  - Format: `postgresql://user:password@host/database?sslmode=require`
  - Add to: Production, Preview, Development

- [ ] Set `SESSION_SECRET`
  - Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
  - Add to: Production, Preview, Development

- [ ] Set `NODE_ENV=production`
  - Add to: Production only

## Database Setup

- [ ] Neon PostgreSQL account created (neon.tech)
- [ ] Database created in Neon
- [ ] Connection string copied

**After Vercel deployment**, run migrations:
```bash
# Set production database URL
$env:DATABASE_URL = "your_neon_connection_string"
npm run db:push
```

## Deployment Steps

1. **Monitor Build**
   - Go to Vercel Dashboard
   - Watch build progress in Deployments tab
   - Build should complete in 2-3 minutes

2. **Verify Deployment**
   - ✓ Frontend loads at your-domain.vercel.app
   - ✓ Portfolio homepage displays
   - ✓ Projects load from `/api/projects`

3. **Test Admin Dashboard**
   - [ ] Navigate to `your-domain.vercel.app/admin`
   - [ ] Login with credentials (admin/admin123)
   - [ ] Dashboard loads without errors

4. **Run Database Migrations**
   - [ ] Execute: `npm run db:push` with production DATABASE_URL
   - [ ] Verify tables created in Neon
   - [ ] Check data appears on portfolio

## Post-Deployment

### Security
- [ ] **CHANGE DEFAULT ADMIN CREDENTIALS**
  - Edit `server/vercelAuth.ts`
  - Update username and password
  - Rebuild and redeploy

- [ ] **Set up email notifications for contact form** (optional)

### Monitoring
- [ ] Set up Vercel analytics
- [ ] Enable error tracking
- [ ] Monitor database performance

### Optimization (Optional)
- [ ] Set up custom domain
- [ ] Configure SSL/HTTPS (automatic on Vercel)
- [ ] Enable edge caching for static assets

## Production URLs

After deployment:
- **Portfolio**: `https://your-domain.vercel.app`
- **Admin Dashboard**: `https://your-domain.vercel.app/admin`
- **API**: `https://your-domain.vercel.app/api`

## Troubleshooting

### Build Fails
1. Check Environment Variables are set in Vercel
2. View build logs in Vercel Dashboard
3. Common issue: Missing `DATABASE_URL` or `SESSION_SECRET`

### Admin Login 401 Errors
1. Verify database migrations ran successfully
2. Check that user credentials are correct
3. Look at browser console for specific error

### No Data Showing
1. Confirm `npm run db:push` was executed
2. Check Neon dashboard for tables
3. Verify API calls in browser Network tab

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Project Issues**: GitHub Issues tab

## Quick Links

| Link | Purpose |
|------|---------|
| https://vercel.com/dashboard | Vercel Dashboard |
| https://neon.tech/app/projects | Neon Database |
| https://github.com/retrostyler/SELF | GitHub Repository |
| VERCEL_DEPLOYMENT.md | Detailed guide |

---

**Timeline**: Deployment usually takes 5-10 minutes total (3 min build + 2-3 min database setup)

**Questions?** Check `VERCEL_DEPLOYMENT.md` for detailed instructions.
