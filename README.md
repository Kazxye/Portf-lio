# Kazys Tatarunas — Portfolio

Personal portfolio of **Kazys Tatarunas**, a Security Developer & Software
Engineer. A dark, ember-themed single-page site with a right-hand icon
navigation rail, bilingual content (English / Portuguese), and a working
contact form — no backend required.

🔗 **Live:** [kazys.dev](https://kazys.dev)

Built with **React + TypeScript + Tailwind CSS** on **Vite**, deployed on
**Vercel**. Dependency-light by design: the only runtime dependencies are React
and `i18next` — icons, animations, and UI are hand-rolled.

## Features

- **Bilingual (EN / pt-BR)** via `react-i18next`, browser-detected and
  remembered in `localStorage`. All copy lives in two JSON files.
- **Icon navigation rail** with hover tooltips and scroll-spy active-section
  highlighting (IntersectionObserver).
- **Working contact form** through [Web3Forms](https://web3forms.com) — topic
  chips, honeypot spam trap, and loading / success / error states.
- **Inline SVG icon set** (lucide-style) — no icon dependency.
- **Accessible**: semantic landmarks, skip link, focus-visible rings, ARIA on
  the accordion / language toggle / nav, `<html lang>` kept in sync, and
  `prefers-reduced-motion` respected.

## Tech stack

| Area      | Tools                                            |
| --------- | ------------------------------------------------ |
| Framework | React 18, TypeScript, Vite                       |
| Styling   | Tailwind CSS, custom CSS layers                  |
| i18n      | i18next, react-i18next                           |
| Forms     | Web3Forms                                        |
| Hosting   | Vercel (custom domain `kazys.dev`)               |

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
npm run lint     # type-check only (tsc --noEmit)
```

### Contact form key

The form posts to Web3Forms, so it needs a free access key. Grab one at
[web3forms.com](https://web3forms.com) (just enter the email where messages
should land), then create a local `.env` from the example:

```bash
cp .env.example .env
# then set:
VITE_WEB3FORMS_KEY=your-access-key
```

Because it's a `VITE_` build-time variable, the same key must be added in
**Vercel → Project Settings → Environment Variables** for the deployed form to
work. Without a key the form still renders and validates, but submissions fail
gracefully and the direct social links keep working.

## Deployment

The site is hosted on Vercel and wired to this repository:

- Pushes to **`main`** deploy to production (`kazys.dev`).
- Any other branch / PR gets its own **preview deployment** with a unique URL —
  validate changes there before merging to `main`.

Vercel auto-detects the Vite setup; no `vercel.json` is needed.

## Project structure

```
src/
├── App.tsx                 # page composition / section order
├── main.tsx                # React entry (loads i18n)
├── index.css               # Tailwind layers + shared classes + animations
├── i18n/
│   ├── index.ts            # i18next init + language persistence
│   └── locales/
│       ├── en.json         # ← all English copy
│       └── pt.json         # ← all Portuguese (pt-BR) copy
├── data/
│   └── content.ts          # structural config (nav, socials, images) + types
├── assets/                 # portrait, project shots, approach gallery
└── components/
    ├── layout/
    │   ├── Navbar.tsx       # top bar: brand, availability, location, language
    │   ├── NavRail.tsx      # right-hand icon nav rail + scroll-spy
    │   └── Footer.tsx       # closing CTA + links + socials
    ├── sections/
    │   ├── Hero.tsx         # portrait, name, role, CTAs, social links
    │   ├── Stats.tsx        # technical metrics
    │   ├── About.tsx
    │   ├── FeaturedWork.tsx # Projects (core section) with stack chips
    │   ├── Services.tsx     # Expertise (security / engineering areas)
    │   ├── Story.tsx        # Approach + image gallery
    │   ├── TechStack.tsx    # tech grouped by category
    │   ├── Brands.tsx       # tools marquee (derived from tech stack)
    │   ├── WorkProcess.tsx  # security workflow (per-step icons)
    │   ├── Education.tsx     # Education & Learning
    │   ├── Faq.tsx
    │   ├── CtaBanner.tsx
    │   └── Contact.tsx      # form + topic chips + direct links
    └── ui/
        ├── Button.tsx
        ├── Section.tsx
        ├── SectionHeading.tsx
        ├── LanguageSwitcher.tsx
        ├── SocialLinks.tsx
        └── Icon.tsx         # inline SVG icons + brand glyphs
```

## Customizing

- **Copy** — edit `src/i18n/locales/en.json` and `pt.json`. Every visible string
  lives here; keep both files in sync.
- **Links & images** — set social URLs, the CV path, project links, and the
  approach gallery in `src/data/content.ts`.
- **Theme** — tweak the `ember`, `ink`, and `sand` palettes in
  `tailwind.config.js`.
- **Sections** — reorder or add sections in `src/App.tsx`; the nav rail items
  live in `src/components/layout/NavRail.tsx`.
- **Add a language** — drop a new JSON file in `src/i18n/locales` and register
  it in `src/i18n/index.ts`.
