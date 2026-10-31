import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDiagnostic } from "./DiagnosticContext";


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
        Obtenez votre score sur 100 et sachez tout de suite si notre accompagnement vous correspond.
      </p>
      <motion.button
        type="button"
        onClick={() => open(sourcePage)}
        className="dx-btn-primary mt-6 w-full"
        whileHover={reduce ? undefined : { scale: 1.02 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
      >
        Commencer mon diagnostic <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </motion.button>
      <p className="mt-3 text-center text-xs text-platinum/55">Gratuit · Sans engagement · 3 minutes · Confidentiel</p>
    </div>
  );
};

export default DiagnosticLauncher;
