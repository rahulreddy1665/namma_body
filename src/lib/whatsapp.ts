/**
 * Sanitizes a phone number for WhatsApp URL format
 * Removes +, spaces, dashes, parentheses, and other formatting
 * Returns only digits (country code + number)
 */
function sanitizePhoneNumber(phone: string): string {
  if (!phone) return ''
  // Remove all non-digit characters (+, spaces, dashes, parentheses, etc.)
  return phone.replace(/\D/g, '')
}

export function openWhatsApp(message: string, phoneNumber?: string) {
  // Get phone from env var or use provided number
  const rawPhone = phoneNumber || import.meta.env.VITE_WHATSAPP_PHONE || ''
  
  // Debug: Log the raw environment variable to help diagnose issues
  if (import.meta.env.DEV) {
    console.log('🔍 Debug - Raw env var:', import.meta.env.VITE_WHATSAPP_PHONE)
    console.log('🔍 Debug - Raw phone value:', rawPhone)
    console.log('🔍 Debug - Phone length:', rawPhone?.length)
  }
  
  // Sanitize to remove +, spaces, and other formatting
  const phone = sanitizePhoneNumber(rawPhone)
  
  // Validate phone number (should be at least 10 digits for a valid international number)
  if (phone && phone.length < 10) {
    console.warn('⚠️ Warning: Phone number seems too short:', phone, '(from:', rawPhone, ')')
    console.warn('⚠️ Make sure VITE_WHATSAPP_PHONE in Netlify contains the full number (e.g., 919876543210)')
  }
  
  const encodedMessage = encodeURIComponent(message)
  
  // Use wa.me for better compatibility across devices
  const url = phone
    ? `https://wa.me/${phone}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`
  
  console.log('📱 Opening WhatsApp with message:', message)
  if (!phone) {
    console.log('💡 Tip: Set VITE_WHATSAPP_PHONE in .env.local to pre-fill your number')
  } else {
    console.log('📞 Phone number:', phone, '(sanitized from:', rawPhone, ')')
    console.log('✅ Phone number length:', phone.length, 'digits')
  }
  console.log('🔗 URL:', url)
  
  // Try to open in new tab
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  
  // Fallback if popup was blocked
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    console.warn('⚠️ Popup blocked by browser, redirecting in same tab...')
    window.location.href = url
  }
}

export function openWhatsAppForProgram(programName: string) {
  const message = `Hi, I'm interested in the ${programName} Program`
  openWhatsApp(message)
}

