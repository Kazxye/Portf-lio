# Content audit — Systems Observatory

Reviewed on 2026-09-24, before the rebuild. This is a source/content review, not a security audit of the featured software.

## Starting point

- Live site: https://www.kazys.dev — React/Vite single-page portfolio, English/Portuguese, orange accents, portrait hero, services, metrics, repeated technology lists, process, FAQ and Web3Forms contact form.
- Local HEAD `0f6948c`: Next.js App Router / React / TypeScript / Tailwind 4, local Geist fonts, Radix/cmdk command menu, security headers and a hero. No work/about/stack/contact targets or project routes yet.
- Previous complete site recovered from commit `fe6a4ff`: `src/data/content.ts`, both locale files, components, styles, metadata and assets.
- Existing animations: hero stagger, SVG topology, sticky header / scroll progress and palette transitions in Next; signature drawing and IntersectionObserver reveals in the prior Vite version.
- Existing PDF: `public/CV_Kazys_Tatarunas.pdf`, text extracted and complete page visually inspected. File and public download URL preserved.

## Identity and links

- São Paulo and Software Engineering at FIAP confirmed by existing site and CV.
- Expected completion December 2028 comes from the CV. Start year omitted because the CV does not corroborate it.
- No employment history, client results, project usage metrics or new certifications added.
- Certification lists differ between old site and CV. Omitted from the concise homepage.
- GitHub profile and all five listed public repositories successfully read through GitHub API/archive downloads.
- LinkedIn URL matches old site, local profile and CV; automated retrieval returned HTTP 999. Preserved, not represented as independently verified.
- SolarHub live demo returned HTTP 200; original demo URL retained.
- WhatsApp URL returned HTTP 200 and redirected to the original phone destination. No message sent.
- Email and Discord handle preserved from existing content. No email or messaging verification was attempted.

## Repository evidence

### VaultKeeper — `Kazxye/PasswordManager`

Read README, crypto modules, auth router/service, rate limiter and application structure.

- Official README name is **VaultKeeper**, used consistently throughout this site.
- `frontend/src/crypto/kdf.ts`: email-derived salt, Argon2id (64 MiB, 3 iterations, parallelism 4), HKDF-SHA256 contexts `auth` and `enc`, non-extractable AES-GCM key.
- `frontend/src/crypto/encryption.ts`: AES-256-GCM and fresh random 12-byte IV.
- `backend/app/routers/auth.py`: HttpOnly, Secure, SameSite=Strict refresh cookie scoped to `/api/v1/auth`.
- `backend/app/services/auth_service.py`: Redis refresh-token storage and rotation.
- `backend/app/middleware/rate_limiter.py`: per-IP counters and fail-open handling. Do not repeat the README's inaccurate per-user/global rate claims.
- README credits Kazys for architecture/backend/crypto/security audit and **giiuk** for frontend/UI. Collaborative credit retained; no claim of independent security assurance.
- Non-extractable CryptoKey does not make XSS harmless. Browser execution and delivered frontend remain within the trust assumptions.
- Database compromise still permits password guessing and exposes metadata. Do not repeat claims that compromised data is categorically unusable.

### Kazz Injector — `Kazxye/Kazz-Injector`

Read README, CMakeLists, process module, injection engine and UI sources.

- C++20 / Windows API / Dear ImGui / DirectX 11 confirmed.
- Process enumeration, signature/machine inspection, LoadLibrary path and typed operation errors confirmed.
- **README discrepancy:** `injectManualMap` logs a warning and delegates to `injectLoadLibrary`. Manual mapping is not an implemented feature.
- PE validation is limited. Fixed wait/exit-code handling is not advertised as a hardened 64-bit loader.
- No exploit, evasion, privilege escalation or production-hardening claims added.

### PhishGuard — `Kazxye/PhishGuard`

Read README, API orchestration, risk calculator, Chrome popup, service-worker and local storage sources.

- Five checks run in `asyncio.gather`: homograph, WHOIS, SSL, brand similarity, VirusTotal.
- Form analysis follows those checks when HTML is supplied. Do not claim six concurrent engines.
- Optional form/VirusTotal weights are redistributed; score is a heuristic, not a probability or benchmarked detection rate.
- Browser integration uses Chrome MV3, TypeScript and React.
- Browser history is stored in `chrome.storage.local`. Do not repeat the broad README claim that no URL data is persisted anywhere.
- No machine-learning classifier or Firefox support claimed; these are roadmap items.

### Other work

- Network Radar: README and backend/frontend structure confirm React, FastAPI, Scapy, ARP discovery and WebSocket updates. No accuracy/performance claim.
- SolarHub: README, package manifest and original screenshot confirm Next.js, React, TypeScript and Tailwind. Presented as frontend work. Existing marketing numbers inside the project are not asserted as portfolio achievements.

## Visual provenance

- Old `passwordmanager.jpg` and `dllinjector.png` are generic stock-like photos, not application screenshots. Replaced.
- Old PhishGuard/Network Radar banners are generic promotional images. Replaced.
- New HTML/CSS/SVG diagrams are source-derived schematics, explicitly labeled; they are not live telemetry, scan results or simulated application interfaces.
- `public/projects/vaultkeeper-login.webp`: original login screen from a temporary checkout running locally; no login, account creation or data seeding. UI credit retained.
- `public/projects/phishguard-settings.webp`: original popup settings rendered locally from repository source, without Chrome extension installation. No fabricated detection results. Dark theme selected through the original UI.
- `public/projects/solarhub.webp`: optimized copy of the existing portfolio screenshot from `fe6a4ff`.
- Kazz Injector requires Windows. No native screenshot was available in the repository; its actual module/PE structure is represented as a diagram instead.

## New information architecture

- `/`: Hero → Selected Work (VaultKeeper, Kazz Injector, PhishGuard) → Other Work (Network Radar, SolarHub) → About/education → Engineering Stack → Contact/footer.
- `/projects/vaultkeeper`, `/projects/kazz-injector`, `/projects/phishguard`: context, challenge, architecture, decisions, implementation, limitations, source links and next project. Real UI captures where available.
- `/opengraph-image`, `/sitemap.xml`, `/robots.txt`, `/icon.svg`, original CV path and custom 404.
- No empty Lab section. No service/FAQ/metrics repetition. Direct contact replaces the old form integration.
- English presentation follows the requested direction. The previously removed Vite language switcher is not reintroduced.

## Implementation choices

All page content and diagrams are Server Components. The command palette is the interactive client boundary; it handles search, keyboard navigation, focus management, copy feedback and cross-page navigation. CSS handles entrance, hover and progressive scroll reveals. Reduced-motion users get static content; browsers without scroll timelines retain visible content. Fonts are bundled through `next/font/local` via Geist. No new runtime dependencies were needed.
