# Maillage interne automatique + contrôle manuel

## Objectif

Chaque page du site (statique, service, zone, blog) doit être reliée aux autres pages pertinentes, automatiquement à la création, avec une possibilité d'override manuel. Cela maximise le SEO classique (jus de lien, crawlabilité) et l'AEO/GEO (les LLMs suivent les liens internes pour comprendre la structure thématique).

## 1. Pages actuelles à cartographier

Routes publiques existantes :

- `/` (Accueil)
- `/a-propos`
- `/services` (hub)
- `/services/:slug` (spokes — détail service)
- `/zones/:slug` (spokes — zone géographique)
- `/contact`
- `/blog` (hub)
- `/blog/:slug` (spokes — articles)

Architecture cible : **hub-and-spoke + ceintures contextuelles**.

```text
              ┌────────── Accueil ──────────┐
              │       (lie tous les hubs)    │
              ▼              ▼               ▼
          /services       /zones          /blog
           (hub)          (hub)          (hub)
          /  |  \         /  \          /  |  \
        s1  s2  s3      z1   z2       a1  a2  a3
        (chaque spoke ↔ hub + 2-3 spokes voisins + 2 articles liés)
```

## 2. Couche 1 — Maillage automatique (par convention)

Un module central `src/lib/internalLinking.ts` qui centralise toute la logique de liens. Aucune page ne hardcode ses liens sortants.

### Registre des pages

```ts
// src/data/siteGraph.ts
export type PageNode = {
  url: string;
  title: string;
  type: "home" | "hub" | "service" | "zone" | "article" | "static";
  tags: string[];          // mots-clés thématiques (ex: ["meta-ads", "leads"])
  zones?: string[];        // ex: ["abidjan", "cocody"]
  services?: string[];     // slugs services liés
  publishedAt?: string;
};

export const staticPages: PageNode[] = [ /* /, /a-propos, /services, /zones, /blog, /contact */ ];
```

Les services et zones sont déjà dans `publicContent.ts` → on les **agrège** au moment du build. Les articles de blog viennent de Supabase → on construit le graphe **côté client au runtime** via React Query (et côté script pour la sitemap).

### Fonction unique : `getRelatedLinks(currentPage, count)`

Algorithme de scoring (par ordre de poids) :

1. **Même type** + tags partagés → score élevé (articles ↔ articles du même thème)
2. **Service ↔ Zone** : un service mentionnant "meta-ads" lie aux zones où ce service est proposé
3. **Article ↔ Service/Zone** : un article taggé `meta-ads` lie au service correspondant
4. **Tous les spokes** lient à leur hub
5. **Tous les hubs** lient à l'accueil
6. **Fallback** : 2 articles récents si pas assez de matches

