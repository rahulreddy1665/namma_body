import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import aboutImage from '../assets/about_us.jpg'

export default function AboutSection() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <SectionHeading
        eyebrow="About"
        title="Science-based coaching, engineered for results."
        description="NAMMA BODY is a place where you come as you are, give your best, and take responsibility for your fitness journey.
            We help you achieve your fitness goals the right  way.
            Meet Raj
A highly committed natural bodybuilding athlete with competitive success and professional expertise in fitness coaching ,Raj has guided individuals from around the world toward sustainable transformations, improved health, and elite performance through structured training and personalized nutrition"
      />

      <Container>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
          <motion.div
            className="card"
            style={{ 
              gridColumn: 'span 5', 
              padding: 0,
              overflow: 'hidden',
              borderRadius: 18,
              height: '400px',
              position: 'relative',
              background: 'transparent', // Transparent to avoid flash of card background
              border: 'none', // Border is handled by the inner clipped elements or looks better without it during reveal
              boxShadow: 'none', // Removing shadow from parent to avoid weird clipping issues
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Top Half */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: 'inset(0 0 50% 0)',
                zIndex: 2,
                borderRadius: 18,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
              variants={{
                initial: { y: reduceMotion ? 0 : '-100%', opacity: reduceMotion ? 1 : 0 },
                animate: { y: 0, opacity: 1 },
              }}
              transition={{ 
                duration: 1.1, 
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.img
                src={aboutImage}
                alt="About Namma Body Top"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
                variants={{
                  initial: { scale: reduceMotion ? 1 : 1.1 },
                  animate: { scale: 1 },
                }}
                transition={{ 
                  duration: 1.4, 
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.div>

            {/* Bottom Half */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: 'inset(50% 0 0 0)',
                zIndex: 2,
                borderRadius: 18,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
              variants={{
                initial: { y: reduceMotion ? 0 : '100%', opacity: reduceMotion ? 1 : 0 },
                animate: { y: 0, opacity: 1 },
              }}
              transition={{ 
                duration: 1.1, 
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.img
                src={aboutImage}
                alt="About Namma Body Bottom"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
                variants={{
                  initial: { scale: reduceMotion ? 1 : 1.1 },
                  animate: { scale: 1 },
                }}
                transition={{ 
                  duration: 1.4, 
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ gridColumn: 'span 7', display: 'grid', gap: 14 }}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : 0.04 }}
          >
            <MiniCard title="Experience" value="7+ yrs" note="Strength & conditioning coaching" />
            <MiniCard title="Certifications" value="Diploma in nutrition and fitness" note="Form first, evidence led methods" />
            <MiniCard title="Focus" value="Coached over 60+ clients around the world" note="Fat loss · Muscle · Performance" />
          </motion.div>
        </div>

        <style>
          {`
            @media (max-width: 960px) {
              #about .grid { grid-template-columns: 1fr !important; }
              #about .grid > div { grid-column: auto !important; }
            }
            @media (max-width: 768px) {
              #about .card[style*="height: 400px"] {
                height: 280px !important;
              }
              #about .grid {
                gap: 16px !important;
              }
            }
            @media (max-width: 640px) {
              #about .card[style*="height: 400px"] {
                height: 240px !important;
              }
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
          background: 'rgba(255, 255, 255, 0.04)',
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



