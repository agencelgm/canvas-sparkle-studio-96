import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, ShieldCheck, Sparkles, Target } from "lucide-react";
import { useDiagnostic } from "./DiagnosticContext";

const perks = [
  { icon: ShieldCheck, label: "100% confidentiel" },
  { icon: Clock3, label: "Moins de 3 minutes" },
  { icon: Target, label: "Recommandation personnalisee" },
  { icon: Sparkles, label: "Gratuit, sans engagement" },
];

/** Carte qui remplace les formulaires dans les pages : ouvre le diagnostic en pop-up. */
const DiagnosticLauncher = ({ sourcePage, title = "Diagnostic digital interactif" }: { sourcePage: string; title?: string }) => {
  const { open } = useDiagnostic();
  const reduce = useReducedMotion();
  return (
    <div className="dx-launcher">
      <p className="section-kicker">Score de preparation</p>
      <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold leading-[1.02] text-platinum">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-platinum/70">
        Repondez a quelques questions et obtenez votre score sur 100 : vous saurez tout de suite si notre accompagnement est adapte.
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-2">
        {perks.map(({ icon: Icon, label }) => (
          <li key={label} className="dx-launcher-perk">
            <Icon className="h-4 w-4 shrink-0 dx-accent" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <motion.button
        type="button"
        onClick={() => open(sourcePage)}
        className="dx-btn-primary mt-6 w-full"
        whileHover={reduce ? undefined : { scale: 1.02 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
      >
        Commencer mon diagnostic <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </motion.button>
      <p className="mt-3 text-center text-xs text-platinum/55">8 questions · environ 3 minutes</p>
    </div>
  );
};

export default DiagnosticLauncher;
