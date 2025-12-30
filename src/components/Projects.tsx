import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shield, Gamepad2, Github, X } from 'lucide-react';
import { useLanguage } from '../i18n';
import lootLoggerImage from '../assets/lootlogger.png';
import ethicalStealerImage from '../assets/ethicalstealer.png';
import networkRadarImage from '../assets/networkradar.png';

const Projects = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 'network-radar',
      title: 'Network Radar',
      shortDescription: t.projectDetails.networkRadar.shortDescription,
      fullDescription: t.projectDetails.networkRadar.fullDescription,
      image: networkRadarImage,
      tags: ['React', 'TypeScript', 'FastAPI', 'Scapy', 'WebSocket', 'Pydantic'],
      githubUrl: 'https://github.com/Kazxye/Network-Radar',
      category: 'security' as const,
      highlights: t.projectDetails.networkRadar.highlights,
    },
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

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getProjectIndex = (offset: number) => {
    return (currentIndex + offset + projects.length) % projects.length;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security':
        return <Shield size={14} />;
      case 'gaming':
        return <Gamepad2 size={14} />;
      default:
        return null;
    }
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8">
          {/* Left Arrow */}
          <button
            onClick={prevProject}
            className="flex-shrink-0 p-3 rounded-full bg-surface border border-border hover:border-accent/50 text-text-secondary hover:text-accent transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center gap-4 md:gap-6 overflow-hidden py-4">
            {/* Previous Card (Preview) */}
            <motion.div
              key={`prev-${getProjectIndex(-1)}`}
              className="hidden lg:block flex-shrink-0 w-64 cursor-pointer"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.4, scale: 0.85, x: 0 }}
              whileHover={{ opacity: 0.6, scale: 0.88 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={prevProject}
            >
              <div className="bg-surface rounded-2xl overflow-hidden border border-border">
                <div className="h-36 overflow-hidden">
                  <img
                    src={projects[getProjectIndex(-1)].image}
                    alt={projects[getProjectIndex(-1)].title}
                    className="w-full h-full object-cover blur-[1px]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-text-secondary truncate">
                    {projects[getProjectIndex(-1)].title}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Current Card (Main) */}
            <motion.div
              key={currentIndex}
              className="flex-shrink-0 w-full max-w-md md:max-w-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setIsModalOpen(true)}
            >
              <div className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
                  <motion.img
                    key={`img-${currentIndex}`}
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                  
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-border/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="text-accent">{getCategoryIcon(currentProject.category)}</span>
                    <span className="text-xs text-text-secondary capitalize">
                      {t.projects.categories[currentProject.category]}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    key={`title-${currentIndex}`}
                    className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                  >
                    {currentProject.title}
                  </motion.h3>
                  <motion.p
                    key={`desc-${currentIndex}`}
                    className="text-text-secondary text-sm leading-relaxed mb-4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                  >
                    {currentProject.shortDescription}
                  </motion.p>

                  {/* Tags */}
                  <motion.div
                    key={`tags-${currentIndex}`}
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                  >
                    {currentProject.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Next Card (Preview) */}
            <motion.div
              key={`next-${getProjectIndex(1)}`}
              className="hidden lg:block flex-shrink-0 w-64 cursor-pointer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.4, scale: 0.85, x: 0 }}
              whileHover={{ opacity: 0.6, scale: 0.88 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={nextProject}
            >
              <div className="bg-surface rounded-2xl overflow-hidden border border-border">
                <div className="h-36 overflow-hidden">
                  <img
                    src={projects[getProjectIndex(1)].image}
                    alt={projects[getProjectIndex(1)].title}
                    className="w-full h-full object-cover blur-[1px]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-text-secondary truncate">
                    {projects[getProjectIndex(1)].title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextProject}
            className="flex-shrink-0 p-3 rounded-full bg-surface border border-border hover:border-accent/50 text-text-secondary hover:text-accent transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-accent w-8'
                  : 'bg-border hover:bg-text-muted w-2'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Project Counter */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-text-muted text-sm font-mono">
            {currentIndex + 1} / {projects.length}
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary hover:bg-surface-light rounded-lg transition-colors z-10"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent">{getCategoryIcon(currentProject.category)}</span>
                    <span className="text-sm text-text-muted capitalize">
                      {t.projects.categories[currentProject.category]}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-text-primary">
                    {currentProject.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-6">
                {currentProject.fullDescription}
              </p>

              {/* Highlights */}
              {currentProject.highlights.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                    {t.projects.highlights}
                  </h4>
                  <ul className="space-y-2">
                    {currentProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-text-secondary text-sm">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                  {t.projects.technologies}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm font-mono text-accent bg-accent/10 border border-accent/20 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-surface-light hover:bg-border text-text-primary rounded-xl transition-colors"
                  >
                    <Github size={18} />
                    <span className="font-medium">{t.projects.viewCode}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
