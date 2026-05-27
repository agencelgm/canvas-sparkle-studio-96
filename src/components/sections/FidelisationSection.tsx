import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Mail, MessageSquare, Gift, Star, BarChart2, CheckCircle } from "lucide-react";
import PhoneImage from "@/components/PhoneImage";

const features = [
  { icon: Mail, label: "Séquences email marketing ciblées", desc: "Des emails personnalisés au bon moment, avec le bon message, au bon segment." },
  { icon: MessageSquare, label: "Campagnes WhatsApp personnalisées", desc: "Vos offres directement dans la poche de vos clients, avec un taux d'ouverture de 98%." },
  { icon: Gift, label: "Promotions & offres automatisées", desc: "Récompensez vos meilleurs clients sans y penser — déclenché automatiquement." },
  { icon: Star, label: "Programmes de fidélité", desc: "Créez de l'attachement à votre marque, transformez vos clients en ambassadeurs." },
  { icon: BarChart2, label: "Reporting & analytics mensuel", desc: "Chaque mois, un rapport clair : ce qui marche, ce qu'on optimise, et pourquoi." },
];

function useFeatureOpacity(scrollYProgress: MotionValue<number>, start: number, end: number) {
  return useTransform(scrollYProgress, [start, end], [0, 1]);
}

function useFeatureY(scrollYProgress: MotionValue<number>, start: number, end: number) {
  return useTransform(scrollYProgress, [start, end], [24, 0]);
}

const FidelisationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [20, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1.04, 0.99]);

  const img0Opacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
  const img1Opacity = useTransform(scrollYProgress, [0.35, 0.47], [0, 1]);

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

  return (
    <div ref={containerRef} style={{ height: "260vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-bronze/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Watermark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 section-number opacity-60 select-none hidden lg:block">
          03
        </div>

        <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-10 items-center w-full">
          {/* Left — copy */}
          <div>
            <motion.span
              className="pill-gold mb-6 inline-flex"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle size={12} />
              Troisième levier
            </motion.span>

            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Faites revenir vos clients.{" "}
              <span className="italic text-bronze">Encore et encore.</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Un client fidèle coûte 5× moins cher à retenir qu'un nouveau à acquérir. On met en place les systèmes pour que vos anciens clients redeviennent des sources de revenus réguliers.
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

          {/* Right — images */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="absolute inset-0 m-auto w-56 h-56 bg-gradient-radial from-bronze/18 to-transparent rounded-full blur-2xl animate-glow-pulse" />
            <div className="relative z-10 w-72 md:w-80 lg:w-[400px]">
              <PhoneImage
                src="/images/acf-validation.png"
                alt="Fidélisation — validation"
                className="absolute inset-0 w-full object-contain drop-shadow-2xl"
                style={{ opacity: img0Opacity, y: imageY, scale: imageScale }}
              />
              <PhoneImage
                src="/images/acf-loyalty.png"
                alt="Fidélisation — loyalty"
                className="absolute inset-0 w-full object-contain drop-shadow-2xl"
                style={{ opacity: img1Opacity, y: imageY, scale: imageScale }}
              />
              <div className="w-full aspect-[3/4] opacity-0 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-4 h-1 rounded-full bg-bronze/20" />
          <div className="w-4 h-1 rounded-full bg-bronze/20" />
          <div className="w-8 h-1 rounded-full bg-bronze" />
        </div>
      </div>
    </div>
  );
};

export default FidelisationSection;
