# Tous les boutons d'action ouvrent directement le pop-up

## Ce qui change
Sur tout le site, chaque bouton qui menait vers un formulaire ouvre maintenant le pop-up du diagnostic directement. Plus aucun bouton ne fait défiler la page jusqu'à une carte.

- **Page campagne** (/lead-agence-marketing) : les 3 boutons « Remplir le formulaire — 2 minutes » (en haut, au milieu, et la barre fixe en bas sur mobile).
- **Page cabinets comptables** : les 2 boutons « Remplir le formulaire — 2 minutes ».
- **Tout le reste du site** : « Faire mon diagnostic » et « Demander un audit », dans le menu, en haut de page, dans les blocs d'appel à l'action en bas des pages (accueil, services, à propos, système, blog, articles, page 404), dans le pied de page et sur les cartes « Score de préparation ». C'est déjà en place, je le vérifie bouton par bouton.
- La barre fixe en bas sur mobile reste toujours visible et ouvre le pop-up. Elle ne disparaît plus quand la carte arrive à l'écran.
- **Exception, à ta demande :** les pages Logo et Site internet gardent leur formulaire de devis. Leurs boutons « Demander un devis » continuent de descendre vers ce formulaire.

## Détails techniques
- `LeadAgencePage.tsx`, `CabinetsComptablesPage.tsx` : remplacer `scrollToForm` par `useDiagnostic().open(source)` et supprimer l'observer qui masque la barre mobile.
- Liens `#diagnostic` (Header, Hero, Footer, CTA, FinalCTA, MagneticLink, VideoHero, ContactSection, NotFound) : déjà interceptés par l'écouteur global du `DiagnosticProvider`. Vérification de chacun.
- `ServicesLogoPage`, `ServicesSiteInternetPage`, `PackLogoCards`, `PackSiteCard` : pas de changement.
- Playwright en mobile 394 px et en bureau : clic sur chaque type de bouton, le pop-up doit être visible et la page ne doit pas défiler.
