import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/**
 * Shared section header — small eyebrow label above a display title.
 */
export default function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <header
      className={`flex flex-col gap-3 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
        {title}
      </h2>
    </header>
  )
}
