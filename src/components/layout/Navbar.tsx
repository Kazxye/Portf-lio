import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { navLinks } from '../../data/content'
import Button from '../ui/Button'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { Menu, Close, Spark } from '../ui/Icon'

/**
 * Sticky top navigation. Collapses into a slide-down menu on mobile and
 * exposes the language switcher on every breakpoint.
 */
export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 px-3 py-2 transition-colors duration-300 ${
          scrolled ? 'bg-ink-900/90 backdrop-blur-md' : 'bg-ink-900/60 backdrop-blur'
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full pl-2 pr-1 text-sm font-semibold text-white"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ember-500 text-white">
            <Spark width={16} height={16} />
          </span>
          <span className="font-display">{t('hero.name')}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-sand/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {t(`nav.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button href="#contact" className="hidden sm:inline-flex">
            {t('nav.bookCall')}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-5xl rounded-3xl border border-white/10 bg-ink-900/95 p-4 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base text-sand/90 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 w-full"
          >
            {t('nav.bookCall')}
          </Button>
        </div>
      )}
    </header>
  )
}
