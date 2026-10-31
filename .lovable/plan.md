# Ouvrir le diagnostic directement, partout sur le site

## Ce qui change
- Tous les boutons « Faire mon diagnostic » et « Demander un audit » ouvrent le pop-up tout de suite, sans faire défiler jusqu'à la carte « Score de préparation ». C'est le cas dans le menu du haut (ordinateur et mobile), en haut de la page d'accueil, dans les appels à l'action en bas de page, dans le pied de page et sur la page 404.
- Si quelqu'un arrive avec un lien qui se termine par « #diagnostic » (par exemple depuis une publicité ou un message), le pop-up s'ouvre automatiquement à l'arrivée sur la page.
- Sur mobile, le menu se ferme avant l'ouverture du pop-up.
- La carte « Score de préparation » reste dans les pages comme point d'entrée visible, et son bouton ouvre aussi le pop-up.

## Détails techniques
- Dans `DiagnosticProvider` : un seul écouteur de clic global qui capte tout lien dont l'adresse se termine par `#diagnostic`, empêche le défilement et appelle `open(source)`. La source vient de la page en cours (`cta-<pathname>`). Ça couvre `Header`, `Hero`, `Footer`, `CTA`, `FinalCTA`, `MagneticLink`, `VideoHero`, `ContactSection` et `NotFound` sans modifier chaque bouton.
- `ScrollToTop` : au chargement avec le hash `#diagnostic`, ouvrir le pop-up au lieu de `scrollToDiagnostic()`, puis retirer le hash de l'adresse pour éviter une réouverture.
- Header : les boutons du menu mobile ferment déjà le menu au clic, à vérifier une fois le changement fait.
- Vérification Playwright : clic sur le menu, le bouton du haut de page et un appel à l'action en bas de page (pop-up visible, page non défilée), plus un accès direct à `/#diagnostic`.
