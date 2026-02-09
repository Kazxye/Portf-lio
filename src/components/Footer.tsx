import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-10 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <a href="#home" className="font-display text-xl font-bold">
            <span className="text-gradient">K</span>
            <span className="text-text-primary">azys</span>
            <span className="text-accent">.</span>
          </a>

          {/* Engineered by */}
          <p className="text-text-muted text-sm font-mono tracking-wide">
            {t.footer.engineered}
          </p>

          {/* Copyright + Back to Top */}
          <div className="flex items-center gap-6">
            <p className="text-text-muted/60 text-xs">
              © {currentYear}
            </p>
            <motion.a
              href="#home"
              className="text-text-muted hover:text-accent transition-colors text-sm font-mono"
              whileHover={{ y: -2 }}
            >
              {t.footer.backToTop} ↑
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
