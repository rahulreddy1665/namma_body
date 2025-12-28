import { motion, useReducedMotion } from 'framer-motion'
import Container from './Container'

type Props = {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: Props) {
  const titleId = `${eyebrow.toLowerCase().replace(/\s+/g, '-')}-title`
  const reduceMotion = useReducedMotion()

  return (
    <Container>
      <motion.div
        style={{ display: 'grid', gap: 12, marginBottom: 22 }}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="pill section-heading-pill" aria-hidden="true">
          <span className="section-heading-pointer">
          <span
              className="pointer-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background:
                'linear-gradient(135deg, rgba(255,200,0,.95), rgba(220,38,38,.92))',
              boxShadow: '0 0 0 4px rgba(255,200,0,.12)',
                position: 'relative',
                display: 'inline-block',
            }}
          />
          </span>
          <span style={{ fontWeight: 650 }}>{eyebrow}</span>
        </div>

        <h2 className="h2" id={titleId}>
          {title}
        </h2>
        {description ? <p className="lead">{description}</p> : null}
      </motion.div>
    </Container>
  )
}


