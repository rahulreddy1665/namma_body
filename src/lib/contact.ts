export type ContactPayload = {
  name: string
  email: string
  message: string
  program?: string
}

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string }

function isValidEmail(email: string) {
  // intentionally simple + fast; backend should validate again
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateContactPayload(payload: ContactPayload): ContactResult {
  if (!payload.name.trim()) return { ok: false, error: 'Please enter your name.' }
  if (!payload.email.trim()) return { ok: false, error: 'Please enter your email.' }
  if (!isValidEmail(payload.email)) return { ok: false, error: 'Please enter a valid email.' }
  if (!payload.message.trim()) return { ok: false, error: 'Please enter a message.' }
  if (payload.message.trim().length < 10)
    return { ok: false, error: 'Your message is too short. Add a bit more detail.' }
  return { ok: true }
}

export async function sendContactMessage(
  payload: ContactPayload,
  opts?: { signal?: AbortSignal },
): Promise<ContactResult> {
  const validated = validateContactPayload(payload)
  if (!validated.ok) return validated

  // Get endpoint from environment variable (required)
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

  if (!endpoint) {
    // Debug: Log available env vars in development
    if (import.meta.env.DEV) {
      console.error('VITE_CONTACT_ENDPOINT is not set')
      console.log('Available env vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')))
    }
    
    return {
      ok: false,
      error: 'Contact endpoint not configured. Please set VITE_CONTACT_ENDPOINT environment variable in Netlify (Site settings → Environment variables) and redeploy.',
    }
  }

  // Transform payload to match Node.js API format
  const subject = payload.program 
    ? `Contact Form: ${payload.name} - ${payload.program}`
    : `Contact Form: ${payload.name}`
  
  const emailPayload = {
    subject: subject,
    from: payload.email,
    message: `From: ${payload.email}\n Name: ${payload.name}\n${payload.program ? `Program Interest: ${payload.program}\n` : ''}\nMessage:\n${payload.message}`,
  }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
        signal: opts?.signal,
      })

    const data = await res.json().catch(() => ({ ok: false, error: 'Invalid response from server' }))
    
    if (!res.ok || !data.ok) {
      return { 
        ok: false, 
        error: data.error || 'Failed to send message. Please try again.' 
      }
    }
    
  return { ok: true }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, error: 'Request cancelled' }
    }
    return { ok: false, error: 'Network error. Please check if the server is running.' }
  }
}


