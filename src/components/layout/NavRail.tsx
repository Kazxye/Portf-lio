import { useEffect, useState, type SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Home,
  Briefcase,
  Layers,
  Workflow,
  Compass,
  HelpCircle,
  Mail,
} from '../ui/Icon'

type IconComp = (props: SVGProps<SVGSVGElement>) => JSX.Element

/** Vertical, icon-only section navigation anchored to the right edge (desktop). */
const items: { key: string; href: string; Icon: IconComp }[] = [
  { key: 'home', href: '#top', Icon: Home },
  { key: 'projects', href: '#work', Icon: Briefcase },
  { key: 'expertise', href: '#services', Icon: Layers },
  { key: 'process', href: '#process', Icon: Workflow },
  { key: 'education', href: '#education', Icon: Compass },
  { key: 'faq', href: '#faq', Icon: HelpCircle },
  { key: 'contact', href: '#contact', Icon: Mail },
]

export default function NavRail() {
  const { t } = useTranslation()
  const [active, setActive] = useState('top')

  // Scroll-spy: highlight the section currently around the viewport's middle.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    items.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-1 rounded-full border border-white/10 bg-ink-900/70 p-1.5 backdrop-blur-md">
        {items.map(({ key, href, Icon }) => {
          const label = t(`nav.${key}`)
          const isActive = active === href.slice(1)
          return (
            <li key={key} className="group relative">
              <a
                href={href}
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
                className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-ember-500 text-white'
                    : 'text-sand/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon width={18} height={18} />
              </a>
              {/* Tooltip — appears to the left on hover */}
              <span
                role="tooltip"
                className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
              >
                {label}
              </span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
