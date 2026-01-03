import { motion } from 'framer-motion';
import { Calendar, Rocket, FolderPlus, RefreshCw } from 'lucide-react';
import { useLanguage } from '../i18n';
import { updates, UpdateType } from '../data/updates';

const Updates = () => {
  const { language, t } = useLanguage();

  const getIcon = (type: UpdateType) => {
    switch (type) {
      case 'newProject':
        return <FolderPlus size={16} />;
      case 'update':
        return <RefreshCw size={16} />;
      case 'launch':
        return <Rocket size={16} />;
      default:
        return <FolderPlus size={16} />;
    }
  };

  const getTypeLabel = (type: UpdateType) => {
    switch (type) {
      case 'newProject':
        return t.updates.newProject;
      case 'update':
        return t.updates.update;
      case 'launch':
        return t.updates.launch;
      default:
        return '';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const recentUpdates = updates.slice(0, 5);

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
            {t.updates.label}
          </motion.span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mt-4">
            {t.updates.title} <span className="text-gradient">{t.updates.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent" />

          {/* Updates */}
          <div className="space-y-6">
            {recentUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                className="relative pl-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Dot */}
                <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  index === 0 
                    ? 'bg-accent text-white' 
                    : 'bg-surface border border-border text-text-muted'
                }`}>
                  {getIcon(update.type)}
                </div>

                {/* Content */}
                <motion.div
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    index === 0 
                      ? 'bg-accent/10 border border-accent/30' 
                      : 'bg-surface/50 border border-border hover:border-border-light'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      index === 0 
                        ? 'bg-accent/20 text-accent' 
                        : 'bg-surface-light text-text-muted'
                    }`}>
                      {getTypeLabel(update.type)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Calendar size={12} />
                      {formatDate(update.date)} • {update.time}
                    </span>
                  </div>
                  <h3 className={`font-display font-semibold ${
                    index === 0 ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {language === 'pt-BR' ? update.titlePt : update.titleEn}
                  </h3>
                  {(update.descriptionPt || update.descriptionEn) && (
                    <p className="text-sm text-text-muted mt-1">
                      {language === 'pt-BR' ? update.descriptionPt : update.descriptionEn}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updates;
