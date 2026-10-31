import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect } from "react";

/** Jauge circulaire (3/4 de cercle) avec chiffre anime. */
const ScoreGauge = ({ score, size = 112 }: { score: number; size?: number }) => {
  const reduce = useReducedMotion();
  const mv = useMotionValue(score);
  const rounded = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    if (reduce) { mv.set(score); return; }
    const c = animate(mv, score, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return c.stop;
  }, [score, reduce, mv]);

  const r = 44;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const filled = arc * (Math.max(0, Math.min(100, score)) / 100);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Score ${score} sur 100`}>
      <svg viewBox="0 0 100 100" className="h-full w-full rotate-[135deg]">
        <circle cx="50" cy="50" r={r} fill="none" className="dx-gauge-track" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${arc} ${circ}`} />
        <motion.circle
          cx="50" cy="50" r={r} fill="none" className="dx-gauge-fill" strokeWidth="8" strokeLinecap="round"
          initial={false}
          animate={{ strokeDasharray: `${filled} ${circ}` }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span className="font-display text-[2.1rem] font-extrabold leading-none dx-ink">{rounded}</motion.span>
        <span className="text-xs dx-muted">/ 100</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
