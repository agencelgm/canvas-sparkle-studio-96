# DESIGN — Systeme visuel LGM (refonte 2026)

## Promesse
« Un systeme complet pour attirer, convertir et fideliser vos clients. » Chaque page explique simplement comment campagnes, pages, qualification, CRM, rendez-vous, vente et fidelisation se relient. CTA principal unique : le diagnostic / formulaire de qualification multi-etapes (`#diagnostic`).

## Palette
- Bleu nuit / charbon (`--charcoal`, `--charcoal-panel`, `--graphite`) pour les sections d'autorite.
- Panneaux clairs (`--platinum`, `.panel-light`) pour les sections de lecture et de preuve.
- Or discret (`--cobalt`, `--cobalt-light`, `--cobalt-dark`) : accent, etat actif, numeros. Sur fond clair, utiliser `cobalt-dark` pour le contraste.
- Aucune couleur de concurrent, aucun degrade violet, pas de texte en degrade.

## Typographie
- Titres : Barlow Condensed 700/800, en capitales, interlignage serre (`.public-h1`, `.public-h2`, `.public-h3`, `font-display`).
- Corps, formulaires, boutons : Manrope.
- Kickers : Barlow Condensed en capitales, espacement 0.14em, or.

## Structure editoriale
- Hierarchie de chaque page : promesse → methode → preuves → action.
- Listes numerotees (`.numbered-row`, rangees 01–06) plutot que grilles de cartes identiques.
- Panneau contextuel adjacent qui change au survol ET au focus clavier (AnimatePresence), accordeon au toucher (`ServiceExplorer`).
- Diagramme du systeme : six etapes reliees + boucle « Mesurer et optimiser » (`SystemDiagram`, `SystemJourney`).
- Logo, logiciel sur mesure et formation sont presentes comme soutiens transversaux, jamais comme etapes.

## Images
- Uniquement les visuels de `public/images/` ou des compositions CSS/SVG originales (`.composition`, `.team-placeholder`).
- Equipe presentee par roles avec placeholders abstraits : aucun nom ni faux portrait tant que les donnees reelles ne sont pas fournies (`teamRoles` dans `src/data/systemContent.ts`).

## Motion
- Framer Motion, courbe `[0.32, 0.72, 0, 1]`, transitions courtes (opacity/transform).
- Pas d'apparition au scroll des contenus. Seule exception : sur desktop, la page `/systeme-acquisition` active l'etape visible dans un panneau collant. Sur mobile, tout est lisible sans scroll ni animation.
- `prefers-reduced-motion` : transitions coupees (CSS global + `useReducedMotion`).

## Accessibilite
- Lien « Aller au contenu », `aria-current="page"` sur la navigation, focus visibles or, menu mobile fermable par Echap, accordeons avec `aria-expanded`/`aria-controls`.

## SEO
- Domaine canonique unique : https://agencelgm.com (`src/lib/site.ts`). lgm.marketing est un site distinct.
- Sitemap statique : routes permanentes seulement. Articles lus depuis la base a l'execution.

## Interdits
Pas de `source.unsplash`, pas de `h-screen`, pas de composants 3D publics, pas de resultats inventes, pas de photos generiques presentees comme des employes.
