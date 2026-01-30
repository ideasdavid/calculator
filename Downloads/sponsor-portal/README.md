# Ideas Fest 2026 - Sponsor Portal

Interactive sponsorship menu builder for Ideas Fest 2026.

## Quick Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. Create a new GitHub repository
2. Upload all these files to the repository
3. Go to [vercel.com](https://vercel.com) and sign in
4. Click "Add New Project"
5. Import your GitHub repository
6. Vercel will auto-detect it's a Vite project and configure everything
7. Click "Deploy"
8. Done! You'll get a URL like `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. In this folder, run: `vercel`
3. Follow the prompts
4. Done!

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Custom Domain

After deploying to Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., `sponsors.ideasfest.uk`)
4. Update your DNS records as instructed

## Files Overview

- `src/App.jsx` - Main sponsor portal component
- `src/main.jsx` - React entry point
- `src/index.css` - Tailwind CSS imports
- `index.html` - HTML template
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind configuration

## Support

Questions? Contact annabelle@ideasforums.com
