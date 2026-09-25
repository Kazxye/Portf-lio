# kazys.dev — Systems Observatory

Personal portfolio of Kazys Tatarunas. Next.js App Router, TypeScript, React and Tailwind CSS 4, with local Geist Sans/Mono fonts.

## Run

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
npm run lint    # TypeScript check
npm run build
npm start
```

If the execution environment prevents Turbopack from opening its internal worker port, use `npm run build -- --webpack`. This builds the same application with Next.js's supported Webpack bundler.

## Routes and structure

- `/` — identity, featured projects, other work, about, stack and contact.
- `/projects/vaultkeeper`, `/projects/kazz-injector`, `/projects/phishguard` — statically generated case studies.
- `/CV_Kazys_Tatarunas.pdf` — original resume URL.
- `/opengraph-image`, `/sitemap.xml`, `/robots.txt` — generated sharing/search assets.

```text
app/                   routes, metadata, global styles
components/home/       homepage sections
components/projects/   source-derived architectural diagrams
components/site/       header, footer, accessible command palette
components/system/     interactive project map (native links)
components/ui/         shared external links
content/               typed project, profile and navigation data
public/projects/       optimized screenshots from real project interfaces
docs/content-audit.md  content evidence, discrepancies and asset provenance
```

Edit project facts in `content/projects.ts`. Check changes against actual repository code; a README alone can overstate implementation. Add a featured entry, its slug type and diagram together. `generateStaticParams` and sitemap consume the registry. Optional `screen` data adds a genuine UI capture to the case study.

## Interaction and accessibility

Cmd/Ctrl+K opens the command palette; a Menu button exposes it on mobile. Arrow keys select, Enter navigates, Escape closes, Tab stays inside the dialog. The menu restores focus on dismissal and focuses section targets after navigation. It also provides copy-email feedback.

Pages use semantic headings, labeled diagrams, visible focus, a skip link, keyboard-accessible project links and local fonts. Entrance/reveal/hover motion respects `prefers-reduced-motion`. Scroll animations progressively enhance visible HTML without adding a motion runtime.

## Deployment

Existing Vercel configuration is preserved. All content routes are prerendered; no database, API key or contact-form service is required. The real project demos are external links, not embedded services.

Security headers live in `next.config.ts`. Production CSP is enabled with `VERCEL_ENV=production`; preview deployments keep the Vercel toolbar compatible. The existing static CSP permits Next.js inline bootstrap scripts. It is not a nonce-based policy or a guarantee against XSS.

See `docs/content-audit.md` for verified links, source discrepancies and the scope of technical claims.
