import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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
        padding: 'var(--section-padding-tight) 0', /* 12px */
        background: 'transparent',
        width: '100%',
        position: 'relative'
      }}
    >
      <Container>
        <div style={{ marginBottom: 'var(--content-gap-lg)', textAlign: 'center' }}> {/* 16px */}
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
          {/* Navigation Arrows - Large Chevrons */}
          {TRANSFORMATIONS.length > cardsToShow && (
            <>
              <button
                onClick={goToPrev}
                aria-label="Previous transformations"
                className="carousel-button carousel-button--prev"
                style={{
                  position: 'absolute',
                  left: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontSize: '28px',
                  fontWeight: 300,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                aria-label="Next transformations"
                className="carousel-button carousel-button--next"
                style={{
                  position: 'absolute',
                  right: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontSize: '28px',
                  fontWeight: 300,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                ›
              </button>
            </>
          )}

          <div 
            className="transformations-container"
            style={{
              display: 'flex', 
              flexWrap: 'nowrap',
              gap: 'var(--content-gap-lg)', /* 16px */
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '0',
              maxWidth: '100%',
              overflow: 'visible',
              margin: '0',
              position: 'relative'
            }}
          >
            <AnimatePresence mode="wait">
              {visibleTransformations.map((t, displayIdx) => {
                const actualIdx = currentIndex + displayIdx

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
                      minWidth: cardsToShow === 1 ? '100%' : cardsToShow === 2 ? '48%' : '32%',
                      maxWidth: cardsToShow === 1 ? '100%' : cardsToShow === 2 ? '48%' : '32%',
                      position: 'relative',
                      zIndex: 10,
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
                    {/* Card Container - White with rounded top corners */}
                    <div style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '20px 20px 16px 16px',
                      overflow: 'hidden',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      {/* Colored Top Section */}
                      <div style={{
                        background: `linear-gradient(135deg, ${actualIdx % 2 === 0 ? 'rgba(255,200,0,0.3)' : 'rgba(220,38,38,0.3)'}, ${actualIdx % 2 === 0 ? 'rgba(220,38,38,0.2)' : 'rgba(255,200,0,0.2)'})`,
                        height: '140px',
                        position: 'relative',
                        borderRadius: '20px 20px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '60px'
                      }}>
                        {/* Transformation Image - Split Left/Right Animation */}
                        <motion.div
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.2 }}
                          style={{
                            position: 'absolute',
                            top: '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'calc(100% - 32px)',
                            height: '280px',
                            overflow: 'hidden',
                            background: 'transparent',
                            zIndex: 2,
                            borderRadius: '12px',
                          }}
                        >
                          {/* Left Half - slides from left */}
                          <motion.div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              clipPath: 'inset(0 50% 0 0)',
                              zIndex: 2,
                              overflow: 'hidden',
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
                                objectFit: 'contain',
                                objectPosition: 'center',
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

                          {/* Right Half - slides from right */}
                          <motion.div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              clipPath: 'inset(0 0 0 50%)',
                              zIndex: 2,
                              overflow: 'hidden',
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
                                objectFit: 'contain',
                                objectPosition: 'center',
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
                        </motion.div>
                      </div>

                      {/* White Body Section with Content */}
                      <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        padding: '180px var(--content-gap-lg) var(--content-gap-lg) var(--content-gap-lg)',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--content-gap-md)' /* 12px */
                      }}>
                        {/* Client Name */}
                        <h3
                          style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'var(--text)',
                            margin: 0,
                            textAlign: 'center'
                          }}
                        >
                          {t.name}
                        </h3>

                        {/* Focus/Duration */}
                        <p
                          style={{
                            fontSize: '14px',
                            color: 'var(--muted)',
                            margin: 0,
                            textAlign: 'center'
                          }}
                        >
                          {t.focus} • {t.duration}
                        </p>

                        {/* BEFORE/AFTER Labels */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '8px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.7)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                          }}
                        >
                          <span>BEFORE</span>
                          <span>AFTER</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          {TRANSFORMATIONS.length > cardsToShow && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-2)', /* 8px */
              marginTop: 'var(--content-gap-lg)' /* 16px */
            }}>
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: currentIndex === idx ? '32px' : '8px',
                    height: '4px',
                    borderRadius: '2px',
                    border: 'none',
                    background: currentIndex === idx 
                      ? 'rgba(255,200,0,0.9)' 
                      : 'rgba(255,255,255,0.25)',
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
             max-width: min(1800px, 95vw);
             margin: 0 auto;
             padding: 0 clamp(16px, 2vw, 40px);
          }
          #transformations .transformations-wrapper {
            position: relative;
          }
          
          /* Ultra-wide screens */
          @media (min-width: 2560px) {
            #transformations .container {
              max-width: 2400px;
            }
            #transformations .transformations-container > div {
              max-width: 450px;
            }
          }
          
          /* Large Desktop */
          @media (min-width: 1920px) and (max-width: 2559px) {
            #transformations .container {
              max-width: 1920px;
            }
          }
          
          /* Desktop */
          @media (min-width: 1440px) and (max-width: 1919px) {
            #transformations .container {
              max-width: 1680px;
            }
          }
          
          @media (min-width: 1200px) and (max-width: 1439px) {
            #transformations .container {
              max-width: 1400px;
            }
          }
          
          /* Small Desktop / Large Tablet */
          @media (min-width: 1024px) and (max-width: 1199px) {
            #transformations .container {
              max-width: 1100px;
              padding: 0 20px;
            }
            #transformations .transformations-wrapper {
              padding: 0 70px !important;
            }
            .carousel-button {
              width: 50px !important;
              height: 50px !important;
              font-size: 24px !important;
            }
            .carousel-button--prev {
              left: -45px !important;
            }
            .carousel-button--next {
              right: -45px !important;
            }
          }
          
          /* Tablet */
          @media (min-width: 768px) and (max-width: 1023px) {
            #transformations {
              padding: var(--section-padding-tight) 0 !important; /* 12px */
            }
            #transformations .container {
              max-width: 100%;
              padding: 0 var(--content-gap-lg);
            }
            #transformations .transformations-wrapper {
              padding: 0 65px !important;
            }
            #transformations .transformations-container {
              gap: var(--content-gap-lg) !important; /* 16px */
            }
            .carousel-button {
              width: 48px !important;
              height: 48px !important;
              font-size: 22px !important;
            }
            .carousel-button--prev {
              left: -38px !important;
            }
            .carousel-button--next {
              right: -38px !important;
            }
          }
          
          /* Mobile Landscape / Small Tablet */
              @media (min-width: 640px) and (max-width: 767px) {
                #transformations {
                  padding: var(--section-padding-tight) 0 !important; /* 12px */
                }
            #transformations .container {
              padding: 0 12px;
            }
            #transformations .transformations-wrapper {
              padding: 0 60px !important;
            }
            #transformations .transformations-container {
              gap: var(--content-gap-lg) !important; /* 16px */
            }
            .carousel-button {
              width: 42px !important;
              height: 42px !important;
              font-size: 20px !important;
            }
            .carousel-button--prev {
              left: -32px !important;
            }
            .carousel-button--next {
              right: -32px !important;
            }
          }
          
          /* Mobile Portrait */
              @media (min-width: 480px) and (max-width: 639px) {
                #transformations {
                  padding: 0.75rem 0 !important; /* 12px */
                }
            #transformations .transformations-wrapper {
              padding: 0 55px !important;
            }
            #transformations .transformations-container {
              gap: var(--content-gap-md) !important; /* 12px */
            }
            .carousel-button {
              width: 38px !important;
              height: 38px !important;
              font-size: 18px !important;
            }
            .carousel-button--prev {
              left: -28px !important;
            }
            .carousel-button--next {
              right: -28px !important;
            }
          }
          
          /* Small Mobile */
              @media (max-width: 479px) {
                #transformations {
                  padding: 0.5rem 0 !important; /* 8px */
                }
            #transformations .transformations-wrapper {
              padding: 0 50px !important;
            }
            #transformations .transformations-container {
              gap: var(--content-gap-md) !important; /* 12px */
            }
            .carousel-button {
              width: 36px !important;
              height: 36px !important;
              font-size: 16px !important;
            }
            .carousel-button--prev {
              left: -25px !important;
            }
            .carousel-button--next {
              right: -25px !important;
            }
          }
          
          /* Ensure cards scale properly at all sizes */
          #transformations .transformations-container > div {
            min-width: clamp(280px, 30vw, 450px);
          }
          
          @media (max-width: 1023px) {
            #transformations .transformations-container > div {
              min-width: clamp(250px, 45vw, 400px);
            }
          }
          
          @media (max-width: 767px) {
            #transformations .transformations-container > div {
              min-width: clamp(280px, 85vw, 450px);
            }
          }
          `}
        </style>
    </div>
  )
}
