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
- Budget : `minimum` passe à 270 000 ; nouvelle question `budgetRange` dans `diagnosticContent.ts`, affichée seulement si `minimum` vaut `pas_encore` ou `discuter`. Barème `budgetRange` dans `_shared/diagnosticScore.ts` : la part budget = 25 si `minimum`=oui, sinon les points de la tranche. Tests vitest mis à jour (270 000, tranches, seuil 65). `ghl-webhook` : validation zod, libellés, champ `budget_tranche`, `budget_normalized` calculé sur la tranche, puis redéploiement. Le total d'étapes s'adapte au nombre de questions réellement affichées.

## Budget : 270 000 FCFA et question de rattrapage
- La question du budget dit maintenant : « Notre accompagnement démarre à **270 000 FCFA/mois**. Est-ce envisageable ? » (Oui / Pas encore / J'ai besoin d'en discuter).
- Sous la question, une explication : « Ce montant est celui que nous investissons en publicité sur Facebook, Google et Instagram pour vous. C'est lui qui génère vos prospects : plus de budget, plus de prospects, plus de chances de signer de nouveaux clients. »
- Si la personne répond « Pas encore » ou « J'ai besoin d'en discuter », une question en plus apparaît juste après : « Quel budget mensuel pouvez-vous consacrer à votre acquisition ? »
  - Moins de 100 000 FCFA
  - 100 000 à 200 000 FCFA
  - 200 000 à 270 000 FCFA
  - 270 000 FCFA ou plus
- Points pour le budget (25 au total, inchangé) : « Oui » 25 · 270 000 ou plus 25 · 200 000 à 270 000 : 15 · 100 000 à 200 000 : 8 · moins de 100 000 : 0.

## Règles de décision selon le budget
- **Moins de 100 000 FCFA** : toujours non qualifié, quel que soit le score. Page « Votre demande a bien été reçue », **aucun événement Facebook**. Statut envoyé à GoHighLevel : « non qualifié – budget insuffisant ».
- **100 000 à 270 000 FCFA** : qualifié pour le **programme pilote**, quel que soit le score. La personne va vers la page rendez-vous, mais l'écran de résultat et la page rendez-vous affichent un avertissement : « Avec ce budget, vous risquez de ne pas être qualifié pour notre accompagnement complet. Nous pouvons vous proposer notre programme pilote : parlons-en pendant l'appel. » L'événement Facebook « prospect » est envoyé. Statut GoHighLevel : « qualifié – programme pilote ».
- **270 000 FCFA ou plus, ou « Oui »** : règle du score inchangée, qualifié à partir de 65/100. Statut GoHighLevel : « qualifié » ou « non qualifié ».
- Montant, tranche et statut (dont « programme pilote ») sont envoyés à GoHighLevel et visibles dans l'admin. Les mentions « 405 000 » disparaissent partout.
- Tests ajoutés : moins de 100 000 → non qualifié même avec un score élevé ; 100 000 à 270 000 → programme pilote ; 270 000 ou plus → seuil de 65.
- Vérification Playwright : clic sur le menu, le bouton du haut de page et un appel à l'action en bas de page (pop-up visible, page non défilée), plus un accès direct à `/#diagnostic`.
