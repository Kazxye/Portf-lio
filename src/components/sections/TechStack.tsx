import { useTranslation } from 'react-i18next'
import type { TechCategory } from '../../data/content'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

/**
 * Tech Stack — technologies grouped by category. Each card holds a category
 * label and a wrap of chips for the tools in that group.
 */
export default function TechStack() {
  const { t } = useTranslation()
  const categories = t('tech.categories', { returnObjects: true }) as TechCategory[]

  return (
    <Section inner="max-w-4xl">
      <SectionHeading eyebrow={t('tech.eyebrow')} title={t('tech.title')} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category.name}
            className="surface p-6 transition-colors hover:border-white/15"
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ember-300">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember-500" />
              {category.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-sand/80 transition-colors hover:border-ember-500/40 hover:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
