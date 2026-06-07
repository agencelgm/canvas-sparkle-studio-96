import { publicServices, serviceAreaPages } from "./publicContent";

export type PageType = "home" | "hub" | "service" | "zone" | "article" | "static";

export type PageNode = {
  url: string;
  title: string;
  type: PageType;
  tags: string[];
  zones?: string[];
  services?: string[];
  description?: string;
  publishedAt?: string;
};

// Hubs + statiques fondateurs. Les services et zones sont generes automatiquement
// a partir de publicContent.ts pour ne jamais etre desynchronises.
const staticNodes: PageNode[] = [
  { url: "/", title: "Accueil LGM", type: "home", tags: ["acquisition", "conversion", "fidelisation", "acf"] },
  { url: "/a-propos", title: "A propos de LGM", type: "static", tags: ["agence", "equipe", "methode"] },
  { url: "/services", title: "Tous les services", type: "hub", tags: ["services", "leviers"] },
  { url: "/blog", title: "Blog LGM", type: "hub", tags: ["blog", "contenu", "insights"] },
  { url: "/contact", title: "Contact LGM", type: "static", tags: ["contact", "diagnostic"] },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const serviceNodes: PageNode[] = publicServices.map((service) => ({
  url: `/services/${service.slug}`,
  title: service.title,
  type: "service",
  description: service.description,
  tags: [...service.tags.map(slugify), slugify(service.kicker), service.slug],
}));

const zoneNodes: PageNode[] = serviceAreaPages.map((area) => ({
  url: `/zones/${area.slug}`,
  title: area.title,
  type: "zone",
  description: area.metaDescription,
  zones: [slugify(area.city), slugify(area.country)],
  tags: ["zone-locale", slugify(area.city), slugify(area.country), "agence-marketing"],
  services: publicServices.map((s) => s.slug), // toutes les zones servent tous les services
}));

// Graphe code-defined (services + zones + statiques). Les articles de blog
// sont ajoutes a l'execution via `withBlogNodes` car ils viennent de la DB.
export const codeGraph: PageNode[] = [...staticNodes, ...serviceNodes, ...zoneNodes];

export const withBlogNodes = (blogNodes: PageNode[]): PageNode[] => [...codeGraph, ...blogNodes];

export const findNode = (graph: PageNode[], url: string) => graph.find((n) => n.url === url);
