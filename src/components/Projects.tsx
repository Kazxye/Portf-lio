import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useLanguage } from '../i18n';
import lootLoggerImage from '../assets/lootlogger.png';
import ethicalStealerImage from '../assets/ethicalstealer.png';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 'loot-logger',
      title: 'Loot Logger',
      shortDescription: t.projectDetails.lootLogger.shortDescription,
      fullDescription: t.projectDetails.lootLogger.fullDescription,
      image: lootLoggerImage,
      tags: ['Python', 'Scapy', 'CustomTkinter', 'Discord API', 'Threading'],
      githubUrl: 'https://github.com/Kazxye/Loot-Logger-Albion-Online',
      category: 'gaming' as const,
      highlights: t.projectDetails.lootLogger.highlights,
    },
    {
      id: 'ethical-stealer',
      title: 'Ethical Stealer',
      shortDescription: t.projectDetails.ethicalStealer.shortDescription,
      fullDescription: t.projectDetails.ethicalStealer.fullDescription,
      image: ethicalStealerImage,
      tags: ['Python', 'Discord API', 'System Analysis', 'Network', 'Security Research'],
      githubUrl: 'https://github.com/Kazxye/Ethical-Stealer',
      category: 'security' as const,
      highlights: t.projectDetails.ethicalStealer.highlights,
    },
  ];

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
            {t.projects.label}
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-6">
            {t.projects.title} <span className="text-gradient">{t.projects.titleHighlight}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t.projects.description}
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
            {t.projects.moreComingSoon}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
