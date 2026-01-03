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
