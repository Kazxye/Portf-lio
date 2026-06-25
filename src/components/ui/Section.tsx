import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
  /** Constrains inner width; defaults to the standard content column. */
  inner?: string
}

/**
 * Vertical-rhythm wrapper. Centers content and applies consistent
 * horizontal padding + section spacing used throughout the page, plus a
 * fade-and-rise reveal the first time the section scrolls into view.
 */
export default function Section({
  id,
  className = '',
  children,
  inner = 'max-w-6xl',
}: SectionProps) {
  const { ref, visible } = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id={id}
      className={`reveal ${visible ? 'is-visible' : ''} px-5 py-16 sm:px-6 sm:py-20 lg:py-28 ${className}`}
    >
      <div className={`mx-auto w-full ${inner}`}>{children}</div>
    </section>
  )
}
