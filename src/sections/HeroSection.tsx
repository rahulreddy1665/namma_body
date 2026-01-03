import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import Container from '../components/Container'
import heroBanner from '../assets/herobanner.png'

const HEADLINE = 'Build discipline. Earn your transformation.'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-label="Hero"
      id="hero"
      style={{
        padding: '0 0 100px',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 0,
      }}
      className="hero-section"
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
            marginTop: 'clamp(140px, 15vh, 200px)',
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
              className="pill"
              style={{ display: 'inline-flex', fontSize: 13, padding: '6px 14px', width: 'fit-content' }}
            >
              <span>Certified Personal Trainer</span>
            </div>
          </motion.div>

          <h1 className="h1" style={{ marginTop: 24, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
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
                          duration: 0.6,
                          delay: 0.3 + (wordIdx * 5 + i) * 0.035,
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
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1], 
              delay: reduceMotion ? 0 : 2.1 
            }}
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
              rgba(10,5,5,0.88) 0%, 
              rgba(10,5,5,0.65) 30%, 
              rgba(10,5,5,0.25) 60%, 
              transparent 100%
            );
          }

          /* Ultra-wide screens */
          @media (min-width: 2560px) {
            .hero-section {
              min-height: 95vh !important;
            }
            .hero-content {
              max-width: 900px !important;
            }
            .h1 {
              font-size: clamp(3rem, 5vw, 4.5rem) !important;
            }
            .lead {
              font-size: clamp(1.35rem, 1.8vw, 1.6rem) !important;
            }
          }

          /* Large Desktop */
          @media (min-width: 1920px) and (max-width: 2559px) {
            .hero-section {
              min-height: 100vh !important;
            }
            .hero-content {
              max-width: 800px !important;
            }
            .h1 {
              font-size: clamp(2.5rem, 4.5vw, 3.8rem) !important;
            }
            .lead {
              font-size: clamp(1.3rem, 1.6vw, 1.5rem) !important;
            }
          }

          /* Desktop */
          @media (min-width: 1440px) and (max-width: 1919px) {
            .hero-section {
              min-height: 100vh !important;
            }
            .hero-content {
              max-width: 720px !important;
            }
          }

          @media (min-width: 1024px) and (max-width: 1439px) {
            .hero-section {
              min-height: 90vh !important;
            }
            .hero-content {
              max-width: 640px !important;
              margin-top: clamp(120px, 13vh, 180px) !important;
            }
          }

          /* Tablet */
          @media (min-width: 768px) and (max-width: 1023px) {
            .hero-section {
              min-height: 85vh !important;
              padding: 0 0 70px !important;
            }
            .hero-content {
              max-width: 90% !important;
              margin-top: clamp(110px, 12vh, 160px) !important;
            }
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
                rgba(10,5,5,0.3) 0%, 
                rgba(10,5,5,0.5) 40%, 
                rgba(10,5,5,0.85) 100%
              ) !important;
            }
          }
          
          /* Mobile */
          @media (max-width: 767px) {
            .hero-section {
              min-height: auto !important;
              padding: 0 0 60px !important;
            }
            .hero-content {
              margin-top: clamp(100px, 12vh, 140px) !important;
            }
          }

          @media (max-width: 480px) {
            .hero-section {
              padding: 0 0 50px !important;
            }
            .hero-content {
              margin-top: clamp(90px, 10vh, 120px) !important;
            }
          }
        `}
      </style>
    </section>
  )
}


