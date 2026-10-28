import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { measureLoop, systemSteps } from "@/data/systemContent";
import { EASE } from "@/components/public/PublicPrimitives";

/** Diagramme compact du parcours ACF : 6 etapes reliees + boucle de mesure. */
const SystemDiagram = ({ tone = "dark" }: { tone?: "dark" | "light" }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const step = systemSteps[active];
  const light = tone === "light";

  return (
    <div>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-label="Les six etapes du systeme LGM">
        {systemSteps.map((s, i) => (
          <li key={s.id} className="relative">
            <Link
              to={`/systeme-acquisition#${s.id}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-active={active === i}
              className={`system-node h-full ${light ? "!border-[rgba(16,24,39,0.14)] !bg-white !text-platinum-text data-[active=true]:!border-cobalt-dark data-[active=true]:!bg-[#fbf6ea]" : ""}`}
            >
              <span className={`font-display text-sm font-bold ${light ? "text-cobalt-dark" : "text-cobalt-light"}`}>{s.number}</span>
              <span className="font-display text-2xl font-bold uppercase leading-none">{s.title}</span>
              <span className={`text-xs font-semibold ${light ? "text-platinum-muted" : "text-platinum/60"}`}>{s.short}</span>
            </Link>
            {i < systemSteps.length - 1 && (
              <span aria-hidden="true" className={`absolute -right-2.5 top-1/2 hidden h-px w-2 lg:block ${light ? "bg-cobalt-dark" : "bg-cobalt-light"}`} />
            )}
          </li>
        ))}
      </ol>

      <div className={`mt-3 flex items-center gap-3 rounded-lg border border-dashed px-4 py-3 text-sm font-semibold ${light ? "border-cobalt-dark/50 text-platinum-muted" : "border-[#f0d99659] text-platinum/70"}`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={light ? "text-cobalt-dark" : "text-cobalt-light"}>
          <path d="M16 10a6 6 0 1 1-2-4.5M16 3v3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span><strong className={light ? "text-platinum-text" : "text-platinum"}>{measureLoop.title} :</strong> chaque etape est mesuree, la plus faible est corrigee en premier.</span>
      </div>

      <div className={`mt-6 min-h-[7.5rem] ${light ? "text-platinum-text" : "text-platinum"}`} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="grid gap-2 md:grid-cols-[0.6fr_1fr] md:gap-8"
          >
            <p className="font-display text-3xl font-bold uppercase leading-none">{step.question}</p>
            <p className={`public-body ${light ? "text-platinum-muted" : ""}`}>{step.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SystemDiagram;
