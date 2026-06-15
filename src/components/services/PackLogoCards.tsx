import { RefObject } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/public/PublicPrimitives";


type Pack = "essentiel" | "professionnel" | "identite-marque";

interface PackLogoCardsProps {
  onSelectPack: (pack: Pack) => void;
  formRef: RefObject<HTMLDivElement>;
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
    <circle cx="8" cy="8" r="7" fill="rgba(215,180,106,0.18)" />
    <path d="M5 8l2 2 4-4" stroke="#d7b46a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const packs = [
  {
    id: "essentiel" as Pack,
    label: "Pack Essentiel",
    price: "50 000",
    ideal: "Ideal pour demarrer son activite avec une identite visuelle propre",
    features: [
      "2 concepts de logo personnalises",
      "3 revisions incluses",
      "Fichiers PNG (fond transparent + fond plein)",
      "Fichier PDF haute resolution, pret a imprimer",
      "Livraison en 4 a 5 jours ouvres",
    ],
    badge: null,
    highlight: false,
  },
  {
    id: "professionnel" as Pack,
    label: "Pack Professionnel",
    price: "95 000",
    ideal: "Le choix le plus complet pour les entrepreneurs qui veulent marquer les esprits",
    features: [
      "3 concepts de logo personnalises",
      "Revisions illimitees",
      "Fichiers PNG, JPG et PDF haute resolution",
      "Fichier source modifiable (Canva)",
      "Mini kit reseaux sociaux : photo de profil + bannières Facebook et LinkedIn",
      "Livraison en 5 a 7 jours ouvres",
    ],
    badge: "Le plus demande",
    highlight: true,
  },
  {
    id: "identite-marque" as Pack,
    label: "Pack Identite de Marque",
    price: "170 000",
    ideal: "Pour les marques qui veulent une presence visuelle complete et coherente",
    features: [
      "4 concepts de logo personnalises",
      "Revisions illimitees",
      "Tous les fichiers du Pack Professionnel",
      "Kit reseaux sociaux complet : 3 a 5 templates de publications",
      "Maquette 3D du logo",
      "Palette de couleurs + mini guide de marque",
      "Carte de visite incluse",
      "Livraison en 7 a 10 jours ouvres",
    ],
    badge: null,
    highlight: false,
  },
];

export default function PackLogoCards({ onSelectPack, formRef }: PackLogoCardsProps) {
  const handleSelect = (pack: Pack) => {
    onSelectPack(pack);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

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
          <p className="section-kicker" style={{ color: "var(--cobalt-dark)" }}>Nos offres</p>
          <h2 className="public-h2 mx-auto" style={{ color: "var(--platinum-text)" }}>
            Choisissez votre pack logo
          </h2>
          <p className="public-lead mx-auto text-center" style={{ color: "var(--platinum-muted)" }}>
            Trois niveaux selon votre besoin et votre budget. Choisissez un pack pour pre-remplir votre questionnaire.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {packs.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.72, delay: i * 0.1, ease: EASE }}
              className={`relative flex flex-col rounded-[10px] transition-transform duration-300 hover:-translate-y-1 ${
                pack.highlight
                  ? "ring-2 ring-[var(--cobalt)] shadow-[0_24px_64px_rgba(215,180,106,0.22)]"
                  : "border border-[rgba(16,24,39,0.12)] shadow-[0_4px_24px_rgba(16,24,39,0.07)]"
              }`}
              style={{
                background: pack.highlight ? "linear-gradient(160deg, #fffdf7 0%, #fff8e8 100%)" : "#fff",
              }}
            >
              {pack.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--cobalt-ink)]"
                    style={{ background: "var(--cobalt)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                      <path d="M5 0l1.18 3.09L9.51 3.09 7 5.18l.95 3.09L5 6.5l-2.95 1.77L3 5.18.49 3.09l3.33-.01z" />
                    </svg>
                    {pack.badge}
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-7 pt-8">
                <p
                  className="mb-1 text-sm font-bold uppercase tracking-widest"
                  style={{ color: pack.highlight ? "var(--cobalt-dark)" : "var(--platinum-muted)" }}
                >
                  {pack.label}
                </p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span
                    className="font-display text-[2.8rem] font-extrabold leading-none"
                    style={{ color: pack.highlight ? "var(--cobalt-dark)" : "var(--platinum-text)" }}
                  >
                    {pack.price}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--platinum-muted)" }}>
                    FCFA
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--platinum-muted)" }}>
                  {pack.ideal}
                </p>

                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {pack.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.88rem] leading-snug" style={{ color: "var(--platinum-text)" }}>
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(pack.id)}
                  className={`group w-full rounded-full py-3.5 text-[0.88rem] font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                    pack.highlight ? "btn-cobalt justify-center" : ""
                  }`}
                  style={
                    !pack.highlight
                      ? {
                          border: "1.5px solid rgba(16,24,39,0.22)",
                          background: "transparent",
                          color: "var(--platinum-text)",
                        }
                      : undefined
                  }
                >
                  Choisir ce pack
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="mt-10 text-center text-sm italic"
          style={{ color: "var(--platinum-muted)" }}
        >
          Besoin d'un fichier vectoriel pour une grande enseigne, un marquage de vehicule ou de la broderie textile ? C'est possible, en supplement.
        </motion.p>
      </div>
    </section>
  );
}
