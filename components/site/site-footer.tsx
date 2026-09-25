import Link from 'next/link'
import { profile } from '@/content/profile'
import { ExternalLink } from '@/components/ui/external-link'

export function SiteFooter() {
  return (
    <footer id="contact" tabIndex={-1} className="site-footer">
      <div className="container-page">
        <div className="contact-grid">
          <div>
            <p className="eyebrow">04 / Contact</p>
            <h2>
              Good systems start
              <br />
              with a conversation<span className="text-accent">.</span>
            </h2>
            <p>
              Security, backend engineering, or an interesting technical
              problem.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-links">
            <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={profile.links.resume}>
              Resume <span className="mono-small">PDF</span>
            </ExternalLink>
            <ExternalLink href={profile.links.whatsapp}>WhatsApp</ExternalLink>
            <span className="discord-label">
              Discord <span className="mono-small">{profile.discord}</span>
            </span>
          </div>
        </div>
        <div className="footer-baseline">
          <Link href="/" className="footer-wordmark">
            Kazys<span className="text-accent">/</span>
          </Link>
          <span className="mono-small">São Paulo, Brazil</span>
          <span className="mono-small">
            © {new Date().getFullYear()} Kazys Tatarunas
          </span>
          <a href="#main" className="mono-small">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
