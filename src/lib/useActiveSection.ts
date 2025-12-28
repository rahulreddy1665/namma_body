import { useEffect, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number | number[]
}

export function useActiveSection(ids: string[], options: Options = {}) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Get all currently intersecting sections
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            id: (e.target as HTMLElement).id,
            ratio: e.intersectionRatio,
            top: e.boundingClientRect.top,
          }))

        if (intersecting.length === 0) {
          // If nothing is intersecting, find the section closest to the top
          const headerHeight = 100
          let closest: { id: string; distance: number } | null = null

          for (const el of elements) {
            const rect = el.getBoundingClientRect()
            const distance = Math.abs(rect.top - headerHeight)
            if (!closest || distance < closest.distance) {
              closest = { id: el.id, distance }
            }
          }

          if (closest) {
            setActive(closest.id)
          }
          return
        }

        // Sort by intersection ratio (most visible first), then by position
        intersecting.sort((a, b) => {
          if (Math.abs(a.ratio - b.ratio) > 0.1) {
            return b.ratio - a.ratio
          }
          return a.top - b.top
        })

        setActive(intersecting[0].id)
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? '-25% 0px -60% 0px',
        threshold: options.threshold ?? [0.1, 0.2, 0.35, 0.5],
      },
    )

    for (const el of elements) observer.observe(el)

    // Force an update after scroll ends (for programmatic scrolls)
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null
    const handleScrollEnd = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Trigger observer check by checking all elements
        for (const el of elements) {
          const rect = el.getBoundingClientRect()
          const headerHeight = 100
          if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
            setActive(el.id)
            break
          }
        }
      }, 150)
    }

    window.addEventListener('scroll', handleScrollEnd, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollEnd)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [ids, options.rootMargin, options.threshold])

  return active
}


