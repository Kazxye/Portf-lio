import { useTranslation } from 'react-i18next'
import type { StatItem } from '../../data/content'
import Section from '../ui/Section'

/**
 * Metric cards sitting directly under the hero — technical, honest numbers.
 */
export default function Stats() {
  const { t } = useTranslation()
  const items = t('stats.items', { returnObjects: true }) as StatItem[]

  return (
    <Section className="!pt-0" inner="max-w-4xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((stat) => (
          <article
            key={stat.label}
            className="surface flex flex-col gap-2 bg-card-sheen p-6 sm:p-7"
          >
            <span className="font-display text-4xl font-bold text-white sm:text-5xl">
              {stat.value}
            </span>
            <p className="text-sm leading-relaxed text-sand/60">{stat.label}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
