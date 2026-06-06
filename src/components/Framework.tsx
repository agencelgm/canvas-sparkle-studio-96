import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const pillars = [
  {
    number: "01",
    title: "Acquisition",
    subtitle: "Attirer les bons prospects",
    description:
      "Nous créons un flux constant de prospects qualifiés grâce à des stratégies ciblées sur les canaux où se trouvent vos clients.",
    tags: ["Réseaux sociaux", "SEO & SEA", "Génération de leads", "Publicité digitale"],
    icon: "/images/acf-social.png",
  },
  {
    number: "02",
    title: "Conversion",
    subtitle: "Transformer les visites en ventes",
    description:
      "Nous optimisons chaque point de contact pour que vos prospects franchissent le pas : pages de destination, tunnels de vente, offres irrésistibles.",
    tags: ["Landing pages", "Tunnel de vente", "Optimisation CRO", "Offres & pricing"],
    icon: "/images/acf-validation.png",
  },
  {
    number: "03",
    title: "Fidélisation",
    subtitle: "Créer des clients qui reviennent",
    description:
      "Nous mettons en place des systèmes automatisés pour maintenir la relation, encourager les achats répétés et transformer vos clients en ambassadeurs.",
    tags: ["Email automation", "Loyalty programs", "Upsell & cross-sell", "NPS & rétention"],
    icon: "/images/acf-loyalty.png",
  },
];

/* Akan decorative pattern for Framework section */
const AkanPatternCorner = () => (
  <div
    className="absolute top-0 left-0 pointer-events-none select-none"
    style={{ width: "320px", height: "320px", opacity: 0.04 }}
    aria-hidden="true"
  >
    <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
      <defs>
        <pattern id="akan-fw" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 1 L39 20 L20 39 L1 20 Z" stroke="#C49A2A" strokeWidth="0.7" fill="none" />
          <path d="M20 9 L31 20 L20 31 L9 20 Z" stroke="#C49A2A" strokeWidth="0.4" fill="none" />
        </pattern>
        <radialGradient id="akan-fw-fade" cx="0" cy="0" r="1.1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopOpacity="1" />
          <stop offset="65%" stopOpacity="0.2" />
          <stop offset="100%" stopOpacity="0" />
        </radialGradient>
        <mask id="akan-fw-mask">
          <rect width="320" height="320" fill="url(#akan-fw-fade)" />
        </mask>
      </defs>
      <rect width="320" height="320" fill="url(#akan-fw)" mask="url(#akan-fw-mask)" />
    </svg>
  </div>
);

/* ── Desktop pillar card ─────────────────────────────────────── */
const PillarCard = ({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) => (
  <motion.div
    className="flex-1"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay: index * 0.14, ease: EASE }}
  >
    {/* Icon */}
    <div className="mb-5">
      <img
        src={pillar.icon}
        alt=""
        aria-hidden="true"
        style={{
          width: "44px",
          height: "44px",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
          opacity: 0.55,
        }}
      />
    </div>

    {/* Number */}
    <div
      className="font-display mb-4"
      style={{
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        color: "var(--akan-gold)",
        fontWeight: 700,
      }}
    >
      {pillar.number}
    </div>

    {/* Title */}
    <h3
      className="font-serif mb-1"
      style={{
        fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
        fontWeight: 400,
        letterSpacing: "-0.015em",
        lineHeight: 1.15,
        color: "#F5EFE0",
      }}
    >
      {pillar.title}
    </h3>

    {/* Subtitle */}
    <p
      className="font-serif italic mb-5"
      style={{
        fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
        color: "var(--akan-gold-light)",
        opacity: 0.75,
      }}
    >
      {pillar.subtitle}
    </p>

    {/* Description */}
    <p
      className="font-sans mb-6"
      style={{
        fontSize: "0.88rem",
        lineHeight: 1.72,
        color: "rgba(240, 232, 213, 0.55)",
        maxWidth: "30ch",
      }}
    >
      {pillar.description}
    </p>

    {/* Tags */}
    <ul className="flex flex-col gap-1.5" aria-label={`Services ${pillar.title}`}>
      {pillar.tags.map((tag) => (
        <li
          key={tag}
          className="font-sans flex items-center gap-2"
          style={{ fontSize: "0.78rem", color: "rgba(240, 232, 213, 0.44)" }}
        >
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "rgba(196,154,42,0.5)",
              flexShrink: 0,
            }}
          />
          {tag}
        </li>
      ))}
    </ul>
  </motion.div>
);

