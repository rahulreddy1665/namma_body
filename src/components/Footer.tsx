import Container from './Container'

export default function Footer() {
  return (
    <footer style={{ padding: '34px 0 44px' }}>
      <div className="divider" />
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            paddingTop: 18,
          }}
        >
          <div style={{ display: 'grid', gap: 4 }}>
            <strong style={{ letterSpacing: '-0.02em' }}>Namma Body</strong>
            <span className="muted" style={{ fontSize: 14 }}>
              Built for discipline. Designed for results.
            </span>
          </div>

          <div className="muted" style={{ fontSize: 14 }}>
            © {new Date().getFullYear()} Namma Body. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  )
}


