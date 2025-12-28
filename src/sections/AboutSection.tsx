import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'

export default function AboutSection() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <SectionHeading
        eyebrow="About"
        title="Certified coaching, engineered for results."
        description="I coach with a simple philosophy: master fundamentals, track progress, and build discipline that lasts. Your program adapts to your life—without compromising standards."
      />

      <Container>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
          <motion.div
            className="card"
            style={{ gridColumn: 'span 7', padding: 22 }}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3 style={{ margin: 0, letterSpacing: '-0.01em' }}>Your transformation, not a template.</h3>
            <p className="muted" style={{ margin: '10px 0 0' }}>
              Whether you want fat loss, strength, muscle building, or a complete lifestyle reset, the plan is
              built around measurable progression and realistic adherence. You’ll know exactly what to do—and why.
            </p>

            <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
              <ProofLine icon={<IconCheck />} title="Results-driven programming" text="Progression rules, deloads, recovery, and performance metrics." />
              <ProofLine icon={<IconBolt />} title="Intensity with control" text="Form, tempo, and smart volume—so you grow without burning out." />
              <ProofLine icon={<IconTarget />} title="Accountability that sticks" text="Weekly check-ins, adjustments, and clear next steps." />
            </div>
          </motion.div>

          <motion.div
            style={{ gridColumn: 'span 5', display: 'grid', gap: 14 }}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : 0.04 }}
          >
            <MiniCard title="Experience" value="6+ yrs" note="Strength & conditioning coaching" />
            <MiniCard title="Certifications" value="CPT" note="Form-first, evidence-led methods" />
            <MiniCard title="Focus" value="Results" note="Fat loss · Muscle · Performance" />
          </motion.div>
        </div>

        <style>
          {`
            @media (max-width: 960px) {
              #about .grid { grid-template-columns: 1fr !important; }
              #about .grid > div { grid-column: auto !important; }
            }
          `}
        </style>
      </Container>
    </>
  )
}

function MiniCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div
      className="card"
      style={{
        padding: 18,
        borderRadius: 18,
        background:
          'linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
      }}
    >
      <div className="muted" style={{ fontSize: 13 }}>
        {title}
      </div>
      <div style={{ fontSize: 22, fontWeight: 850, letterSpacing: '-0.02em', marginTop: 6 }}>{value}</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
        {note}
      </div>
    </div>
  )
}

function ProofLine({
  icon,
  title,
  text,
}: {
  icon: ReactNode
  title: string
  text: string
}) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div
        aria-hidden="true"
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          display: 'grid',
          placeItems: 'center',
          background: 'rgba(255,255,255,.06)',
          border: '1px solid rgba(255,255,255,.12)',
        }}
      >
        {icon}
      </div>
      <div style={{ display: 'grid', gap: 2 }}>
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span className="muted" style={{ fontSize: 14 }}>
          {text}
        </span>
      </div>
    </div>
  )
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="rgba(34,230,168,.95)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconBolt() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" stroke="rgba(124,92,255,.95)" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  )
}

function IconTarget() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21a9 9 0 1 1 9-9" stroke="rgba(255,255,255,.75)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 17a5 5 0 1 1 5-5" stroke="rgba(34,230,168,.9)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 13a1 1 0 1 1 1-1" stroke="rgba(124,92,255,.95)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}


