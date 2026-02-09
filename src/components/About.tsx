import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../i18n';

const About = () => {
  const { t } = useLanguage();

  const tooling = t.about.tooling as {
    title: string;
    languages: { label: string; items: string[] };
    frontend: { label: string; items: string[] };
    backend: { label: string; items: string[] };
    infra: { label: string; items: string[] };
  };

  const approach = t.about.approach as {
    title: string;
    items: { label: string; desc: string }[];
  };

  const education = t.about.education as {
    school: string;
    degree: string;
    period: string;
  };

  const interests = t.about.interests as string[];

  const toolingCategories = [
    tooling.languages,
    tooling.frontend,
    tooling.backend,
    tooling.infra,
  ];

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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Bio — spans 2 cols */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-2xl bg-surface border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-accent font-mono text-xs tracking-wider">about.me</span>
            </div>
            <p className="text-text-secondary leading-[1.8] text-[15px]">
              {t.about.bio}
            </p>
          </motion.div>

          {/* Education Card */}
          <motion.div
            className="p-6 rounded-2xl bg-surface border border-border/50 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div>
              <GraduationCap className="text-accent mb-4" size={24} />
              <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
                {education.school}
              </h3>
              <p className="text-text-muted text-sm">
                {education.degree}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/30">
              <span className="text-xs font-mono text-text-muted">{education.period}</span>
            </div>
          </motion.div>

          {/* Approach — mindset cards */}
          <motion.div
            className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-accent/[0.07] to-transparent border border-accent/15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-xs font-mono text-accent/70 uppercase tracking-wider block mb-5">
              {approach.title}
            </span>
            <div className="space-y-4">
              {approach.items.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                >
                  <div className="font-mono text-sm text-text-primary font-medium mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-text-muted text-xs leading-relaxed">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tooling — monospace, terminal-style */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-2xl bg-surface border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-accent/70 uppercase tracking-wider">
                {tooling.title}
              </span>
            </div>

            <div className="space-y-3">
              {toolingCategories.map((cat, catIndex) => (
                <motion.div
                  key={cat.label}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + catIndex * 0.06 }}
                >
                  <span className="font-mono text-xs text-text-muted w-12 flex-shrink-0 pt-1.5 text-right">
                    {cat.label}
                  </span>
                  <span className="text-border/60 pt-1 flex-shrink-0">→</span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <motion.span
                        key={item}
                        className="px-3 py-1.5 text-sm text-text-secondary bg-surface-light hover:bg-accent/10 hover:text-accent rounded-lg border border-border/50 hover:border-accent/20 transition-all duration-200 cursor-default font-mono"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + catIndex * 0.06 + i * 0.03 }}
                        whileHover={{ scale: 1.04, y: -1 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interests as subtle tags */}
            <div className="mt-6 pt-5 border-t border-border/30">
              <span className="text-xs font-mono text-text-muted/60 uppercase tracking-wider mb-3 block">
                interests
              </span>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 text-xs text-accent/50 bg-accent/[0.04] rounded-full font-mono"
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
