import { motion, useReducedMotion } from "framer-motion";
import ScoreGauge from "./ScoreGauge";

/** Rappel du score du diagnostic sur les pages qui suivent le pop-up. */
const ScoreResultBadge = ({ caption }: { caption: string }) => {
  const reduce = useReducedMotion();
  const raw = Number(new URLSearchParams(window.location.search).get("score"));
  if (!Number.isFinite(raw) || raw <= 0 || raw > 100) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5 }}
      className="dx-score-card mx-auto mb-8 w-fit text-left"
    >
      <ScoreGauge score={Math.round(raw)} size={92} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] dx-muted">Votre score de preparation</p>
        <p className="mt-1 font-display text-lg font-extrabold dx-ink">{caption}</p>
      </div>
    </motion.div>
  );
};

export default ScoreResultBadge;
