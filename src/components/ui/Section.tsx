import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
  /** Constrains inner width; defaults to the standard content column. */
  inner?: string
}

/**
 * Vertical-rhythm wrapper. Centers content and applies consistent
 * horizontal padding + section spacing used throughout the page.
 */
export default function Section({
  id,
  className = '',
  children,
  inner = 'max-w-6xl',
}: SectionProps) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-6 sm:py-20 lg:py-28 ${className}`}>
      <div className={`mx-auto w-full ${inner}`}>{children}</div>
    </section>
  )
}
