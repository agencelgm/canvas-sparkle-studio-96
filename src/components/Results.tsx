import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ParticleBackground from "@/components/canvas/ParticleBackground";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

function Counter({ target, suffix = "", prefix = "", decimals = 0, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(parseFloat((target * ease(progress)).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString("fr-FR")}{suffix}
    </span>
  );
}

const METRICS = [
  {
    value: 277,
    suffix: "%",
    label: "Croissance du chiffre d'affaires",
    desc: "Résultat moyen observé chez nos clients après 6 mois d'activation complète du framework ACF.",
    color: "#C9A227",
  },
  {
    value: 3,
    suffix: "×",
    label: "Volume de leads qualifiés",
    desc: "Multiplication du flux de prospects entrants grâce aux stratégies d'acquisition multi-canal.",
    color: "#4ECDC4",
  },
  {
    value: 67,
    suffix: "%",
    label: "Taux de conversion amélioré",
    desc: "Amélioration moyenne du taux de transformation des prospects en clients payants.",
    color: "#8B5CF6",
  },
];

const Results = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Particles */}
      <ParticleBackground count={200} color="#C9A227" size={0.007} spread={12} />

      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,162,39,0.04) 0%, transparent 70%)" }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2
            className="font-serif text-foreground mb-5"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            Ce que le système produit
          </h2>
          <p
            className="text-muted-foreground font-sans mx-auto max-w-[50ch] leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
          >
            Quand les 3 leviers ACF fonctionnent ensemble, les résultats deviennent prévisibles et cumulatifs.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Double-bezel card */}
              <div
                className="rounded-2xl p-px h-full"
                style={{
                  background: `linear-gradient(135deg, ${metric.color}18, transparent)`,
                  border: `1px solid ${metric.color}14`,
                }}
              >
                <div
                  className="rounded-[calc(1rem-1px)] p-8 h-full flex flex-col"
                  style={{
                    background: "rgba(14,14,18,0.85)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Big number */}
                  <div
                    className="font-display font-extrabold mb-4 leading-none"
                    style={{
                      fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                      color: metric.color,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <Counter
                      target={metric.value}
                      suffix={metric.suffix}
                    />
                  </div>

                  {/* Label */}
                  <p
                    className="font-serif text-foreground mb-3"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", fontWeight: 500 }}
                  >
                    {metric.label}
                  </p>

                  {/* Desc */}
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed mt-auto">
                    {metric.desc}
                  </p>

                  {/* Accent line */}
                  <div
                    className="w-12 h-0.5 rounded-full mt-6"
                    style={{ background: metric.color, opacity: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
