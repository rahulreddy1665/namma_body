import { motion, useReducedMotion } from 'framer-motion'
import Container from '../components/Container'
import { TRANSFORMATIONS } from '../data/transformations'

export default function TransformationsSection() {
  const reduceMotion = useReducedMotion()
  // Use all 3 transformations for the editorial look
  const displayTransformations = TRANSFORMATIONS

  return (
    <div style={{ 
      paddingBottom: '0px',
      background: 'transparent' 
    }}>
      <Container>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h2" 
            style={{ 
              fontWeight: 800, 
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: 'var(--text)'
            }}
          >
            Built through consistency
          </motion.h2>
        </div>

        <div 
          className="transformations-container"
          style={{
            display: 'flex', 
            flexWrap: 'nowrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '280px',
            padding: '0 10px',
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          {displayTransformations.map((t, idx) => {
            // Editorial staggered offsets and sizes for depth
            const offsets = [0, 60, -30]
            const aspectRatios = ['3/4', '4/5', '3/4']
            const zIndices = [10, 8, 9]

            return (
              <motion.div
                key={t.name}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  zIndex: 20,
                  transition: { duration: 0.4 } 
                }}
                style={{
                  flex: '0 1 auto',
                  minWidth: '180px',
                  maxWidth: '320px',
                  width: '100%',
                  position: 'relative',
                  marginTop: `${offsets[idx]}px`,
                  zIndex: zIndices[idx],
                }}
              >
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '16px',
                  backgroundColor: '#000',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
                  aspectRatio: aspectRatios[idx],
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  height: 'auto'
                }}>
                  {/* Left Half */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      clipPath: 'inset(0 50% 0 0)',
                      zIndex: 2,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: '#000',
                    }}
                    variants={{
                      initial: { x: reduceMotion ? 0 : '-100%', opacity: reduceMotion ? 1 : 0 },
                      animate: { x: 0, opacity: 1 },
                    }}
                    transition={{ 
                      duration: 1.1, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: idx * 0.15
                    }}
                  >
                    <motion.img
                      src={t.imageSrc}
                      alt={`${t.imageAlt} Left`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: idx % 2 === 0 ? 'grayscale(0.3) contrast(1.05)' : 'contrast(1.05) brightness(0.92)',
                      }}
                      variants={{
                        initial: { scale: reduceMotion ? 1 : 1.1 },
                        animate: { scale: 1 },
                      }}
                      transition={{ 
                        duration: 1.4, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: idx * 0.15
                      }}
                    />
                  </motion.div>

                  {/* Right Half */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      clipPath: 'inset(0 0 0 50%)',
                      zIndex: 2,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: '#000',
                    }}
                    variants={{
                      initial: { x: reduceMotion ? 0 : '100%', opacity: reduceMotion ? 1 : 0 },
                      animate: { x: 0, opacity: 1 },
                    }}
                    transition={{ 
                      duration: 1.1, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: idx * 0.15
                    }}
                  >
                    <motion.img
                      src={t.imageSrc}
                      alt={`${t.imageAlt} Right`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: idx % 2 === 0 ? 'grayscale(0.3) contrast(1.05)' : 'contrast(1.05) brightness(0.92)',
                      }}
                      variants={{
                        initial: { scale: reduceMotion ? 1 : 1.1 },
                        animate: { scale: 1 },
                      }}
                      transition={{ 
                        duration: 1.4, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: idx * 0.15
                      }}
                    />
                  </motion.div>

                  {/* Subtle editorial overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 75%, rgba(0,0,0,0.4) 100%)',
                    pointerEvents: 'none',
                    zIndex: 3
                  }} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>

        <style>
          {`
          #transformations .container {
             width: 100%;
             max-width: 1440px;
          }
          @media (max-width: 1024px) {
            #transformations .transformations-container {
              flex-wrap: wrap !important;
              justify-content: center !important;
              gap: 20px !important;
              min-height: 240px !important;
            }
            #transformations div[style*="flex: 0 1 auto"] {
              flex: 0 0 calc(33.333% - 16px) !important;
              margin-top: 0 !important;
              max-width: none !important;
            }
          }
          @media (max-width: 768px) {
            #transformations .transformations-container {
              min-height: auto !important;
              padding-bottom: 0 !important;
            }
            #transformations div[style*="marginBottom"] {
              margin-bottom: 16px !important;
            }
          }
          @media (max-width: 640px) {
             #transformations div[style*="flex: 0 0 calc(33.333% - 16px)"] {
              flex: 0 0 calc(50% - 12px) !important;
            }
            #transformations .transformations-container {
              min-height: auto !important;
              gap: 16px !important;
            }
            #transformations div[style*="marginBottom"] {
              margin-bottom: 12px !important;
            }
          }
          `}
        </style>
    </div>
  )
}
