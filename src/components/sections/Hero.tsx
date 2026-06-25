import { useTranslation } from 'react-i18next'
import { profileImage, cvUrl } from '../../data/content'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { ArrowUpRight } from '../ui/Icon'

/**
 * Hero — centered portrait framed by an ember glow, with the name set in a
 * large serif display face, the role/subtitle, primary CTAs, and social links.
 */
export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pt-32 lg:pb-24"
    >
      {/* Ambient flame glow behind the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-3xl bg-ember-glow blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-ember-500/20 blur-[100px]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Availability pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-sand/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t('hero.available')}
        </div>

        {/* Portrait */}
        <div className="relative mb-8">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-full bg-ember-500/30 blur-3xl"
          />
          <div className="relative h-44 w-40 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-ember-500/30 to-ink-900 shadow-2xl sm:h-52 sm:w-48">
            <img
              src={profileImage}
              alt={t('hero.portraitAlt')}
              width={192}
              height={208}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Role + name */}
        <p className="font-display text-sm uppercase tracking-[0.3em] text-ember-300">
          {t('hero.role')}
        </p>
        <h1 className="mt-3 font-serif text-6xl italic leading-none text-white sm:text-7xl">
          {t('hero.name')}
        </h1>
        <p className="mt-6 max-w-xl text-balance text-base text-sand/70">
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="#work" variant="primary">
            {t('hero.primaryCta')}
            <ArrowUpRight width={16} height={16} />
          </Button>
          <Button href="#contact" variant="outline">
            {t('hero.secondaryCta')}
          </Button>
          <Button href={cvUrl} variant="ghost" download>
            {t('hero.downloadCv')}
          </Button>
        </div>

        {/* Social links */}
        <SocialLinks className="mt-8 justify-center" />
      </div>
    </section>
  )
}
