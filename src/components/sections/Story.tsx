import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import { approachGallery } from '../../data/content'

/**
 * Approach — centered statement on engineering/security philosophy followed by
 * a horizontally scrollable image strip for visual rhythm.
 */
export default function Story() {
  const { t } = useTranslation()
  const alts = t('approach.gallery', { returnObjects: true }) as string[]

  return (
    <Section inner="max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">{t('approach.eyebrow')}</span>
        <h2 className="mt-5 font-display text-2xl font-semibold leading-snug text-white text-balance sm:text-3xl">
          {t('approach.heading')}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-sand/60">
          {t('approach.body')}
        </p>
      </div>

      <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
        {approachGallery.map((src, i) => (
          <figure
            key={i}
            className="relative aspect-[3/4] w-44 shrink-0 snap-center overflow-hidden rounded-2xl border border-white/5 sm:w-56"
          >
            <img
              src={src}
              alt={alts[i] ?? ''}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {/* Unifying tint — keeps the brighter shots in step with the dark theme. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent"
            />
          </figure>
        ))}
      </div>
    </Section>
  )
}
