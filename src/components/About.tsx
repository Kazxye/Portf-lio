import { motion } from 'framer-motion';
import { Shield, Gamepad2, GraduationCap, Terminal } from 'lucide-react';
import { useLanguage } from '../i18n';

const About = () => {
  const { t } = useLanguage();

  const skills = {
    languages: ['Python', 'C', 'C++', 'TypeScript'],
    frontend: ['React', 'Tailwind CSS', 'Framer Motion'],
    backend: ['FastAPI', 'Node.js', 'Git', 'Discord API'],
    interests: ['Cybersecurity', 'Gaming Tools', 'Reverse Engineering', 'OSINT'],
  };

  const allSkills = [...skills.languages, ...skills.frontend, ...skills.backend];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
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
            {t.about.label}
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-4">
            {t.about.title} <span className="text-gradient">{t.about.titleHighlight}</span>?
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Bio - Span 2 columns */}
          <motion.div
            className="md:col-span-2 lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-surface to-surface/50 border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-mono text-sm">about.me</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.about.bio1}
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.about.bio2}
            </p>
            <p className="text-text-muted leading-relaxed text-sm">
              {t.about.bio3}
            </p>
          </motion.div>

          {/* FIAP Card */}
          <motion.div
            className="p-6 rounded-2xl bg-surface border border-border/50 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div>
              <GraduationCap className="text-accent mb-4" size={28} />
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                {t.about.highlights.software.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t.about.highlights.software.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/50">
              <span className="text-xs font-mono text-text-muted">2024 - 2028</span>
            </div>
          </motion.div>

          {/* Left Column - Security + Gaming stacked */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Security Focus */}
            <motion.div
              className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Shield className="text-accent mb-4" size={28} />
              <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                {t.about.highlights.security.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t.about.highlights.security.description}
              </p>
            </motion.div>

            {/* Gaming Tools */}
            <motion.div
              className="flex-1 p-6 rounded-2xl bg-surface border border-border/50 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl" />
              <Gamepad2 className="text-accent mb-4" size={28} />
              <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                {t.about.highlights.gaming.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t.about.highlights.gaming.description}
              </p>
            </motion.div>
          </div>

          {/* Skills Cloud - Span 2 columns */}
          <motion.div
            className="md:col-span-1 lg:col-span-2 p-8 rounded-2xl bg-surface border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-accent" size={20} />
              <span className="text-text-primary font-semibold">{t.about.skillsTitle}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 text-sm text-text-secondary bg-surface-light hover:bg-accent/10 hover:text-accent rounded-full border border-border/50 hover:border-accent/30 transition-all duration-200 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.03, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Interests as subtle tags */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3 block">
                {t.about.skillCategories.interests}
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 text-xs text-accent/70 bg-accent/5 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
