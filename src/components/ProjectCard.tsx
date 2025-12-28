import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Shield, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../i18n';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'security' | 'gaming' | 'web';
  highlights: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const getCategoryIcon = () => {
    switch (project.category) {
      case 'security':
        return <Shield size={16} />;
      case 'gaming':
        return <Gamepad2 size={16} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Card */}
      <motion.div
        className="group relative bg-surface rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 cursor-pointer card-shine"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 glass rounded-full">
            <span className="text-accent">{getCategoryIcon()}</span>
            <span className="text-xs text-text-secondary capitalize">
              {t.projects.categories[project.category]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
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
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
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
                  src={project.image}
                  alt={project.title}
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
                      <span className="text-accent">{getCategoryIcon()}</span>
                      <span className="text-sm text-text-muted capitalize">
                        {t.projects.categories[project.category]}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-text-primary">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed mb-6">
                  {project.fullDescription}
                </p>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                      {t.projects.highlights}
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, index) => (
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
                    {project.tags.map((tag) => (
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
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-surface-light hover:bg-border text-text-primary rounded-xl transition-colors"
                    >
                      <Github size={18} />
                      <span className="font-medium">{t.projects.viewCode}</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="font-medium">{t.projects.viewProject}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
