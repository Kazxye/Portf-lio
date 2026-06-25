import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-ember-500 text-white hover:bg-ember-400 shadow-[0_8px_30px_-12px_rgba(242,88,29,0.8)]',
  ghost: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
  outline:
    'border border-white/15 text-sand hover:border-white/30 hover:text-white',
}

/**
 * Anchor-based button so it works for in-page links and external CTAs.
 * Pass `variant` to switch visual style.
 */
export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
