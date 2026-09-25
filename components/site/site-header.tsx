import Link from 'next/link'
import { sections } from '@/content/navigation'
import { profile } from '@/content/profile'
import { ExternalLink } from '@/components/ui/external-link'
import { CommandMenu } from './command-menu'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          className="monogram"
          aria-label={`${profile.name}, home`}
        >
          Kazys<span className="text-accent">/</span>
        </Link>

        <div className="flex items-center gap-7">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 md:flex"
          >
            <ul className="flex items-center gap-6 text-[0.8125rem]">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link href={`/#${section.id}`} className="nav-link">
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-line lg:block"
            />
            <ul className="hidden items-center gap-5 lg:flex [&_.text-link]:text-[0.8125rem]">
              <li>
                <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
              </li>
              <li>
                <ExternalLink href={profile.links.linkedin}>
                  LinkedIn
                </ExternalLink>
              </li>
            </ul>
          </nav>
          <CommandMenu />
        </div>
      </div>
      <div aria-hidden="true" className="scroll-progress" />
    </header>
  )
}
