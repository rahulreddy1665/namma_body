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
      <span
        aria-hidden="true"
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(124,92,255,.95), rgba(34,230,168,.92))',
          boxShadow: '0 16px 40px rgba(124,92,255,.18)',
        }}
      />
      <span style={{ fontWeight: 850, letterSpacing: '-0.02em' }}>
        Namma<span style={{ color: 'rgba(255,255,255,.7)' }}>Body</span>
      </span>
    </a>
  )
}

export default function Navbar({ activeId }: Props) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const items = useMemo(() => NAV_ITEMS, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        background: 'rgba(7,10,14,.68)',
        borderBottom: '1px solid rgba(255,255,255,.10)',
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '14px 0',
          }}
        >
          <Logo />

          <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="nav-links" style={{ display: 'none', gap: 6, alignItems: 'center' }}>
              {items.map((item) => {
                const isActive = activeId === item.id
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
                      color: isActive ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.72)',
                      border: isActive ? '1px solid rgba(124,92,255,.35)' : '1px solid transparent',
                      background: isActive ? 'rgba(124,92,255,.10)' : 'transparent',
                      transition: 'background 160ms ease, border-color 160ms ease, color 160ms ease',
                      fontWeight: 650,
                      fontSize: 14,
                      cursor: 'pointer',
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
              <span style={{ fontSize: 14, fontWeight: 700 }}>Menu</span>
            </button>
          </nav>
        </div>

        <style>
          {`
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
              borderTop: '1px solid rgba(255,255,255,.10)',
              background: 'rgba(7,10,14,.78)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Container>
              <div style={{ display: 'grid', gap: 8, padding: '14px 0 18px' }}>
                {items.map((item) => {
                  const isActive = activeId === item.id
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
                        border: '1px solid rgba(255,255,255,.10)',
                        background: isActive ? 'rgba(124,92,255,.12)' : 'rgba(255,255,255,.04)',
                        color: 'rgba(255,255,255,.92)',
                        fontWeight: 700,
                        cursor: 'pointer',
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


