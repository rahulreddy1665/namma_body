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

### 2. Contact Form (PHP Mail)

**For Frontend (Vite):**

**Variable:** `VITE_CONTACT_ENDPOINT`

**Example:**
```
VITE_CONTACT_ENDPOINT=https://yourdomain.com/mail.php
```

**For Backend (PHP):**

These variables need to be set in your **server environment** or **.htaccess** file (not in `.env.local`):

**Variables:**
- `CONTACT_EMAIL` - Your email address where contact form submissions will be sent
- `SMTP_FROM` - The "from" email address (usually noreply@yourdomain.com)
- `SITE_NAME` - Your site name (defaults to "Namma Body")

---

## Setting Up PHP Mail

### Option 1: Using .htaccess (Apache)

Create or edit `.htaccess` in your website root:

```apache
# Set environment variables for PHP
SetEnv CONTACT_EMAIL "your-email@example.com"
SetEnv SMTP_FROM "noreply@yourdomain.com"
SetEnv SITE_NAME "Namma Body"
```

### Option 2: Using Server Environment (cPanel/Shared Hosting)

1. Log into your hosting control panel (cPanel, Plesk, etc.)
2. Find "Environment Variables" or "PHP Variables"
3. Add:
   - `CONTACT_EMAIL` = `your-email@example.com`
   - `SMTP_FROM` = `noreply@yourdomain.com`
   - `SITE_NAME` = `Namma Body`

### Option 3: Direct PHP Configuration (Not Recommended)

Edit `mail.php` directly and replace:
```php
$recipient_email = 'your-email@example.com';
$sender_email = 'noreply@yourdomain.com';
$site_name = 'Namma Body';
```

---

## Testing Your Setup

### Test WhatsApp:
1. Set `VITE_WHATSAPP_PHONE` in `.env.local`
2. Run `npm run dev`
3. Click "Get This Program" on any program card
4. WhatsApp should open with pre-filled message

### Test Contact Form:
1. Set `VITE_CONTACT_ENDPOINT` in `.env.local` to your `mail.php` URL
2. Upload `mail.php` to your server
3. Configure PHP environment variables (see above)
4. Submit the contact form
5. Check your email inbox

---

## Troubleshooting

### Contact form not sending emails?

1. **Check PHP mail() function:**
   - Many shared hosts disable `mail()`. You may need to use SMTP instead.

2. **Check spam folder:**
   - Emails might be going to spam

3. **Verify environment variables:**
   - Make sure PHP can access `CONTACT_EMAIL`, `SMTP_FROM`, and `SITE_NAME`

4. **Check server logs:**
   - Look for PHP errors in your hosting control panel

### Need SMTP instead of mail()?

For more reliable email delivery, consider using:
- **PHPMailer** (recommended)
- **SendGrid API**
- **Mailgun API**
- **AWS SES**

I can help you set up SMTP if needed!

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
├── mail.php             # PHP email handler (upload to server)
└── ENV_SETUP.md         # This file
```

---

## Need Help?

If you're having trouble:
1. Check that all variables are set correctly
2. Verify your server supports PHP mail() or configure SMTP
3. Check browser console for errors
4. Check server error logs

