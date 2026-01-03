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

// Helper function to highlight only specific terms for 6-month plan
function renderWithSelectiveHighlight(text: string, highlightTerms: string[]) {
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
    // Add highlighted term with bold emphasis
    parts.push(
      <strong
        key={matchIndex++}
        style={{
          fontWeight: 700,
          color: 'rgba(255,255,255,0.95)',
        }}
      >
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
              gap: 'var(--content-gap-md)', /* 12px */
              alignItems: 'stretch',
            }}
        >
          {PROGRAMS.map((p, idx) => {
            const isRecommended = p.isRecommended
            const isMonthly = p.tier === 'monthly'
            const isSixMonths = p.tier === 'sixMonths'
            const subtitleHighlightTerms = p.tier === 'threeMonths'
              ? []
              : p.tier === 'sixMonths'
              ? ['Fat loss', 'Muscle gain', 'Body recomp', 'Performance']
              : []
            // Terms to highlight for 6-month plan features
            const sixMonthsHighlightTerms = ['periodized', 'priority', 'full progress', 'lifestyle']
            
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
                    padding: 'var(--content-gap-lg)', /* 16px */
                    borderRadius: 18,
                    background: 'rgba(255, 255, 255, 0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'grid',
                    gap: 'var(--content-gap-md)', /* 12px */
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

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--content-gap-md)' }}> {/* 12px */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}> {/* 4px */}
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

                  <div style={{ marginTop: 'var(--content-gap-sm)', padding: 'var(--content-gap-md) 0', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)' }}> {/* 8px top, 12px padding */}
                    <div style={{ fontSize: isRecommended ? 24 : 20, fontWeight: 800, color: isRecommended ? 'var(--accent)' : 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
                      {p.pricing}
                    </div>
                  </div>

                  <ul style={{ margin: 'var(--content-gap-md) 0 0', paddingLeft: '1.125rem', color: isMonthly ? 'rgba(255,255,255,.70)' : 'rgba(255,255,255,.78)' }}> {/* 12px top, 18px left */}
                    {p.features.map((feature, featureIdx) => (
                      <li key={featureIdx} style={{ margin: 'var(--space-3) 0', fontSize: 13, lineHeight: 1.5 }}> {/* 12px */}
                        {isSixMonths ? renderWithSelectiveHighlight(feature, sixMonthsHighlightTerms) : renderBoldCaps(feature)}
                      </li>
                    ))}
                  </ul>

                  <div
                    style={{
                      marginTop: 'var(--content-gap-sm)', /* 8px */
                      display: 'flex',
                      gap: 'var(--content-gap-sm)', /* 8px */
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
            /* Ultra-wide screens - ensure cards don't get too wide */
            @media (min-width: 2560px) {
              #programs .grid > article {
                max-width: 550px;
                justify-self: center;
              }
              #programs .grid {
                gap: 28px !important;
              }
            }

            /* Large Desktop */
            @media (min-width: 1920px) and (max-width: 2559px) {
              #programs .grid {
                gap: 24px !important;
              }
              #programs .grid > article {
                max-width: 500px;
                justify-self: center;
              }
            }

            /* Desktop */
            @media (min-width: 1440px) and (max-width: 1919px) {
              #programs .grid {
                gap: 20px !important;
              }
            }

            @media (min-width: 1024px) and (max-width: 1439px) {
              #programs .grid {
                gap: 18px !important;
              }
            }

            /* Tablet - 2 columns */
            @media (min-width: 768px) and (max-width: 1023px) {
              #programs .grid > article:nth-child(1),
              #programs .grid > article:nth-child(2) { 
                grid-column: span 6 !important; 
              }
              #programs .grid > article:nth-child(3) { 
                grid-column: span 12 !important;
                max-width: 500px;
                justify-self: center;
              }
              #programs .grid {
                gap: 16px !important;
              }
            }

            /* Mobile */
            @media (max-width: 767px) {
              #programs .grid > article { 
                grid-column: span 12 !important; 
              }
              #programs .grid {
                gap: 14px !important;
              }
              #programs .card {
                margin-bottom: 0 !important;
              }
            }

            @media (max-width: 480px) {
              #programs .grid {
                gap: 12px !important;
              }
            }
          `}
        </style>
      </Container>
    </>
  )
}


