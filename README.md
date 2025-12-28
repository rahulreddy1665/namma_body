# NammaBody — Personal Trainer Portfolio

A modern, high-performance personal trainer portfolio website built with React, Vite, TypeScript, and Framer Motion.

## Features

- **Hero Section** with character-by-character animated headline
- **About Section** showcasing trainer philosophy and experience
- **Transformations Gallery** with optimized before/after showcases
- **Training Programs** with direct WhatsApp integration
- **Contact Form** with backend-ready submission logic
- **Floating WhatsApp Button** for instant connection
- **Smooth Animations** using Framer Motion (performance-optimized)
- **Fully Responsive** design (mobile, tablet, desktop)
- **90%+ Lighthouse Score** with code splitting and lazy loading

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for blazing-fast dev and optimized builds
- **Framer Motion** for smooth, professional animations
- **Component-based** architecture for maintainability

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## WhatsApp Configuration

To enable WhatsApp integration with your business number:

1. Create a `.env.local` file in the root directory
2. Add your WhatsApp number in international format (without + or spaces):

```bash
# Example: For +91 98765 43210, use:
VITE_WHATSAPP_PHONE=919876543210
```

When users click "Get This Program" or the floating WhatsApp button, they'll be redirected to WhatsApp with a pre-filled message including the program name.

**Without a phone number configured:** The WhatsApp link will still work, opening the WhatsApp app/web with the message ready—users just need to select your contact.

## Contact Form Configuration

The contact form requires an API endpoint to send emails. Set your API endpoint in `.env.local`:

```bash
VITE_CONTACT_ENDPOINT=https://your-api-domain.com/api/send-email
```

**Expected API format:**
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "subject": "Contact Form: Name - Program",
  "from": "user@example.com",
  "message": "Message content"
}
```

**Response format:**
```json
{
  "ok": true,
  "message": "Email sent successfully"
}
```

**Without an endpoint configured:** The form will show an error message asking to configure `VITE_CONTACT_ENDPOINT`.

## Customization

### Update Trainer Information

- **Hero headline:** `src/sections/HeroSection.tsx`
- **About section:** `src/sections/AboutSection.tsx`
- **Programs:** `src/data/programs.ts`
- **Transformations:** `src/data/transformations.ts`

### Brand Colors

Colors are defined in `src/index.css` as CSS variables:

```css
--accent: #7c5cff; /* primary violet */
--accent-2: #22e6a8; /* secondary neon green */
```

### Replace Transformation Images

Replace the placeholder SVGs in `public/transformations/` with real client photos (before/after). Images are lazy-loaded for optimal performance.

## Deployment

This site is optimized for deployment to:

- **Vercel** (recommended): `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages** / **Cloudflare Pages**

Make sure to set environment variables (WhatsApp phone, contact endpoint) in your deployment platform's settings.

## Performance Optimizations

- ✅ Code splitting with lazy-loaded sections
- ✅ Optimized images with lazy loading
- ✅ Minimal re-renders with proper React patterns
- ✅ Smooth 60fps animations (GPU-accelerated)
- ✅ Proper semantic HTML for SEO
- ✅ Accessible navigation and skip links

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android (latest)

## License

All rights reserved. This is a custom-built portfolio for NammaBody.
