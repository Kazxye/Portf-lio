import Link from 'next/link'
import { projects } from '@/content/projects'

export function WorkTopology() {
  return (
    <figure className="observatory">
      <div className="map-meta mono-small">
        <span>SYSTEM MAP</span>
        <span>01 — 03</span>
      </div>
      <div className="map-canvas">
        <svg viewBox="0 0 540 270" className="map-wiring" aria-hidden="true">
          <defs>
            <pattern
              id="map-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.7" fill="#343940" />
            </pattern>
          </defs>
          <rect width="540" height="270" fill="url(#map-grid)" opacity=".45" />
          <circle cx="90" cy="136" r="76" />
          <circle cx="90" cy="136" r="49" />
          <path d="M90 44V60M90 212V228M0 136H14M166 136H182" />
          <path
            className="map-route"
            d="M90 136H192V52H288M192 136H288M192 136V220H288"
          />
          <circle className="map-junction" cx="192" cy="136" r="3" />
          <rect
            x="70"
            y="116"
            width="40"
            height="40"
            rx="3"
            className="map-core"
          />
          <text x="90" y="142" textAnchor="middle" className="map-core-label">
            K/
          </text>
        </svg>
        <ol className="map-projects">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <span className="map-port" />
                <span>
                  <span className="map-name">{project.name}</span>
                  <span className="map-domain">{project.domain}</span>
                </span>
                <span className="map-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mono-small">
        <span className="signal-dot" /> Connected by a security mindset
      </figcaption>
    </figure>
  )
}
