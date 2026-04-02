import { motion } from 'framer-motion';
import { GraduationCap, Shield, Server, Cpu, Code2, Search, Gamepad2, Crosshair } from 'lucide-react';
import { useLanguage } from '../i18n';

const About = () => {
  const { t } = useLanguage();

  const tooling = t.about.tooling as {
    title: string;
    languages: { label: string; items: string[] };
    frontend: { label: string; items: string[] };
    backend: { label: string; items: string[] };
    infra: { label: string; items: string[] };
    security: { label: string; items: string[] };
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

  /* ── Skill domains ── */
  const domains = [
    {
      id: 'security',
      label: 'Cybersecurity',
      sublabel: 'Blue Team · Offense',
      icon: Shield,
      items: tooling.security.items,
      accent: true,
    },
    {
      id: 'systems',
      label: 'Systems & Low-level',
      sublabel: 'C · C++ · Linux',
      icon: Cpu,
      items: ['C', 'C++', 'Linux', 'Win32 API', 'Assembly'],
      accent: false,
    },
    {
      id: 'backend',
      label: 'Backend & Infra',
      sublabel: 'APIs · Databases · Docker',
      icon: Server,
      items: [...tooling.backend.items, 'PostgreSQL', 'Redis', 'Docker'],
      accent: false,
    },
    {
      id: 'frontend',
      label: 'Frontend & Tooling',
      sublabel: 'React · TypeScript · Motion',
      icon: Code2,
      items: ['TypeScript', ...tooling.frontend.items, 'Git'],
      accent: false,
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background accent orb */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
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
            {'>_ '}{t.about.label}
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-4">
            {t.about.title} <span className="text-gradient">{t.about.titleHighlight}</span>?
          </h2>
        </motion.div>

        {/* ── Top row: Bio + Education ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Bio — spans 2 cols, fully enriched */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-2xl bg-surface border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-mono text-xs tracking-wider">profile.md</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {t.hero.statusLine}
              </span>
            </div>

            {/* Bio text */}
            <div className="space-y-3 mb-6">
              {t.about.bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-text-secondary leading-[1.85] text-[14.5px]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Focus areas */}
            <div className="mb-5">
              <span className="text-[10px] font-mono text-text-muted/60 uppercase tracking-widest block mb-3">
                Focus Areas
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { icon: Shield,    label: 'Cybersecurity', sub: 'Blue Team' },
                  { icon: Crosshair, label: 'Reverse Eng.',  sub: 'Malware Analysis' },
                  { icon: Gamepad2,  label: 'Gaming Tools',  sub: 'Packet-level' },
                  { icon: Search,    label: 'OSINT',         sub: 'Intel gathering' },
                ].map((area, i) => (
                  <motion.div
                    key={area.label}
                    className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-light border border-border/50 hover:border-accent/20 transition-colors duration-200"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  >
                    <area.icon size={13} className="text-accent/70" />
                    <span className="text-[11.5px] font-medium text-text-primary leading-tight">{area.label}</span>
                    <span className="text-[10px] font-mono text-text-muted leading-tight">{area.sub}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Primary languages */}
            <div className="mb-5">
              <span className="text-[10px] font-mono text-text-muted/60 uppercase tracking-widest block mb-3">
                Primary Languages
              </span>
              <div className="flex flex-wrap gap-2">
                {tooling.languages.items.map((lang, i) => (
                  <motion.span
                    key={lang}
                    className="px-3 py-1.5 text-[11.5px] font-mono text-accent/85 bg-accent/[0.07] border border-accent/[0.12] rounded-lg hover:bg-accent/[0.12] hover:text-accent transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.04, y: -1 }}
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="pt-4 border-t border-border/30">
              <span className="text-[10px] font-mono text-text-muted/60 uppercase tracking-widest block mb-2.5">
                Interests
              </span>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 text-xs text-accent/50 bg-accent/[0.04] rounded-full font-mono border border-accent/[0.07]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education + Approach stacked */}
          <div className="flex flex-col gap-5">
            {/* Education */}
            <motion.div
              className="p-6 rounded-2xl bg-surface border border-border/50 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div>
                <GraduationCap className="text-accent mb-3" size={22} />
                <h3 className="font-display text-base font-semibold text-text-primary mb-0.5">
                  {education.school}
                </h3>
                <p className="text-text-muted text-sm">{education.degree}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-border/30">
                <span className="text-xs font-mono text-text-muted">{education.period}</span>
              </div>
            </motion.div>

            {/* Approach */}
            <motion.div
              className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-accent/[0.07] to-transparent border border-accent/15"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="text-xs font-mono text-accent/70 uppercase tracking-wider block mb-4">
                {approach.title}
              </span>
              <div className="space-y-3.5">
                {approach.items.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                  >
                    <div className="font-mono text-xs text-text-primary font-medium mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-text-muted text-xs leading-relaxed">
                      {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Skill Domains Grid ── */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-mono text-accent/70 uppercase tracking-wider">
              {tooling.title} — skill domains
            </span>
            <div className="flex-1 h-px bg-border/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((domain, di) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={domain.id}
                  className={`domain-card p-5 rounded-2xl border ${
                    domain.accent
                      ? 'border-accent/20 bg-accent/[0.04]'
                      : 'border-border/50 bg-surface'
                  } relative overflow-hidden`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.25 + di * 0.07 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {/* Domain header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`flex items-center gap-2 mb-0.5 ${domain.accent ? 'text-accent' : 'text-text-muted'}`}>
                        <Icon size={14} />
                        <span className="font-mono text-[10px] uppercase tracking-widest">
                          {domain.id}
                        </span>
                      </div>
                      <h4 className="font-display text-sm font-semibold text-text-primary leading-tight">
                        {domain.label}
                      </h4>
                      <p className="text-[10px] font-mono text-text-muted mt-0.5">
                        {domain.sublabel}
                      </p>
                    </div>
                    {domain.accent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1 flex-shrink-0 animate-pulse" />
                    )}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {domain.items.map((item, ii) => (
                      <motion.span
                        key={item}
                        className={`px-2 py-1 text-[11px] font-mono rounded-md transition-colors duration-200 cursor-default ${
                          domain.accent
                            ? 'text-accent/80 bg-accent/[0.08] border border-accent/[0.12] hover:bg-accent/[0.14] hover:text-accent'
                            : 'text-text-secondary bg-surface-light border border-border/60 hover:border-accent/20 hover:text-accent/90'
                        }`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + di * 0.07 + ii * 0.03 }}
                        whileHover={{ scale: 1.04, y: -1 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>

                  {/* Accent corner glow for security domain */}
                  {domain.accent && (
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-accent/10 rounded-full blur-xl pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
