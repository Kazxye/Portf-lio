/**
 * Structural / configuration data only.
 * All user-facing copy lives in the i18n locale files (src/i18n/locales/*).
 * This module holds non-translatable wiring: anchors, links, asset imports,
 * and the TypeScript shapes used when reading translated arrays.
 */

import passwordManager from '../assets/projects/passwordmanager.jpg'
import dllInjector from '../assets/projects/dllinjector.png'
import phishGuard from '../assets/projects/phishguard.png'
import networkRadar from '../assets/projects/networkradar.png'
import solarHub from '../assets/projects/solarhub.png'
import profilePhoto from '../assets/profile.png'
import approachCircuit from '../assets/approach/circuit.jpg'
import approachCode from '../assets/approach/code.jpg'
import approachPlanning from '../assets/approach/planning.jpg'
import approachWorkspace from '../assets/approach/workspace.jpg'

export const profileImage = profilePhoto

/**
 * Approach gallery — the horizontal image strip in the "Approach" section.
 * Order MUST match `approach.gallery` (alt text) in the locale files.
 */
export const approachGallery: string[] = [
  approachCircuit,
  approachCode,
  approachPlanning,
  approachWorkspace,
]

/** CV lives in /public so it ships as a static download. */
export const cvUrl = '/CV_Kazys_Tatarunas.pdf'

export type SocialKey = 'github' | 'linkedin' | 'email' | 'discord' | 'whatsapp'

/** Navigation entries — `key` resolves to `nav.<key>` in the locale files. */
export const navLinks: { key: string; href: string }[] = [
  { key: 'projects', href: '#work' },
  { key: 'expertise', href: '#services' },
  { key: 'process', href: '#process' },
  { key: 'education', href: '#education' },
  { key: 'faq', href: '#faq' },
]

/**
 * Social / contact links. Entries with `href` are links; entries with `copy`
 * render as a button that copies the value to the clipboard (used for Discord,
 * whose username doesn't have a reliable public profile URL).
 */
export type SocialLink = {
  key: SocialKey
  icon: string
  href?: string
  copy?: string
}

export const socials: SocialLink[] = [
  { key: 'github', href: 'https://github.com/Kazxye', icon: 'GitHub' },
  { key: 'linkedin', href: 'https://www.linkedin.com/in/kazystatarunas', icon: 'LinkedIn' },
  { key: 'email', href: 'mailto:kazysdzigantatarunas@outlook.com', icon: 'Mail' },
  { key: 'discord', copy: 'kazys_', icon: 'Discord' },
  { key: 'whatsapp', href: 'https://wa.me/5511934812006', icon: 'WhatsApp' },
]

/**
 * Per-project wiring (image + links). Order MUST match `projects.items`
 * in the locale files so the two are zipped together by index.
 */
export type ProjectMeta = { image: string; href: string; live?: string }
export const projectMeta: ProjectMeta[] = [
  { image: passwordManager, href: 'https://github.com/Kazxye/PasswordManager' },
  { image: dllInjector, href: 'https://github.com/Kazxye/Kazz-Injector' },
  { image: phishGuard, href: 'https://github.com/Kazxye/PhishGuard' },
  { image: networkRadar, href: 'https://github.com/Kazxye/Network-Radar' },
  {
    image: solarHub,
    href: 'https://github.com/Kazxye/SolarHub',
    live: 'https://v0-solar-hub-tau.vercel.app',
  },
]

/* ---- Shapes for translated content read with t(..., { returnObjects: true }) ---- */

export type StatItem = { value: string; label: string }
export type MetaItem = { label: string; value: string }
export type ProjectItem = {
  title: string
  category: string
  description: string
  stack: string[]
}
export type ExpertiseItem = { tag: string; name: string; description: string }
export type TechCategory = { name: string; items: string[] }
export type ProcessItem = { index: string; title: string; description: string }
export type EducationTrack = { name: string; detail: string }
export type Certificate = { name: string; issuer: string }
export type FaqItem = { question: string; answer: string }
