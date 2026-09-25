export type ProjectSlug = 'vaultkeeper' | 'kazz-injector' | 'phishguard'
export type Project = {
  slug: ProjectSlug
  index: string
  name: string
  domain: string
  category: string
  headline: string
  summary: string
  repo: string
  status: string
  stack: string[]
  context: string
  challenge: string
  architecture: string
  decisions: { title: string; body: string }[]
  implementation: { title: string; body: string }[]
  tradeoffs: { title: string; body: string }[]
  groups: { name: string; items: string[] }[]
  sources: { label: string; path: string }[]
  screen?: {
    src: string
    width: number
    height: number
    alt: string
    caption: string
  }
  credit?: { text: string; url: string; name: string }
}

// Source audit and important README/code discrepancies: docs/content-audit.md.
export const projects: Project[] = [
  {
    slug: 'vaultkeeper',
    index: '01',
    name: 'VaultKeeper',
    domain: 'Client-side encryption',
    category: 'Security engineering',
    headline: 'Your vault. Your keys.',
    summary:
      'A password manager built around a clear trust boundary: credentials are encrypted in the browser, before they reach the server.',
    repo: 'https://github.com/Kazxye/PasswordManager',
    status: 'Personal / collaborative project',
    stack: ['React', 'FastAPI', 'Argon2id', 'AES-256-GCM', 'PostgreSQL'],
    context:
      'A password manager puts highly sensitive data behind a deceptively simple interface. VaultKeeper explores a zero-knowledge design for vault contents: the backend stores encrypted entries without receiving the key used to decrypt them.',
    challenge:
      'Authentication and encryption need different keys and different lifecycles. The challenge is to let the server verify a user and synchronize a vault without handing it the master password or the encryption key.',
    architecture:
      'The browser derives master key material using Argon2id, with a salt derived from the normalized email. HKDF-SHA256 separates that material into an authentication key and an encryption key. Only the authentication key crosses the boundary for verification; vault names and entries cross as ciphertext with their IVs.',
    decisions: [
      {
        title: 'Separate authentication from encryption.',
        body: 'HKDF uses distinct “auth” and “enc” contexts. The server hashes the authentication key with Argon2id, while the AES encryption key stays in the browser as a non-extractable CryptoKey.',
      },
      {
        title: 'Authenticate the ciphertext, too.',
        body: 'AES-256-GCM encrypts each entry as a JSON blob and authenticates it. A fresh random 96-bit IV is generated for each encryption operation; vault names are encrypted as well.',
      },
      {
        title: 'Keep session controls on the server.',
        body: 'Short-lived access tokens work alongside rotating refresh tokens stored in Redis. The refresh cookie is HttpOnly, Secure and SameSite=Strict, with its path limited to the authentication API.',
      },
    ],
    implementation: [
      {
        title: 'Browser cryptography',
        body: 'Argon2id runs through WASM with 64 MiB of memory, three iterations and parallelism of four. Web Crypto handles HKDF and AES-GCM. Zustand holds session keys in memory rather than persistent browser storage.',
      },
      {
        title: 'API and persistence',
        body: 'FastAPI, async SQLAlchemy and PostgreSQL handle users, vault ownership and encrypted entries. Alembic manages migrations. Audit events record authentication and vault actions with request context.',
      },
      {
        title: 'Deployment boundary',
        body: 'Docker Compose defines the API, PostgreSQL, Redis and Nginx services. Nginx handles TLS and forwards API requests. Redis also provides per-IP request counters for rate limiting.',
      },
    ],
    tradeoffs: [
      {
        title: 'Zero-knowledge has a scope.',
        body: 'Vault contents are encrypted, but the server still sees account and operational metadata. The design depends on a trustworthy browser and frontend delivery. A non-extractable key prevents export; it does not stop injected JavaScript from using a live key to decrypt data.',
      },
      {
        title: 'Availability affects abuse controls.',
        body: 'The rate limiter logs Redis errors and fails open. That preserves request availability during a limiter failure, but weakens brute-force protection. Authentication and session handling have their own Redis dependency.',
      },
      {
        title: 'Memory cost is also a user cost.',
        body: 'Memory-hard derivation increases the cost of password guessing and also adds work on the user’s device. This project does not establish a measured latency budget across devices or claim an independent security audit.',
      },
    ],
    groups: [
      {
        name: 'Client',
        items: ['React', 'TypeScript', 'Web Crypto', 'Argon2 WASM', 'Zustand'],
      },
      {
        name: 'Backend',
        items: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Redis'],
      },
      { name: 'Infrastructure', items: ['Docker Compose', 'Nginx', 'Alembic'] },
    ],
    sources: [
      { label: 'Key derivation', path: 'frontend/src/crypto/kdf.ts' },
      {
        label: 'Authenticated encryption',
        path: 'frontend/src/crypto/encryption.ts',
      },
      {
        label: 'Session lifecycle',
        path: 'backend/app/services/auth_service.py',
      },
      {
        label: 'Rate limiting',
        path: 'backend/app/middleware/rate_limiter.py',
      },
    ],
    screen: {
      src: '/projects/vaultkeeper-login.webp',
      width: 1280,
      height: 720,
      alt: 'Original VaultKeeper login interface with email and password fields',
      caption:
        'Original login interface, captured from the repository running locally. Frontend by giiuk.',
    },
    credit: {
      text: 'The repository credits Kazys with architecture, backend, crypto pipeline and security review; frontend implementation and UI components are credited to',
      name: 'giiuk',
      url: 'https://github.com/giiuk',
    },
  },
  {
    slug: 'kazz-injector',
    index: '02',
    name: 'Kazz Injector',
    domain: 'Windows internals',
    category: 'Systems engineering',
    headline: 'Below the abstraction.',
    summary:
      'A Windows DLL loading utility exploring process enumeration, PE headers and remote memory operations through a native C++ interface.',
    repo: 'https://github.com/Kazxye/Kazz-Injector',
    status: 'Educational project',
    stack: ['C++20', 'WinAPI', 'Dear ImGui', 'DirectX 11'],
    context:
      'Understanding how a library enters another process makes operating-system abstractions tangible. Kazz Injector is an educational Windows application for exploring process access, PE metadata and DLL loading in a controlled environment.',
    challenge:
      'Native process operations have explicit failure modes: the process may disappear, access may be denied, a file may not contain a valid PE signature, or the DLL architecture may not match the target. Those conditions need to be visible in the interface.',
    architecture:
      'The ImGui interface delegates process discovery to ProcessManager and loading to Injector. The implemented loading path uses the Windows loader through a remote thread. Results and failures return to the UI through a typed result and the application logger.',
    decisions: [
      {
        title: 'Keep the interface separate from the engine.',
        body: 'GUI, process enumeration, injection logic and logging live in separate modules. Dear ImGui supplies the immediate-mode interface, while DirectX 11 renders it.',
      },
      {
        title: 'Check compatibility before loading.',
        body: 'The engine checks file existence, DOS and PE signatures, target-process presence and the DLL/target architecture match before attempting remote operations. These checks are a starting point, not a complete PE validator.',
      },
      {
        title: 'Make failures inspectable.',
        body: 'InjectionResult distinguishes process lookup, allocation, write and thread-creation errors. The logger exposes operation context to support debugging instead of reducing every failure to a generic dialog.',
      },
    ],
    implementation: [
      {
        title: 'Native Windows application',
        body: 'CMake requires Windows and C++20. The application connects the Win32 and DirectX 11 ImGui backends, with process filtering, DLL selection and operation history in the GUI.',
      },
      {
        title: 'PE inspection',
        body: 'The source reads IMAGE_DOS_HEADER, the PE signature and IMAGE_FILE_HEADER to identify the image and its machine type. These structures connect the file on disk to the architecture of the selected process.',
      },
      {
        title: 'Defender perspective',
        body: 'The code exposes a useful study surface for defenders: cross-process access, remote memory writes and thread creation. Those operations need context during an investigation; their presence alone is not a verdict.',
      },
    ],
    tradeoffs: [
      {
        title: 'Manual mapping is not implemented.',
        body: 'Although the README and interface list Manual Mapping, injectManualMap currently logs a warning and calls the LoadLibrary implementation. This case study describes the implemented path only.',
      },
      {
        title: 'A learning tool, not a hardened loader.',
        body: 'The PE checks do not fully validate file bounds or every header field. The loading code also uses a fixed wait and a DWORD thread exit code. Robust timeout handling and 64-bit result handling remain engineering limitations.',
      },
      {
        title: 'Platform and permissions are real constraints.',
        body: 'The project targets Windows and requires permission to access the selected process. It does not demonstrate a privilege escalation, an exploit or an endpoint-protection bypass.',
      },
    ],
    groups: [
      { name: 'Language & build', items: ['C++20', 'CMake'] },
      { name: 'Interface', items: ['Dear ImGui', 'DirectX 11', 'Win32'] },
      {
        name: 'Systems',
        items: ['Windows API', 'PE headers', 'Process enumeration'],
      },
    ],
    sources: [
      { label: 'Loading engine & limitations', path: 'src/core/injector.cpp' },
      { label: 'Process enumeration', path: 'src/core/process.cpp' },
      { label: 'Native interface', path: 'src/gui/application.cpp' },
      { label: 'Build configuration', path: 'CMakeLists.txt' },
    ],
  },
  {
    screen: {
      src: '/projects/phishguard-settings.webp',
      width: 380,
      height: 920,
      alt: 'Original PhishGuard popup settings showing themes, preferences, whitelist and backend configuration',
      caption:
        'Original extension settings UI, rendered locally from the popup source. No analysis results are simulated.',
    },
    slug: 'phishguard',
    index: '03',
    name: 'PhishGuard',
    domain: 'Phishing detection',
    category: 'Defensive security',
    headline: 'Turn signals into context.',
    summary:
      'A phishing analysis API and browser extension that combine domain, certificate and impersonation signals into an explainable risk score.',
    repo: 'https://github.com/Kazxye/PhishGuard',
    status: 'Personal project',
    stack: ['Python', 'FastAPI', 'TypeScript', 'Chrome MV3', 'VirusTotal'],
    context:
      'Suspicious URLs rarely have a single decisive signal. PhishGuard brings multiple checks into one analysis result so a user can inspect the reasons behind a warning, rather than trusting an unexplained safe-or-unsafe label.',
    challenge:
      'The checks have different costs, dependencies and failure conditions. WHOIS and certificate lookups involve external systems; VirusTotal is optional; form analysis needs page HTML. The pipeline must combine the evidence that is actually available.',
    architecture:
      'A Chrome MV3 extension coordinates navigation analysis through its service worker. FastAPI runs homograph, WHOIS, SSL, brand and VirusTotal checks concurrently. If HTML is supplied, form analysis follows. A weighted calculator then returns the score, risk level, individual findings and recommendations.',
    decisions: [
      {
        title: 'Combine independent signals.',
        body: 'Unicode homographs, domain age, certificates, brand similarity, form structure and VirusTotal results each contribute evidence. The response preserves individual findings alongside the overall risk level.',
      },
      {
        title: 'Run independent I/O concurrently.',
        body: 'asyncio.gather coordinates five checks. Synchronous work is offloaded with asyncio.to_thread; VirusTotal uses async HTTP. Form analysis runs afterward when the request includes HTML.',
      },
      {
        title: 'Account for missing optional inputs.',
        body: 'When form data or VirusTotal is unavailable, the risk calculator redistributes their weights over the remaining checks. Combined indicators can increase the final score.',
      },
    ],
    implementation: [
      {
        title: 'Analysis API',
        body: 'POST /api/v1/analyze accepts a URL and optional HTML. Pydantic models structure the request and response. Per-service in-memory caches reduce repeated WHOIS, certificate and threat-intelligence lookups.',
      },
      {
        title: 'Browser integration',
        body: 'The MV3 service worker coordinates API requests; the content script extracts page information. The React popup presents analysis details, history and settings, with a navigation badge for risk feedback.',
      },
      {
        title: 'Transparent scoring',
        body: 'The calculator defines explicit weights and thresholds for five risk levels. This makes the rules inspectable and adjustable; it does not turn the score into a calibrated probability of phishing.',
      },
    ],
    tradeoffs: [
      {
        title: 'A score is evidence, not certainty.',
        body: 'Heuristics can produce false positives and miss attacks. A valid certificate or an older domain does not prove legitimacy. No detection-accuracy benchmark is claimed here.',
      },
      {
        title: 'Missing signals change the result.',
        body: 'WHOIS availability, API quotas and network failures affect coverage. Redistributing optional weights keeps analysis usable, but scores with different evidence sets need context when compared.',
      },
      {
        title: 'Browser history stays in the browser.',
        body: 'The extension stores recent analysis history in chrome.storage.local. The backend uses in-memory caches, and optional VirusTotal analysis sends the URL to an external service. “No data is stored anywhere” would be an inaccurate description.',
      },
    ],
    groups: [
      {
        name: 'Analysis',
        items: ['Python', 'FastAPI', 'asyncio', 'httpx', 'VirusTotal API'],
      },
      {
        name: 'Browser',
        items: ['Chrome MV3', 'React', 'TypeScript', 'Tailwind CSS'],
      },
      { name: 'Delivery', items: ['Vite', 'Docker', 'Pytest'] },
    ],
    sources: [
      { label: 'Analysis orchestration', path: 'backend/app/api/routes.py' },
      {
        label: 'Risk calculator',
        path: 'backend/app/services/risk_calculator.py',
      },
      {
        label: 'Browser service worker',
        path: 'extension/src/background/service-worker.ts',
      },
      {
        label: 'Local history storage',
        path: 'extension/src/shared/storage.ts',
      },
    ],
  },
]

export const otherProjects = [
  {
    slug: 'network-radar',
    name: 'Network Radar',
    category: 'Network discovery & visualization',
    stack: 'React / FastAPI / Scapy',
    repo: 'https://github.com/Kazxye/Network-Radar',
    description:
      'ARP discovery, vendor identification and live device updates over WebSocket.',
  },
  {
    slug: 'solarhub',
    name: 'SolarHub',
    category: 'Frontend engineering',
    stack: 'Next.js / TypeScript / Tailwind',
    repo: 'https://github.com/Kazxye/SolarHub',
    demo: 'https://v0-solar-hub-tau.vercel.app',
    description:
      'A gaming landing page with layered visuals, an interactive FAQ and responsive layouts.',
  },
]
