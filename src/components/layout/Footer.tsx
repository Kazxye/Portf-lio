import { useTranslation } from 'react-i18next'
import { navLinks, profileImage } from '../../data/content'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { ArrowUpRight } from '../ui/Icon'

/**
 * Footer — closing CTA centered on a portrait + name, plus nav links,
 * social links, and a copyright line.
 */
export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden px-5 pb-10 pt-16 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-64 max-w-2xl bg-ember-glow blur-2xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Avatar */}
        <div className="mx-auto h-16 w-16 overflow-hidden rounded-2xl border border-white/10">
          <img
            src={profileImage}
            alt={t('footer.name')}
            width={64}
            height={64}
            className="h-full w-full object-cover object-top"
          />
        </div>

        <h2 className="mt-6 font-serif text-4xl italic text-white sm:text-5xl">
          {t('footer.name')}
        </h2>
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-ember-300">
          {t('footer.role')}
        </p>
        <p className="mt-3 text-sm text-sand/60">{t('footer.tagline')}</p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button href="#contact" variant="primary">
            {t('footer.primary')}
            <ArrowUpRight width={16} height={16} />
          </Button>
          <Button href="#work" variant="ghost">
            {t('footer.secondary')}
          </Button>
        </div>

        {/* Link rows */}
        <nav
          aria-label="Footer"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/5 pt-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-sand/60 transition-colors hover:text-white"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        <SocialLinks className="mt-6 justify-center" />

        <p className="mt-8 text-xs text-sand/40">
          © {year} {t('footer.name')}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
