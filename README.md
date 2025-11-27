# Portfolio Website

A modern, futuristic portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern and futuristic design
- ✨ Beautiful animations with Framer Motion
- 📱 Fully responsive
- 🚀 Optimized for Vercel deployment
- 🎯 Smooth scrolling navigation
- 🌈 Gradient effects and glassmorphism
- ⚡ Fast and performant
- 🔐 **Admin Dashboard** - Manage your portfolio content dynamically

## Admin Dashboard

The portfolio includes a fully functional admin dashboard where you can manage all your content without touching code!

### Accessing the Admin Dashboard

1. Navigate to `/admin` in your browser
2. Enter your admin password (set via `ADMIN_PASSWORD` environment variable)
3. Manage your portfolio content through the intuitive interface

### Admin Features

- **Personal Info**: Update name, title, description, contact information
- **Experience**: Add, edit, or delete work experiences
- **Projects**: Manage your project portfolio
- **Skills**: Update your technical skills and tools
- **Education**: Manage your educational background
- **Interests**: Update your interests section

### Setting Up Admin Password

Create a `.env.local` file in the root directory:

```env
ADMIN_PASSWORD=your_secure_password_here
```

**Important**: Change the default password before deploying to production!

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

### Quick Start (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js (no configuration needed!)

3. **Set Environment Variable**
   - In project settings → Environment Variables
   - Add: `ADMIN_PASSWORD` = `your_secure_password`
   - Select all environments (Production, Preview, Development)

4. **Deploy!**
   - Click "Deploy"
   - Your site will be live in ~2 minutes at `https://your-project.vercel.app`

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Set environment variable
vercel env add ADMIN_PASSWORD

# Deploy to production
vercel --prod
```

### 📖 Detailed Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions, troubleshooting, and best practices.

**Note**: Make sure to set the `ADMIN_PASSWORD` environment variable in Vercel's dashboard under Settings → Environment Variables.

### Why Vercel?

✅ **Perfect for Next.js** - Built by the Next.js team  
✅ **API Routes Work** - Your admin dashboard and API endpoints work out of the box  
✅ **Zero Configuration** - Auto-detects and configures everything  
✅ **Free Tier** - More than enough for portfolio sites  
✅ **Automatic Deployments** - Every push = new deployment  

❌ **GitHub Pages won't work** - Cannot run API routes or server-side code (your admin features require a server)

## Data Storage

Portfolio data is stored in `data/portfolio-data.json`. This file is automatically updated when you make changes through the admin dashboard.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Project Structure

```
portfolio/
├── app/
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication endpoints
│   │   └── portfolio/  # Portfolio data endpoints
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── admin/          # Admin form components
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Education.tsx
│   └── Footer.tsx
├── data/
│   └── portfolio-data.json  # Portfolio data storage
└── lib/
    ├── data.ts         # Data management utilities
    └── auth.ts         # Authentication utilities
```

## Security Notes

- The admin dashboard uses session-based authentication
- Passwords are stored as environment variables
- API routes are protected with authentication checks
- For production, consider implementing more robust authentication (e.g., NextAuth.js)

## License

MIT
