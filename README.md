# Ember — Security Engineer Portfolio

A dark, ember-themed portfolio for a **Security Developer & Software Engineer**.
Built with **React + TypeScript + Tailwind CSS** on **Vite**, with full
**English / Portuguese (pt-BR)** internationalization via `react-i18next`.
Fully responsive, accessible, and dependency-light.

> Project copy reflects a real professional profile. Imagery is placeholder
> graphics, and the social/contact URLs in `src/data/content.ts` use `#`
> placeholders (except email) — set your real links there before going live.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

### Contact form

The contact form submits through [Web3Forms](https://web3forms.com) — no backend
required. Grab a free access key (just enter the email where you want to receive
messages), then copy `.env.example` to `.env` and set:

```bash
VITE_WEB3FORMS_KEY=your-access-key
```

Without a key the form renders and validates but submissions will fail. The
direct social/contact links keep working regardless.

## Project structure

```
src/
├── App.tsx                 # page composition / section order
├── main.tsx                # React entry (loads i18n)
├── index.css               # Tailwind layers + shared component classes
├── i18n/
│   ├── index.ts            # i18next init + language persistence
│   └── locales/
│       ├── en.json         # ← all English copy
│       └── pt.json         # ← all Portuguese (pt-BR) copy
├── data/
│   └── content.ts          # structural config (nav, socials) + TS types
└── components/
    ├── layout/
    │   ├── Navbar.tsx       # sticky nav + language switcher + mobile menu
    │   └── Footer.tsx       # closing CTA + links + socials
    ├── sections/
    │   ├── Hero.tsx         # name, role, CTAs, social links
    │   ├── Stats.tsx        # technical metrics
    │   ├── About.tsx
    │   ├── FeaturedWork.tsx # Projects (core section) with stack chips
    │   ├── Services.tsx     # Expertise (security/eng areas)
    │   ├── Story.tsx        # Approach / philosophy
    │   ├── TechStack.tsx    # tech grouped by category
    │   ├── Brands.tsx       # tools marquee (derived from tech stack)
    │   ├── WorkProcess.tsx  # security workflow
    │   ├── Education.tsx    # Education & Learning (replaces pricing)
    │   ├── Faq.tsx
    │   ├── CtaBanner.tsx
    │   └── Contact.tsx      # form + topic chips + direct links
    └── ui/
        ├── Button.tsx
        ├── Section.tsx
        ├── SectionHeading.tsx
        ├── Placeholder.tsx
        ├── LanguageSwitcher.tsx
        ├── SocialLinks.tsx
        └── Icon.tsx         # inline SVG icons + brand glyphs
```

## Customizing

- **Copy** — edit `src/i18n/locales/en.json` and `pt.json`. Every visible
  string lives here; keep both files in sync.
- **Links** — set your real GitHub / LinkedIn / Discord / WhatsApp URLs (and
  email) in the `socials` array of `src/data/content.ts`.
- **Colors / theme** — edit the `ember`, `ink`, and `sand` palettes in
  `tailwind.config.js`.
- **Images** — replace `<Placeholder />` usages with real `<img>` elements and
  meaningful `alt` text.
- **Language** — default is browser-detected (pt → Portuguese, else English) and
  remembered in `localStorage`. Add a locale by dropping a new JSON file in
  `src/i18n/locales` and registering it in `src/i18n/index.ts`.

## Notes

- Mobile-first responsive layout (single column → multi-column at `sm`/`lg`).
- Accessible: semantic landmarks, skip link, focus-visible rings, ARIA on the
  accordion / language toggle / mobile menu, `<html lang>` kept in sync.
- The contact form posts to Web3Forms via `VITE_WEB3FORMS_KEY` (see *Contact form* above).
- No fake testimonials, certifications, or metrics — content is framed honestly.
