import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

export const faqItems = [
  {
    question: "Combien de temps avant de voir les premiers résultats ?",
    answer:
      "Les premiers signaux (augmentation du trafic qualifié, premiers leads) apparaissent généralement entre 3 et 6 semaines selon le canal activé. Les résultats durables et mesurables sur le chiffre d'affaires se consolident entre 60 et 90 jours. Nous ne promettons pas de miracles — nous promettons une méthode rigoureuse et un reporting transparent chaque semaine.",
  },
  {
    question: "Quelle est la méthode ACF de LGM ?",
    answer:
      "ACF signifie Acquisition, Conversion, Fidélisation. C'est une méthode propriétaire qui traite ces trois leviers comme un système cohérent et interconnecté. Attirer des prospects sans les convertir est du gaspillage. Convertir sans fidéliser coûte cher. Les trois doivent fonctionner ensemble pour créer une croissance durable — c'est pourquoi nous ne travaillons jamais sur un seul levier isolément.",
  },
  {
    question: "Travaillez-vous avec toutes les tailles d'entreprises ?",
    answer:
      "Nous travaillons principalement avec des PME et des entreprises en croissance basées en Afrique de l'Ouest. Nos clients idéaux ont déjà une offre validée et cherchent à systématiser et accélérer leur acquisition commerciale. Nous ne sommes pas le bon partenaire pour les startups qui cherchent encore leur marché — mais nous sommes le partenaire idéal pour celles qui veulent passer à l'échelle.",
  },
  {
    question: "Quel budget minimum pour travailler avec LGM ?",
    answer:
      "Nos engagements démarrent à partir de 300 000 FCFA par mois pour un accompagnement sur un levier unique (acquisition ou conversion). Un accompagnement complet ACF (les trois leviers activés simultanément) représente un investissement mensuel entre 600 000 et 1 500 000 FCFA selon la taille de votre marché et les canaux activés. Chaque engagement inclut le budget de gestion et les frais publicitaires éventuels.",
  },
  {
    question: "Êtes-vous uniquement basés à Abidjan ?",
    answer:
      "Notre siège est à Abidjan, en Côte d'Ivoire, et c'est le marché que nous connaissons le mieux. Nous accompagnons également des clients au Sénégal, au Cameroun et dans d'autres marchés d'Afrique de l'Ouest francophone. Le marketing digital n'a pas de frontières — nos stratégies s'adaptent à chaque marché local.",
  },
  {
    question: "Que comprend le suivi hebdomadaire ?",
    answer:
      "Chaque semaine, vous recevez un rapport structuré avec les métriques clés (leads générés, coût par lead, taux de conversion, revenus attribuables). Ce rapport est accompagné d'une synthèse des actions menées, des ajustements effectués et des priorités de la semaine suivante. Un appel de 30 minutes est proposé chaque semaine pour répondre à vos questions. Vous avez aussi accès à un dashboard en temps réel à tout moment.",
  },
];

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
    style={{ borderBottom: "1px solid rgba(196, 154, 42, 0.12)" }}
  >
    <button
      className="w-full flex items-start justify-between gap-6 py-5 text-left"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span
        className="font-serif"
        style={{
          fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
          color: isOpen ? "var(--ivory-text)" : "rgba(26,21,16,0.78)",
          transition: "color 0.25s ease",
          textAlign: "left",
        }}
      >
        {item.question}
      </span>

      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{
          flexShrink: 0,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: `1px solid ${isOpen ? "var(--akan-gold)" : "rgba(196,154,42,0.25)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isOpen ? "var(--akan-gold)" : "rgba(196,154,42,0.5)",
          fontSize: "1rem",
          lineHeight: 1,
          marginTop: "0.15rem",
          transition: "border-color 0.25s ease, color 0.25s ease",
        }}
      >
        +
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.38, ease: EASE }}
          style={{ overflow: "hidden" }}
        >
          <p
            className="font-sans pb-6"
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.72,
              color: "var(--ivory-muted)",
              maxWidth: "68ch",
            }}
          >
            {item.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      style={{
        background: "var(--ivory)",
        paddingTop: "clamp(5rem, 12vw, 8rem)",
        paddingBottom: "clamp(5rem, 12vw, 8rem)",
      }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Left — Label + title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div
              className="font-display mb-4"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(139,105,20,0.65)",
                fontWeight: 700,
              }}
            >
              FAQ
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--ivory-text)",
                textWrap: "balance",
              }}
            >
              Questions
              <br />
              <em style={{ color: "#8B6914" }}>fréquentes</em>
            </h2>
          </motion.div>

          {/* Right — Accordion */}
          <div style={{ borderTop: "1px solid rgba(196, 154, 42, 0.12)" }}>
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
