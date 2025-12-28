import nodemailer from 'nodemailer'

// Email transporter configuration
const createTransporter = () => {
  // Support for Gmail, Outlook, or custom SMTP
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    })
  }

  // Custom SMTP configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ok: false,
        error: 'Method not allowed',
      }),
    }
  }

  try {
    const { subject, from, message } = JSON.parse(event.body || '{}')

    // Validation
    if (!subject || !from || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ok: false,
          error: 'Missing required fields: subject, from, and message are required',
        }),
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(from)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ok: false,
          error: 'Invalid email address',
        }),
      }
    }

    // Check if email configuration exists
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ok: false,
          error: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.',
        }),
      }
    }

    // Create transporter
    const transporter = createTransporter()

    // Verify transporter configuration
    await transporter.verify()

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Where to send the email
      replyTo: from, // Allow replying directly to the sender
      subject: subject,
      text: `From: ${from}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #FFC800; padding-bottom: 10px;">
            New Contact Message
          </h2>
          <p><strong>From:</strong> ${from}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p style="white-space: pre-wrap; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log('Email sent successfully:', info.messageId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ok: true,
        message: 'Email sent successfully',
        messageId: info.messageId,
      }),
    }
  } catch (error) {
    console.error('Error sending email:', error)

    // Handle specific error cases
    let statusCode = 500
    let errorMessage = 'Failed to send email. Please try again later.'

    if (error.code === 'EAUTH') {
      statusCode = 401
      errorMessage = 'Email authentication failed. Please check your email credentials.'
    } else if (error.code === 'ECONNECTION') {
      statusCode = 503
      errorMessage = 'Could not connect to email server. Please try again later.'
    }

    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ok: false,
        error: errorMessage,
      }),
    }
  }
}

