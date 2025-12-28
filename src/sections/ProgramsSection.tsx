import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { PROGRAMS } from '../data/programs'
import { openWhatsAppForProgram } from '../lib/whatsapp'

// Helper function to render text with capital letters bold
function renderBoldCaps(text: string) {
  // Match sequences of capital letters, numbers, spaces, and apostrophes
  const regex = /[A-Z][A-Z0-9\s']*/g
  const parts: (string | React.ReactElement)[] = []
  let lastIndex = 0
  let matchIndex = 0

  let match
  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Add bold caps
    parts.push(
      <strong key={matchIndex++} style={{ fontWeight: 700 }}>
        {match[0]}
      </strong>
    )
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return <>{parts.length > 0 ? parts : text}</>
}

// Helper function to highlight specific terms
function renderSubtitleWithHighlight(text: string, highlightTerms: string[]) {
  if (highlightTerms.length === 0) return text

  const parts: (string | React.ReactElement)[] = []
  let lastIndex = 0
  let matchIndex = 0

  // Create regex pattern for all terms (case-insensitive)
  const pattern = highlightTerms
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi')

  let match
  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Add highlighted term with subtle emphasis
    parts.push(
      <span
        key={matchIndex++}
        style={{
          color: 'rgba(255,255,255,0.95)',
          fontWeight: 650,
        }}
      >
        {match[0]}
      </span>
    )
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return <>{parts.length > 0 ? parts : text}</>
}


export default function ProgramsSection() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <SectionHeading
        eyebrow="Programs"
        title="Training built for real life and real progress."
        description="Choose a commitment level that fits your goals. Value increases with longer commitments."
      />

      <Container>
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 16,
            alignItems: 'stretch',
          }}
        >
          {PROGRAMS.map((p, idx) => {
            const isRecommended = p.isRecommended
            const isMonthly = p.tier === 'monthly'
            const subtitleHighlightTerms = p.tier === 'threeMonths'
              ? ['Muscle gain', 'Fat loss']
              : p.tier === 'sixMonths'
              ? ['Fat loss', 'Muscle gain', 'Body recomp']
              : []
            
            return (
              <motion.article
                key={p.title}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : idx * 0.03 }}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.003 }}
                style={{ gridColumn: 'span 4' }}
              >
                <div
                  className={`card ${isRecommended ? 'card--recommended' : ''} ${isMonthly ? 'card--monthly' : ''}`}
                  style={{
                    height: '100%',
                    padding: 18,
                    borderRadius: 18,
                    background: 'rgba(255, 255, 255, 0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'grid',
                    gap: 12,
                    gridTemplateRows: 'auto auto auto auto 1fr auto',
                    boxShadow: isRecommended
                      ? '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,200,0,0.25)'
                      : '0 12px 40px rgba(0,0,0,0.4)',
                    border: isRecommended
                      ? '1px solid rgba(255,200,0,0.25)'
                      : '1px solid rgba(255,255,255,0.12)',
                    transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
                    opacity: isMonthly ? 0.88 : 1,
                  }}
                >

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h3 style={{ margin: 0, letterSpacing: '-0.01em', fontSize: isRecommended ? 22 : 20 }}>
                        {p.title}
                      </h3>
                      <span
                        className="pill"
                        style={{
                          fontWeight: 800,
                          fontSize: 11,
                          color: isMonthly ? 'rgba(255,255,255,.65)' : 'rgba(255,255,255,.78)',
                          background: isMonthly ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.06)',
                          width: 'fit-content',
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>
                    {isRecommended && (
                      <span
                        className="pill"
                        style={{
                          fontWeight: 800,
                          fontSize: 11,
                          color: 'rgba(0,0,0,0.95)',
                          background: 'linear-gradient(135deg, rgba(255,200,0,.95), rgba(220,38,38,.92))',
                          padding: '4px 10px',
                        }}
                      >
                        Best Value
                      </span>
                    )}
                  </div>

                  <p className="muted" style={{ margin: '4px 0 0', fontSize: isMonthly ? 13 : 14, opacity: isMonthly ? 0.75 : 0.85 }}>
                    {subtitleHighlightTerms.length > 0 
                      ? renderSubtitleWithHighlight(p.subtitle, subtitleHighlightTerms)
                      : p.subtitle}
                  </p>

                  <div style={{ marginTop: 12, padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                    <div style={{ fontSize: isRecommended ? 24 : 20, fontWeight: 800, color: isRecommended ? 'var(--accent)' : 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
                      {p.pricing}
                    </div>
                  </div>

                  <ul style={{ margin: '16px 0 0', paddingLeft: 18, color: isMonthly ? 'rgba(255,255,255,.70)' : 'rgba(255,255,255,.78)' }}>
                    {p.features.map((feature, featureIdx) => (
                      <li key={featureIdx} style={{ margin: '8px 0', fontSize: 13, lineHeight: 1.5 }}>
                        {renderBoldCaps(feature)}
                      </li>
                    ))}
                  </ul>

                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      gap: 10,
                      flexWrap: 'wrap',
                      alignSelf: 'end',
                    }}
                  >
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => openWhatsAppForProgram(p.title)}
                    >
                      Get This Program
                    </Button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <style>
          {`
            @media (max-width: 940px) {
              #programs .grid > article { grid-column: span 12 !important; }
            }
            @media (max-width: 640px) {
              #programs .grid > article { grid-column: span 12 !important; }
            }
          `}
        </style>
      </Container>
    </>
  )
}


