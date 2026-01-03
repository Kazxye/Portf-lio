import lootLoggerImage from '../assets/lootlogger.png';
import ethicalStealerImage from '../assets/ethicalstealer.png';
import networkRadarImage from '../assets/networkradar.png';
import phishGuardImage from '../assets/phishguard.png';
import dllInjectorImage from '../assets/dllinjector.png';

export type ProjectCategory = 'security' | 'gaming' | 'tools';

export interface Project {
  id: string;
  title: string;
  image: string;
  tags: string[];
  githubUrl: string;
  category: ProjectCategory;
  featured: boolean;
  dateAdded: string;
  translationKey: string;
}

export const projects: Project[] = [
  {
    id: 'dll-injector',
    title: 'DLL Injector',
    image: dllInjectorImage,
    tags: ['C++', 'Win32 API', 'Windows', 'Reverse Engineering'],
    githubUrl: 'https://github.com/Kazxye/Kazz-Injector',
    category: 'tools',
    featured: true,
    dateAdded: '2026-01-03',
    translationKey: 'dllInjector',
  },
  {
    id: 'phish-guard',
    title: 'PhishGuard',
    image: phishGuardImage,
    tags: ['Python', 'FastAPI', 'TypeScript', 'Browser Extension', 'REST API'],
    githubUrl: 'https://github.com/Kazxye/PhishGuard',
    category: 'security',
    featured: true,
    dateAdded: '2025-12-28',
    translationKey: 'phishGuard',
  },
  {
    id: 'network-radar',
    title: 'Network Radar',
    image: networkRadarImage,
    tags: ['React', 'TypeScript', 'FastAPI', 'Scapy', 'WebSocket', 'Pydantic'],
    githubUrl: 'https://github.com/Kazxye/Network-Radar',
    category: 'security',
    featured: true,
    dateAdded: '2025-12-20',
    translationKey: 'networkRadar',
  },
  {
    id: 'loot-logger',
    title: 'Loot Logger',
    image: lootLoggerImage,
    tags: ['Python', 'Scapy', 'CustomTkinter', 'Discord API', 'Threading'],
    githubUrl: 'https://github.com/Kazxye/Loot-Logger-Albion-Online',
    category: 'gaming',
    featured: true,
    dateAdded: '2025-11-15',
    translationKey: 'lootLogger',
  },
  {
    id: 'ethical-stealer',
    title: 'Ethical Stealer',
    image: ethicalStealerImage,
    tags: ['Python', 'Discord API', 'System Analysis', 'Network', 'Security Research'],
    githubUrl: 'https://github.com/Kazxye/Ethical-Stealer',
    category: 'security',
    featured: false,
    dateAdded: '2025-10-01',
    translationKey: 'ethicalStealer',
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: ProjectCategory) => projects.filter(p => p.category === category);
