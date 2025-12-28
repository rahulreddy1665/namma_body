# Netlify Deployment Guide

This guide will help you deploy the React frontend to Netlify. The API backend can be hosted separately or use Netlify Functions (included in this setup).

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://netlify.com))
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Gmail App Password (for email functionality)

## Step 1: Prepare Your Repository

Make sure your code is pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"

2. **Connect Your Repository**
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository
   - Netlify will auto-detect the build settings from `netlify.toml`

3. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Add the following variables:

   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password-here
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=recipient@example.com
   ```

   **For Gmail App Password:**
   - Enable 2-Step Verification on your Google account
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASS`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your site

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   - Follow the prompts to link your site

4. **Set Environment Variables**
   ```bash
   netlify env:set EMAIL_SERVICE gmail
   netlify env:set EMAIL_USER your-email@gmail.com
   netlify env:set EMAIL_PASS your-app-password
   netlify env:set EMAIL_FROM your-email@gmail.com
   netlify env:set EMAIL_TO recipient@example.com
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Step 3: Verify Deployment

1. **Check Build Logs**
   - Go to Deploys tab in Netlify dashboard
   - Verify the build completed successfully

2. **Test the Contact Form**
   - Visit your deployed site
   - Submit the contact form
   - Check your email inbox

3. **Test Netlify Function**
   - Visit: `https://your-site.netlify.app/.netlify/functions/send-email`
   - Should see method not allowed (expected for GET request)
   - The function is working if you see this response

## Project Structure for Netlify

```
namma_body/
├── netlify.toml              # Netlify configuration
├── netlify/
│   └── functions/
│       ├── send-email.js     # Netlify Function for email API (optional)
│       └── package.json      # Function dependencies
├── src/                      # React frontend
└── package.json              # Frontend dependencies
```

## How It Works

1. **Frontend**: Built with Vite and deployed to Netlify CDN
2. **API Options**:
   - **Option A**: Use Netlify Functions (included)
     - Function endpoint: `/.netlify/functions/send-email`
     - Automatically detected and deployed by Netlify
   - **Option B**: Use external API
     - Set `VITE_CONTACT_ENDPOINT` environment variable to your API URL
     - API backend hosted separately

## Environment Variables

Set these in Netlify Dashboard → Site settings → Environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_SERVICE` | Email service provider | `gmail` |
| `EMAIL_USER` | Your email address | `your-email@gmail.com` |
| `EMAIL_PASS` | App password (not regular password) | `abcd efgh ijkl mnop` |
| `EMAIL_FROM` | From address | `your-email@gmail.com` |
| `EMAIL_TO` | Recipient address | `recipient@example.com` |

**Optional SMTP Variables:**
- `SMTP_HOST` - Custom SMTP host
- `SMTP_PORT` - SMTP port (default: 587)
- `SMTP_SECURE` - Use secure connection (true/false)

## Troubleshooting

### Build Fails

1. **Check Node version**
   - Netlify uses Node 18 by default (configured in `netlify.toml`)
   - If issues, check build logs

2. **Function Dependencies**
   - Netlify automatically installs dependencies from `netlify/functions/package.json`
   - Make sure `nodemailer` is listed there

### Email Not Sending

1. **Check Environment Variables**
   - Verify all email variables are set correctly
   - Make sure `EMAIL_PASS` is an App Password, not your regular password

2. **Check Function Logs**
   - Go to Functions tab in Netlify dashboard
   - Check logs for errors

3. **Test Function Locally**
   ```bash
   netlify dev
   ```
   - This runs Netlify Functions locally
   - Test at `http://localhost:8888/.netlify/functions/send-email`

### CORS Errors

- The function already includes CORS headers
- If issues persist, check browser console for specific errors

## Local Development

To test Netlify Functions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local development server
netlify dev
```

This will:
- Start the Vite dev server
- Start Netlify Functions locally
- Proxy requests to functions automatically

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch triggers a new deployment
- Pull requests get preview deployments automatically
- You can configure branch-specific environment variables

## Custom Domain

1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow DNS configuration instructions
4. Netlify will handle SSL certificates automatically

## Performance Tips

1. **Image Optimization**
   - Use Netlify Image CDN for automatic optimization
   - Or optimize images before uploading

2. **Caching**
   - Static assets are cached automatically
   - Configured in `netlify.toml` headers

3. **Function Timeout**
   - Netlify Functions have a 10s timeout (free tier)
   - Email sending should complete well within this limit

## Support

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Netlify Community](https://answers.netlify.com/)

