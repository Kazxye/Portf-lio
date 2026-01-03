import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X, Globe, Bell, Calendar, FolderPlus, RefreshCw, Rocket } from 'lucide-react';
import { useLanguage } from '../i18n';
import { updates, UpdateType } from '../data/updates';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const changelogRef = useRef<HTMLDivElement>(null);
  const mobileChangelogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close changelog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        changelogRef.current && !changelogRef.current.contains(target) &&
        mobileChangelogRef.current && !mobileChangelogRef.current.contains(target)
      ) {
        setIsChangelogOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when changelog opens
  const handleChangelogClick = () => {
    setIsMobileMenuOpen(false);
    setIsChangelogOpen(!isChangelogOpen);
  };

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

  const getUpdateIcon = (type: UpdateType) => {
    switch (type) {
      case 'newProject':
        return <FolderPlus size={14} />;
      case 'update':
        return <RefreshCw size={14} />;
      case 'launch':
        return <Rocket size={14} />;
      default:
        return <FolderPlus size={14} />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const recentUpdates = updates.slice(0, 5);

  // Changelog dropdown component
  const ChangelogDropdown = ({ isMobile = false }: { isMobile?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`${isMobile ? 'fixed left-4 right-4 top-20' : 'absolute right-0 top-full mt-2 w-80'} bg-surface border border-border rounded-xl shadow-2xl shadow-background/80 overflow-hidden z-[60]`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-surface-light">
        <h3 className="font-display font-semibold text-text-primary text-sm">
          {t.updates.title} {t.updates.titleHighlight}
        </h3>
      </div>

      {/* Updates List */}
      <div className="max-h-80 overflow-y-auto">
        {recentUpdates.map((update, index) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`px-4 py-3 border-b border-border/50 last:border-b-0 hover:bg-surface-light transition-colors ${
              index === 0 ? 'bg-accent/5' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg ${
                index === 0 ? 'bg-accent/20 text-accent' : 'bg-surface-light text-text-muted'
              }`}>
                {getUpdateIcon(update.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  index === 0 ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {language === 'pt-BR' ? update.titlePt : update.titleEn}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={10} className="text-text-muted" />
                  <span className="text-xs text-text-muted">
                    {formatDate(update.date)} • {update.time}
                  </span>
                </div>
              </div>
              {index === 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-white rounded">
                  NEW
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-background/90 backdrop-blur-xl' 
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

          {/* Social Links + Changelog + Language Toggle */}
          <div className="hidden md:flex items-center gap-2">
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
            
            {/* Changelog Button - Desktop */}
            <div className="relative" ref={changelogRef}>
              <motion.button
                onClick={() => setIsChangelogOpen(!isChangelogOpen)}
                className="relative p-2 text-text-secondary hover:text-accent transition-all duration-300 hover:bg-surface-light rounded-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Changelog"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
              </motion.button>

              {/* Desktop Changelog Dropdown */}
              <AnimatePresence>
                {isChangelogOpen && <ChangelogDropdown />}
              </AnimatePresence>
            </div>
            
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-xl mt-4 mx-6 rounded-xl border border-border"
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
                    onClick={handleChangelogClick}
                    className="relative p-2 text-text-secondary hover:text-accent transition-colors"
                    aria-label="Changelog"
                  >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full" />
                  </button>
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
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Changelog Dropdown - Outside header for proper positioning */}
      <div ref={mobileChangelogRef} className="md:hidden">
        <AnimatePresence>
          {isChangelogOpen && <ChangelogDropdown isMobile />}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;
