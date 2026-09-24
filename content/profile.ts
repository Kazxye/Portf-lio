// Single source for identity data. Everything here is verified against the
// current site, the CV and the GitHub profile; do not add unconfirmed claims.
export const profile = {
  name: 'Kazys Tatarunas',
  role: 'Security-focused software engineer',
  summary:
    'I write backend systems, network tools and security software. I build offensive tools to understand what defenders need to catch.',
  location: 'São Paulo, Brazil',
  education: {
    program: 'Software Engineering',
    school: 'FIAP',
    start: 2025,
    end: 2028,
  },
  focus: 'Defensive security and detection',
  email: 'kazysdzigantatarunas@outlook.com',
  siteUrl: 'https://kazys.dev',
  links: {
    github: 'https://github.com/Kazxye',
    linkedin: 'https://www.linkedin.com/in/kazystatarunas',
    // Kept at the old path so links already shared to the CV keep working.
    resume: '/CV_Kazys_Tatarunas.pdf',
  },
} as const
