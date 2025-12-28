# Netlify Environment Variables Setup

If you're getting "Contact endpoint not configured" error after deploying to Netlify, follow these steps:

## Step 1: Add Environment Variable in Netlify

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - **Key:** `VITE_CONTACT_ENDPOINT`
   - **Value:** Your API endpoint URL (e.g., `https://your-api.com/api/send-email`)
   - **Scopes:** Select "All scopes" or specific scopes (Production, Deploy previews, Branch deploys)

## Step 2: Trigger a New Deployment

**Important:** Environment variables are only available at **build time** in Vite. After adding the variable, you must trigger a new deployment:

### Option A: Redeploy via Dashboard
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the build to complete

### Option B: Push a New Commit
```bash
git commit --allow-empty -m "Trigger rebuild with env vars"
git push
```

### Option C: Clear Cache and Redeploy
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**

## Step 3: Verify the Variable is Set

After deployment, check the build logs:

1. Go to **Deploys** tab
2. Click on the latest deployment
3. Check the build logs for your environment variable (it won't show the value, but you'll see if it's being used)

## Common Issues

### Issue 1: Variable Not Found After Adding

**Solution:** You must redeploy after adding environment variables. Vite embeds env vars at build time, not runtime.

### Issue 2: Wrong Variable Name

**Solution:** The variable **must** be named exactly `VITE_CONTACT_ENDPOINT` (with the `VITE_` prefix). Vite only exposes variables that start with `VITE_`.

### Issue 3: Variable Set But Still Not Working

**Check:**
1. Is the variable name exactly `VITE_CONTACT_ENDPOINT`? (case-sensitive)
2. Did you trigger a new deployment after adding it?
3. Is the scope set correctly? (should be "All scopes" or include "Production")
4. Check browser console for the actual error message

### Issue 4: Works Locally But Not on Netlify

**Solution:** 
- Local `.env.local` file doesn't affect Netlify
- You must set the variable in Netlify dashboard
- Make sure the variable name matches exactly

## Testing

After deployment, test the contact form:
1. Open your deployed site
2. Open browser DevTools (F12) → Console tab
3. Submit the contact form
4. Check for any error messages

## Example Netlify Environment Variables

For a complete setup, you might have:

| Key | Value | Scope |
|-----|-------|-------|
| `VITE_CONTACT_ENDPOINT` | `https://api.example.com/send-email` | All scopes |
| `VITE_WHATSAPP_PHONE` | `919876543210` | All scopes |

## Important Notes

⚠️ **Environment variables are build-time only:**
- Vite replaces `import.meta.env.VITE_*` at build time
- Changes to env vars require a new build
- Variables are embedded in the JavaScript bundle (they're visible in the built code)

🔒 **Security:**
- Don't put sensitive data in `VITE_*` variables (they're exposed in the client bundle)
- For secrets, use server-side environment variables or Netlify Functions

## Quick Checklist

- [ ] Variable name is exactly `VITE_CONTACT_ENDPOINT`
- [ ] Variable value is your API endpoint URL
- [ ] Scope is set to "All scopes" or includes "Production"
- [ ] Triggered a new deployment after adding the variable
- [ ] Build completed successfully
- [ ] Tested the contact form on the deployed site

