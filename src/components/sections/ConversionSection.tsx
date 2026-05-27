import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Bot, RefreshCw, Globe, Filter, BarChart3, CheckCircle } from "lucide-react";

const features = [
  { icon: Bot, label: "Agents IA WhatsApp — qualification automatique", desc: "L'IA reçoit, répond et qualifie chaque prospect en moins de 60 secondes." },
  { icon: RefreshCw, label: "Relances intelligentes 24h/24", desc: "Le prospect ne répond plus ? L'agent IA reprend la conversation automatiquement." },
  { icon: Globe, label: "Sites web optimisés SEO/AEO/GEO", desc: "Des sites pensés pour convertir ET pour être trouvés par Google et les IA." },
  { icon: Filter, label: "Funnels de vente automatisés", desc: "Du premier contact à la prise de RDV — sans intervention manuelle." },
  { icon: BarChart3, label: "CRM & suivi du pipeline commercial", desc: "Visualisez chaque opportunité, ne laissez plus aucun prospect tomber dans l'oubli." },
];

const images = [
  { src: "/images/acf-chat.png", alt: "Agent IA WhatsApp" },
  { src: "/images/acf-checklist.png", alt: "Funnel de vente" },
  { src: "/images/acf-payment.png", alt: "Paiement converti" },
];

function useFeatureOpacity(scrollYProgress: MotionValue<number>, start: number, end: number) {
  return useTransform(scrollYProgress, [start, end], [0, 1]);
}

function useFeatureY(scrollYProgress: MotionValue<number>, start: number, end: number) {
  return useTransform(scrollYProgress, [start, end], [24, 0]);
}

const ConversionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [20, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.90, 1.05, 0.98]);

  // Image crossfade: img0 → img1 → img2
  const img0Opacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const img1Opacity = useTransform(scrollYProgress, [0.28, 0.40, 0.62, 0.72], [0, 1, 1, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.62, 0.74], [0, 1]);

  const f0o = useFeatureOpacity(scrollYProgress, 0.05, 0.18);
  const f0y = useFeatureY(scrollYProgress, 0.05, 0.18);
  const f1o = useFeatureOpacity(scrollYProgress, 0.18, 0.31);
  const f1y = useFeatureY(scrollYProgress, 0.18, 0.31);
  const f2o = useFeatureOpacity(scrollYProgress, 0.31, 0.44);
  const f2y = useFeatureY(scrollYProgress, 0.31, 0.44);
  const f3o = useFeatureOpacity(scrollYProgress, 0.44, 0.57);
  const f3y = useFeatureY(scrollYProgress, 0.44, 0.57);
  const f4o = useFeatureOpacity(scrollYProgress, 0.57, 0.70);
  const f4y = useFeatureY(scrollYProgress, 0.57, 0.70);

  const opacities = [f0o, f1o, f2o, f3o, f4o];
  const ys = [f0y, f1y, f2y, f3y, f4y];
  const imgOpacities = [img0Opacity, img1Opacity, img2Opacity];

  return (
    <div ref={containerRef} style={{ height: "290vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 bg-gradient-radial from-bronze/6 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Watermark */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 section-number opacity-60 select-none hidden lg:block">
          02
        </div>

        <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-10 items-center w-full">
          {/* Left — image stack (crossfades on scroll) */}
          <div className="flex justify-center lg:justify-start relative order-2 lg:order-1">
            <div className="absolute inset-0 m-auto w-56 h-56 bg-gradient-radial from-bronze/18 to-transparent rounded-full blur-2xl animate-glow-pulse" />
            <div className="relative z-10 w-72 md:w-80 lg:w-[400px]">
              {images.map((img, i) => (
                <motion.img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full object-contain drop-shadow-2xl"
                  style={{ opacity: imgOpacities[i], y: imageY, scale: imageScale }}
                />
              ))}
              {/* Placeholder height */}
              <div className="w-full aspect-[3/4] opacity-0 pointer-events-none" />
            </div>
          </div>

          {/* Right — copy */}
          <div className="order-1 lg:order-2">
            <motion.span
              className="pill-gold mb-6 inline-flex"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle size={12} />
              Deuxième levier
            </motion.span>

            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Transformez vos prospects{" "}
              <span className="italic text-bronze">en clients payants.</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Un prospect non relancé dans les 5 premières minutes a 80% de chances de partir chez un concurrent. L'IA comble ce gap, sans que vous leviez le petit doigt.
            </motion.p>

            <div className="space-y-0 divide-y divide-white/5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.label}
                    className="feature-item"
                    style={{ opacity: opacities[i], y: ys[i] }}
                  >
                    <div className="w-8 h-8 rounded-full bg-bronze/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-bronze" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{f.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-4 h-1 rounded-full bg-bronze/20" />
          <div className="w-8 h-1 rounded-full bg-bronze" />
          <div className="w-4 h-1 rounded-full bg-bronze/20" />
        </div>
      </div>
    </div>
  );
};

export default ConversionSection;
