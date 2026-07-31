## Ce qui ne va pas sur desktop (constaté sur une capture à 1440px)

1. **Colonne droite vide** : le formulaire s'arrête à ~850px de haut, mais la colonne gauche continue (stats, « Comment ça marche »). Résultat : un grand vide à droite sur presque un écran entier.
2. **La section FAQ n'est pas alignée** : le bloc est contraint à `max-w-3xl` mais collé à gauche, donc tout le côté droit est vide alors que le titre s'étend au-delà.
3. **Bloc « Comment ça marche » trop étroit** : les 4 cartes sont écrasées dans la moitié gauche, avec des textes minuscules (text-xs) alors qu'il y a de la place.
4. **En-tête déséquilibré** : le logo à gauche et le texte « Agence de marketing digital — Abidjan » à l'extrême droite, sans rythme visuel commun avec le reste.

## Correction proposée

**Section héro (2 colonnes)**
- Garder en colonne gauche uniquement : kicker, H1, paragraphes d'accroche, barre de chiffres (x7 / 24h / 12+).
- Sortir « Comment ça marche » du grid héro et en faire sa propre section pleine largeur, en 4 colonnes égales sur desktop (2 sur tablette, 1 sur mobile), avec des tailles de texte remontées (titre `text-base`, corps `text-sm`).
- Rendre la colonne formulaire `lg:sticky top-24` pour qu'elle accompagne le scroll au lieu de laisser un trou.
- Aligner les deux colonnes en haut (`items-start`) et équilibrer le grid (`lg:grid-cols-[1fr_minmax(420px,0.9fr)]`).

**Section FAQ**
- Centrer le bloc : `mx-auto max-w-3xl` sur l'ensemble (kicker + titre + questions), avec titre et kicker centrés, pour un axe unique au milieu de la page.

**En-tête**
- Conserver logo à gauche / mention à droite mais aligner la hauteur du logo (`h-9`) et masquer la mention sous `sm` pour éviter le tassement.

## Détails techniques
- Fichier unique concerné : `src/pages/CabinetsComptablesPage.tsx` (présentation uniquement, aucun changement de logique ni de formulaire).
- Aucune modification de `index.css` nécessaire ; on réutilise `container-wide`, `metric-rail`, `public-card`.
- Vérification finale : capture Playwright à 1440px et 1280px pour confirmer qu'il n'y a plus de zone vide ni de bloc décalé, puis type-check.
