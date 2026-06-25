import { useTranslation } from 'react-i18next'
import type { MetaItem } from '../../data/content'
import Section from '../ui/Section'

/**
 * About — a single bold statement with supporting meta rows beneath.
 */
export default function About() {
  const { t } = useTranslation()
  const meta = t('about.meta', { returnObjects: true }) as MetaItem[]

  return (
    <Section id="about" inner="max-w-4xl">
      <span className="eyebrow">{t('about.eyebrow')}</span>
      <p className="mt-6 font-display text-2xl font-medium leading-snug text-white text-balance sm:text-3xl">
        {t('about.statement')}
      </p>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-3">
        {meta.map((item) => (
          <div key={item.label} className="bg-ink-900 p-5">
            <dt className="text-xs uppercase tracking-widest text-sand/50">
              {item.label}
            </dt>
            <dd className="mt-2 text-lg font-medium text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
