import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { navLinks } from '../../data/content'
import Button from '../ui/Button'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { Menu, Close } from '../ui/Icon'
import Signature from '../ui/Signature'

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
        className={`relative mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/10 px-3 py-2 transition-colors duration-300 ${
          scrolled ? 'bg-ink-900/90 backdrop-blur-md' : 'bg-ink-900/60 backdrop-blur'
        }`}
      >
        {/* Brand: signature */}
        <a
          href="#top"
          aria-label={t('hero.name')}
          className="rounded-xl px-1.5 pb-1.5 pt-1"
        >
          <Signature className="text-[28px]" />
        </a>

        {/* Center: availability pill */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-sand/80 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t('nav.availability')}
        </div>

        {/* Right: location + language + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right leading-tight md:block">
            <span className="block text-xs font-medium text-white">
              {t('nav.locationCity')}
            </span>
            <span className="block text-[11px] text-sand/50">
              {t('nav.locationCountry')}
            </span>
          </div>

          <span className="hidden h-7 w-px bg-white/10 md:block" />

          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-5xl rounded-3xl border border-white/10 bg-ink-900/95 p-4 backdrop-blur-md lg:hidden"
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
