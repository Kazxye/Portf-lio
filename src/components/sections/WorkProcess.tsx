import { useTranslation } from 'react-i18next'
import type { ProcessItem } from '../../data/content'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import { Search, PenLine, Code, Shield } from '../ui/Icon'

/** One icon per step, in workflow order: research, design, build, harden. */
const stepIcons = [Search, PenLine, Code, Shield]

/**
 * Work Process — the security/engineering workflow as four stacked step cards,
 * each with an index, an icon badge, a title, and a short description.
 */
export default function WorkProcess() {
  const { t } = useTranslation()
  const steps = t('process.items', { returnObjects: true }) as ProcessItem[]

  return (
    <Section id="process" inner="max-w-3xl">
      <SectionHeading eyebrow={t('process.eyebrow')} title={t('process.title')} />

      <ol className="mt-10 flex flex-col gap-4">
        {steps.map((step, i) => {
          const Icon = stepIcons[i] ?? stepIcons[0]
          return (
            <li
              key={step.index}
              className="surface flex items-center gap-5 p-5 transition-colors hover:border-white/15 sm:p-6"
            >
              <span className="font-display text-2xl font-bold text-sand/30">
                {step.index}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-sand/60">{step.description}</p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ember-500/15 text-ember-400">
                <Icon width={22} height={22} />
              </span>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
