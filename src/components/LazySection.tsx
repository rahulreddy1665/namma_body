import type { ComponentType } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

type LoadResult = { default: ComponentType }

type Props = {
  id: string
  title: string
  minHeight: number
  load: () => Promise<LoadResult>
}

function Skeleton({ title }: { title: string }) {
  return (
    <div className="container" aria-label={`${title} loading`} role="status">
      <div
        className="card"
        style={{
          padding: 22,
          borderRadius: 18,
          background:
            'linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.03))',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ height: 14, width: 160, borderRadius: 999, background: 'rgba(255,255,255,.08)' }} />
        <div style={{ height: 22, width: '70%', marginTop: 16, borderRadius: 10, background: 'rgba(255,255,255,.08)' }} />
        <div style={{ height: 12, width: '90%', marginTop: 12, borderRadius: 10, background: 'rgba(255,255,255,.06)' }} />
        <div style={{ height: 12, width: '84%', marginTop: 10, borderRadius: 10, background: 'rgba(255,255,255,.06)' }} />
      </div>
    </div>
  )
}

export default function LazySection({ id, title, minHeight, load }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [Loaded, setLoaded] = useState<ComponentType | null>(null)

  const stableLoad = useMemo(() => load, [load])

  useEffect(() => {
    if (Loaded) return
    const el = sectionRef.current
    if (!el) return

    let cancelled = false
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        observer.disconnect()
        stableLoad()
          .then((mod) => {
            if (cancelled) return
            setLoaded(() => mod.default)
          })
          .catch(() => {
            // If a section fails to load, keep the skeleton to avoid blank pages.
          })
      },
      { root: null, rootMargin: '600px 0px', threshold: 0.01 },
    )
    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [Loaded, stableLoad])

  return (
    <section
      id={id}
      ref={(node) => {
        sectionRef.current = node
      }}
      className="section"
      style={{ minHeight: Loaded ? undefined : minHeight }}
      aria-label={title}
    >
      {Loaded ? <Loaded /> : <Skeleton title={title} />}
    </section>
  )
}


