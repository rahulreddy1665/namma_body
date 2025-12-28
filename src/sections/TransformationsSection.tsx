import { motion } from 'framer-motion'
import Container from '../components/Container'
import { TRANSFORMATIONS } from '../data/transformations'

export default function TransformationsSection() {
  // Use first 5 transformations for the editorial look
  const displayTransformations = TRANSFORMATIONS.slice(0, 5)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.45, 0.32, 0.9]
      }
    }
  }

  return (
    <div style={{ 
      paddingBottom: '20px',
      background: 'transparent' 
    }}>
      <Container>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ 
            display: 'flex', 
            flexWrap: 'nowrap',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '450px',
            padding: '0 10px'
          }}
        >
          {displayTransformations.map((t, idx) => {
            // Editorial staggered offsets and sizes for depth
            const offsets = [0, 60, -30, 45, -15]
            const aspectRatios = ['3/4', '4/5', '3/4', '4/5', '3/4']
            const zIndices = [10, 8, 9, 7, 6]

            return (
              <motion.div
                key={t.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02, 
                  zIndex: 20,
                  transition: { duration: 0.4 } 
                }}
                style={{
                  flex: '1 1 0',
                  minWidth: '160px',
                  maxWidth: '280px',
                  position: 'relative',
                  marginTop: `${offsets[idx]}px`,
                  zIndex: zIndices[idx],
                }}
              >
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '4px',
                  backgroundColor: '#000',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  aspectRatio: aspectRatios[idx],
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <motion.img
                    src={t.imageSrc}
                    alt={t.imageAlt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: idx % 2 === 0 ? 'grayscale(1) contrast(1.1)' : 'contrast(1.1) brightness(0.85)',
                    }}
                  />
                  {/* Subtle editorial overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.6) 100%)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>

      <style>
        {`
          #transformations .container {
             width: 100%;
             max-width: 1440px;
          }
          @media (max-width: 1024px) {
            #transformations div[style*="flex-wrap: nowrap"] {
              flex-wrap: wrap !important;
              justify-content: center !important;
              gap: 24px !important;
            }
            #transformations div[style*="flex: 1 1 0"] {
              flex: 0 0 calc(33.333% - 16px) !important;
              margin-top: 0 !important;
              max-width: none !important;
            }
          }
          @media (max-width: 640px) {
             #transformations div[style*="flex: 0 0 calc(33.333% - 16px)"] {
              flex: 0 0 calc(50% - 12px) !important;
            }
          }
        `}
      </style>
    </div>
  )
}
