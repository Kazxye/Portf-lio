import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { socials } from '../../data/content'
import { socialIcons, Check } from './Icon'

type SocialLinksProps = {
  className?: string
  /** 'icon' = round icon buttons; 'pill' = labelled pills. */
  variant?: 'icon' | 'pill'
}

/**
 * Renders the configured social/contact links. Link entries open in a new tab
 * (mailto stays in-page); a `copy` entry (Discord) copies its value to the
 * clipboard and shows transient "Copied!" feedback instead.
 */
export default function SocialLinks({
  className = '',
  variant = 'icon',
}: SocialLinksProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState<string | null>(null)

  const isIcon = variant === 'icon'
  const itemClass = isIcon
    ? 'grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-sand/70 transition-colors hover:border-ember-500/50 hover:bg-ember-500/10 hover:text-white'
    : 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-sand/80 transition-colors hover:border-ember-500/50 hover:text-white'

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail silently.
    }
  }

  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socials.map((social) => {
        const Icon = socialIcons[social.icon]
        const label = t(`contact.socials.${social.key}`)
        const isCopied = copied === social.key

        // Copy-to-clipboard entry (Discord)
        if (social.copy) {
          return (
            <li key={social.key}>
              <button
                type="button"
                onClick={() => handleCopy(social.key, social.copy!)}
                aria-label={`${label}: ${isCopied ? t('contact.copied') : `${t('contact.copy')} ${social.copy}`}`}
                title={social.copy}
                className={itemClass}
              >
                {isCopied ? <Check /> : Icon && <Icon />}
                {!isIcon && <span>{isCopied ? t('contact.copied') : label}</span>}
              </button>
            </li>
          )
        }

        // Standard link entry
        const isMail = social.href!.startsWith('mailto:')
        return (
          <li key={social.key}>
            <a
              href={social.href}
              aria-label={label}
              {...(!isMail && { target: '_blank', rel: 'noreferrer noopener' })}
              className={itemClass}
            >
              {Icon && <Icon />}
              {!isIcon && <span>{label}</span>}
            </a>
          </li>
        )
      })}
      {/* Announce copy result to assistive tech */}
      <li className="sr-only" aria-live="polite">
        {copied ? t('contact.copied') : ''}
      </li>
    </ul>
  )
}
