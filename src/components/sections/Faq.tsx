import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { FaqItem } from '../../data/content'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import { Plus } from '../ui/Icon'

/**
 * FAQ — an accessible single-open accordion covering technologies, security
 * interests, collaboration, and open source.
 */
export default function Faq() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as FaqItem[]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" inner="max-w-3xl">
      <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />

      <div className="mt-10 flex flex-col gap-3">
        {items.map((item, i) => {
          const isOpen = open === i
          const panelId = `faq-panel-${i}`
          const buttonId = `faq-button-${i}`
          return (
            <div key={item.question} className="surface overflow-hidden">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-medium text-white">
                    {item.question}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-sand/70 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-ember-500 text-white' : ''
                    }`}
                  >
                    <Plus width={16} height={16} />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-5 pb-5 text-sm leading-relaxed text-sand/60"
              >
                {item.answer}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
