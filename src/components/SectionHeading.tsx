import Container from './Container'

type Props = {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: Props) {
  const titleId = `${eyebrow.toLowerCase().replace(/\s+/g, '-')}-title`
  return (
    <Container>
      <div style={{ display: 'grid', gap: 12, marginBottom: 22 }}>
        <div className="pill" aria-hidden="true">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background:
                'linear-gradient(135deg, rgba(124,92,255,.95), rgba(34,230,168,.92))',
              boxShadow: '0 0 0 4px rgba(124,92,255,.12)',
            }}
          />
          <span style={{ fontWeight: 650 }}>{eyebrow}</span>
        </div>

        <h2 className="h2" id={titleId}>
          {title}
        </h2>
        {description ? <p className="lead">{description}</p> : null}
      </div>
    </Container>
  )
}


