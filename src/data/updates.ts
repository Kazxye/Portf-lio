export type UpdateType = 'newProject' | 'update' | 'launch';

export interface Update {
  id: string;
  date: string;
  time: string;
  type: UpdateType;
  titlePt: string;
  titleEn: string;
  descriptionPt?: string;
  descriptionEn?: string;
}

export const updates: Update[] = [
  {
    id: '8',
    date: '2026-03-31',
    time: '02:00',
    type: 'update',
    titlePt: 'Password Manager — Em desenvolvimento',
    titleEn: 'Password Manager — In development',
    descriptionPt: 'Gerenciador de senhas zero-knowledge com criptografia AES-256-GCM client-side.',
    descriptionEn: 'Zero-knowledge password manager with client-side AES-256-GCM encryption.',
  },
  {
    id: '7',
    date: '2026-02-09',
    time: '15:00',
    type: 'newProject',
    titlePt: 'SolarHub — Projeto para cliente',
    titleEn: 'SolarHub — Client project',
    descriptionPt: 'Frontend comercial com Next.js 16 + React 19. Em desenvolvimento.',
    descriptionEn: 'Commercial frontend with Next.js 16 + React 19. In development.',
  },
  {
    id: '6',
    date: '2026-01-03',
    time: '03:30',
    type: 'newProject',
    titlePt: 'DLL Injector',
    titleEn: 'DLL Injector',
    descriptionPt: 'Ferramenta de injeção de DLL para Windows',
    descriptionEn: 'DLL injection tool for Windows',
  },
  {
    id: '5',
    date: '2025-12-28',
    time: '14:00',
    type: 'newProject',
    titlePt: 'PhishGuard',
    titleEn: 'PhishGuard',
    descriptionPt: 'Sistema de detecção de phishing com extensão de navegador',
    descriptionEn: 'Phishing detection system with browser extension',
  },
  {
    id: '4',
    date: '2025-12-20',
    time: '10:30',
    type: 'newProject',
    titlePt: 'Network Radar',
    titleEn: 'Network Radar',
    descriptionPt: 'Monitoramento de rede em tempo real',
    descriptionEn: 'Real-time network monitoring',
  },
  {
    id: '3',
    date: '2025-12-15',
    time: '18:00',
    type: 'update',
    titlePt: 'Sistema de idiomas',
    titleEn: 'Language system',
    descriptionPt: 'Adicionado suporte PT-BR e EN',
    descriptionEn: 'Added PT-BR and EN support',
  },
  {
    id: '2',
    date: '2025-11-15',
    time: '20:00',
    type: 'newProject',
    titlePt: 'Loot Logger',
    titleEn: 'Loot Logger',
    descriptionPt: 'Sistema de logging para Albion Online',
    descriptionEn: 'Logging system for Albion Online',
  },
  {
    id: '1',
    date: '2025-11-01',
    time: '12:00',
    type: 'launch',
    titlePt: 'Portfolio lançado',
    titleEn: 'Portfolio launched',
    descriptionPt: 'Primeira versão do kazys.dev',
    descriptionEn: 'First version of kazys.dev',
  },
];

export const getRecentUpdates = (count: number = 5) => updates.slice(0, count);
