import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { PROGRAMS } from '../data/programs'
import { openWhatsAppForProgram } from '../lib/whatsapp'

export default function ProgramsSection() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <SectionHeading
        eyebrow="Programs"
        title="Training built for real life—and real progress."
        description="Choose a track that fits your goal. Every program includes clear progression, coaching feedback, and accountability."
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
          {PROGRAMS.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : idx * 0.03 }}
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.003 }}
              style={{ gridColumn: 'span 6' }}
            >
              <div
                className="card"
                style={{
                  height: '100%',
                  padding: 18,
                  borderRadius: 18,
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'grid',
                  gap: 12,
                  gridTemplateRows: 'auto auto auto 1fr auto',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,200,0,0.14)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: 1,
                    borderRadius: 18,
                    background:
                      idx % 2 === 0
                        ? 'linear-gradient(135deg, rgba(255,200,0,.45), rgba(220,38,38,.25))'
                        : 'linear-gradient(135deg, rgba(220,38,38,.40), rgba(255,200,0,.25))',
                    mask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <h3 style={{ margin: 0, letterSpacing: '-0.01em' }}>{p.title}</h3>
                  <span
                    className="pill"
                    style={{
                      fontWeight: 800,
                      fontSize: 12,
                      color: 'rgba(255,255,255,.78)',
                      background: 'rgba(255,255,255,.06)',
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                <p className="muted" style={{ margin: '10px 0 0' }}>
                  {p.subtitle}
                </p>

                <ul style={{ margin: '14px 0 0', paddingLeft: 18, color: 'rgba(255,255,255,.78)' }}>
                  {p.highlights.map((h) => (
                    <li key={h} style={{ margin: '8px 0' }}>
                      {h}
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
          ))}
        </div>

        <style>
          {`
            @media (max-width: 940px) {
              #programs .grid > article { grid-column: span 12 !important; }
            }
          `}
        </style>
      </Container>
    </>
  )
}


