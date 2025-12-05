# Arham Aqeel - Portfolio & CMS

A modern, interactive portfolio website with integrated content management system built with React, Express, and PostgreSQL. Deployed on Vercel with full admin dashboard for managing projects, experience, skills, and leadership roles.

## 🎨 Features

### Public Features
- **Homepage** - Hero section, project showcase, about section, and contact form
- **Projects Gallery** - Interactive showcase with detailed case studies
- **About Section** - Professional bio, skills matrix, experience timeline
- **Contact Form** - Fully functional contact form with validation
- **Responsive Design** - Perfect on mobile, tablet, and desktop

### Admin Dashboard (Protected)
- **Authentication** - Secure admin login system
- **Projects Manager** - Create, edit, delete portfolio projects
- **Experience Manager** - Manage professional work experience
- **Skills Manager** - Organize and categorize skills
- **Leadership Manager** - Showcase leadership roles and initiatives
- **Site Content Editor** - Update bio and professional information
- **Contacts Viewer** - View submitted contact form messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended for production)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/retrostyler/SELF.git
cd SELF
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database URL and session secret:
```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
SESSION_SECRET=your_random_secret_key
NODE_ENV=development
```

Generate a secure session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

4. **Initialize database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5000` to see your portfolio!

### Admin Dashboard Access

1. Navigate to `http://localhost:5000/admin`
2. Login with default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## 📦 Deployment on Vercel

Your portfolio is ready to deploy to Vercel. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment instructions.

Quick summary:
1. Link GitHub repository to Vercel (already done ✓)
2. Set environment variables in Vercel dashboard
3. Run database migrations on production
4. Deploy!

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast bundler
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Query** - Data fetching
- **React Hook Form** - Form management
- **Wouter** - Lightweight router

### Backend
- **Express.js** - Server framework
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **Passport.js** - Authentication

### Database
- **PostgreSQL** - Primary database
- **Neon** - Serverless PostgreSQL (production)

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities
│   └── index.html
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Database queries
│   └── vercelAuth.ts     # Authentication
├── shared/               # Shared code
│   └── schema.ts         # Database schema (Drizzle)
└── vercel.json          # Vercel configuration
```

## 🔐 Security

- Passwords are hashed with bcrypt
- Sessions are stored in PostgreSQL
- Environment variables are never committed
- Admin routes are protected with authentication
- HTTPS enforced in production

## 📝 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:slug` - Get project details
- `GET /api/experiences` - Get work experience
- `GET /api/skills` - Get skills
- `GET /api/leadership` - Get leadership roles
- `GET /api/site-content` - Get site content
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Protected)
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- Similar endpoints for experiences, skills, leadership

### Authentication
- `POST /api/login` - Login (credentials: admin/admin123 default)
- `POST /api/logout` - Logout
- `GET /api/user` - Get current user

## 🎨 Customization

### Colors
The portfolio uses a professional color scheme defined in `tailwind.config.ts`:
- Primary: `#2D3748` (charcoal)
- Secondary: `#4299E1` (modern blue)
- Accent: `#ED8936` (warm orange)

### Fonts
- **Headers**: Poppins
- **Body**: Inter

Both fonts are available via Tailwind CSS configuration.

### Content
All content is managed through the admin dashboard - no code changes needed!

## 🐛 Troubleshooting

### Dev Server Won't Start
- Ensure PostgreSQL is running
- Check `DATABASE_URL` environment variable
- Verify port 5000 is not in use

### Build Fails
- Run `npm run check` to find TypeScript errors
- Ensure all environment variables are set
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Admin Login Not Working
- Verify credentials are correct (default: admin/admin123)
- Check browser console for errors
- Ensure session secret is set

## 📚 Documentation

- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Deployment guide
- [design_guidelines.md](./design_guidelines.md) - Design system
- `.env.example` - Environment variables template

## 🔄 Database Migrations

This project uses Drizzle ORM for migrations. To make schema changes:

1. Edit `shared/schema.ts`
2. Run: `npm run db:push`
3. Verify changes in database

## 📞 Support

For issues or questions:
- Check the documentation files
- Review the GitHub repository issues
- Examine server logs for error messages

## 📄 License

MIT

## 👤 Author

**Arham Aqeel**
- Portfolio: [SELF](https://self-five-phi.vercel.app)
- GitHub: [@retrostyler](https://github.com/retrostyler)

---

**Built with ❤️ for an amazing portfolio experience**
