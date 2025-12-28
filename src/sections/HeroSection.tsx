import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import Container from '../components/Container'
import heroBanner from '../assets/herobanner.jpeg'

const HEADLINE = 'Build discipline. Earn your transformation.'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-label="Hero"
      style={{
        padding: 'clamp(140px, 15vh, 200px) 0 100px',
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <motion.img
          src={heroBanner}
          alt=""
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="hero-image"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          className="hero-overlay"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        />
      </div>

      <Container>
        <div
          className="hero-content"
          style={{
            maxWidth: 680,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ display: 'grid', gap: 12 }}
            className="hero-badges"
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFC800, #DC2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              ಶಕ್ತಿ ಮತ್ತು ಶಿಸ್ತು
            </div>
            <div
              className="pill"
              style={{ display: 'inline-flex', fontSize: 13, padding: '6px 14px', width: 'fit-content' }}
            >
              <span aria-hidden="true">⚡</span>
              <span>Certified Personal Trainer</span>
            </div>
          </motion.div>

          <h1 className="h1" style={{ marginTop: 24, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {reduceMotion ? (
              HEADLINE
            ) : (
              <>
                {HEADLINE.split(' ').map((word, wordIdx) => (
                  <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
                    {word.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + (wordIdx * 5 + i) * 0.02,
                          ease: 'easeOut',
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </>
            )}
          </h1>

          <motion.p
            className="lead"
            style={{ margin: '20px 0 0', maxWidth: 520, fontSize: '1.25rem', lineHeight: 1.5 }}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          >
            Train with purpose, track progress, transform with discipline.
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
            className="hero-actions"
          >
            <Button
              variant="primary"
              onClick={() => {
                const element = document.getElementById('programs')
                if (!element) return
                const headerHeight = 80
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerHeight
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              }}
            >
              Start Your Transformation
              <span aria-hidden="true">→</span>
            </Button>
          </motion.div>
        </div>
      </Container>

      <style>
        {`
          .hero-image {
            object-position: center 10%; /* Ensures face and upper torso are visible */
          }
          
          .hero-overlay {
            background: linear-gradient(75deg, 
              rgba(10,5,5,0.95) 0%, 
              rgba(10,5,5,0.8) 25%, 
              rgba(10,5,5,0.4) 50%, 
              transparent 100%
            );
          }

          @media (max-width: 860px) {
            .hero-content {
              text-align: center !important;
              margin: 0 auto !important;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .hero-badges, .hero-actions {
              justify-content: center !important;
              justify-items: center !important;
            }
            .hero-badges {
               transform: none !important;
            }
            .hero-image {
              object-position: 50% 10% !important; /* Re-centered for mobile */
            }
            .hero-overlay {
              background: linear-gradient(180deg, 
                rgba(10,5,5,0.4) 0%, 
                rgba(10,5,5,0.6) 40%, 
                rgba(10,5,5,0.9) 100%
              ) !important;
            }
          }
        `}
      </style>
    </section>
  )
}


