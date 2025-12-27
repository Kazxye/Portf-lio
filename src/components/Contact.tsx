import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Phone } from 'lucide-react';

// Ícone customizado do Discord
const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const contactLinks = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@Kazxye',
    href: 'https://github.com/Kazxye',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/kazystatarunas',
    href: 'https://www.linkedin.com/in/kazystatarunas/',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'kazysdzigan...@outlook.com',
    href: 'mailto:kazysdzigantatarunas@outlook.com',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
            Contato
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-6">
            Vamos <span className="text-gradient">Conversar</span>?
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Estou sempre aberto a novas oportunidades, colaborações em projetos 
            interessantes ou simplesmente trocar uma ideia sobre tecnologia.
          </p>
        </motion.div>

        {/* Contact Cards - Main */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group p-6 bg-surface rounded-xl border border-border hover:border-accent/50 transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors mb-4">
                <link.icon size={24} />
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-1">
                {link.label}
              </h3>
              <p className="text-text-muted text-sm font-mono">
                {link.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Secondary Contact - Discord & WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          <motion.a
            href="https://discord.com/users/kazys_"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 bg-surface rounded-xl border border-border hover:border-accent/50 transition-all duration-300 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -3 }}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#5865F2]/10 text-[#5865F2] group-hover:bg-[#5865F2] group-hover:text-white transition-colors">
              <DiscordIcon size={20} />
            </div>
            <div>
              <h3 className="font-display font-medium text-text-primary text-sm">Discord</h3>
              <p className="text-text-muted text-sm font-mono">kazys_</p>
            </div>
          </motion.a>

          <motion.a
            href="https://wa.me/5511934812006"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 bg-surface rounded-xl border border-border hover:border-accent/50 transition-all duration-300 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ y: -3 }}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-display font-medium text-text-primary text-sm">WhatsApp</h3>
              <p className="text-text-muted text-sm font-mono">+55 11 93481-2006</p>
            </div>
          </motion.a>
        </div>

        {/* Location */}
        <motion.div
          className="flex items-center justify-center gap-2 text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <MapPin size={16} className="text-accent" />
          <span className="text-sm">São Paulo, Brasil</span>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="mailto:kazysdzigantatarunas@outlook.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all duration-300 glow-accent-hover"
          >
            <Send size={20} />
            Enviar Mensagem
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
