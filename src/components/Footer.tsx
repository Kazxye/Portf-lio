import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
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

          {/* Copyright */}
          <p className="text-text-muted text-sm">
            © {currentYear} Kazys.
          </p>

          {/* Back to Top */}
          <motion.a
            href="#home"
            className="text-text-secondary hover:text-accent transition-colors text-sm"
            whileHover={{ y: -2 }}
          >
            Voltar ao topo ↑
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
