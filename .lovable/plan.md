## SEO Copy Integration Plan

You're currently ranking well, so we need to preserve key SEO signals while keeping the new premium design. Here's what needs to change:

### What we're doing

Injecting high-value SEO keywords and phrases from your old site into the new site's content — without breaking the luxurious feel. This includes updating meta tags, headings, body copy, and the HTML fallback tags.

### Changes by file

**1. `index.html` — Fix fallback meta tags**

- Change `<html lang="en">` to `<html lang="fr">`
- Update title to "LGM — Agence de Marketing Digital et Communication à Abidjan"
- Update meta description and OG tags with your SEO keywords
- Remove Lovable branding from meta tags

**2. `src/pages/Index.tsx` — Enrich Helmet meta**

- Expand keywords meta to include: "marketing digital abidjan", "communication abidjan", "leads qualifiés", "publicité digitale", "automatisation IA", "agence marketing côte d'ivoire"

**3. `src/components/Hero.tsx` — Weave in ranking keywords**

- Badge: "Agence de Marketing Digital et Communication à Abidjan"
- H1: Keep current but add "marketing digital" naturally — e.g. "De la stratégie de marketing digital aux résultats mesurables"
- Subheadline: Work in "prospects qualifiés" and "chiffre d'affaires" — e.g. "Obtenez plus de prospects qualifiés et augmentez votre chiffre d'affaires grâce à un système structuré et pilotable."
- Trust indicator: "De la stratégie de marketing digital aux résultats mesurables"

**4. `src/components/Problem.tsx` — Add SEO-rich paragraph**

- After the existing content, add a brief paragraph mentioning "stratégies de marketing digital éprouvées" and "approche personnalisée centrée sur la performance"

**5. `src/components/Services.tsx` — Align service names with old site keywords**

- Add service descriptions that include old keywords: "publicités payantes", "développement web", "amélioration de visibilité", "automatisation d'entreprise grâce à l'IA"
- Update section subtitle to mention "transformer votre entreprise"

**6. `src/components/Audience.tsx` — Add SEO copy**

- Add intro text: "Chez LGM, nous aidons les propriétaires d'entreprises ambitieux à obtenir plus de prospects qualifiés et à augmenter leur chiffre d'affaires"

**7. `src/components/CTA.tsx` — Match old CTA language**

- Subtext: "Réservez une consultation gratuite. Découvrez comment notre agence marketing peut transformer votre entreprise."
- Button: "Réservez une consultation gratuite"

**8. `src/components/Footer.tsx` — Update contact info + add social**

- Update address to: "Chateau, Camp Militaire, Angré, Abidjan"
- Update email to: [contact@lgm.marketing](mailto:contact@lgm.marketing)
- Keep current phone number
- Add Facebook/Instagram links
- Keep current tagline."De la stratégie de marketing digital aux résultats mesurables"

**9. `src/pages/AboutPage.tsx` — Enrich with old site values**

- Replace generic values with the 3 from old site: Transparence Totale, Performance, Approche Personnalisée — using their full descriptions
- Update story section to include "spécialisée en résultats tangibles"

**10. `src/pages/ServicesPage.tsx` — Add old service keywords**

- Ensure pages reference "publicités payantes", "développement web", "formations & webinaires" alongside current services

### Technical details

- All changes are copy/content only — no structural or design changes
- Helmet tags override index.html for SPA pages, but crawlers sometimes read index.html first, so both matter
- Keywords are distributed naturally across H1, H2, body text, and meta tags to preserve semantic relevance