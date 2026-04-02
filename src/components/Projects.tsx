import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Gamepad2, Wrench, Github, X, ArrowRight, ArrowUpRight, Globe, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n';
import { getFeaturedProjects, ProjectCategory } from '../data/projects';

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const projects = getFeaturedProjects();

  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'security': return <Shield size={14} />;
      case 'gaming': return <Gamepad2 size={14} />;
      case 'tools': return <Wrench size={14} />;
      case 'web': return <Globe size={14} />;
      default: return null;
    }
  };

  const getProjectTranslation = (key: string) => {
    const details = t.projectDetails as Record<string, {
      shortDescription: string;
      problem: string;
      fullDescription: string;
      highlights: string[];
    }>;
    return details[key];
  };

  const selectedProject = selectedProjectId
    ? projects.find(p => p.id === selectedProjectId)
    : null;

  const featured = projects[0]; // First featured project gets hero treatment
  const rest = projects.slice(1);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16"
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
            {'>_ '}{t.projects.label}
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-4">
            {t.projects.title}{' '}
            <span className="text-gradient">{t.projects.titleHighlight}</span>
          </h2>
          <p className="text-text-muted max-w-xl text-[15px]">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Featured Project — Large Hero Card */}
        <motion.div
          className="mb-8 cursor-pointer group card-trace"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onClick={() => setSelectedProjectId(featured.id)}
        >
          <div className="relative rounded-2xl overflow-hidden border border-border group-hover:border-accent/30 transition-all duration-500 bg-surface group-hover:shadow-[0_12px_40px_rgba(139,92,246,0.09)]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-auto lg:min-h-[360px] overflow-hidden">
                <motion.img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:hidden" />
                
                {/* Category + Client Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-full border border-border/50">
                    <span className="text-accent">{getCategoryIcon(featured.category)}</span>
                    <span className="text-xs text-text-secondary capitalize font-medium">
                      {t.projects.categories[featured.category]}
                    </span>
                  </div>
                  {featured.isClientWork && (
                    <div className="px-2.5 py-1 bg-accent/90 text-white text-[10px] font-bold rounded-full font-mono tracking-wider">
                      CLIENT
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  {featured.title}
                </h3>

                {/* Problem */}
                <div className="mb-4">
                  <span className="text-xs font-mono text-accent/60 uppercase tracking-wider">
                    {t.projects.problem}
                  </span>
                  <p className="text-text-secondary text-sm leading-relaxed mt-1">
                    {getProjectTranslation(featured.translationKey)?.problem}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {getProjectTranslation(featured.translationKey)?.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono text-accent/80 bg-accent/5 border border-accent/10 rounded-md"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center gap-2 text-sm text-text-muted group-hover:text-accent transition-colors">
                  <span className="font-medium font-mono text-xs tracking-wide uppercase">
                    {t.projects.viewCode} →
                  </span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Remaining Projects — Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project, index) => {
            const translation = getProjectTranslation(project.translationKey);
            return (
              <motion.div
                key={project.id}
                className="cursor-pointer group card-trace"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <div className="h-full rounded-2xl overflow-hidden border border-border group-hover:border-accent/25 transition-all duration-400 bg-surface group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.08)]">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-background/80 backdrop-blur-md rounded-full border border-border/50">
                      <span className="text-accent">{getCategoryIcon(project.category)}</span>
                      <span className="text-xs text-text-secondary capitalize font-medium">
                        {t.projects.categories[project.category]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Problem — one-liner */}
                    <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                      {translation?.problem}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-xs font-mono text-accent/70 bg-accent/5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-0.5 text-xs font-mono text-text-muted">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Hover action */}
                    <div className="flex items-center gap-1.5 text-xs text-text-muted group-hover:text-accent transition-colors font-mono tracking-wide">
                      <span>View Details</span>
                      <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/projects">
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 text-text-secondary hover:text-accent transition-colors duration-300 font-medium group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t.projects.viewMore}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Modal — Case Study Detail */}
      <AnimatePresence>
        {selectedProject && (() => {
          const project = selectedProject;
          const translation = getProjectTranslation(project.translationKey);
          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-background/95 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProjectId(null)}
              />

              <motion.div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              >
                {/* Close */}
                <motion.button
                  onClick={() => setSelectedProjectId(null)}
                  className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary bg-surface/80 backdrop-blur-sm hover:bg-surface-light rounded-full transition-colors z-10 border border-border/50"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>

                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent">{getCategoryIcon(project.category)}</span>
                    <span className="text-sm text-text-muted capitalize">
                      {t.projects.categories[project.category]}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-text-primary mb-5">
                    {project.title}
                  </h2>

                  {/* Problem */}
                  <div className="mb-5 p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1.5">
                      {t.projects.problem}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {translation?.problem}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary leading-relaxed mb-6 text-[15px]">
                    {translation?.fullDescription}
                  </p>

                  {/* Highlights */}
                  {translation?.highlights && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider font-mono">
                        {t.projects.highlights}
                      </h4>
                      <ul className="space-y-2">
                        {translation.highlights.map((highlight, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3 text-text-secondary text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.04 }}
                          >
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Stack */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider font-mono">
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
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-surface-light hover:bg-border text-text-primary rounded-xl transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={18} />
                      <span className="font-medium">{t.projects.viewCode}</span>
                    </motion.a>
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink size={18} />
                        <span className="font-medium">Live</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
