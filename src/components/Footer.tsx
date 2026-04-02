import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home,     href: '#home' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.contact,  href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github,   href: 'https://github.com/Kazxye',                       label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kazystatarunas/',      label: 'LinkedIn' },
    { icon: Mail,     href: 'mailto:kazysdzigantatarunas@outlook.com',          label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      {/* Accent separator line */}
      <div className="section-sep" />

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* ── Left: Brand ── */}
          <div>
            <a href="#home" className="font-display text-xl font-bold tracking-tight inline-block mb-3">
              <span className="text-gradient">K</span>
              <span className="text-text-primary">azys</span>
              <span className="text-accent">.</span>
            </a>
            <p className="text-text-muted text-xs font-mono leading-relaxed max-w-[200px]">
              {t.footer.engineered}
            </p>
            {/* Accent bar */}
            <div className="mt-4 w-10 h-px bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          {/* ── Center: Nav links ── */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-mono text-text-muted/50 uppercase tracking-widest mb-1">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-accent transition-colors text-sm font-medium w-fit link-hover"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Right: Social + Copyright ── */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-text-muted/50 uppercase tracking-widest">
              Connect
            </span>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm group w-fit"
                >
                  <social.icon size={14} />
                  <span>{social.label}</span>
                  <ArrowUpRight
                    size={11}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="mt-10 pt-6 border-t border-border/25 flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-text-muted/50 text-xs font-mono">
            © {currentYear} Kazys Tatarunas. All rights reserved.
          </p>
          <motion.a
            href="#home"
            className="text-text-muted hover:text-accent transition-colors text-xs font-mono tracking-wide"
            whileHover={{ y: -2 }}
          >
            {t.footer.backToTop} ↑
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
