import { RefObject } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/public/PublicPrimitives";


interface PackSiteCardProps {
  onScrollToForm: () => void;
  formRef: RefObject<HTMLDivElement>;
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
    <circle cx="8" cy="8" r="7" fill="rgba(215,180,106,0.18)" />
    <path d="M5 8l2 2 4-4" stroke="#d7b46a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  "Jusqu'a 5 pages : Accueil, Services, A propos, Contact, Blog",
  "Design responsive, adapte mobile et ordinateur",
  "Configuration SEO de base",
  "Nom de domaine (1ere annee)",
  "Hebergement (1ere annee)",
  "1 adresse email professionnelle (1ere annee)",
  "6 mois de support technique inclus",
  "Livraison en 10 a 15 jours ouvres, a partir de la reception du contenu",
];

export default function PackSiteCard({ onScrollToForm }: PackSiteCardProps) {
  return (
    <section className="section-platinum section-pad">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: EASE }}
          className="mb-12 text-center"
        >
          <p className="section-kicker" style={{ color: "var(--cobalt-dark)" }}>Notre offre</p>
          <h2 className="public-h2 mx-auto" style={{ color: "var(--platinum-text)" }}>
            Pack Site Vitrine
          </h2>
          <p className="public-lead mx-auto text-center" style={{ color: "var(--platinum-muted)" }}>
            Tout ce qu'il faut pour avoir une presence professionnelle en ligne, cle en main.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.72, delay: 0.1, ease: EASE }}
          className="mx-auto max-w-3xl rounded-[12px] border border-[rgba(16,24,39,0.12)] bg-white shadow-[0_8px_40px_rgba(16,24,39,0.09)]"
        >
          <div className="p-8 md:p-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                  style={{ background: "rgba(215,180,106,0.15)", color: "var(--cobalt-dark)" }}
                >
                  Pack complet
                </span>
                <h3 className="public-h3" style={{ color: "var(--platinum-text)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                  Site Vitrine
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display text-[3rem] font-extrabold leading-none"
                  style={{ color: "var(--cobalt-dark)" }}
                >
                  165 000
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--platinum-muted)" }}>
                  FCFA
                </span>
              </div>
            </div>

            <ul className="mb-8 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.9rem] leading-snug" style={{ color: "var(--platinum-text)" }}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onScrollToForm}
              className="btn-cobalt w-full justify-center"
            >
              Demander un devis pour mon site
              <span className="btn-arrow-orb">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
