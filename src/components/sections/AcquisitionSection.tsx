import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { TrendingUp, Globe, Megaphone, Search, FileText, CheckCircle } from "lucide-react";
import PhoneImage from "@/components/PhoneImage";

const features = [
  { icon: Megaphone, label: "Campagnes Facebook & Instagram Ads", desc: "Ciblage précis, créatifs qui convertissent, budget maîtrisé." },
  { icon: TrendingUp, label: "TikTok Ads & contenu organique", desc: "Touchez les nouvelles audiences là où elles passent du temps." },
  { icon: Search, label: "Google Ads — Search & Display", desc: "Captez les prospects au moment où ils cherchent activement." },
  { icon: Globe, label: "SEO / AEO / GEO — visibilité 24h/24", desc: "Votre site trouvé sur Google, les IA et les recherches vocales." },
  { icon: FileText, label: "Stratégie de contenu & personal branding", desc: "Votre expertise en avant, votre audience grandit seule." },
];

function useFeatureOpacity(scrollYProgress: MotionValue<number>, start: number, end: number) {
  return useTransform(scrollYProgress, [start, end], [0, 1]);
}

function useFeatureY(scrollYProgress: MotionValue<number>, start: number, end: number) {
  return useTransform(scrollYProgress, [start, end], [24, 0]);
}

const AcquisitionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.04, 0.98]);

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
        {/* Background ambient */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-gradient-radial from-bronze/6 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Section number watermark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 section-number opacity-60 select-none hidden lg:block">
          01
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
              Premier levier
            </motion.span>

            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Attirez de nouveaux{" "}
              <span className="italic text-bronze">clients. Chaque jour.</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Sans visibilité constante, votre pipeline se vide. On construit votre moteur d'acquisition pour que chaque jour, de nouvelles personnes découvrent votre entreprise.
            </motion.p>

            {/* Feature list — appears as user scrolls */}
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

          {/* Right — image */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="absolute inset-0 m-auto w-56 h-56 bg-gradient-radial from-bronze/20 to-transparent rounded-full blur-2xl animate-glow-pulse" />
            <PhoneImage
              src="/images/acf-social.png"
              alt="Acquisition — réseaux sociaux"
              className="relative z-10 w-72 md:w-80 lg:w-[400px] object-contain drop-shadow-2xl"
              style={{ y: imageY, scale: imageScale }}
            />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-8 h-1 rounded-full bg-bronze" />
          <div className="w-4 h-1 rounded-full bg-bronze/20" />
          <div className="w-4 h-1 rounded-full bg-bronze/20" />
        </div>
      </div>
    </div>
  );
};

export default AcquisitionSection;
