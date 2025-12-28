import { motion } from 'framer-motion';
import { Code2, Shield, Gamepad2, GraduationCap } from 'lucide-react';
import { useLanguage } from '../i18n';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    {
      category: t.about.skillCategories.languages,
      items: ['Python', 'C', 'C++', 'TypeScript', 'JavaScript'],
    },
    {
      category: t.about.skillCategories.frontend,
      items: ['React', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
    },
    {
      category: t.about.skillCategories.backend,
      items: ['Node.js', 'Git', 'Linux', 'Discord API'],
    },
    {
      category: t.about.skillCategories.interests,
      items: ['Cybersecurity', 'Gaming Tools', 'Reverse Engineering', 'OSINT'],
    },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: t.about.highlights.software.title,
      description: t.about.highlights.software.description,
    },
    {
      icon: Shield,
      title: t.about.highlights.security.title,
      description: t.about.highlights.security.description,
    },
    {
      icon: Gamepad2,
      title: t.about.highlights.gaming.title,
      description: t.about.highlights.gaming.description,
    },
    {
      icon: Code2,
      title: t.about.highlights.code.title,
      description: t.about.highlights.code.description,
    },
  ];

  return (
    <section id="about" className="py-32 relative bg-surface/50">
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
            {t.about.label}
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-6">
            {t.about.title} <span className="text-gradient">{t.about.titleHighlight}</span>?
          </h2>
        </motion.div>

        {/* Bio + Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-text-secondary leading-relaxed mb-6">
              {t.about.bio1}
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              {t.about.bio2}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t.about.bio3}
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 bg-surface rounded-xl border border-border hover:border-accent/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display text-2xl font-bold text-text-primary text-center mb-10">
            {t.about.skillsTitle}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.category}
                className="p-6 glass rounded-xl border-gradient"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
              >
                <h4 className="font-mono text-accent text-sm uppercase tracking-wider mb-4">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm text-text-secondary bg-surface-light rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
