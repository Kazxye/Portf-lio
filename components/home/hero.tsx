import { profile } from '@/content/profile'
import { ExternalLink } from '@/components/ui/external-link'
import { WorkTopology } from '@/components/system/work-topology'

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero container-page"
      id="top"
    >
      <div className="hero-eyebrow enter">
        <p className="eyebrow">
          <span className="signal-dot" />
          Security / Software engineering
        </p>
        <span className="eyebrow hero-edition">
          Independent work & explorations
        </span>
      </div>
      <h1 id="hero-title" className="hero-title enter">
        Kazys Tatarunas<span className="title-period">.</span>
      </h1>
      <div className="hero-grid">
        <div className="hero-copy enter">
          <p className="hero-role">
            Security-minded
            <br />
            software engineer.
          </p>
          <p className="hero-description">{profile.summary}</p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              View selected work <span aria-hidden="true">↘</span>
            </a>
            <a
              href={profile.links.resume}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <span className="mono-small">PDF ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="hero-socials">
            <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
          </div>
        </div>
        <div className="hero-map enter">
          <WorkTopology />
        </div>
      </div>
      <div className="hero-baseline">
        <p>
          <span className="mono-small">LOC</span> São Paulo, Brazil{' '}
          <span aria-hidden="true" className="baseline-divider">
            /
          </span>{' '}
          <span className="mono-small">EDU</span> Software Engineering @ FIAP
        </p>
        <a href="#work" className="mono-small browse-link">
          Explore the systems <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
