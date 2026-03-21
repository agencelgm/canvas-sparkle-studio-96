

## Add "Publicité Facebook" Service Page

### What changes

Add the Facebook Ads service as a dedicated entry in the existing service detail system, using the SEO copy from the old site.

### File changes

**1. `src/pages/ServiceDetailPage.tsx`** — Add new entry to `servicesData`

Add key `"publicite-facebook"` with:
- icon: `Megaphone` (or `Facebook` from lucide if available)
- title: "Publicité Facebook"
- headline: "Maximisez Votre Impact avec Nos Campagnes Facebook"
- description: Copy from old site about being the specialized Facebook ads agency in Abidjan
- benefits: "Garantie de Résultats", "Stratégies Personnalisées pour Chaque Client", "Expertise en ciblage précis", "Rapports détaillés et mesurables", "Gestion complète des campagnes", "Amélioration continue basée sur les données", "Accompagnement et support proactif"
- process: 4-step process — Consultation gratuite → Analyse des besoins → Lancement campagnes → Résultats mesurables

**2. `src/pages/ServicesPage.tsx`** — Add Facebook Ads to the services grid

Add a new entry in the `services` array with slug `"publicite-facebook"` so it appears on the services listing page.

**3. `src/App.tsx`** — No changes needed

The route `/services/:slug` already handles all service detail pages dynamically.

### Technical notes

- The `ServiceDetailPage` component already handles dynamic slugs — just adding data is enough
- Old site slug was `agence-marketing-publicite-facebook/` but we'll use `publicite-facebook` to match the existing URL pattern (can add a redirect later if needed for SEO)
- SEO meta tags are already handled by `Helmet` in `ServiceDetailPage`

