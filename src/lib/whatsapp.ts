export function openWhatsApp(message: string, phoneNumber?: string) {
  // Get phone from env var or use provided number
  const phone = phoneNumber || import.meta.env.VITE_WHATSAPP_PHONE || ''
  const encodedMessage = encodeURIComponent(message)
  
  // Use wa.me for better compatibility across devices
  const url = phone
    ? `https://wa.me/${phone}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`
  
  console.log('📱 Opening WhatsApp with message:', message)
  if (!phone) {
    console.log('💡 Tip: Set VITE_WHATSAPP_PHONE in .env.local to pre-fill your number')
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

