import { useTranslation } from 'react-i18next'
import type { Certificate, EducationTrack } from '../../data/content'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import { Spark, Check } from '../ui/Icon'

/**
 * Education & Learning — replaces the original pricing section. A featured
 * degree card sits above a grid of self-directed learning tracks. Content is
 * framed honestly: formal study plus active, ongoing areas of focus.
 */
export default function Education() {
  const { t } = useTranslation()
  const certs = t('education.certs', { returnObjects: true }) as Certificate[]
  const tracks = t('education.tracks', { returnObjects: true }) as EducationTrack[]

  return (
    <Section id="education" inner="max-w-3xl">
      <SectionHeading eyebrow={t('education.eyebrow')} title={t('education.title')} />

      {/* Degree card */}
      <article className="surface mt-8 overflow-hidden">
        <div className="relative bg-gradient-to-br from-ember-600/30 via-ink-850 to-ink-900 p-7 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-widest text-ember-200">
              {t('education.degree.badge')}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-sand/70">
              {t('education.degree.period')}
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            {t('education.degree.program')}
          </h3>
          <p className="mt-1 text-sm font-medium text-ember-300">
            {t('education.degree.school')}
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-sand/70">
            {t('education.degree.description')}
          </p>
        </div>
      </article>

      {/* Certifications */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-sand/70">
          {t('education.certsTitle')}
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {certs.map((cert) => (
            <article
              key={`${cert.name}-${cert.issuer}`}
              className="surface flex items-center gap-3 p-5 transition-colors hover:border-white/15"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ember-500/15 text-ember-400">
                <Check width={18} height={18} />
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">{cert.name}</h4>
                <p className="mt-0.5 text-sm text-sand/55">{cert.issuer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Currently exploring */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ember-500/15 text-ember-400">
            <Spark width={16} height={16} />
          </span>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-sand/70">
            {t('education.tracksTitle')}
          </h3>
        </div>
        <p className="mt-2 text-sm text-sand/55">{t('education.tracksNote')}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => (
            <article
              key={track.name}
              className="surface flex items-start gap-3 p-5 transition-colors hover:border-white/15"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember-500/15 text-ember-400">
                <Check width={13} height={13} />
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">{track.name}</h4>
                <p className="mt-1 text-sm text-sand/60">{track.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
