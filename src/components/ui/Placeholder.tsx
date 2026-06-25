import type { ReactNode } from 'react'

type PlaceholderProps = {
  label?: string
  className?: string
  rounded?: string
  children?: ReactNode
  /** Adds the ember-tinted gradient used for feature imagery. */
  ember?: boolean
}

/**
 * Generic image placeholder. Replace these with real <img> elements
 * (with proper alt text) when wiring up real content.
 */
export default function Placeholder({
  label = 'Image',
  className = '',
  rounded = 'rounded-2xl',
  children,
  ember = false,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`relative flex items-center justify-center overflow-hidden border border-white/5 ${rounded} ${
        ember
          ? 'bg-gradient-to-br from-ember-600/40 via-ink-800 to-ink-900'
          : 'bg-gradient-to-br from-ink-700 to-ink-850'
      } ${className}`}
    >
      {/* faint grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {children ?? (
        <span className="relative z-10 text-xs font-medium uppercase tracking-widest text-white/40">
          {label}
        </span>
      )}
    </div>
  )
}
