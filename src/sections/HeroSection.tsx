import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import Container from '../components/Container'

const HEADLINE = 'Build discipline. Earn your transformation.'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-label="Hero"
      style={{
        padding: '120px 0 80px',
        position: 'relative',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(900px 450px at 50% 20%, rgba(124,92,255,.16), transparent 65%)',
          filter: 'saturate(1.1)',
        }}
      />

      <Container>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div
              className="pill"
              style={{ display: 'inline-flex', fontSize: 13, padding: '6px 14px' }}
            >
              <span aria-hidden="true">⚡</span>
              <span>Certified Personal Trainer</span>
            </div>
          </motion.div>

          <h1 className="h1" style={{ marginTop: 20 }}>
            {reduceMotion ? (
              HEADLINE
            ) : (
              <>
                {HEADLINE.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.03,
                      delay: 0.3 + i * 0.015,
                      ease: 'easeOut',
                    }}
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </>
            )}
          </h1>

          <motion.p
            className="lead"
            style={{ margin: '16px auto 0', maxWidth: 560 }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : 0.8 }}
          >
            Train with purpose, track progress, transform with discipline.
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28, justifyContent: 'center' }}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : 0.95 }}
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
    </section>
  )
}


