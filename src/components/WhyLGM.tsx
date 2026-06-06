import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE = [0.32, 0.72, 0, 1] as const;

const differentiators = [
  {
    label: "Connaissance du marché",
    text: "Nous opérons en Afrique de l'Ouest depuis 2019. Nous ne traduisons pas des stratégies occidentales — nous les construisons pour ici.",
  },
  {
    label: "Méthode ACF propriétaire",
    text: "Acquisition, Conversion, Fidélisation activées comme un système cohérent. Pas trois prestataires séparés.",
  },
  {
    label: "Résultats mesurables uniquement",
    text: "Chaque action est liée à une métrique. Pas de rapport flou, pas de notoriété non traçable.",
  },
  {
    label: "Reporting hebdomadaire",
    text: "Vous savez exactement ce qui se passe chaque semaine. Dashboards en temps réel, appels de suivi, transparence totale.",
  },
  {
    label: "Équipe dédiée, pas de sous-traitance",
    text: "Vos campagnes sont gérées par notre équipe interne. Pas d'intermédiaires, pas de pertes en ligne.",
  },
];

const WhyLGM = () => (
  <section
    style={{
      background: "var(--ivory)",
      paddingTop: "clamp(5.5rem, 14vw, 10rem)",
      paddingBottom: "clamp(5.5rem, 14vw, 10rem)",
      overflow: "hidden",
    }}
  >
    <div className="container-wide">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-stretch">

        {/* Left — Editorial image (Lagos, Nigeria) */}
        <motion.div
          className="relative mb-12 lg:mb-0"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ minHeight: "420px" }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              height: "100%",
              minHeight: "420px",
              maxHeight: "620px",
            }}
          >
            <img
              src="https://source.unsplash.com/afqRNiMCELc/800x1000"
              alt="Professionnel ouest-africain au travail — Abidjan, Côte d'Ivoire"
              className="w-full h-full object-cover"
              style={{ display: "block" }}
              loading="lazy"
              crossOrigin="anonymous"
            />
            {/* Subtle vignette for editorial feel */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(245,239,224,0.12) 100%)",
              }}
            />
          </div>

          {/* Floating label */}
          <motion.div
            className="absolute bottom-0 left-0"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            style={{
              background: "var(--ivory)",
              padding: "0.9rem 1.2rem",
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(42,31,14,0.45)",
              }}
            >
              Abidjan, Côte d'Ivoire
            </p>
          </motion.div>
        </motion.div>

        {/* Right — Differentiators */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          className="flex flex-col justify-center"
        >
          {/* Section label */}
          <div
            className="font-display mb-5"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(139,105,20,0.65)",
              fontWeight: 700,
            }}
          >
            Pourquoi LGM
          </div>

          {/* Heading */}
          <h2
            className="font-serif mb-10"
            style={{
              fontSize: "clamp(1.8rem, 3.8vw, 3rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.18,
              color: "var(--ivory-text)",
              textWrap: "balance",
              maxWidth: "22ch",
            }}
          >
            Pas une agence générique.{" "}
            <em style={{ color: "#8B6914" }}>Une méthode.</em>
          </h2>

          {/* Differentiators list */}
          <div>
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: 0.08 * i, ease: EASE }}
                style={{
                  paddingTop: "1.25rem",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid rgba(196, 154, 42, 0.12)",
                }}
              >
                <div className="flex gap-4 items-start">
                  {/* Gold dot */}
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "var(--akan-gold)",
                      flexShrink: 0,
                      marginTop: "0.45rem",
                    }}
                  />
                  <div>
                    <p
                      className="font-sans mb-1"
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--ivory-text)",
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-sans"
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: 1.65,
                        color: "var(--ivory-muted)",
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link to="/a-propos">
              <button className="btn-ivory">
                En savoir plus sur LGM
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyLGM;
