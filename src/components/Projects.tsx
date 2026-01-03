import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Shield, Gamepad2, Wrench, Github, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';
import { getFeaturedProjects, ProjectCategory } from '../data/projects';

const Projects = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = getFeaturedProjects();

  const navigate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return (prev + 1) % projects.length;
      }
      return (prev - 1 + projects.length) % projects.length;
    });
  };

  const goToProject = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const getProjectIndex = (offset: number) => {
    return (currentIndex + offset + projects.length) % projects.length;
  };

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

  const currentProject = projects[currentIndex];

  // Get translations for current project
  const getProjectTranslation = (key: string) => {
    const details = t.projectDetails as Record<string, {
      shortDescription: string;
      fullDescription: string;
      highlights: string[];
    }>;
    return details[key];
  };

  const projectTranslation = getProjectTranslation(currentProject.translationKey);

  // Animation variants
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? -15 : 15,
    }),
  };

  const sideCardVariants = {
    initial: (side: 'left' | 'right') => ({
      opacity: 0,
      x: side === 'left' ? -50 : 50,
      scale: 0.8,
    }),
    animate: {
      opacity: 0.5,
      x: 0,
      scale: 0.85,
    },
    hover: {
      opacity: 0.7,
      scale: 0.88,
      transition: { duration: 0.2 },
    },
  };

  const arrowVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  };

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
        <div className="relative flex items-center justify-center gap-6 md:gap-10">
          {/* Left Arrow */}
          <motion.button
            onClick={() => navigate(-1)}
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex-shrink-0 p-4 rounded-full bg-surface/80 backdrop-blur-sm border border-border hover:border-accent/50 text-text-secondary hover:text-accent transition-colors duration-300 z-10 shadow-lg shadow-background/50"
            aria-label="Previous project"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </motion.button>

          {/* Cards Container */}
          <div className="flex items-center justify-center gap-6 overflow-hidden py-8" style={{ perspective: '1000px' }}>
            {/* Previous Card (Preview) */}
            <motion.div
              key={`prev-${getProjectIndex(-1)}`}
              custom="left"
              variants={sideCardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block flex-shrink-0 w-56 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <div className="bg-surface rounded-2xl overflow-hidden border border-border/50 shadow-xl shadow-background/30">
                <div className="h-32 overflow-hidden">
                  <img
                    src={projects[getProjectIndex(-1)].image}
                    alt={projects[getProjectIndex(-1)].title}
                    className="w-full h-full object-cover filter brightness-75"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-display text-sm font-medium text-text-muted truncate">
                    {projects[getProjectIndex(-1)].title}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Current Card (Main) */}
            <div className="flex-shrink-0 w-full max-w-md md:max-w-lg" style={{ transformStyle: 'preserve-3d' }}>
              <AnimatePresence 
                mode="wait" 
                custom={direction}
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 shadow-2xl shadow-background/50 hover:shadow-accent/10">
                    {/* Image */}
                    <div className="relative h-52 md:h-60 overflow-hidden">
                      <motion.img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                      
                      {/* Category Badge */}
                      <motion.div 
                        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-md rounded-full border border-border/50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <span className="text-accent">{getCategoryIcon(currentProject.category)}</span>
                        <span className="text-xs text-text-secondary capitalize font-medium">
                          {t.projects.categories[currentProject.category]}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <motion.h3
                        className="font-display text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      >
                        {currentProject.title}
                      </motion.h3>
                      <motion.p
                        className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        {projectTranslation?.shortDescription}
                      </motion.p>

                      {/* Tags */}
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        {currentProject.tags.slice(0, 3).map((tag, i) => (
                          <motion.span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Card (Preview) */}
            <motion.div
              key={`next-${getProjectIndex(1)}`}
              custom="right"
              variants={sideCardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block flex-shrink-0 w-56 cursor-pointer"
              onClick={() => navigate(1)}
            >
              <div className="bg-surface rounded-2xl overflow-hidden border border-border/50 shadow-xl shadow-background/30">
                <div className="h-32 overflow-hidden">
                  <img
                    src={projects[getProjectIndex(1)].image}
                    alt={projects[getProjectIndex(1)].title}
                    className="w-full h-full object-cover filter brightness-75"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-display text-sm font-medium text-text-muted truncate">
                    {projects[getProjectIndex(1)].title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={() => navigate(1)}
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex-shrink-0 p-4 rounded-full bg-surface/80 backdrop-blur-sm border border-border hover:border-accent/50 text-text-secondary hover:text-accent transition-colors duration-300 z-10 shadow-lg shadow-background/50"
            aria-label="Next project"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-10">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToProject(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'bg-accent w-10'
                  : 'bg-border/60 hover:bg-text-muted w-2.5'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
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
          <p className="text-text-muted text-sm font-mono tracking-wider">
            <span className="text-accent font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-border">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </p>
        </motion.div>

        {/* View All Projects Link */}
        <motion.div
          className="mt-12 text-center"
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              onClick={() => setIsModalOpen(false)}
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
                onClick={() => setIsModalOpen(false)}
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
                  {projectTranslation?.fullDescription}
                </p>

                {/* Highlights */}
                {projectTranslation?.highlights && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                      {t.projects.highlights}
                    </h4>
                    <ul className="space-y-2">
                      {projectTranslation.highlights.map((highlight, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-3 text-text-secondary text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          {highlight}
                        </motion.li>
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
    </section>
  );
};

export default Projects;
