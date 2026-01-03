export const translations = {
  'pt-BR': {
    // Header
    nav: {
      home: 'Início',
      projects: 'Projetos',
      about: 'Sobre',
      contact: 'Contato',
    },

    // Hero
    hero: {
      badge: 'Buscando oportunidades',
      greeting: 'Olá, eu sou o',
      role: 'Software Engineering Student',
      description: 'Entusiasta de',
      skill1: 'cybersecurity',
      connector: 'e',
      skill2: 'engenharia de software',
      descriptionEnd: '. Transformando ideias em códigos que fazem a diferença.',
      viewProjects: 'Ver Projetos',
      contact: 'Entre em Contato',
      scroll: 'Scroll',
    },

    // Projects
    projects: {
      label: 'Portfólio',
      title: 'Projetos em',
      titleHighlight: 'Destaque',
      description: 'Uma seleção dos meus trabalhos mais recentes em desenvolvimento de software, com foco em soluções criativas para gaming e segurança da informação.',
      moreComingSoon: 'Mais projetos em breve...',
      viewMore: 'Ver todos os projetos',
      viewCode: 'Ver Código',
      viewProject: 'Ver Projeto',
      highlights: 'Destaques',
      technologies: 'Tecnologias',
      allProjects: 'Todos os Projetos',
      filterAll: 'Todos',
      categories: {
        security: 'security',
        gaming: 'gaming',
        web: 'web',
        tools: 'tools',
      },
    },

    // Updates
    updates: {
      label: 'Changelog',
      title: 'Atualizações',
      titleHighlight: 'Recentes',
      newProject: 'Novo projeto',
      update: 'Atualização',
      launch: 'Lançamento',
    },

    // Project Details
    projectDetails: {
      lootLogger: {
        shortDescription: 'Sistema avançado de logging para Albion Online com interface moderna e integração Discord.',
        fullDescription: 'Aplicação sofisticada em Python para monitoramento e registro de loot em Albion Online. O sistema utiliza captura de pacotes em tempo real para rastrear itens obtidos durante sessões de jogo, oferecendo uma interface gráfica moderna e intuitiva com recursos de segurança de nível comercial.',
        highlights: [
          'Captura de pacotes em tempo real usando Scapy',
          'Interface gráfica moderna com CustomTkinter',
          'Integração com Discord via webhooks para notificações',
          'Sistema de autenticação por token',
          'Proteções de segurança comerciais implementadas',
          'Suporte a múltiplas sessões simultâneas',
        ],
      },
      ethicalStealer: {
        shortDescription: 'Ferramenta educacional de coleta de informações para estudo de vulnerabilidades e segurança.',
        fullDescription: 'Projeto desenvolvido exclusivamente para fins educacionais, demonstrando técnicas de coleta de informações do sistema utilizadas em análises de segurança. A ferramenta ilustra como dados podem ser coletados de sistemas para conscientizar desenvolvedores sobre a importância da proteção de dados sensíveis. Todo o código é documentado com explicações didáticas sobre cada técnica utilizada.',
        highlights: [
          'Coleta de informações de hardware e sistema operacional',
          'Análise de configurações de rede e conexões ativas',
          'Integração com Discord para demonstração de exfiltração',
          'Código totalmente documentado para fins de aprendizado',
          'Desenvolvido seguindo princípios de ethical hacking',
          'Ideal para estudantes de cybersecurity entenderem vetores de ataque',
        ],
      },
      networkRadar: {
        shortDescription: 'Sistema fullstack de monitoramento de rede em tempo real com dashboard interativo e detecção de dispositivos.',
        fullDescription: 'Aplicação completa para descoberta e monitoramento de dispositivos na rede local. Utiliza técnicas de escaneamento ARP/ICMP para identificar hosts ativos, exibindo informações detalhadas como IP, MAC, fabricante e latência em um dashboard moderno com atualizações em tempo real via WebSocket.',
        highlights: [
          'Escaneamento de rede via ARP e ICMP com Scapy',
          'Dashboard em tempo real com React e WebSocket',
          'Identificação automática de fabricantes via MAC address',
          'Monitoramento de latência e status dos dispositivos',
          'API REST com FastAPI e validação via Pydantic',
          'Interface responsiva com visualização de topologia',
        ],
      },
      phishGuard: {
        shortDescription: 'Sistema de detecção de phishing em tempo real com extensão de navegador e REST API.',
        fullDescription: 'Sistema completo de proteção contra phishing composto por uma API REST desenvolvida em Python com FastAPI e uma extensão para navegadores Chromium em TypeScript. Analisa URLs em tempo real utilizando múltiplas técnicas de detecção, incluindo verificação de domínios suspeitos, análise de padrões maliciosos e machine learning.',
        highlights: [
          'API REST de alta performance com FastAPI e Python 3.12+',
          'Extensão de navegador desenvolvida em TypeScript',
          'Detecção de phishing em tempo real durante navegação',
          'Análise de URLs com múltiplos algoritmos de verificação',
          'Compatível com Chrome, Edge e navegadores Chromium',
          'Arquitetura modular e bem documentada',
        ],
      },
      dllInjector: {
        shortDescription: 'Ferramenta avançada para injeção de DLLs em processos Windows com interface moderna.',
        fullDescription: 'Ferramenta desenvolvida para fins educacionais que demonstra técnicas de injeção de DLL em processos Windows. Utiliza métodos como LoadLibrary e Manual Mapping, com uma interface gráfica moderna e intuitiva. Ideal para estudantes de segurança e engenharia reversa entenderem como funcionam técnicas de injeção de código.',
        highlights: [
          'Múltiplos métodos de injeção (LoadLibrary, Manual Mapping)',
          'Interface gráfica moderna e intuitiva',
          'Seleção de processos em tempo real',
          'Desenvolvido em C++ com Win32 API',
          'Código documentado para fins educacionais',
          'Ideal para estudos de engenharia reversa',
        ],
      },
    },

    // About
    about: {
      label: 'Sobre Mim',
      title: 'Quem é',
      titleHighlight: 'Kazys',
      bio1: 'Sou um estudante de Engenharia de Software na FIAP, atualmente no terceiro semestre, com uma paixão genuína por entender como as coisas funcionam — especialmente quando envolve código, segurança e games.',
      bio2: 'Minha jornada na programação começou com curiosidade e evoluiu para projetos práticos que combinam meus interesses: desde ferramentas para jogos até estudos de segurança da informação.',
      bio3: 'Acredito que a melhor forma de aprender é construindo. Cada projeto que desenvolvo é uma oportunidade de explorar novas tecnologias, resolver problemas reais e contribuir para a comunidade.',
      skillsTitle: 'Stack & Habilidades',
      highlights: {
        software: {
          title: 'Engenharia de Software',
          description: 'Estudante na FIAP, com previsão de formatura em 2028. Focado em construir uma base sólida em desenvolvimento.',
        },
        security: {
          title: 'Cybersecurity',
          description: 'Interesse profundo em ethical hacking, análise de vulnerabilidades e proteção de sistemas.',
        },
        gaming: {
          title: 'Ferramentas para Jogos',
          description: 'Desenvolvimento de ferramentas de auxílio e monitoramento para diversos jogos.',
        },
        code: {
          title: 'Código Limpo',
          description: 'Comprometido com boas práticas, documentação clara e código que outros desenvolvedores podem entender.',
        },
      },
      skillCategories: {
        languages: 'Linguagens',
        frontend: 'Frontend',
        backend: 'Backend & Tools',
        interests: 'Interesses',
      },
    },

    // Contact
    contact: {
      label: 'Contato',
      title: 'Vamos',
      titleHighlight: 'Conversar',
      description: 'Estou sempre aberto a novas oportunidades, colaborações em projetos interessantes ou simplesmente trocar uma ideia sobre tecnologia.',
      location: 'São Paulo, Brasil',
      sendMessage: 'Enviar Mensagem',
    },

    // Footer
    footer: {
      backToTop: 'Voltar ao topo',
    },
  },

  'en': {
    // Header
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },

    // Hero
    hero: {
      badge: 'Looking for opportunities',
      greeting: "Hi, I'm",
      role: 'Software Engineering Student',
      description: 'Enthusiast of',
      skill1: 'cybersecurity',
      connector: 'and',
      skill2: 'software engineering',
      descriptionEnd: '. Turning ideas into code that makes a difference.',
      viewProjects: 'View Projects',
      contact: 'Get in Touch',
      scroll: 'Scroll',
    },

    // Projects
    projects: {
      label: 'Portfolio',
      title: 'Featured',
      titleHighlight: 'Projects',
      description: 'A selection of my most recent work in software development, focusing on creative solutions for gaming and information security.',
      moreComingSoon: 'More projects coming soon...',
      viewMore: 'View all projects',
      viewCode: 'View Code',
      viewProject: 'View Project',
      highlights: 'Highlights',
      technologies: 'Technologies',
      allProjects: 'All Projects',
      filterAll: 'All',
      categories: {
        security: 'security',
        gaming: 'gaming',
        web: 'web',
        tools: 'tools',
      },
    },

    // Updates
    updates: {
      label: 'Changelog',
      title: 'Recent',
      titleHighlight: 'Updates',
      newProject: 'New project',
      update: 'Update',
      launch: 'Launch',
    },

    // Project Details
    projectDetails: {
      lootLogger: {
        shortDescription: 'Advanced logging system for Albion Online with modern interface and Discord integration.',
        fullDescription: 'Sophisticated Python application for monitoring and logging loot in Albion Online. The system uses real-time packet capture to track items obtained during gaming sessions, offering a modern and intuitive graphical interface with commercial-grade security features.',
        highlights: [
          'Real-time packet capture using Scapy',
          'Modern graphical interface with CustomTkinter',
          'Discord integration via webhooks for notifications',
          'Token-based authentication system',
          'Commercial-grade security protections implemented',
          'Support for multiple simultaneous sessions',
        ],
      },
      ethicalStealer: {
        shortDescription: 'Educational information gathering tool for vulnerability and security studies.',
        fullDescription: 'Project developed exclusively for educational purposes, demonstrating system information gathering techniques used in security analysis. The tool illustrates how data can be collected from systems to raise awareness among developers about the importance of protecting sensitive data. All code is documented with educational explanations about each technique used.',
        highlights: [
          'Hardware and operating system information gathering',
          'Network configuration and active connections analysis',
          'Discord integration for exfiltration demonstration',
          'Fully documented code for learning purposes',
          'Developed following ethical hacking principles',
          'Ideal for cybersecurity students to understand attack vectors',
        ],
      },
      networkRadar: {
        shortDescription: 'Fullstack real-time network monitoring system with interactive dashboard and device detection.',
        fullDescription: 'Complete application for discovering and monitoring devices on the local network. Uses ARP/ICMP scanning techniques to identify active hosts, displaying detailed information such as IP, MAC, manufacturer, and latency in a modern dashboard with real-time updates via WebSocket.',
        highlights: [
          'Network scanning via ARP and ICMP with Scapy',
          'Real-time dashboard with React and WebSocket',
          'Automatic manufacturer identification via MAC address',
          'Device latency and status monitoring',
          'REST API with FastAPI and Pydantic validation',
          'Responsive interface with topology visualization',
        ],
      },
      phishGuard: {
        shortDescription: 'Real-time phishing detection system with browser extension and REST API.',
        fullDescription: 'Complete phishing protection system consisting of a REST API developed in Python with FastAPI and a Chromium browser extension in TypeScript. Analyzes URLs in real-time using multiple detection techniques, including suspicious domain verification, malicious pattern analysis, and machine learning.',
        highlights: [
          'High-performance REST API with FastAPI and Python 3.12+',
          'Browser extension developed in TypeScript',
          'Real-time phishing detection while browsing',
          'URL analysis with multiple verification algorithms',
          'Compatible with Chrome, Edge and Chromium browsers',
          'Modular and well-documented architecture',
        ],
      },
      dllInjector: {
        shortDescription: 'Advanced tool for DLL injection into Windows processes with modern interface.',
        fullDescription: 'Tool developed for educational purposes that demonstrates DLL injection techniques in Windows processes. Uses methods like LoadLibrary and Manual Mapping, with a modern and intuitive graphical interface. Ideal for security and reverse engineering students to understand how code injection techniques work.',
        highlights: [
          'Multiple injection methods (LoadLibrary, Manual Mapping)',
          'Modern and intuitive graphical interface',
          'Real-time process selection',
          'Developed in C++ with Win32 API',
          'Documented code for educational purposes',
          'Ideal for reverse engineering studies',
        ],
      },
    },

    // About
    about: {
      label: 'About Me',
      title: 'Who is',
      titleHighlight: 'Kazys',
      bio1: "I'm a Software Engineering student at FIAP, currently in my third semester, with a genuine passion for understanding how things work — especially when it involves code, security, and games.",
      bio2: 'My programming journey started with curiosity and evolved into practical projects that combine my interests: from gaming tools to information security studies.',
      bio3: 'I believe the best way to learn is by building. Every project I develop is an opportunity to explore new technologies, solve real problems, and contribute to the community.',
      skillsTitle: 'Stack & Skills',
      highlights: {
        software: {
          title: 'Software Engineering',
          description: 'Student at FIAP, expected graduation in 2028. Focused on building a solid foundation in development.',
        },
        security: {
          title: 'Cybersecurity',
          description: 'Deep interest in ethical hacking, vulnerability analysis, and system protection.',
        },
        gaming: {
          title: 'Gaming Tools',
          description: 'Development of assistance and monitoring tools for various games.',
        },
        code: {
          title: 'Clean Code',
          description: 'Committed to best practices, clear documentation, and code that other developers can understand.',
        },
      },
      skillCategories: {
        languages: 'Languages',
        frontend: 'Frontend',
        backend: 'Backend & Tools',
        interests: 'Interests',
      },
    },

    // Contact
    contact: {
      label: 'Contact',
      title: "Let's",
      titleHighlight: 'Talk',
      description: "I'm always open to new opportunities, collaborations on interesting projects, or simply exchanging ideas about technology.",
      location: 'São Paulo, Brazil',
      sendMessage: 'Send Message',
    },

    // Footer
    footer: {
      backToTop: 'Back to top',
    },
  },
};

export type Language = 'pt-BR' | 'en';
export type Translations = typeof translations['pt-BR'];