Retourne `count` liens triés par pertinence, avec ancres variées (`title` ou variation issue d'un pool de templates).

### Composant `<RelatedLinks page={...} />`

Inséré **par défaut** au bas de chaque template de page (ServiceDetailPage, ServiceAreaPage, BlogPostPage, AboutPage). Affiche 4-6 liens contextuels. Aucun travail manuel à chaque nouvelle page.

### Composant `<ContextualLink keyword="meta-ads">texte</ContextualLink>`

Pour les liens **dans le corps du texte** : pendant le rendu du contenu, ce composant cherche la meilleure page cible pour le mot-clé via `siteGraph`. Si la page courante = page cible → rend du texte simple (pas d'auto-link).

## 3. Couche 2 — Contrôle manuel

Trois niveaux d'override, du plus léger au plus fort.

### a) Override par page (frontmatter / champ DB)

Pour le blog : nouveau champ `related_post_ids uuid[]` et `outbound_links jsonb` sur `blog_posts`. Si rempli, ces liens **remplacent** la sélection automatique. Sinon, fallback auto.

Pour services/zones : champ optionnel `relatedSlugs?: string[]` dans `publicContent.ts`.

### b) Éditeur visuel admin

Dans `/admin/posts/:id` (et nouvelle page `/admin/linking` pour services/zones) :

- Liste des liens auto-suggérés (calculés par `getRelatedLinks`)
- Cases à cocher pour "pinner" certains, "exclure" d'autres
- Champ libre pour ajouter une URL manuelle
- Aperçu en direct des liens qui apparaîtront

Persistance dans `outbound_links` (JSON : `{pinned: [], excluded: [], extra: []}`).

### c) Règles globales

Page `/admin/linking/rules` : table `linking_rules` (id, source_tag, target_url, anchor_text, weight). Permet "tous les articles taggés `seo` lient vers /services/strategie-seo". Lues par `getRelatedLinks` avant le scoring auto.

## 4. Workflow "nouvelle page créée"

### Article de blog (déjà via admin)

1. Auteur publie l'article avec tags
2. Au save : un trigger Supabase (ou fonction edge) recalcule `outbound_links` pour cet article ET **réinscrit** les articles existants qui devraient maintenant le lier (back-linking auto)
3. Admin peut overrider dans l'éditeur

### Service / Zone (code-defined)

1. Dev ajoute l'entrée dans `publicContent.ts` avec ses `tags` et `zones`
2. Au prochain build, `<RelatedLinks>` la sélectionne automatiquement partout où elle est pertinente
3. Le script `scripts/generate-sitemap.ts` (à créer) l'ajoute à `sitemap.xml`

## 5. Sitemap, robots, llms.txt

- **`scripts/generate-sitemap.ts`** : parcourt `siteGraph` + Supabase (blog publié) → écrit `public/sitemap.xml`. Hook `predev` + `prebuild` dans `package.json`.
- **`public/robots.txt`** : ajouter les bots IA (GPTBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended) en `Allow: /` + ligne `Sitemap:`.
- **`public/llms.txt`** : déjà présent → on le **régénère** depuis `siteGraph` pour qu'il liste toutes les pages clés (services, zones, articles récents).

## 6. Schema JSON-LD pour renforcer le maillage

Sur chaque page de détail, injecter via `react-helmet-async` :

- `BreadcrumbList` (déjà recommandé) — chaîne accueil → hub → spoke
- `Article` avec `mentions` pointant vers les services/zones cités (signal AEO fort)
- `Service` avec `areaServed` listant les zones

## 7. Garde-fous

- `<NavLink>` interne uniquement vers des URLs présentes dans `siteGraph` → un lien cassé devient une erreur de type TypeScript
- Test unitaire `siteGraph.test.ts` : chaque page est joignable depuis l'accueil en ≤ 3 clics ; aucun "page orpheline"
- Composant `<DevLinkAudit />` (en `import.meta.env.DEV` seulement) affiche un overlay listant les liens internes de la page courante

## 8. Fichiers à créer / modifier

**Création :**

- `src/data/siteGraph.ts` — registre statique
- `src/lib/internalLinking.ts` — scoring + getRelatedLinks
- `src/components/seo/RelatedLinks.tsx`
- `src/components/seo/ContextualLink.tsx`
- `src/components/seo/Breadcrumbs.tsx` (avec JSON-LD)
- `scripts/generate-sitemap.ts` + hooks `package.json`
- `src/pages/admin/AdminLinking.tsx` (UI règles + override services/zones)
- Migration Supabase : `blog_posts.outbound_links jsonb`, `blog_posts.related_post_ids uuid[]`, table `linking_rules`

**Modification :**

- `src/App.tsx` — route `/admin/linking`
- `src/pages/ServiceDetailPage.tsx`, `ServiceAreaPage.tsx`, `BlogPostPage.tsx`, `AboutPage.tsx`, `Index.tsx` — insérer `<RelatedLinks />` et `<Breadcrumbs />`
- `src/pages/admin/AdminBlogPostForm.tsx` — bloc "Liens internes" (pin/exclude/extra)
- `public/robots.txt`, `public/llms.txt`

## 9. Phasage proposé

- **Phase 1 (fondations)** : `siteGraph`, `internalLinking`, `<RelatedLinks>`, `<Breadcrumbs>`, intégration dans les 4 templates publics. Sitemap auto. → couvre 80 % du besoin.
- **Phase 2 (manuel)** : migration DB, bloc admin "Liens internes" sur le formulaire d'article, table `linking_rules`.
- **Phase 3 (raffinage)** : `<ContextualLink>` dans le corps des articles, recalcul back-link automatique, audit overlay dev.

## Hors scope

- Pas de réécriture du contenu existant des articles (juste ajout des composants).
- Pas de génération de pages programmatiques nouvelles dans ce chantier (couvert par un autre skill).
- Pas de redirections 301 — le routing actuel est conservé.

## Questions à valider avant de coder

1. **Démarre-t-on par la Phase 1 seule** (auto only, suffisant immédiatement) ou on enchaîne directement Phase 1 + 2 ?
2. **Override admin sur services/zones** : utile maintenant ou seulement quand on aura beaucoup de zones programmatiques ?
3. **Nombre de liens** affichés par défaut dans `<RelatedLinks>` : 4 ou 6 ?
