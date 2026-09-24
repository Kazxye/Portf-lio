import { projects } from '@/content/projects'

// Schematic of the selected work. Each branch leaves the core from its own port
// so no two edges overlap; routes are orthogonal to read as a wiring diagram,
// not a constellation. Coordinates are in the 560x400 viewBox.
const CORE = { x: 96, y: 200, size: 20 }

const layout: Record<string, { node: [number, number]; path: string }> = {
  vaultkeeper: { node: [300, 72], path: 'M96 190 V72 H293' },
  phishguard: { node: [344, 160], path: 'M106 194 H200 V160 H337' },
  'kazz-injector': { node: [320, 256], path: 'M106 206 H200 V256 H313' },
  'network-radar': { node: [272, 344], path: 'M96 210 V344 H265' },
}

// The packet follows the PhishGuard branch: data moving toward analysis.
const PACKET_PATH = layout.phishguard.path

export function WorkTopology() {
  const branches = projects.filter((project) => layout[project.slug])

  return (
    <figure className="topology">
      <div className="relative border border-line">
        <svg viewBox="0 0 560 400" className="block h-auto w-full" role="group" aria-label="Map of selected projects">
          <defs>
            <pattern id="topology-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="rgb(255 255 255 / 0.035)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="560" height="400" fill="url(#topology-grid)" aria-hidden="true" pointerEvents="none" />

          {branches.map((project, index) => {
            const { node, path } = layout[project.slug]
            const [x, y] = node
            return (
              <a
                key={project.slug}
                href={`/#${project.slug}`}
                className="branch"
                aria-label={`${project.name}, ${project.domain}`}
                style={{ ['--i' as string]: index }}
              >
                {/* Wide transparent stroke widens the hover target along the edge. */}
                <path d={path} fill="none" stroke="transparent" strokeWidth="14" />
                <path d={path} className="edge" pathLength={1} />
                <g className="branch-content">
                  <rect x={x - 5} y={y - 5} width="10" height="10" className="node-mark" />
                  <rect
                    x={x - 12}
                    y={y - 16}
                    width="140"
                    height="32"
                    fill="transparent"
                    stroke="transparent"
                    className="focus-ring"
                  />
                  <text x={x + 16} y={y - 2} className="node-name">
                    {project.name}
                  </text>
                  <text x={x + 16} y={y + 13} className="node-domain">
                    {project.domain}
                  </text>
                </g>
              </a>
            )
          })}

          <g aria-hidden="true">
            <rect
              x={CORE.x - CORE.size / 2}
              y={CORE.y - CORE.size / 2}
              width={CORE.size}
              height={CORE.size}
              fill="var(--color-bg)"
              stroke="var(--color-accent)"
              strokeOpacity="0.7"
            />
            <rect x={CORE.x - 2} y={CORE.y - 2} width="4" height="4" fill="var(--color-accent)" />
            <text x={CORE.x - 34} y={CORE.y + 4} className="node-domain" textAnchor="end">
              K/
            </text>

            <rect x="-1.5" y="-1.5" width="3" height="3" className="packet">
              <animateMotion
                path={PACKET_PATH}
                begin="2.2s"
                dur="6s"
                repeatCount="indefinite"
                keyPoints="0;1;1"
                keyTimes="0;0.4;1"
                calcMode="linear"
              />
            </rect>
          </g>
        </svg>
      </div>
      <figcaption className="mt-3 font-mono text-[0.6875rem] text-fg-3">Fig. 1 Selected work by domain</figcaption>
    </figure>
  )
}
