import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { TRANSFORMATIONS } from '../data/transformations'

export default function TransformationsSection() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <SectionHeading
        eyebrow="Transformations"
        title="Before & after—earned through structure."
        description="A few examples of what happens when training, nutrition, and accountability align. (Images are lightweight placeholders—swap with real client photos anytime.)"
      />

      <Container>
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 16,
          }}
        >
          {TRANSFORMATIONS.map((t, idx) => (
            <motion.article
              key={t.name + t.duration}
              className="card"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : idx * 0.03 }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              style={{
                gridColumn: 'span 4',
                overflow: 'hidden',
                borderRadius: 18,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={t.imageSrc}
                  alt={t.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={720}
                  style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    transform: 'scale(1.02)',
                    filter: 'saturate(1.05) contrast(1.03)',
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.52))',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 12,
                    right: 12,
                    bottom: 12,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'grid', gap: 2 }}>
                    <strong style={{ fontSize: 14 }}>{t.name}</strong>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,.72)' }}>{t.focus}</span>
                  </div>
                  <span
                    className="pill"
                    style={{
                      background: 'rgba(0,0,0,.35)',
                      border: '1px solid rgba(255,255,255,.16)',
                      color: 'rgba(255,255,255,.82)',
                      fontWeight: 750,
                      fontSize: 12,
                    }}
                  >
                    {t.duration}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <style>
          {`
            @media (max-width: 980px) {
              #transformations .grid > article { grid-column: span 6 !important; }
            }
            @media (max-width: 620px) {
              #transformations .grid > article { grid-column: span 12 !important; }
            }
          `}
        </style>
      </Container>
    </>
  )
}


