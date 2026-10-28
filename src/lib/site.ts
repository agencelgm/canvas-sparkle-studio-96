// Domaine canonique du site public LGM (lgm.marketing est un site distinct).
export const SITE_URL = "https://agencelgm.com";
export const absUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
export const OG_IMAGE = absUrl("/images/og-lgm.jpg");

export const breadcrumbSchema = (items: { name: string; path?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    ...(item.path ? { item: absUrl(item.path) } : {}),
  })),
});
