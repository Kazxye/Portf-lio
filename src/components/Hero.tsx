import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileDown } from 'lucide-react';
import { useLanguage } from '../i18n';
import profileImage from '../assets/profile.png';
import cvFile from '../assets/CV_Kazys_Tatarunas.pdf?url';

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

const TerminalWidget = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const delays = [1000, 1800, 2400, 3200, 3800, 4500, 5100];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setVisibleLines(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const lines = [
    { type: 'prompt', text: 'whoami' },
    { type: 'output', text: 'security & systems developer' },
    { type: 'prompt', text: 'cat focus.txt' },
    { type: 'output', text: 'cybersecurity  ·  reverse-eng' },
    { type: 'output', text: 'game-tools     ·  full-stack' },
    { type: 'prompt', text: 'ls ./projects | wc -l' },
    { type: 'output', text: '6 (and counting...)' },
  ];

  return (
    <motion.div
      className="w-full max-w-[320px] font-mono text-[12px] rounded-xl overflow-hidden border border-border/60 bg-background/90 backdrop-blur-sm shadow-xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border-b border-border/60">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-text-muted/50 text-[11px] tracking-wide">kazys@sec — ~</span>
      </div>

      {/* Terminal content */}
      <div className="p-4 space-y-1.5 min-h-[148px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={line.type === 'prompt' ? 'flex gap-2 items-baseline' : 'pl-4'}
          >
            {line.type === 'prompt' && (
              <>
                <span className="text-accent/80 select-none shrink-0">kazys@sec:~$</span>
                <span className="text-text-primary/90">{line.text}</span>
              </>
            )}
            {line.type === 'output' && (
              <span className="text-text-muted">{line.text}</span>
            )}
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <div className="flex gap-2 items-center">
          <span className="text-accent/80 select-none">kazys@sec:~$</span>
          <motion.span
            className="w-[7px] h-[14px] bg-accent/50 inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'steps(1)' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const { displayText, showCursor } = useTypewriter('Kazys', 180, 600);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-grid"
    >
      {/* Background Effects */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />

      {/* Subtle corner code decorations */}
      <motion.div
        className="absolute top-[14%] left-[4%] font-mono text-[11px] leading-relaxed text-accent/[0.05] select-none pointer-events-none hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <pre>{`// init portfolio\nconst kazys = {\n  role: "security-dev",\n  status: "building"\n};`}</pre>
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] left-[3%] font-mono text-[11px] leading-relaxed text-accent/[0.04] select-none pointer-events-none hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 2 }}
      >
        <pre>{`while (true) {\n  learn();\n  build();\n  ship();\n}`}</pre>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Text Content ── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Available badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-surface border border-border/60 text-xs font-mono text-text-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t.hero.statusLine}
            </motion.div>

            {/* Name with typewriter */}
            <motion.h1
              className="font-display font-bold leading-[1.05] mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-text-secondary font-light text-2xl md:text-3xl block mb-1">
                {t.hero.greeting}
              </span>
              <span
                className="glitch-text text-gradient text-5xl md:text-6xl lg:text-7xl"
                data-text="Kazys"
              >
                {displayText}
                {showCursor && (
                  <span className="animate-pulse text-accent font-thin">|</span>
                )}
              </span>
            </motion.h1>

            {/* Role — specific, monospace */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="font-mono text-accent/70 text-sm md:text-base tracking-wide">
                {'// '}{t.hero.role}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.p
              className="text-lg md:text-xl text-text-primary/85 mb-4 font-display font-medium leading-snug max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {t.hero.headline}
            </motion.p>

            {/* Sub */}
            <motion.p
              className="text-text-muted max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed text-[14px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              {t.hero.sub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <motion.a
                href="#projects"
                className="px-7 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all duration-300 glow-accent-hover text-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.viewProjects}
              </motion.a>
              <motion.a
                href="#contact"
                className="px-7 py-3.5 glass border border-border-light hover:border-accent/40 text-text-primary font-semibold rounded-xl transition-all duration-300 text-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.contact}
              </motion.a>
              <motion.a
                href={cvFile}
                download="CV_Kazys_Tatarunas.pdf"
                className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-border-light hover:border-accent/40 text-text-muted hover:text-text-primary font-semibold rounded-xl transition-all duration-300 text-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileDown size={15} />
                {t.hero.downloadCV}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right: Photo + Terminal ── */}
          <motion.div
            className="flex-1 flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-110" />

              <motion.div
                className="absolute -top-7 -right-14 font-mono text-[11px] text-accent/25 hidden lg:block select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
              >
                {'{ developer: true }'}
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-14 font-mono text-[11px] text-accent/20 hidden lg:block select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                {'// security-first'}
              </motion.div>

              <motion.div
                className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-accent/30 glow-accent"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={profileImage}
                  alt="Kazys Tatarunas — Security & Systems Developer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Terminal Widget — desktop only */}
            <div className="hidden lg:block w-full flex justify-center">
              <TerminalWidget />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[11px] uppercase tracking-widest font-mono">{t.hero.scroll}</span>
            <ArrowDown size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
