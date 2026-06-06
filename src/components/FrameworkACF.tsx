import { motion, type Variants } from "framer-motion";
import { TrendingUp, Zap, Heart } from "lucide-react";

const pillars = [
  {
    id: "acquisition",
    number: "01",
    label: "Acquisition",
    tagline: "Être vu. Chaque jour.",
    description: "Campagnes publicitaires, SEO/AEO/GEO, contenu organique — votre moteur de visibilité tourne en continu.",
    icon: TrendingUp,
    delay: 0.2,
    position: "left",
  },
  {
    id: "conversion",
    number: "02",
    label: "Conversion",
    tagline: "Transformer. Automatiquement.",
    description: "Agents IA WhatsApp, sites optimisés, funnels — chaque prospect est qualifié et suivi jusqu'à la vente.",
    icon: Zap,
    delay: 0.4,
    position: "right",
  },
  {
    id: "fidelisation",
    number: "03",
    label: "Fidélisation",
    tagline: "Faire revenir. En continu.",
    description: "Email marketing, campagnes WhatsApp, automatisations — vos clients existants génèrent de nouvelles ventes.",
    icon: Heart,
    delay: 0.6,
    position: "left",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } },
};

const FrameworkACF = () => {
  return (
    <section id="methode" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-bronze" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="pill-gold mb-6 inline-flex">Notre framework</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
            Trois leviers.{" "}
            <span className="italic text-bronze">Un seul objectif.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Pour faire croître un chiffre d'affaires, il faut activer les trois en simultané. Un seul levier manquant, et le système fuit.
          </p>
        </motion.div>

        {/* ACF diagram — central visual */}
        <div className="flex flex-col items-center mb-16 md:mb-20">
          {/* Three interconnected circles */}
          <div className="relative w-full max-w-2xl mx-auto h-64 md:h-80 hidden md:flex items-center justify-center">
            {/* Orbit ring */}
            <motion.div
              className="absolute w-56 h-56 rounded-full border border-bronze/15 animate-spin-slow"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="absolute w-40 h-40 rounded-full border border-bronze/10 animate-spin-slow"
              style={{ animationDirection: "reverse", animationDuration: "20s" }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Center node */}
            <motion.div
              className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #C9A227, #E4C76B)" }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="text-black font-display font-bold text-sm">LGM</span>
            </motion.div>

            {/* Acquisition node — left */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-14 h-14 rounded-full card-glass flex items-center justify-center animate-glow-pulse">
                <TrendingUp size={22} className="text-bronze" />
              </div>
              <span className="text-xs font-medium text-bronze tracking-wide">Acquisition</span>
            </motion.div>

            {/* Connecting line left */}
            <motion.div
              className="absolute left-16 top-1/2 h-px w-24 bg-gradient-to-r from-bronze/40 to-bronze/10 origin-left"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />

            {/* Conversion node — top right */}
            <motion.div
              className="absolute right-4 top-6 flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: 30, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <div className="w-14 h-14 rounded-full card-glass flex items-center justify-center animate-glow-pulse" style={{ animationDelay: "0.8s" }}>
                <Zap size={22} className="text-bronze" />
              </div>
              <span className="text-xs font-medium text-bronze tracking-wide">Conversion</span>
            </motion.div>

            {/* Fidélisation node — bottom right */}
            <motion.div
              className="absolute right-4 bottom-6 flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="w-14 h-14 rounded-full card-glass flex items-center justify-center animate-glow-pulse" style={{ animationDelay: "1.6s" }}>
                <Heart size={22} className="text-bronze" />
              </div>
              <span className="text-xs font-medium text-bronze tracking-wide">Fidélisation</span>
            </motion.div>

            {/* SVG connecting lines to right nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
              <motion.line
                x1="50%" y1="50%"
                x2="78%" y2="18%"
                stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
              <motion.line
                x1="50%" y1="50%"
                x2="78%" y2="82%"
                stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A227" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#C9A227" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Three pillar cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.id} variants={itemVariants}>
                <div className="h-full card-glass rounded-lg p-7 hover:border-bronze/30 transition-colors duration-300 group">
                  {/* Number */}
                  <span className="text-5xl font-serif font-medium text-bronze/20 group-hover:text-bronze/35 transition-colors duration-300 block mb-4">
                    {pillar.number}
                  </span>

                  {/* Icon + Label */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-bronze/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-bronze" />
                    </div>
                    <h3 className="font-serif text-xl font-medium">{pillar.label}</h3>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm font-medium text-bronze mb-3">{pillar.tagline}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.p
          className="text-center mt-12 text-sm text-muted-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          ↓ Scrollez pour découvrir chaque levier en détail
        </motion.p>
      </div>
    </section>
  );
};

export default FrameworkACF;
