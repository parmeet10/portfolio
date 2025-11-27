# Deployment Guide - Vercel

## Step-by-Step Deployment Instructions

### Prerequisites
1. A GitHub account
2. Your code pushed to a GitHub repository
3. A Vercel account (free tier is sufficient)

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push Your Code to GitHub
```bash
# If you haven't already initialized git
git init
git add .
git commit -m "Initial commit"

# Create a repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### Step 2: Import Project to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (you can use GitHub to sign in)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and configure settings automatically

#### Step 3: Configure Environment Variables
1. In the project settings, go to **"Environment Variables"**
2. Add the following:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: Your secure admin password (e.g., `your_secure_password_123`)
   - **Environment**: Select all (Production, Preview, Development)
3. Click **"Save"**

#### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Your site will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# From your project root directory
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No** (for first deployment)
- Project name? (Press Enter for default or enter custom name)
- Directory? (Press Enter for current directory)
- Override settings? **No**

#### Step 4: Set Environment Variables
```bash
vercel env add ADMIN_PASSWORD
# Enter your password when prompted
# Select environments: Production, Preview, Development
```

#### Step 5: Deploy to Production
```bash
vercel --prod
```

### Post-Deployment Checklist

✅ **Verify Deployment**
- Visit your Vercel URL
- Test all pages and sections
- Test admin login at `/admin`

✅ **Set Custom Domain (Optional)**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

✅ **Monitor Deployments**
- All deployments are tracked in Vercel dashboard
- Preview deployments are created for every push/PR
- Production deployments are created when you merge to main branch

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `ADMIN_PASSWORD` | Yes | Password for admin dashboard | `mySecurePassword123!` |

### Troubleshooting

**Build Fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18.x by default)

**Admin Login Not Working?**
- Verify `ADMIN_PASSWORD` is set in Environment Variables
- Check that it's set for Production environment
- Clear browser cookies and try again

**API Routes Not Working?**
- Ensure you're not using static export
- Check that API routes are in `app/api/` directory
- Verify serverless functions are enabled (default in Vercel)

### Updating Your Deployment

Every time you push to your main branch, Vercel automatically:
1. Creates a new deployment
2. Runs build process
3. Deploys to production

For other branches:
- Preview deployments are created automatically
- Perfect for testing before merging

### Vercel Free Tier Limits

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions (100GB-hours/month)
- ✅ Perfect for portfolio sites

---

## Why Vercel Over GitHub Pages?

### ✅ Vercel Advantages
- **Full Next.js Support**: API routes, server-side rendering, middleware
- **Zero Configuration**: Auto-detects Next.js and configures everything
- **Serverless Functions**: Your API routes work out of the box
- **Automatic HTTPS**: SSL certificates included
- **Global CDN**: Fast loading worldwide
- **Preview Deployments**: Test every PR before merging
- **Analytics**: Built-in performance monitoring
- **Custom Domains**: Easy domain setup

### ❌ GitHub Pages Limitations
- **Static Only**: Cannot run API routes or server-side code
- **No Node.js**: Cannot execute server-side JavaScript
- **Manual Build**: Requires building locally and pushing `out/` folder
- **No Environment Variables**: Hard to manage secrets
- **Limited Features**: No serverless functions, no middleware

**Conclusion**: For your Next.js portfolio with admin dashboard and API routes, **Vercel is the clear winner**.

