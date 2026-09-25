import type { ProjectSlug } from '@/content/projects'

function DiagramHeading({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="diagram-heading mono-small">
      <span>
        <span className="signal-dot" />
        {label}
      </span>
      <span>{detail}</span>
    </div>
  )
}

export function ProjectDiagram({ slug }: { slug: ProjectSlug }) {
  if (slug === 'vaultkeeper') return <VaultDiagram />
  if (slug === 'kazz-injector') return <InjectorDiagram />
  return <PhishDiagram />
}

function VaultDiagram() {
  return (
    <figure
      className="diagram vault-diagram"
      aria-label="VaultKeeper architecture: browser key derivation and encryption, with separate authentication and encrypted storage on the server"
    >
      <DiagramHeading
        label="VAULTKEEPER / TRUST BOUNDARY"
        detail="ARCHITECTURE 01"
      />
      <div className="vault-flow">
        <div className="browser-boundary">
          <div className="boundary-label mono-small">
            <span>01 / BROWSER</span>
            <span>Keys stay here</span>
          </div>
          <div className="derivation-flow">
            <div className="flow-node">
              <span className="node-kicker">INPUT</span>
              <strong>Master password</strong>
              <small>+ normalized email</small>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-node">
              <span className="node-kicker">DERIVE</span>
              <strong>Argon2id</strong>
              <small>64 MiB · 3 iterations</small>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-node">
              <span className="node-kicker">SEPARATE</span>
              <strong>HKDF</strong>
              <small>SHA-256</small>
            </div>
          </div>
          <svg
            className="key-wiring"
            viewBox="0 0 100 25"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M84 0V10H25V25M84 10H75V25" />
          </svg>
          <div className="key-branches">
            <div className="key-branch">
              <span className="branch-line" aria-hidden="true" />
              <span className="mono-small">info: auth</span>
              <strong>Authentication key</strong>
              <span className="branch-end mono-small">
                To server verification →
              </span>
            </div>
            <div className="key-branch encryption-branch">
              <span className="branch-line" aria-hidden="true" />
              <span className="mono-small">info: enc</span>
              <strong>Encryption key</strong>
              <span className="cipher-tag">
                AES-256-GCM <span>↓</span> Encrypted vault
              </span>
            </div>
          </div>
        </div>
        <div className="server-boundary">
          <div className="boundary-label mono-small">02 / SERVER</div>
          <div className="server-auth">
            <span className="node-kicker">AUTHENTICATION</span>
            <strong>Verify auth key</strong>
            <small>Server-side Argon2id hash</small>
          </div>
          <div className="server-storage">
            <svg
              width="27"
              height="31"
              viewBox="0 0 27 31"
              fill="none"
              aria-hidden="true"
            >
              <ellipse cx="13.5" cy="6" rx="11" ry="4" />
              <path d="M2.5 6v18c0 5.5 22 5.5 22 0V6M2.5 15c0 5.5 22 5.5 22 0" />
            </svg>
            <strong>Encrypted storage</strong>
            <small>FastAPI / PostgreSQL</small>
          </div>
          <p className="boundary-note mono-small">No vault decryption key</p>
        </div>
      </div>
      <figcaption className="diagram-caption">
        <span>Client-side encryption. Explicit boundaries.</span>
        <span className="mono-small">SCHEMATIC / FROM SOURCE</span>
      </figcaption>
    </figure>
  )
}

function InjectorDiagram() {
  return (
    <figure
      className="diagram injector-diagram"
      aria-label="Kazz Injector module map: ImGui interface, process manager, PE validation and the implemented LoadLibrary path"
    >
      <DiagramHeading
        label="KAZZ / PROCESS INTERFACE"
        detail="ARCHITECTURE 02"
      />
      <div className="injector-layout">
        <div className="pe-layout">
          <span className="node-kicker">PE FILE / INSPECTED FIELDS</span>
          <div className="pe-block">
            <span>01</span>
            <strong>DOS header</strong>
            <small>MZ signature</small>
          </div>
          <div className="pe-block">
            <span>02</span>
            <strong>PE signature</strong>
            <small>PE\0\0</small>
          </div>
          <div className="pe-block">
            <span>03</span>
            <strong>File header</strong>
            <small>Machine type</small>
          </div>
          <div className="pe-remainder mono-small">Remaining image data</div>
        </div>
        <div className="process-flow">
          <div className="process-node">
            <span className="node-kicker">INTERFACE</span>
            <strong>ImGui / DirectX 11</strong>
          </div>
          <span className="vertical-connector" aria-hidden="true" />
          <div className="process-node">
            <span className="node-kicker">DISCOVERY</span>
            <strong>ProcessManager</strong>
          </div>
          <span className="vertical-connector" aria-hidden="true" />
          <div className="process-node process-target">
            <span className="node-kicker">IMPLEMENTED PATH</span>
            <strong>LoadLibrary</strong>
            <small>Windows loader / remote thread</small>
          </div>
        </div>
      </div>
      <figcaption className="diagram-caption">
        <span>Native interfaces. Operating-system primitives.</span>
        <span className="mono-small">SOURCE MAP</span>
      </figcaption>
    </figure>
  )
}

function PhishDiagram() {
  return (
    <figure
      className="diagram phish-diagram"
      aria-label="PhishGuard pipeline: URL input, five concurrent checks, optional form analysis, weighted risk score and browser result"
    >
      <DiagramHeading
        label="PHISHGUARD / ANALYSIS PIPELINE"
        detail="ARCHITECTURE 03"
      />
      <div className="phish-flow">
        <div className="pipeline-input">
          <span className="node-kicker">CHROME MV3</span>
          <strong>URL + optional page HTML</strong>
          <span aria-hidden="true">↘</span>
        </div>
        <div className="engine-boundary">
          <span className="node-kicker">FASTAPI / CONCURRENT CHECKS</span>
          <div className="engine-grid">
            {[
              'Homograph',
              'Domain age',
              'SSL / TLS',
              'Brand match',
              'VirusTotal*',
            ].map((label) => (
              <span key={label}>
                <i aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="pipeline-result">
          <div>
            <span className="node-kicker">THEN, IF HTML EXISTS</span>
            <strong>Form analysis</strong>
          </div>
          <span className="flow-arrow" aria-hidden="true">
            →
          </span>
          <div className="risk-result">
            <span className="node-kicker">WEIGHTED EVIDENCE</span>
            <strong>Risk + reasons</strong>
            <div className="risk-scale" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <i key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="diagram-caption">
        <span>*VirusTotal is optional.</span>
        <span className="mono-small">SCHEMATIC / NO LIVE SCAN</span>
      </figcaption>
    </figure>
  )
}
