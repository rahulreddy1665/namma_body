import Container from './Container'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer
      style={{
        padding: '60px 0 44px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="divider" />
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            paddingTop: 40,
          }}
        >
         

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              gap: 16,
              flexWrap: 'wrap',
              marginTop: 20
            }}
          >
            <div style={{ display: 'grid', gap: 4 }}>

              <strong style={{ letterSpacing: '-0.02em' }}>Namma Body</strong>
              <span className="muted" style={{ fontSize: 14 }}>
                Built for discipline. Designed for results.
              </span>
              
            </div>

          <div>
          <div className="muted" style={{ fontSize: 14 }}>
              © {new Date().getFullYear()} Namma Body. All rights reserved.
            </div>
             {/* Social Icons */}
          <div style={{ display: 'flex', gap: 24,marginTop: 10 }}>
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -4, opacity: 1 }}
                initial={{ opacity: 0.6 }}
                style={{ 
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <social.icon size={22} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
          </div>
            
          </div>
        </div>
      </Container>
    </footer>
  )
}


