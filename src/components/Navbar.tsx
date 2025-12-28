import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Container from './Container'

type NavId = 'about' | 'transformations' | 'programs' | 'contact'

type Props = {
  activeId: string | null
}

const NAV_ITEMS: Array<{ id: NavId; label: string; href: string }> = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'transformations', label: 'Transformations', href: '#transformations' },
  { id: 'programs', label: 'Programs', href: '#programs' },
  { id: 'contact', label: 'Contact Us', href: '#contact' },
]

// Scroll to section with offset for sticky header
function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (!element) return

  const headerHeight = 80 // Approximate sticky header height
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerHeight

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

function Logo() {
  return (
    <a
      href="#main"
      aria-label="Namma Body"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
    >
      {/* <img
        src={logoImage}
        alt=""
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          objectFit: 'cover',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        }}
      /> */}
      <span
        className="navbar-logo-text"
        style={{
          fontWeight: 850,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          background: 'linear-gradient(135deg, #FFC800, #DC2626)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Namma Body
      </span>
    </a>
  )
}

export default function Navbar({ activeId }: Props) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const THRESHOLD = 6
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > THRESHOLD)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const items = useMemo(() => NAV_ITEMS, [])

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
      style={{
        position: scrolled ? 'sticky' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
        background: scrolled ? 'rgba(10,5,5,0.3)' : 'transparent',
        borderBottom: 'none',
        boxShadow: scrolled ? '0 6px 28px rgba(0, 0, 0, 0.25)' : 'none',
        transition: 'background 0.15s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'background, backdrop-filter',
      }}
    >
      <Container>
        <div
          className="navbar-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <Logo />

          <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="nav-links" style={{ display: 'none', gap: 6, alignItems: 'center' }}>
              {items.map((item) => {
                const isActive = activeId !== null && activeId === item.id
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.id)
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 999,
                      color: isActive ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.85)',
                      border: isActive ? '1px solid rgba(255,200,0,.35)' : '1px solid transparent',
                      background: isActive ? 'rgba(255,200,0,.12)' : 'transparent',
                      transition: 'background 160ms ease, border-color 160ms ease, color 160ms ease',
                      fontWeight: 650,
                      fontSize: 14,
                      cursor: 'pointer',
                      textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,.06)'
                        e.currentTarget.style.color = 'rgba(255,255,255,.88)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'rgba(255,255,255,.75)'
                      }
                    }}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>

            <button
              className="btn btn--ghost"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              style={{ padding: '10px 12px' }}
            >
              <span aria-hidden="true" style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    width: 18,
                    height: 2,
                    background: 'rgba(255,255,255,.8)',
                    borderRadius: 999,
                  }}
                />
                <span
                  style={{
                    width: 18,
                    height: 2,
                    background: 'rgba(255,255,255,.8)',
                    borderRadius: 999,
                  }}
                />
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>Menu</span>
            </button>
          </nav>
        </div>

        <style>
          {`
           .navbar--transparent {
  background: linear-gradient(
    180deg,
    rgba(15, 12, 10, 0.55),
    rgba(15, 12, 10, 0.25),
    rgba(15, 12, 10, 0)
  ) !important;
  backdrop-filter: blur(6px) saturate(120%);
}
            .navbar--scrolled {
              background: rgba(10,5,5,0.3) !important;
              backdrop-filter: blur(20px) saturate(180%) !important;
            }
            .navbar-inner {
              padding: 14px 0;
            }
            @media (max-width: 640px) {
              .navbar-inner {
                padding: 10px 0;
              }
            }
            @media (min-width: 860px) {
              .nav-links { display: inline-flex !important; }
              header button[aria-controls="mobile-menu"] { display: none !important; }
            }
          `}
        </style>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,.04)',
              background: 'rgba(10,5,5,0.30)',
              backdropFilter: 'blur(12px) saturate(120%)',
            }}
          >
            <Container>
              <div style={{ display: 'grid', gap: 8, padding: '14px 0 18px' }}>
                {items.map((item) => {
                  const isActive = activeId !== null && activeId === item.id
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        setOpen(false)
                        // Small delay to allow menu to close before scrolling
                        setTimeout(() => {
                          scrollToSection(item.id)
                        }, 100)
                      }}
                      style={{
                        padding: '12px 12px',
                        borderRadius: 14,
                        border: '1px solid rgba(255,255,255,.08)',
                        background: isActive ? 'rgba(255,200,0,.15)' : 'rgba(255,255,255,.05)',
                        color: 'rgba(255,255,255,.92)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'background 160ms ease, border-color 160ms ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,.08)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,.05)'
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}