/* ── Mobile accordion item ───────────────────────────────────── */
const AccordionItem = ({
  pillar,
  index,
  isOpen,
  onToggle,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    style={{
      borderBottom: "1px solid rgba(196, 154, 42, 0.10)",
    }}
  >
    <button
      className="w-full flex items-center justify-between py-5 text-left"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <div className="flex items-center gap-4">
        <img
          src={pillar.icon}
          alt=""
          aria-hidden="true"
          style={{
            width: "28px",
            height: "28px",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
            opacity: 0.45,
            flexShrink: 0,
          }}
        />
        <span
          className="font-serif"
          style={{
            fontSize: "1.5rem",
            fontWeight: 400,
            letterSpacing: "-0.015em",
            color: "#F5EFE0",
          }}
        >
          {pillar.title}
        </span>
      </div>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{
          color: isOpen ? "var(--akan-gold-light)" : "rgba(240,232,213,0.4)",
          fontSize: "1.4rem",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        +
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.38, ease: EASE }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-6">
            <p
              className="font-serif italic mb-4"
              style={{ fontSize: "0.88rem", color: "var(--akan-gold-light)", opacity: 0.75 }}
            >
              {pillar.subtitle}
            </p>
            <p
              className="font-sans mb-5"
              style={{
                fontSize: "0.86rem",
                lineHeight: 1.7,
                color: "rgba(240, 232, 213, 0.55)",
              }}
            >
              {pillar.description}
            </p>
            <ul className="flex flex-wrap gap-2">
              {pillar.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-sans"
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.25rem 0.75rem",
                    border: "1px solid rgba(196,154,42,0.18)",
                    borderRadius: "100px",
                    color: "rgba(232,201,107,0.6)",
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ── Main component ──────────────────────────────────────────── */
const Framework = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="framework"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 80% 70%, rgba(42,31,14,0.55) 0%, transparent 50%), radial-gradient(ellipse at 10% 20%, rgba(196,154,42,0.06) 0%, transparent 50%), #0D0B08",
        paddingTop: "clamp(5rem, 12vw, 9rem)",
        paddingBottom: "clamp(5rem, 12vw, 9rem)",
      }}
    >
      {/* Akan decorative pattern — top-left corner */}
      <AkanPatternCorner />

      <div className="container-wide relative z-10">

        {/* Section header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F5EFE0",
              maxWidth: "18ch",
              textWrap: "balance",
            }}
          >
            Une méthode en trois leviers,{" "}
            <em style={{ color: "var(--akan-gold-light)" }}>pas une promesse.</em>
          </h2>
        </motion.div>

        {/* ── Desktop: 3 pillars + SVG connecting line ─────────── */}
        <div className="hidden md:block">
          {/* SVG line above pillars */}
          <div className="relative mb-12">
            <svg
              width="100%"
              height="2"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="rgba(196, 154, 42, 0.3)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
              />
            </svg>
            {/* Pillar anchor dots on the line */}
            {[0, 50, 100].map((pos) => (
              <motion.div
                key={pos}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${pos}%`, transform: `translateX(-50%) translateY(-50%)` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.8 + pos / 200, ease: EASE }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    border: "1px solid var(--akan-gold)",
                    background: "#0D0B08",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Pillars */}
          <div className="flex gap-8 lg:gap-12">
            {pillars.map((pillar, i) => (
              <PillarCard key={pillar.number} pillar={pillar} index={i} />
            ))}
          </div>
        </div>

        {/* ── Mobile: accordion ─────────────────────────────────── */}
        <div
          className="md:hidden"
          style={{ borderTop: "1px solid rgba(196, 154, 42, 0.10)" }}
        >
          {pillars.map((pillar, i) => (
            <AccordionItem
              key={pillar.number}
              pillar={pillar}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <a href="/services">
            <button className="btn-akan-outline">
              Voir tous nos services
            </button>
          </a>
          <p
            className="font-sans"
            style={{ fontSize: "0.82rem", color: "rgba(240,232,213,0.35)" }}
          >
            Ces trois leviers fonctionnent ensemble. Jamais isolément.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Framework;
