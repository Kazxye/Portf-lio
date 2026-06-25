import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll: returns a ref and a `visible` flag that flips to true the
 * first time the element scrolls into view (then stops observing). Falls back
 * to immediately-visible when IntersectionObserver is unavailable or the user
 * prefers reduced motion — the actual transition lives in CSS (`.reveal`).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
