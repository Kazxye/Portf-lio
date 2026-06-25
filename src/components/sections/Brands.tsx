import { useTranslation } from 'react-i18next'
import type { TechCategory } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'

/**
 * Tools marquee — an infinitely scrolling row of technologies, flattened from
 * the tech-stack categories so it stays in sync with no duplicated data.
 * The list is doubled so the CSS translate loop appears seamless.
 */
export default function Brands() {
  const { t } = useTranslation()
  const categories = t('tech.categories', { returnObjects: true }) as TechCategory[]
  const tools = Array.from(new Set(categories.flatMap((c) => c.items)))
  const row = [...tools, ...tools]
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      aria-label={t('tools.label')}
      className={`reveal ${visible ? 'is-visible' : ''} px-5 py-10 sm:px-6`}
    >
      <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-sand/40">
        {t('tools.label')}
      </p>
      <div
        className="relative mx-auto max-w-6xl overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <ul className="flex w-max animate-marquee items-center gap-12">
          {row.map((tool, i) => (
            <li
              key={`${tool}-${i}`}
              className="flex items-center gap-2 text-lg font-semibold text-sand/40 transition-colors hover:text-white"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-ember-500/60" />
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
