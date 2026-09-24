// Project registry. Only facts confirmed in each repository go here.
// Step 1 uses slug, name, domain and repo (hero topology); later steps extend it.
export type Project = {
  slug: string
  name: string
  domain: string
  repo: string
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'vaultkeeper',
    name: 'VaultKeeper',
    domain: 'client-side encryption',
    repo: 'https://github.com/Kazxye/PasswordManager',
    featured: true,
  },
  {
    slug: 'phishguard',
    name: 'PhishGuard',
    domain: 'phishing detection',
    repo: 'https://github.com/Kazxye/PhishGuard',
    featured: true,
  },
  {
    slug: 'kazz-injector',
    name: 'Kazz Injector',
    domain: 'windows internals',
    repo: 'https://github.com/Kazxye/Kazz-Injector',
    featured: true,
  },
  {
    slug: 'network-radar',
    name: 'Network Radar',
    domain: 'lan discovery',
    repo: 'https://github.com/Kazxye/Network-Radar',
    featured: false,
  },
]
