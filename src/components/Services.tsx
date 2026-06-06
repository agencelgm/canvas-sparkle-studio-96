import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE = [0.32, 0.72, 0, 1] as const;

const services = [
  {
    number: "01",
    title: "Génération de leads qualifiés",
    description:
      "Nous construisons des systèmes d'attraction qui amènent vos prospects idéaux — pas des visiteurs au hasard.",
    tags: ["Meta Ads", "Google Ads", "LinkedIn", "Landing pages"],
  },
  {
    number: "02",
    title: "SEO & visibilité locale",
    description:
      "Présence dominante sur Abidjan et toute la Côte d'Ivoire. Vos clients vous trouvent avant la concurrence.",
    tags: ["SEO technique", "Contenu local", "Google Business"],
  },
  {
    number: "03",
    title: "Tunnels de conversion",
    description:
      "Chaque point de contact est optimisé pour transformer. Offres, UX, copywriting — rien au hasard.",
    tags: ["CRO", "A/B testing", "Copywriting", "UX"],
  },
  {
    number: "04",
    title: "Automatisation & IA",
    description:
      "Vos processus marketing tournent seuls. Nurturing, relances, scoring — sans intervention manuelle.",
    tags: ["Email flows", "CRM", "IA générative", "Zapier"],
  },
  {
    number: "05",
    title: "Réseaux sociaux business",
    description:
      "Pas de contenu pour le contenu. Chaque post sert un objectif : visibilité, leads, ou conversion.",
    tags: ["Instagram", "LinkedIn", "TikTok", "Stratégie éditoriale"],
  },
  {
    number: "06",
    title: "Sites web & développement",
    description:
      "Des sites qui convertissent : rapides, mobiles, conçus pour vendre — pas seulement pour paraître.",
    tags: ["React", "WordPress", "E-commerce", "Performance"],
  },
];

const ServiceRow = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: "1px solid rgba(196, 154, 42, 0.10)",
        padding: "2rem 0",
        cursor: "default",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start">
        {/* Number */}
        <span
          className="font-display"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: hovered ? "var(--akan-gold)" : "rgba(196,154,42,0.35)",
            fontWeight: 700,
            paddingTop: "0.3rem",
            transition: "color 0.3s ease",
            minWidth: "2.5rem",
          }}
        >
          {service.number}
        </span>

        {/* Title + description */}
        <div>
          <h3
            className="font-serif mb-2"
            style={{
              fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
              color: hovered ? "#F5EFE0" : "rgba(245, 239, 224, 0.82)",
              transition: "color 0.3s ease",
            }}
          >
            {service.title}
          </h3>
          <p
            className="font-sans"
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.68,
              color: "rgba(240, 232, 213, 0.45)",
              maxWidth: "52ch",
            }}
          >
            {service.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 md:justify-end md:max-w-[200px]">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans"
              style={{
                fontSize: "0.68rem",
                padding: "0.2rem 0.6rem",
                border: "1px solid rgba(196,154,42,0.18)",
                borderRadius: "100px",
                color: "rgba(232, 201, 107, 0.5)",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover underline */}
      <motion.div
        style={{
          height: "1px",
          background: "var(--akan-gold)",
          transformOrigin: "left",
          marginTop: "1.5rem",
        }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.4 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </motion.div>
  );
};

const Services = () => (
  <section
    id="services"
    style={{
      background: "var(--espresso)",
      paddingTop: "clamp(5rem, 12vw, 9rem)",
      paddingBottom: "clamp(5rem, 12vw, 9rem)",
    }}
  >
    <div className="container-wide">
      {/* Header */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F5EFE0",
              maxWidth: "20ch",
              textWrap: "balance",
            }}
          >
            Ce que nous faisons,{" "}
            <em style={{ color: "var(--akan-gold-light)" }}>et pourquoi ça marche.</em>
          </h2>
          <Link to="/services">
            <button
              className="btn-akan-outline flex-shrink-0"
              style={{ padding: "0.6rem 1.5rem", fontSize: "0.78rem" }}
            >
              Tous nos services
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Service list */}
      <div style={{ borderTop: "1px solid rgba(196, 154, 42, 0.10)" }}>
        {services.map((service, i) => (
          <ServiceRow key={service.number} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
