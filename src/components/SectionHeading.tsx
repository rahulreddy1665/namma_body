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
        className="section-heading-wrapper"
        style={{  
          marginBottom: 'var(--content-gap-sm)', /* 8px */
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
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
              width: 6,
              height: 6,
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0 0 0 3px rgba(255,255,255,0.08)',
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
      <style>
        {`
          /* Desktop - Full width for wrapper and description */
          @media (min-width: 1024px) {
            .section-heading-wrapper {
              max-width: 100% !important;
              width: 100% !important;
            }
            .section-heading-wrapper .lead {
              width: 100% !important;
              max-width: 100% !important;
            }
          }

          /* Ultra-wide screens */
          @media (min-width: 2560px) {
            .section-heading-wrapper {
              margin: 0 0 12px 0 !important;
            }
            .section-heading-pill {
              font-size: 16px !important;
              padding: 10px 16px !important;
            }
          }

          /* Large Desktop */
          @media (min-width: 1920px) and (max-width: 2559px) {
            .section-heading-wrapper {
              margin: 0 0 10px 0 !important;
            }
            .section-heading-pill {
              font-size: 15px !important;
            }
          }

          /* Desktop */
          @media (min-width: 1440px) and (max-width: 1919px) {
            .section-heading-wrapper {
              margin-bottom: 8px !important;
            }
          }

          @media (min-width: 1024px) and (max-width: 1439px) {
            .section-heading-wrapper {
              margin-bottom: 8px !important;
            }
          }

          /* Tablet */
          @media (min-width: 768px) and (max-width: 1023px) {
            .section-heading-wrapper {
              margin-bottom: 6px !important;
            }
          }

          /* Mobile */
          @media (max-width: 767px) {
            .section-heading-wrapper {
              gap: 8px !important;
              margin-bottom: 6px !important;
            }
          }

          @media (max-width: 480px) {
            .section-heading-wrapper {
              gap: 6px !important;
              margin-bottom: 4px !important;
            }
            .section-heading-pill {
              margin-bottom: 6px;
              font-size: 13px !important;
              padding: 7px 11px !important;
            }
            .h2 {
              margin-bottom: 4px;
            }
            .lead {
              margin-top: 8px !important;
            }
          }
        `}
      </style>
    </Container>
  )
}


