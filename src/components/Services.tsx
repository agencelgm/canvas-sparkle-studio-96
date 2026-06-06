import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE = [0.32, 0.72, 0, 1] as const;

/* SVG icons — inline, no external library */
const icons = {
  leads: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2C7 2 4.5 4 4.5 6.5c0 1.5.7 2.8 1.8 3.7L4 17h12l-2.3-6.8c1.1-.9 1.8-2.2 1.8-3.7C15.5 4 13 2 10 2z"/>
      <path d="M7.5 17v1.5M12.5 17v1.5"/>
    </svg>
  ),
  seo: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8.5" r="5.5"/>
      <path d="M17 17l-3.5-3.5"/>
    </svg>
  ),
  tunnel: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h14M5 8h10M7 12h6M9 16h2"/>
    </svg>
  ),
  auto: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="2.5"/>
      <path d="M10 2v2.5M10 15.5V18M2 10h2.5M15.5 10H18M4.2 4.2l1.8 1.8M14 14l1.8 1.8M15.8 4.2L14 6M6 14l-1.8 1.8"/>
    </svg>
  ),
  social: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="4" r="2"/>
      <circle cx="15" cy="16" r="2"/>
      <circle cx="4" cy="10" r="2"/>
      <path d="M6 10h5.5M13 5.5l-4.5 3M13 14.5l-4.5-3"/>
    </svg>
  ),
  web: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="16" height="12" rx="1.5"/>
      <path d="M7 18h6M10 15v3"/>
      <path d="M2 9h16"/>
    </svg>
  ),
};

const services = [
  {
    number: "01",
    icon: icons.leads,
    title: "Génération de leads qualifiés",
    description:
      "Nous construisons des systèmes d'attraction qui amènent vos prospects idéaux — pas des visiteurs au hasard.",
    tags: ["Meta Ads", "Google Ads", "LinkedIn", "Landing pages"],
  },
  {
    number: "02",
    icon: icons.seo,
    title: "SEO & visibilité locale",
    description:
      "Présence dominante sur Abidjan et toute la Côte d'Ivoire. Vos clients vous trouvent avant la concurrence.",
    tags: ["SEO technique", "Contenu local", "Google Business"],
  },
  {
    number: "03",
    icon: icons.tunnel,
    title: "Tunnels de conversion",
    description:
      "Chaque point de contact est optimisé pour transformer. Offres, UX, copywriting — rien au hasard.",
    tags: ["CRO", "A/B testing", "Copywriting", "UX"],
  },
  {
    number: "04",
    icon: icons.auto,
    title: "Automatisation & IA",
    description:
      "Vos processus marketing tournent seuls. Nurturing, relances, scoring — sans intervention manuelle.",
    tags: ["Email flows", "CRM", "IA générative", "Zapier"],
  },
  {
    number: "05",
    icon: icons.social,
    title: "Réseaux sociaux business",
    description:
      "Pas de contenu pour le contenu. Chaque post sert un objectif : visibilité, leads, ou conversion.",
    tags: ["Instagram", "LinkedIn", "TikTok", "Stratégie éditoriale"],
  },
  {
    number: "06",
    icon: icons.web,
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
        padding: "1.75rem 0",
        cursor: "default",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start">

        {/* Icon + number */}
        <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5" style={{ minWidth: "3rem" }}>
          <span
            style={{
              color: hovered ? "var(--akan-gold)" : "rgba(196,154,42,0.5)",
              transition: "color 0.3s ease",
            }}
          >
            {service.icon}
          </span>
          <span
            className="font-display"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              color: hovered ? "var(--akan-gold)" : "rgba(196,154,42,0.28)",
              fontWeight: 700,
              transition: "color 0.3s ease",
            }}
          >
            {service.number}
          </span>
        </div>

        {/* Title + description */}
        <div>
          <h3
            className="font-serif mb-2"
            style={{
              fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
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
              color: "rgba(240, 232, 213, 0.42)",
              maxWidth: "54ch",
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
          marginTop: "1.25rem",
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
    className="relative overflow-hidden"
    style={{
      background:
        "radial-gradient(ellipse at 90% 10%, rgba(42,31,14,0.5) 0%, transparent 50%), radial-gradient(ellipse at 5% 80%, rgba(196,154,42,0.055) 0%, transparent 50%), #0D0B08",
      paddingTop: "clamp(5rem, 12vw, 9rem)",
      paddingBottom: "clamp(5rem, 12vw, 9rem)",
    }}
  >
    <div className="container-wide relative z-10">
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
              maxWidth: "22ch",
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
