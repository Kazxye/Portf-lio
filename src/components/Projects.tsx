import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import lootLoggerImage from '../assets/lootlogger.png';
import ethicalStealerImage from '../assets/ethicalstealer.png';

const projects = [
  {
    id: 'loot-logger',
    title: 'Loot Logger',
    shortDescription: 'Sistema avançado de logging para Albion Online com interface moderna e integração Discord.',
    fullDescription: 'Aplicação sofisticada em Python para monitoramento e registro de loot em Albion Online. O sistema utiliza captura de pacotes em tempo real para rastrear itens obtidos durante sessões de jogo, oferecendo uma interface gráfica moderna e intuitiva com recursos de segurança de nível comercial.',
    image: lootLoggerImage,
    tags: ['Python', 'Scapy', 'CustomTkinter', 'Discord API', 'Threading'],
    githubUrl: 'https://github.com/Kazxye/Loot-Logger-Albion-Online',
    category: 'gaming' as const,
    highlights: [
      'Captura de pacotes em tempo real usando Scapy',
      'Interface gráfica moderna com CustomTkinter',
      'Integração com Discord via webhooks para notificações',
      'Sistema de autenticação por token',
      'Proteções de segurança comerciais implementadas',
      'Suporte a múltiplas sessões simultâneas',
    ],
  },
  {
    id: 'ethical-stealer',
    title: 'Ethical Stealer',
    shortDescription: 'Ferramenta educacional de coleta de informações para estudo de vulnerabilidades e segurança.',
    fullDescription: 'Projeto desenvolvido exclusivamente para fins educacionais, demonstrando técnicas de coleta de informações do sistema utilizadas em análises de segurança. A ferramenta ilustra como dados podem ser coletados de sistemas para conscientizar desenvolvedores sobre a importância da proteção de dados sensíveis. Todo o código é documentado com explicações didáticas sobre cada técnica utilizada.',
    image: ethicalStealerImage,
    tags: ['Python', 'Discord API', 'System Analysis', 'Network', 'Security Research'],
    githubUrl: 'https://github.com/Kazxye/Ethical-Stealer',
    category: 'security' as const,
    highlights: [
      'Coleta de informações de hardware e sistema operacional',
      'Análise de configurações de rede e conexões ativas',
      'Integração com Discord para demonstração de exfiltração',
      'Código totalmente documentado para fins de aprendizado',
      'Desenvolvido seguindo princípios de ethical hacking',
      'Ideal para estudantes de cybersecurity entenderem vetores de ataque',
    ],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-accent font-mono text-sm uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Portfólio
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-6">
            Projetos em <span className="text-gradient">Destaque</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes em desenvolvimento de software,
            com foco em soluções criativas para gaming e segurança da informação.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* More Projects Coming Soon */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-text-muted text-sm">
            Mais projetos em breve...
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
