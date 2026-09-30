# kazys.dev

Personal portfolio of Kazys Tatarunas. A 1-bit, dithered visual identity on top of a
modern Next.js stack: the hero portrait renders in ordered dithering and the cursor
works as a lens that reveals the original photo.

## Stack

Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4, Geist and Geist Mono via the
`geist` package (self-hosted through `next/font/local`, no network call at build time).

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Structure

```
app/                 layout, page, global tokens (globals.css), icon
components/layout/   Header, Footer, LocalTime
components/sections/ Hero, About, Projects, Experience, Education, Stack, Contact
components/ui/       SectionLabel, ArrowLink, ButtonLink, Value
components/effects/  DitherImage, DitherShader (WebGL), CursorLens, pointer store
data/                all copy and structured content
lib/                 utils, placeholder helpers
assets/images/       portrait
```

## Content rules

All copy lives in `data/`. Nothing is invented: missing facts use `todo("...")`, which
renders as a dashed marker in the UI. Before launch:

```bash
grep -rn "todo(" data/
```

## Roadmap

- [x] Phase 1: structure, tokens, typography, layout
- [x] Phase 2: hero and DitherImage shader
- [x] Phase 3: cursor lens
- [x] Phase 4: project previews and remaining interactions
- [x] Phase 5: responsive pass
- [x] Phase 6: performance, accessibility, SEO
- [x] Phase 7: polish

## Project screenshots

`assets/projects/` holds real captures of the running frontends (VaultKeeper landing
page, Network Radar dashboard before a scan, PhishGuard popup before any analysis).
Replace them with richer captures when available: same 16:10 ratio, then update the
`image.alt` text in `data/projects.ts`. Projects without a real capture have no image.

## Rendering notes

- One WebGL context per dithered image, created only near the viewport and after the
  main thread is idle. Frames are drawn on demand; an idle page draws nothing.
- On software WebGL (SwiftShader, llvmpipe, audit browsers) the print-in animation is
  skipped and DPR is capped at 1, because every frame costs main-thread time there.
- The grayscale `<img>` stays visible under the canvas; unprinted dots are transparent,
  so the photo turns into 1-bit instead of popping from an empty frame. Without
  JavaScript, WebGL, or after a shader error / lost context, the image is all you see
  (the failure is logged as a structured console warning).
- "View original" (`RevealToggle`) is the keyboard and touch path to the full image; in
  fallback mode it removes the grayscale filter.
- Tone curves per image kind live in `DITHER_TONES`: `photo` for portraits, `interface`
  for screenshots.
