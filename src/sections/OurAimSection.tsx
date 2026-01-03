import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'

export default function OurAimSection() {
  const reduceMotion = useReducedMotion()

  return (
    <div 
      id="our-aim"
      className="section"
      style={{ 
        padding: 'var(--section-padding-tight) 0', /* 12px */
        background: 'transparent',
        width: '100%',
        position: 'relative'
      }}
    >
      <SectionHeading
        eyebrow="Our Aim"
        title=""
      />

      <Container>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'left',
            marginTop: 'var(--content-gap-md)', /* 12px */
          }}
        >
          <p 
            className="lead"
            style={{ 
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              lineHeight: 1.7,
              color: 'var(--muted)',
              margin: 0
            }}
          >
            At NAMMA BODY, we help busy individuals transform their bodies through disciplined training and sustainable nutrition . our methods are grounded in nutrition and exercise science, using whole foods that are accessible, practical, and effective with client safety and longterm success as our highest priorities.
          </p>
        </motion.div>
      </Container>
    </div>
  )
}

