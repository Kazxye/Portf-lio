import { useTranslation } from 'react-i18next'

type SignatureProps = {
  /** Tailwind text-size (and any extra) classes for the name. */
  className?: string
}

/**
 * The name rendered as a signature: a script typeface that writes itself in
 * left-to-right, with an ember flourish stroke that draws underneath. Both
 * animations run once on mount and are disabled under prefers-reduced-motion
 * (handled in index.css).
 */
export default function Signature({ className = 'text-[26px]' }: SignatureProps) {
  const { t } = useTranslation()

  return (
    <span className="relative inline-block leading-none">
      <span className={`sig-name block font-signature text-white ${className}`}>
        {t('hero.name')}
      </span>
      <svg
        className="sig-flourish pointer-events-none absolute -bottom-1.5 left-0 w-full text-ember-500"
        viewBox="0 0 200 18"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 12C42 18 78 4 116 8s64 9 80 1"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
