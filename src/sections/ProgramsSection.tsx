import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { PROGRAMS } from '../data/programs'
import { openWhatsAppForProgram } from '../lib/whatsapp'

// Helper function to render text with capital letters bold and highlight specific terms
function renderBoldCaps(text: string, highlightTerms: string[] = []) {
  // Terms to highlight (case-insensitive)
  const termsToHighlight = highlightTerms.map(term => term.toLowerCase())
  
  // Check if the entire text matches a highlight term
  const textLower = text.toLowerCase().trim()
  if (termsToHighlight.includes(textLower)) {
    return (
      <span
        style={{
          background: 'linear-gradient(135deg, rgba(255,200,0,.95), rgba(220,38,38,.92))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 800,
        }}
      >
        {text}
      </span>
    )
  }

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

// Helper function to highlight specific terms in white
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
    // Add highlighted term in white
    parts.push(
      <span
        key={matchIndex++}
        style={{
          color: 'rgba(255,255,255,1)',
          fontWeight: 700,
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

// Helper function to highlight specific numbers in pricing
function renderPricingWithHighlight(text: string, highlightNumber: string) {
  // Match the number that appears before a comma or slash - escape special regex characters
  const escapedNumber = highlightNumber.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedNumber})(?=,|/)`, 'g')
  const parts: (string | React.ReactElement)[] = []
  let lastIndex = 0
  let matchIndex = 0

  let match
  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Add highlighted number
    parts.push(
      <span
        key={matchIndex++}
        style={{
          background: 'linear-gradient(135deg, rgba(255,200,0,.95), rgba(220,38,38,.92))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 900,
        }}
      >
        {match[1]}
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
            const isThreeMonths = p.tier === 'threeMonths'
            const highlightTerms: string[] = []
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
                    background: isMonthly
                      ? 'linear-gradient(135deg, rgba(255,255,255,.04), rgba(255,255,255,.02))'
                      : isRecommended
                      ? 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.05))'
                      : 'linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'grid',
                    gap: 12,
                    gridTemplateRows: 'auto auto auto auto 1fr auto',
                    boxShadow: isRecommended
                      ? '0 20px 60px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,200,0,0.35), 0 0 40px rgba(255,200,0,0.15)'
                      : isMonthly
                      ? '0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)'
                      : '0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,200,0,0.14)',
                    transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
                    opacity: isMonthly ? 0.85 : 1,
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      padding: isRecommended ? 2 : 1,
                      borderRadius: 18,
                      background: isRecommended
                        ? 'linear-gradient(135deg, rgba(255,200,0,.55), rgba(220,38,38,.35))'
                        : isThreeMonths
                        ? 'linear-gradient(135deg, rgba(255,200,0,.35), rgba(220,38,38,.20))'
                        : 'linear-gradient(135deg, rgba(255,200,0,.25), rgba(220,38,38,.15))',
                      mask:
                        'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      pointerEvents: 'none',
                    }}
                  />

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
                          color: 'rgba(255,255,255,.95)',
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
                    <div style={{ fontSize: isRecommended ? 24 : 20, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                      {p.tier === 'monthly' && renderPricingWithHighlight(p.pricing, '5')}
                      {p.tier === 'threeMonths' && renderPricingWithHighlight(p.pricing, '15')}
                      {p.tier === 'sixMonths' && renderPricingWithHighlight(p.pricing, '25')}
                    </div>
                  </div>

                  <ul style={{ margin: '16px 0 0', paddingLeft: 18, color: isMonthly ? 'rgba(255,255,255,.70)' : 'rgba(255,255,255,.78)' }}>
                    {p.features.map((feature, featureIdx) => (
                      <li key={featureIdx} style={{ margin: '8px 0', fontSize: 13, lineHeight: 1.5 }}>
                        {renderBoldCaps(feature, highlightTerms)}
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


