import { useTranslation } from 'react-i18next'
import type { ExpertiseItem } from '../../data/content'
import Section from '../ui/Section'
import { ArrowUpRight, Spark } from '../ui/Icon'

/**
 * Expertise — a single dark card listing core security/engineering areas as
 * large rows, each with a short descriptor.
 */
export default function Services() {
  const { t } = useTranslation()
  const items = t('expertise.items', { returnObjects: true }) as ExpertiseItem[]

  return (
    <Section id="services" inner="max-w-4xl">
      <div className="surface overflow-hidden p-2">
        <div className="flex items-center gap-2 px-5 pt-5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ember-500/15 text-ember-400">
            <Spark width={16} height={16} />
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-sand/60">
            {t('expertise.eyebrow')}
          </span>
        </div>

        <ul className="mt-2 divide-y divide-white/5">
          {items.map((item) => (
            <li key={item.name}>
              <a
                href="#contact"
                className="group flex items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-display text-sm text-sand/40">
                    {item.tag}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-semibold text-white sm:text-2xl">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-sand/55">
                      {item.description}
                    </span>
                  </span>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-sand/70 transition-all group-hover:translate-x-0.5 group-hover:border-ember-500 group-hover:text-ember-400">
                  <ArrowUpRight width={18} height={18} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
