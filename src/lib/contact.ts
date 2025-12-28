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

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

  // Backend-ready mode: set VITE_CONTACT_ENDPOINT to your API endpoint.
  // Example: VITE_CONTACT_ENDPOINT=https://your-domain.com/api/contact
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: opts?.signal,
      })
      if (!res.ok) return { ok: false, error: 'Failed to send message. Please try again.' }
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error. Please try again.' }
    }
  }

  // Simulated submission: keep UX realistic while staying deployable without a backend.
  await new Promise<void>((resolve) => setTimeout(resolve, 700))
  return { ok: true }
}


