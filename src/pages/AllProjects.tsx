import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Gamepad2, Wrench, Github, X } from 'lucide-react';
import { useLanguage } from '../i18n';
import { projects, ProjectCategory } from '../data/projects';

const AllProjects = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filters: { key: 'all' | ProjectCategory; label: string; icon?: React.ReactNode }[] = [
    { key: 'all', label: t.projects.filterAll },
    { key: 'security', label: 'Security', icon: <Shield size={16} /> },
    { key: 'gaming', label: 'Gaming', icon: <Gamepad2 size={16} /> },
    { key: 'tools', label: 'Tools', icon: <Wrench size={16} /> },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'security':
        return <Shield size={14} />;
      case 'gaming':
        return <Gamepad2 size={14} />;
      case 'tools':
        return <Wrench size={14} />;
      default:
        return null;
    }
  };

  const currentProject = selectedProject 
    ? projects.find(p => p.id === selectedProject) 
    : null;

  // Get translations for selected project
  const getProjectTranslation = (key: string) => {
    const details = t.projectDetails as Record<string, {
      shortDescription: string;
      fullDescription: string;
      highlights: string[];
    }>;
    return details[key];
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 py-6 px-6 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="font-display text-xl font-bold">
            {t.projects.allProjects}
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-accent text-white'
                    : 'bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="bg-surface rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-background/80 backdrop-blur-sm rounded-full border border-border/50">
                        <span className="text-accent">{getCategoryIcon(project.category)}</span>
                        <span className="text-xs text-text-secondary capitalize">
                          {t.projects.categories[project.category]}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-accent/90 text-white text-xs font-medium rounded">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-muted text-sm line-clamp-2 mb-3">
                        {getProjectTranslation(project.translationKey)?.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono text-accent bg-accent/10 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-text-muted">Nenhum projeto encontrado nesta categoria.</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && currentProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary bg-surface/80 backdrop-blur-sm hover:bg-surface-light rounded-full transition-colors z-10 border border-border/50"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent">{getCategoryIcon(currentProject.category)}</span>
                  <span className="text-sm text-text-muted capitalize">
                    {t.projects.categories[currentProject.category]}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                  {currentProject.title}
                </h2>

                <p className="text-text-secondary leading-relaxed mb-6">
                  {getProjectTranslation(currentProject.translationKey)?.fullDescription}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                    {t.projects.highlights}
                  </h4>
                  <ul className="space-y-2">
                    {getProjectTranslation(currentProject.translationKey)?.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-text-secondary text-sm">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

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

                {/* Link */}
                <motion.a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface-light hover:bg-border text-text-primary rounded-xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github size={18} />
                  <span className="font-medium">{t.projects.viewCode}</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProjects;
