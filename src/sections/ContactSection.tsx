import type { CSSProperties, HTMLAttributes } from 'react'
import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { sendContactMessage } from '../lib/contact'
import { PROGRAMS } from '../data/programs'

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

export default function ContactSection() {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [program, setProgram] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0
  }, [name, email, message])

  return (
    <>
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build your next chapter."
        description="Tell me your goal, your timeline, and what you’ve tried. I’ll respond with the best plan to move forward."
      />

      <Container>
        <motion.div
          className="card"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            padding: 18,
            borderRadius: 18,
            background: 'rgba(255, 255, 255, 0.04)',
          }}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (status.type === 'submitting') return
              setStatus({ type: 'submitting' })
              const res = await sendContactMessage({ name, email, message, program: program || undefined })
              if (!res.ok) {
                setStatus({ type: 'error', message: res.error })
                return
              }
              setStatus({ type: 'success', message: "Message sent. I'll get back to you shortly." })
              setName('')
              setEmail('')
              setProgram('')
              setMessage('')
            }}
            aria-describedby="contact-status"
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 14,
              }}
            >
              <Field
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Your name"
                autoComplete="name"
                gridSpan={6}
              />
              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="you@email.com"
                autoComplete="email"
                gridSpan={6}
                inputMode="email"
              />
              <SelectField
                label="Program Interest"
                value={program}
                onChange={setProgram}
                options={[
                  { value: '', label: 'Select a program (optional)' },
                  ...PROGRAMS.map((p) => ({ value: p.title, label: p.title })),
                ]}
                gridSpan={12}
              />
              <Field
                label="Message"
                value={message}
                onChange={setMessage}
                placeholder="Your goal, timeline, training history..."
                gridSpan={12}
                textarea
              />
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 16 }}>
              <Button variant="primary" type="submit" disabled={!canSubmit || status.type === 'submitting'}>
                {status.type === 'submitting' ? 'Sending…' : 'Send Message'}
              </Button>
              {/* <span className="muted" style={{ fontSize: 13 }}>
                Backend-ready: set <code>VITE_CONTACT_ENDPOINT</code> to send to your API.
              </span> */}
            </div>

            <div
              id="contact-status"
              role="status"
              aria-live="polite"
              style={{ marginTop: 12, minHeight: 22 }}
            >
              {status.type === 'success' ? (
                <span style={{ color: 'rgba(34,230,168,.92)', fontWeight: 650 }}>{status.message}</span>
              ) : status.type === 'error' ? (
                <span style={{ color: 'rgba(255,77,109,.92)', fontWeight: 650 }}>{status.message}</span>
              ) : null}
            </div>
          </form>
        </motion.div>

        <style>
          {`
            @media (max-width: 860px) {
              #contact .grid { grid-template-columns: 1fr !important; }
              #contact .grid > div { grid-column: auto !important; }
            }
            @media (max-width: 768px) {
              #contact .card {
                padding: 16px !important;
                margin-bottom: 0 !important;
              }
              #contact .grid {
                gap: 12px !important;
              }
              #contact form > div[style*="marginTop: 16"] {
                margin-top: 14px !important;
              }
              #contact div[style*="marginTop: 12"] {
                margin-top: 10px !important;
                min-height: 20px !important;
              }
            }
            @media (max-width: 640px) {
              #contact .card {
                padding: 14px !important;
              }
              #contact .grid {
                gap: 10px !important;
              }
            }
            select {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }
            select::-ms-expand {
              display: none;
            }
            input:hover, textarea:hover, select:hover {
              border-color: rgba(255,255,255,.18) !important;
            }
            input:focus, textarea:focus, select:focus {
              border-color: rgba(255,200,0,.35) !important;
              background: rgba(0,0,0,.25) !important;
            }
          `}
        </style>
      </Container>
    </>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  gridSpan,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoComplete?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  gridSpan: number
  textarea?: boolean
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div style={{ gridColumn: `span ${gridSpan}` }}>
      <label htmlFor={id} style={{ display: 'block', fontWeight: 750, fontSize: 13, marginBottom: 8 }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={6}
          style={fieldStyle}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          style={fieldStyle}
        />
      )}
    </div>
  )
}

const fieldStyle: CSSProperties = {
  width: '100%',
  borderRadius: 14,
  border: '1px solid rgba(255,255,255,.12)',
  background: 'rgba(0,0,0,.22)',
  color: 'rgba(255,255,255,.92)',
  padding: '12px 12px',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: 14,
  lineHeight: 1.5,
  transition: 'border-color 160ms ease, background 160ms ease',
}

function SelectField({
  label,
  value,
  onChange,
  options,
  gridSpan,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string }>
  gridSpan: number
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div style={{ gridColumn: `span ${gridSpan}`, position: 'relative' }}>
      <label htmlFor={id} style={{ display: 'block', fontWeight: 750, fontSize: 13, marginBottom: 8 }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            ...fieldStyle,
            cursor: 'pointer',
            appearance: 'none',
            paddingRight: '40px',
            transition: 'border-color 160ms ease, background 160ms ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,200,0,.4)'
            e.currentTarget.style.background = 'rgba(0,0,0,.3)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'
            e.currentTarget.style.background = 'rgba(0,0,0,.22)'
          }}
        >
          {options.map((opt) => (
            <option 
              key={opt.value} 
              value={opt.value}
              style={{
                background: 'rgba(10,5,5,0.95)',
                color: opt.value === '' ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.92)',
              }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '6px solid rgba(255,255,255,.6)',
          }}
        />
      </div>
    </div>
  )
}


