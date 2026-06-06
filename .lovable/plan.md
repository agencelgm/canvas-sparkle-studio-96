## SEO Audit & Fixes for LGM

The SEO scan returned no findings, so I ran the skill protocol manually. Below are the gaps found and the fixes I'll apply. Scope is limited to SEO files, head metadata, and FAQ DOM visibility — no business logic or visual redesigns.

### Issues found

1. **FAQ answers are invisible to crawlers** — `src/components/FAQ.tsx` uses `AnimatePresence` so answers are only mounted when open. Even though `faqSchema` exposes them as JSON-LD, the visible HTML doesn't match, which weakens FAQ rich results.
2. **No `public/sitemap.xml`** — crawlers have nothing to discover beyond the homepage.
3. **No `public/llms.txt`** — missing AI-search summary file.
4. **`robots.txt` doesn't list AI bots** (GPTBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended).
5. **Blog post pages lack `Article` + `BreadcrumbList` JSON-LD** — only title/description/og:image are set in `BlogPostPage.tsx`.
6. **Service detail pages lack `Service` + `BreadcrumbList` JSON-LD**.
7. **Other public pages (`/a-propos`, `/services`, `/contact`, `/blog`) lack `BreadcrumbList`**.

Pages already look clean for: title length, descriptions, canonicals (via Helmet), and `LocalBusiness` + `FAQPage` JSON-LD on the homepage.

### Changes

**1. `src/components/FAQ.tsx` — crawlable accordion**
- Replace the `AnimatePresence` block with an always-mounted `<div>` whose height is animated via Framer Motion (`animate={{ height: isOpen ? "auto" : 0 }}`) and `overflow-hidden`. Answer text stays in the DOM at all times. Keep visual behavior identical.

**2. `public/robots.txt` — allow AI bots**
- Append explicit `Allow: /` blocks for `GPTBot`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`. Keep existing blocks and add `Sitemap: https://lgm.marketing/sitemap.xml`.

**3. `public/sitemap.xml` — static sitemap**
- Static file listing the public routes: `/`, `/a-propos`, `/services`, `/services/{slug}` (one per `publicServices` entry in `src/data/publicContent.ts`), `/contact`, `/blog`. Use `https://lgm.marketing` as base.
- Blog posts are dynamic (Supabase-backed). I'll add a comment noting that for full coverage we'd need a generator script — out of scope for this pass unless requested.

**4. `public/llms.txt`**
- Short markdown summary (FR) describing LGM, services, and key URLs based on `localBusinessSchema` and `publicServices`.

**5. `src/pages/BlogPostPage.tsx` — Article + Breadcrumb JSON-LD**
- Add `<script type="application/ld+json">` for `Article` (headline, datePublished, dateModified, author/publisher = LGM, image, mainEntityOfPage) and a `BreadcrumbList` (Accueil → Blog → post title). Also add canonical link.

**6. `src/pages/ServiceDetailPage.tsx` — Service + Breadcrumb JSON-LD**
- Add `Service` schema (name, description, provider = LGM, areaServed = Abidjan/CI) and `BreadcrumbList` (Accueil → Services → service title). Add canonical.

**7. `src/pages/AboutPage.tsx`, `ServicesPage.tsx`, `ContactPage.tsx`, `BlogPage.tsx` — Breadcrumb JSON-LD + canonical**
- Add a small `BreadcrumbList` JSON-LD and a `<link rel="canonical">` to each.

### Out of scope (will mention, not do)
- Dynamic blog-post sitemap generator (needs a `predev`/`prebuild` script).
- og:image generation for blog posts that lack `featured_image`.
- Content rewrites / definition blocks on articles (would require touching CMS content).
