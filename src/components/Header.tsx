import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Kazxye', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kazystatarunas/', label: 'LinkedIn' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-border/50' 
          : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="font-display text-2xl font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-gradient">K</span>
          <span className="text-text-primary">azys</span>
          <span className="text-accent">.</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium link-hover"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Social Links + Language Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-accent transition-all duration-300 hover:bg-surface-light rounded-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
          
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-accent transition-all duration-300 hover:bg-surface-light rounded-lg text-sm font-medium"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle language"
          >
            <Globe size={18} />
            <span>{language === 'pt-BR' ? 'EN' : 'PT'}</span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden glass mt-4 mx-6 rounded-xl"
      >
        <nav className="flex flex-col p-6 gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-accent transition-colors text-sm font-medium"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span>{language === 'pt-BR' ? 'EN' : 'PT'}</span>
            </button>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
