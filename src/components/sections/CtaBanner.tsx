import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import Button from '../ui/Button'
import { ArrowUpRight } from '../ui/Icon'

/**
 * CTA banner — a full-width ember panel inviting collaboration on security and
 * backend work. Sits between content sections as a visual breather.
 */
export default function CtaBanner() {
  const { t } = useTranslation()

  return (
    <Section inner="max-w-4xl">
      <div className="relative overflow-hidden rounded-4xl border border-ember-500/20 bg-gradient-to-br from-ember-600/30 via-ink-850 to-ink-900 px-6 py-12 text-center sm:px-10 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-ember-500/30 blur-3xl"
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold text-white text-balance sm:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-sand/70">
            {t('cta.body')}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button href="#contact" variant="primary">
              {t('cta.primary')}
              <ArrowUpRight width={16} height={16} />
            </Button>
            <Button href="#work" variant="outline">
              {t('cta.secondary')}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
