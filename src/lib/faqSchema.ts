import { faqItems } from "@/components/FAQ";

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MarketingAgency"],
  name: "LGM — Les Gens du Marketing",
  alternateName: "LGM Marketing",
  description:
    "Agence de marketing digital à Abidjan, Côte d'Ivoire. Spécialiste de l'acquisition de leads, la conversion et la fidélisation client grâce à la méthode ACF.",
  url: "https://lgm.marketing",
  telephone: "+2250798172339",
  email: "contact@lgm.marketing",
  foundingDate: "2019",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Château, Camp Militaire, Angré",
    addressLocality: "Abidjan",
    addressRegion: "Abidjan",
    addressCountry: "CI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 5.3599517,
    longitude: -4.0082563,
  },
  areaServed: [
    { "@type": "Country", name: "Côte d'Ivoire" },
    { "@type": "Country", name: "Sénégal" },
    { "@type": "Country", name: "Cameroun" },
    { "@type": "Country", name: "Burkina Faso" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Marketing LGM",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Génération de leads qualifiés" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & visibilité locale Abidjan" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tunnels de conversion" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatisation marketing & IA" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestion réseaux sociaux business" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Développement sites web conversion" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Création de logo & identité visuelle" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logiciel sur mesure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Publicité Facebook & Meta Ads" } },
    ],
  },
  sameAs: [
    "https://facebook.com/lgmmarketing",
    "https://instagram.com/lgmmarketing",
  ],
};
