# « Remplir le formulaire » ouvre directement le pop-up

## Ce qui change
- Sur la page campagne (/lead-agence-marketing) et sur la page cabinets comptables, tous les boutons « Remplir le formulaire — 2 minutes » ouvrent le pop-up du diagnostic tout de suite. Ça concerne le bouton du haut, celui du milieu de page et le bouton collé en bas de l'écran sur mobile. Ils ne font plus défiler jusqu'à la carte.
- La barre fixe en bas sur mobile reste visible et ouvre elle aussi le pop-up. Elle ne se cache plus quand la carte apparaît à l'écran.
- La carte « Formulaire de qualification » reste en place sur la page, comme point d'entrée visible.
- Je vérifie aussi qu'aucun autre bouton du site ne fait encore défiler vers un formulaire au lieu d'ouvrir le pop-up.

## Détails techniques
- `LeadAgencePage.tsx` et `CabinetsComptablesPage.tsx` : `scrollToForm` remplacé par `open("lead-agence-marketing")` / `open("cabinets-comptables")` via `useDiagnostic()`. L'observer qui masque la barre mobile quand `#formulaire` est visible est supprimé.
- Recherche dans `src` des autres appels `scrollIntoView` / `getElementById("formulaire")` / `#formulaire` pour les passer au même mécanisme.
- Vérification Playwright en mobile 394 px : clic sur chaque bouton, le pop-up doit être visible et la page ne doit pas défiler.
