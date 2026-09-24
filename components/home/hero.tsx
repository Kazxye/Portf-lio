import { profile } from '@/content/profile'
import { ExternalLink } from '@/components/ui/external-link'
import { WorkTopology } from '@/components/system/work-topology'

const facts: { label: string; value: string; detail?: string }[] = [
  { label: 'LOC', value: profile.location },
  {
    label: 'EDU',
    value: `${profile.education.program}, ${profile.education.school}`,
    // Kept as one unit so the range never breaks across lines.
    detail: `${profile.education.start} → ${profile.education.end}`,
  },
  { label: 'FOCUS', value: profile.focus },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page pb-24 pt-16 md:pt-24 lg:pb-32 lg:pt-28">
      <h1
        id="hero-title"
        className="enter text-[clamp(3.25rem,10.5vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.05em] [--i:0]"
      >
        {profile.name}
      </h1>

      <div className="mt-12 grid gap-16 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="enter text-balance text-[1.625rem] leading-[1.15] tracking-[-0.025em] text-fg md:text-[2rem] [--i:1]">
            {profile.role}.
          </p>
          <p className="enter mt-5 max-w-[42ch] text-[1.0625rem] leading-relaxed text-fg-2 [--i:2]">{profile.summary}</p>

          <div className="enter mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 [--i:3]">
            <a href="#work" className="btn">
              View selected work
            </a>
            <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
            <a href={profile.links.resume} className="text-link" target="_blank" rel="noopener noreferrer">
              Resume
              <span className="font-mono text-[0.625rem] text-fg-3">PDF</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <dl className="enter mt-14 grid gap-2.5 border-t border-line pt-6 [--i:4]">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4">
                <dt className="font-mono text-[0.6875rem] tracking-[0.04em] text-fg-3">{fact.label}</dt>
                <dd className="text-[0.875rem] text-fg-2">
                  {fact.value}
                  {fact.detail && (
                    <span className="ml-2 whitespace-nowrap font-mono text-[0.75rem] text-fg-3">{fact.detail}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="enter hidden md:block md:max-w-xl lg:col-span-6 lg:col-start-7 lg:max-w-none lg:pt-2 [--i:3]">
          <WorkTopology />
        </div>
      </div>
    </section>
  )
}
