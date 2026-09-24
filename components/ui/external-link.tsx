import type { ReactNode } from 'react'

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

export function ArrowUpRight() {
  return (
    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

export function ExternalLink({ href, children, className = 'text-link' }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
