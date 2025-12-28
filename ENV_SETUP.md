# Environment Variables Setup Guide

This guide explains how to configure environment variables for the Namma Body website.

## Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your actual values

3. **Restart your dev server** if it's running

## Configuration Options

### 1. WhatsApp Integration

**Variable:** `VITE_WHATSAPP_PHONE`

**Format:** Country code + number (no + or spaces)

**Examples:**
- India: `919876543210`
- US: `14155551234`
- UK: `447700900123`

**Usage:** When users click "Get This Program" or the floating WhatsApp button, they'll be redirected to WhatsApp with a pre-filled message.

---

### 2. Contact Form API

**For Frontend (Vite):**

**Variable:** `VITE_CONTACT_ENDPOINT`

**Required:** Set this to your API endpoint URL

**Example:**
```
VITE_CONTACT_ENDPOINT=https://your-api-domain.com/api/send-email
```

**Note:** The API endpoint should accept POST requests with the following JSON format:
```json
{
  "subject": "Contact Form: Name - Program",
  "from": "user@example.com",
  "message": "Message content here"
}
```

**Required:** Set `VITE_CONTACT_ENDPOINT` to your API server URL

---

## Testing Your Setup

### Test WhatsApp:
1. Set `VITE_WHATSAPP_PHONE` in `.env.local`
2. Run `npm run dev`
3. Click "Get This Program" on any program card
4. WhatsApp should open with pre-filled message

### Test Contact Form:
1. Set `VITE_CONTACT_ENDPOINT` in `.env.local` to your API endpoint
2. Make sure your API server is running
3. Submit the contact form
4. Check your email inbox

---

## Troubleshooting

### Contact form not sending emails?

1. **Check API endpoint is set:**
   - Verify `VITE_CONTACT_ENDPOINT` is set in `.env.local`
   - For Netlify, endpoint is automatically set

2. **Verify API server is running:**
   - Make sure your API server is accessible
   - Check API server logs for errors

3. **Check spam folder:**
   - Emails might be going to spam

4. **Test API directly:**
   ```bash
   curl -X POST https://your-api-domain.com/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"subject":"Test","from":"test@example.com","message":"Test message"}'
   ```

5. **Check browser console:**
   - Look for network errors or CORS issues

---

## Security Notes

⚠️ **Important for Production:**

1. **Add rate limiting** to prevent spam
2. **Add CAPTCHA** (reCAPTCHA, hCaptcha)
3. **Validate and sanitize** all inputs (already done in mail.php)
4. **Use HTTPS** for your contact endpoint
5. **Don't commit `.env.local`** to git (it's in .gitignore)

---

## File Structure

```
namma_body/
├── .env.local          # Your local environment variables (not in git)
├── .env.example         # Example file (safe to commit)
└── ENV_SETUP.md         # This file
```

**Note:** The API backend is hosted separately. Set `VITE_CONTACT_ENDPOINT` to point to your API server.

---

## Need Help?

If you're having trouble:
1. Check that `VITE_CONTACT_ENDPOINT` is set correctly
2. Verify your API server is running and accessible
3. Check browser console for errors
4. Check API server error logs
5. Verify CORS is configured on your API server

