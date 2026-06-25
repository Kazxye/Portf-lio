import type { SVGProps } from 'react'

/**
 * Lightweight inline icon set (stroke-based, currentColor).
 * Avoids pulling in an icon dependency to keep the bundle small.
 */

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps): IconProps => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  ...props,
})

export const ArrowUpRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

export const ArrowRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const Plus = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Check = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m20 6-11 11-5-5" />
  </svg>
)

export const Menu = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const Close = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const Spark = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3c.6 3.6 1.8 4.8 5.4 5.4C13.8 9 12.6 10.2 12 13.8 11.4 10.2 10.2 9 6.6 8.4 10.2 7.8 11.4 6.6 12 3Z" />
    <path d="M18 13c.3 1.8.9 2.4 2.7 2.7-1.8.3-2.4.9-2.7 2.7-.3-1.8-.9-2.4-2.7-2.7C17.1 15.4 17.7 14.8 18 13Z" />
  </svg>
)

export const Quote = (props: IconProps) => (
  <svg {...base({ ...props, strokeWidth: 0, fill: 'currentColor' })}>
    <path d="M7 7H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2H3v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0-1-2Zm12 0h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0-1-2Z" />
  </svg>
)

export const Globe = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
)

export const Mail = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const Shield = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </svg>
)

export const Layers = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
)

export const Compass = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" />
  </svg>
)

export const Search = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const Code = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </svg>
)

export const PenLine = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)

/* ---- Brand glyphs (filled) ---- */

const brandBase = (props: IconProps): IconProps => ({
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  ...props,
})

export const GitHub = (props: IconProps) => (
  <svg {...brandBase(props)}>
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.91v2.83c0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
)

export const LinkedIn = (props: IconProps) => (
  <svg {...brandBase(props)}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z" />
  </svg>
)

export const Discord = (props: IconProps) => (
  <svg {...brandBase(props)}>
    <path d="M19.27 5.33A16.7 16.7 0 0 0 15.3 4l-.2.4a13 13 0 0 1 3.6 1.8 14.6 14.6 0 0 0-13.4 0 13 13 0 0 1 3.6-1.8L8.7 4a16.7 16.7 0 0 0-3.97 1.33C2.84 9.3 2.1 13.2 2.47 17.04a16.8 16.8 0 0 0 5.07 2.55l.4-.66c-.66-.25-1.3-.55-1.9-.9.16-.12.32-.24.47-.37a12 12 0 0 0 10.98 0c.15.13.31.25.47.37-.6.35-1.24.65-1.9.9l.4.66a16.8 16.8 0 0 0 5.07-2.55c.44-4.45-.75-8.32-3.26-11.71ZM9.3 14.66c-.97 0-1.77-.9-1.77-2s.78-2 1.77-2 1.78.9 1.77 2c0 1.1-.79 2-1.77 2Zm5.4 0c-.97 0-1.77-.9-1.77-2s.78-2 1.77-2 1.78.9 1.77 2c0 1.1-.78 2-1.77 2Z" />
  </svg>
)

export const WhatsApp = (props: IconProps) => (
  <svg {...brandBase(props)}>
    <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.73 1.2A9.9 9.9 0 0 0 22 11.9 9.9 9.9 0 0 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.15.82.84-3.07-.2-.31a8.2 8.2 0 0 1-1.26-4.37 8.23 8.23 0 0 1 14.05-5.82 8.18 8.18 0 0 1 2.42 5.83 8.23 8.23 0 0 1-8.21 8.42h-.01Zm4.5-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.37 1 2.53c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.5.58.19 1.1.16 1.52.1.46-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
)

/** Social icons keyed by the `icon` field in content.ts `socials`. */
export const socialIcons: Record<string, (props: IconProps) => JSX.Element> = {
  GitHub,
  LinkedIn,
  Mail,
  Discord,
  WhatsApp,
}

export const icons = {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Check,
  Menu,
  Close,
  Spark,
  Quote,
  Globe,
  Mail,
  Shield,
  Layers,
  Compass,
  Search,
  Code,
  PenLine,
  GitHub,
  LinkedIn,
  Discord,
  WhatsApp,
}
