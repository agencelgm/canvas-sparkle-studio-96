# Fix: form transparence, scroll au changement de page, sections ACF & FAQ

## 1. Formulaire transparent sur plusieurs pages

**Cause:** `QualificationForm` utilise la classe `.public-card` qui a `background: rgba(246, 248, 251, 0.055)` (5% d'opacité). Sur les hero sombres espresso (Services, Contact, Blog, Service Detail, Zone, About, NotFound), le `DiagnosticHeroSlot` est donc quasi invisible.

**Correction:**
- Dans `src/components/QualificationForm.tsx`, quand `variant="hero"`, remplacer la classe `public-card` par un fond solide opaque cohérent avec la charte : surface graphite avec léger inner glow bronze, bordure dorée plus marquée. Exemple :
  ```
  bg-[#0f1623] border border-[#f0d99633] shadow-[0_30px_90px_rgba(0,0,0,0.45)] rounded-md
  ```
  au lieu de `public-card`.
- Garder `public-card` pour le variant "full" (où il vit déjà sur un fond clair platinum suffisamment contrasté).
- Vérifier également `tone` : forcer `tone="dark"` côté `DiagnosticHeroSlot` (déjà le cas par défaut) pour assurer la lisibilité des labels.

## 2. Scroll non remis à zéro au changement de page

**Cause probable:** le navigateur restaure la position de scroll de l'ancienne page (scrollRestoration = "auto" par défaut). `ScrollToTop` s'exécute en `useLayoutEffect`, mais la restauration navigateur se déclenche après et écrase notre `scrollTo(0)`.

**Correction:**
- Dans `src/main.tsx`, ajouter au démarrage :
  ```ts
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  ```
- Dans `src/components/ScrollToTop.tsx`, après le `window.scrollTo(...)` initial, planifier un second scroll via `requestAnimationFrame` pour couvrir le cas où des composants enfants (images, Helmet, framer-motion) modifient la hauteur après le premier paint :
  ```ts
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));
  ```
- Conserver la logique existante pour `#diagnostic`.

## 3. Section « Méthode ACF » mal centrée

**Cause:** `src/components/Framework.tsx` utilise `grid lg:grid-cols-[0.82fr_1fr]` avec un kicker/H2/lead à gauche en sticky. Visuellement l'ensemble paraît décalé à gauche et les piliers s'étalent.

**Correction (Framework.tsx):**
- Passer à une structure verticale centrée :
  - En-tête (kicker, H2, lead, CTA) dans un bloc `max-w-3xl mx-auto text-center`.
  - Image éditoriale `ImageFrame` en pleine largeur `max-w-5xl mx-auto` sous l'en-tête.
  - Les trois piliers (`Acquisition / Conversion / Fidélisation`) en grille `md:grid-cols-3 gap-6` avec cartes de hauteur égale (`h-full`), titre + body + tag-list alignés en colonne, texte gauche dans la carte mais cartes centrées dans la section.
- Garder typographie et tokens existants ; pas de changement de palette.

## 4. Section FAQ mal structurée

**Cause:** `src/components/FAQ.tsx` utilise `grid lg:grid-cols-[0.62fr_1fr]` ce qui laisse l'en-tête flottant à gauche et les questions décalées.

**Correction (FAQ.tsx):**
- En-tête (`Questions`, H2, lead) centré : `max-w-3xl mx-auto text-center mb-12`.
- Liste de questions dans un bloc `max-w-3xl mx-auto` (lisibilité), chaque item en pleine largeur avec séparateurs `border-t`. Texte des questions et réponses alignés à gauche dans la colonne, mais colonne elle-même centrée.

## Fichiers modifiés

- `src/main.tsx` (scrollRestoration manual)
- `src/components/ScrollToTop.tsx` (double scroll RAF)
- `src/components/QualificationForm.tsx` (fond opaque pour variant hero)
- `src/components/Framework.tsx` (layout vertical centré)
- `src/components/FAQ.tsx` (layout vertical centré)

## Hors scope

- Pas de changement de copy.
- Pas de modification du contenu FAQ (`faqContent.ts`) ni des piliers.
- Pas de refonte du Hero ou du flow du formulaire (étapes, validation).
