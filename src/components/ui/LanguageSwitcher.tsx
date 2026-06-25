import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type Language } from '../../i18n'

/**
 * Compact EN / PT segmented toggle. Persists via the i18n languageChanged
 * handler (see src/i18n/index.ts).
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = (i18n.language?.startsWith('pt') ? 'pt' : 'en') as Language

  return (
    <div
      role="group"
      aria-label={t('lang.switch')}
      className={`inline-flex items-center rounded-full border border-white/10 bg-ink-850 p-0.5 ${className}`}
    >
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          aria-pressed={current === lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            current === lng
              ? 'bg-ember-500 text-white'
              : 'text-sand/60 hover:text-white'
          }`}
        >
          {t(`lang.${lng}`)}
        </button>
      ))}
    </div>
  )
}
