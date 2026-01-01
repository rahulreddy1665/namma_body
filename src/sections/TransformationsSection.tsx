import { useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import { TRANSFORMATIONS } from '../data/transformations'

export default function TransformationsSection() {
  const reduceMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)

  // Calculate how many cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCardsToShow(1)
      } else if (width < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(3)
      }
    }

    updateCardsToShow()
    window.addEventListener('resize', updateCardsToShow)
    return () => window.removeEventListener('resize', updateCardsToShow)
  }, [])

  const maxIndex = Math.max(0, TRANSFORMATIONS.length - cardsToShow)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const visibleTransformations = TRANSFORMATIONS.slice(
    currentIndex,
    currentIndex + cardsToShow
  )

  return (
    <div 
      id="transformations"
      className="section"
      style={{ 
        padding: '80px 0',
        background: 'transparent',
        width: '100%',
        position: 'relative'
      }}
    >
      <Container>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
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
          className="transformations-wrapper"
          style={{
            position: 'relative',
            width: '100%',
            padding: '0 40px'
          }}
        >
          {/* Navigation Buttons */}
          {TRANSFORMATIONS.length > cardsToShow && (
            <>
              <button
                onClick={goToPrev}
                aria-label="Previous transformations"
                className="carousel-button carousel-button--prev"
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(10,5,5,0.6)',
                  backdropFilter: 'blur(10px)',
                  color: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontSize: '20px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(10,5,5,0.8)'
                  e.currentTarget.style.borderColor = 'rgba(255,200,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(10,5,5,0.6)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                ←
              </button>
              <button
                onClick={goToNext}
                aria-label="Next transformations"
                className="carousel-button carousel-button--next"
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(10,5,5,0.6)',
                  backdropFilter: 'blur(10px)',
                  color: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontSize: '20px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(10,5,5,0.8)'
                  e.currentTarget.style.borderColor = 'rgba(255,200,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(10,5,5,0.6)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                →
              </button>
            </>
          )}

          <div 
            className="transformations-container"
            style={{
              display: 'flex', 
              flexWrap: 'nowrap',
              gap: '24px',
              alignItems: 'flex-start',
              justifyContent: 'center',
              minHeight: '500px',
              padding: '0',
              maxWidth: '100%',
              overflow: 'hidden',
              margin: '0',
              position: 'relative'
            }}
          >
            <AnimatePresence mode="wait">
              {visibleTransformations.map((t, displayIdx) => {
                const actualIdx = currentIndex + displayIdx
                // Editorial staggered offsets and sizes for depth
                const offsets = [0, 40, -20, 20]
                const aspectRatios = ['3/4', '4/5', '3/4', '4/5']
                const zIndices = [10, 8, 9, 7]

                return (
                  <motion.div
                    key={`${t.name}-${currentIndex}`}
                    initial="initial"
                    animate="animate"
                    whileHover={{ 
                      scale: 1.02, 
                      zIndex: 20,
                      transition: { duration: 0.4 } 
                    }}
                    style={{
                      flex: `0 0 calc(${100 / cardsToShow}% - ${(24 * (cardsToShow - 1)) / cardsToShow}px)`,
                      minWidth: cardsToShow === 1 ? '100%' : cardsToShow === 2 ? '48%' : '35%',
                      maxWidth: cardsToShow === 1 ? '100%' : cardsToShow === 2 ? '48%' : '38%',
                      position: 'relative',
                      marginTop: `${offsets[actualIdx] || 0}px`,
                      zIndex: zIndices[actualIdx] || 10,
                    }}
                    variants={{
                      initial: { opacity: 0, x: 50 },
                      animate: { opacity: 1, x: 0 }
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: displayIdx * 0.1
                    }}
                  >
                <div style={{
                 overflow: 'hidden',
                 borderRadius: '16px',
                 backgroundColor: '#000',
                 boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
                 aspectRatio: aspectRatios[actualIdx] || '3 / 4',
                 border: 'none',
                 position: 'relative',
                 width: '100%',
                 maxHeight: '75vh' 
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
                      border: 'none',
                      background: '#000',
                    }}
                    variants={{
                      initial: { x: reduceMotion ? 0 : '-100%', opacity: reduceMotion ? 1 : 0 },
                      animate: { x: 0, opacity: 1 },
                    }}
                    transition={{ 
                      duration: 1.1, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: displayIdx * 0.15
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
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter: actualIdx % 2 === 0 ? 'grayscale(0.3) contrast(1.05)' : 'contrast(1.05) brightness(0.92)',
                      }}
                      variants={{
                        initial: { scale: reduceMotion ? 1 : 1.1 },
                        animate: { scale: 1 },
                      }}
                      transition={{ 
                        duration: 1.4, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: displayIdx * 0.15
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
                      border: 'none',
                      background: '#000',
                    }}
                    variants={{
                      initial: { x: reduceMotion ? 0 : '100%', opacity: reduceMotion ? 1 : 0 },
                      animate: { x: 0, opacity: 1 },
                    }}
                    transition={{ 
                      duration: 1.1, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: displayIdx * 0.15
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
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter: actualIdx % 2 === 0 ? 'grayscale(0.3) contrast(1.05)' : 'contrast(1.05) brightness(0.92)',
                      }}
                      variants={{
                        initial: { scale: reduceMotion ? 1 : 1.1 },
                        animate: { scale: 1 },
                      }}
                      transition={{ 
                        duration: 1.4, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: displayIdx * 0.15
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
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          {TRANSFORMATIONS.length > cardsToShow && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '32px'
            }}>
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: currentIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: currentIndex === idx 
                      ? 'rgba(255,200,0,0.8)' 
                      : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Container>

        <style>
          {`
          #transformations .container {
             width: 100%;
             max-width: 1800px;
             margin: 0 auto;
             padding: 0 20px;
          }
          #transformations .transformations-wrapper {
            position: relative;
          }
          @media (min-width: 1600px) {
            #transformations .container {
              max-width: 1920px;
              padding: 0 30px;
            }
          
          }
          @media (max-width: 1400px) {
            #transformations .container {
              max-width: 1600px;
            }
          }
          @media (max-width: 1200px) {
            #transformations .container {
              max-width: 1200px;
            }
           
          }
          @media (max-width: 1024px) {
            #transformations .container {
              max-width: 100%;
              padding: 0 16px;
            }
            #transformations .transformations-wrapper {
              padding: 0 50px !important;
            }
            #transformations .transformations-container {
            
              gap: 20px !important;
            }
            .carousel-button {
              width: 40px !important;
              height: 40px !important;
              font-size: 16px !important;
            }
          }
          @media (max-width: 768px) {
            #transformations {
              padding: 60px 0 !important;
            }
            #transformations .container {
              padding: 0 12px;
            }
            #transformations .transformations-wrapper {
              padding: 0 45px !important;
            }
            #transformations .transformations-container {
             
              gap: 16px !important;
            }
            .carousel-button {
              width: 36px !important;
              height: 36px !important;
              font-size: 14px !important;
            }
          }
          @media (max-width: 640px) {
            #transformations .transformations-wrapper {
              padding: 0 45px !important;
            }
            #transformations .transformations-container {
            
              gap: 14px !important;
            }
          }
          @media (max-width: 480px) {
            #transformations .transformations-wrapper {
              padding: 0 40px !important;
            }
           
            .carousel-button {
              width: 32px !important;
              height: 32px !important;
              font-size: 12px !important;
            }
          }
          `}
        </style>
    </div>
  )
}
