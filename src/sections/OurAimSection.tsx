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
            margin: '0',
            marginTop: 'var(--content-gap-md)', /* 12px */
            textAlign: 'left',
            alignSelf: 'flex-start',
            width: '100%'
          }}
          className="our-aim-content"
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
      <style>
        {`
          /* Desktop - Full width for Our Aim text */
          @media (min-width: 1024px) {
            #our-aim .our-aim-content {
              max-width: 100% !important;
              width: 100% !important;
            }
            #our-aim .our-aim-content .lead {
              width: 100% !important;
              max-width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  )
}

