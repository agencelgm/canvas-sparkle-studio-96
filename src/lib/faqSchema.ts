import { faqItems } from "@/data/faqContent";
import { publicServices, serviceAreaPages, siteContact } from "@/data/publicContent";

const baseUrl = "https://lgm.marketing";

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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LGM, Les Gens du Marketing",
  alternateName: ["LGM Marketing", "Agence LGM"],
  url: baseUrl,
  inLanguage: "fr-CI",
  publisher: {
    "@id": `${baseUrl}/#organization`,
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${baseUrl}/#organization`,
  name: "LGM - Les Gens du Marketing",
  alternateName: "LGM Marketing",
  description:
    "Agence marketing et communication basee a Abidjan, Cote d'Ivoire. LGM accompagne les entreprises sur la generation de leads, la publicite digitale, Facebook Ads, SEO/AEO/GEO, creation de logo, sites web, IA, automatisation et logiciels sur mesure.",
  url: baseUrl,
  telephone: siteContact.phoneHref,
  email: siteContact.email,
  priceRange: "A partir de 270000 FCFA",
  image: `${baseUrl}/images/og-lgm.jpg`,
  logo: `${baseUrl}/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteContact.address,
    addressLocality: "Abidjan",
    addressRegion: "Abidjan",
    addressCountry: "CI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 5.3599517,
    longitude: -4.0082563,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: serviceAreaPages.map((area) => ({
    "@type": "City",
    name: `${area.city}, ${area.country}`,
  })),
  knowsAbout: [
    "agence marketing Abidjan",
    "agence de communication Abidjan",
    "agence de publicite",
    "agence Facebook",
    "services Facebook",
    "generation de leads",
    "SEO local",
    "AEO",
    "GEO",
    "creation de logo",
    "automatisation IA",
    "logiciel sur mesure",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services marketing, communication, IA et developpement LGM",
    itemListElement: publicServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${baseUrl}/services/${service.slug}`,
        areaServed: serviceAreaPages.map((area) => ({
          "@type": "City",
          name: area.city,
        })),
      },
    })),
  },
};
