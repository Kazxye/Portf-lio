import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../i18n';
import profileImage from '../assets/profile.png';

const useTypewriter = (text: string, speed: number = 150, delay: number = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayText('');
    setShowCursor(true);
    
    const startDelay = setTimeout(() => {
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [text, speed, delay]);

  return { displayText, showCursor };
};

const Hero = () => {
  const { t } = useLanguage();
  const { displayText, showCursor } = useTypewriter('Kazys', 180, 800);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-grid"
    >
      {/* Background Effects */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gradient mb-8"
            >
              <span className="text-sm text-text-secondary font-medium">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t.hero.greeting}
              <br />
              <span className="text-gradient">
                {displayText}
                {showCursor && (
                  <span className="animate-pulse text-accent">|</span>
                )}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-text-secondary mb-4 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t.hero.role}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-text-muted max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t.hero.description} <span className="text-accent">{t.hero.skill1}</span> e{' '}
              <span className="text-accent">{t.hero.skill2}</span>{t.hero.descriptionEnd}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all duration-300 glow-accent-hover"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.viewProjects}
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 glass border border-border-light hover:border-accent text-text-primary font-semibold rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.contact}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              {/* Glow Background */}
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-110" />
              
              {/* Image Container */}
              <motion.div
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-accent/30 glow-accent"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={profileImage}
                  alt="Kazys - Software Engineering Student"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
