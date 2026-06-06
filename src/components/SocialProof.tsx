import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/public/PublicPrimitives";

const stats = [
  { value: 7, prefix: "x", label: "ROI moyen constate chez les clients accompagnes plus de 6 mois" },
  { value: 90, suffix: " j", label: "fenetre moyenne pour voir les premiers signaux solides" },
  { value: 12, suffix: "+", label: "marches et secteurs suivis en Afrique de l'Ouest" },
];

const Counter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const SocialProof = () => (
  <section className="section-ivory section-pad-tight overflow-hidden">
    <div className="container-wide">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-end">
        <Reveal>
          <p className="section-kicker text-[#8b6914]">Preuve</p>
          <blockquote className="max-w-3xl">
            <p className="font-serif text-[clamp(1.8rem,3.8vw,4.1rem)] italic leading-[1.08] text-ivory-text">
              LGM a transforme notre acquisition en machine commerciale lisible. Pour la premiere fois, chaque canal avait un role clair.
            </p>
            <footer className="mt-7 text-sm font-bold text-ivory-muted">Moussa Konate, direction commerciale, Abidjan</footer>
          </blockquote>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="metric-rail text-ivory-text">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[clamp(2.4rem,5vw,5.6rem)] font-extrabold leading-none text-[#8b6914]">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-ivory-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default SocialProof;
