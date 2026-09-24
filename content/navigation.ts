// Home page sections. `id` must match the section element id on the home page;
// the header, the command menu and the sitemap all read from this list.
export const sections = [
  { id: 'work', label: 'Work', title: 'Selected work', keywords: ['projects', 'portfolio', 'case studies'] },
  { id: 'about', label: 'About', title: 'About', keywords: ['experience', 'education', 'background'] },
  { id: 'stack', label: 'Stack', title: 'Stack', keywords: ['skills', 'technologies', 'tools'] },
  { id: 'contact', label: 'Contact', title: 'Contact', keywords: ['email', 'reach', 'message'] },
] as const

export type SectionId = (typeof sections)[number]['id']
