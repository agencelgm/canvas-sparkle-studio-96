import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const words1 = ["La", "méthode", "qui"];
const words2 = ["multiplie", "votre"];
const words3 = ["chiffre", "d'affaires."];

const wordVariants = {
  hidden: { opacity: 0, y: 40, skewY: 2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-background">
      {/* Hexagon pattern */}
      <HexagonPattern className="absolute inset-0 opacity-20" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-bronze/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
        {/* Left — Copy */}
        <div className="order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="pill-gold mb-8 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
              Agence Marketing Digital · Abidjan, Côte d'Ivoire
            </span>
          </motion.div>

          {/* Headline — word by word */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] mb-6 overflow-hidden">
            <span className="flex flex-wrap gap-x-3">
              {words1.map((w, i) => (
                <motion.span key={w} custom={i} variants={wordVariants} initial="hidden" animate="visible">
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap gap-x-3 mt-1">
              {words2.map((w, i) => (
                <motion.span
                  key={w}
                  custom={words1.length + i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={w === "multiplie" ? "italic text-bronze" : ""}
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap gap-x-3 mt-1">
              {words3.map((w, i) => (
                <motion.span
                  key={w}
                  custom={words1.length + words2.length + i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            Acquisition · Conversion · Fidélisation — trois leviers, un système.
            <br className="hidden md:block" />
            On l'active pour vous, de A à Z.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <a href="#contact" className="btn-gold">
              Réserver un appel gratuit
              <ArrowRight size={16} />
            </a>
            <a href="#methode" className="btn-gold-outline">
              <Play size={14} className="fill-bronze" />
              Voir la méthode
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-10 text-xs text-muted-foreground/60 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Résultats mesurables · Système pilotable · 100% accompagné
          </motion.p>
        </div>

        {/* Right — 3D phone image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
          {/* Glow behind image */}
          <div className="absolute inset-0 m-auto w-64 h-64 bg-gradient-radial from-bronze/25 via-bronze/8 to-transparent rounded-full blur-2xl animate-glow-pulse" />

          <motion.img
            src="/images/acf-social.png"
            alt="Acquisition — réseaux sociaux"
            className="relative z-10 w-72 sm:w-80 md:w-96 lg:w-[420px] xl:w-[460px] object-contain drop-shadow-2xl animate-float"
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Floating stat cards */}
          <motion.div
            className="card-glass absolute top-8 -left-4 lg:-left-8 px-4 py-3 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <div className="text-2xl font-serif font-medium text-bronze">3×</div>
            <div className="text-xs text-muted-foreground mt-0.5">plus de leads</div>
          </motion.div>

          <motion.div
            className="card-glass absolute bottom-16 -right-2 lg:-right-6 px-4 py-3 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <div className="text-2xl font-serif font-medium text-bronze">+67%</div>
            <div className="text-xs text-muted-foreground mt-0.5">taux de conversion</div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground/50">Scroller</span>
        <div className="w-5 h-8 border border-muted-foreground/20 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1 bg-bronze rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
