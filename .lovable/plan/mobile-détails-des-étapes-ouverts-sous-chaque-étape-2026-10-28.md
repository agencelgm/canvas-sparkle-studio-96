# Mobile : détails des étapes ouverts sous chaque étape

## Problème
Sur téléphone, les 6 étapes sont en grille de 2 colonnes et l'explication s'affiche tout en bas, après la boucle de mesure. Au toucher, la personne est envoyée vers une autre page sans voir l'explication.

## Ce qui change (mobile uniquement, sous 640 px)
- Les 6 étapes deviennent une liste verticale en accordéon : numéro, titre, sous-titre et une flèche.
- Toucher une étape ouvre son explication (question + description) juste en dessous ; une seule ouverte à la fois, la première ouverte par défaut.
- Dans le panneau ouvert : un lien discret « Voir l'étape en détail » vers la page Système d'acquisition.
- Une fine ligne dorée verticale relie les numéros pour garder l'idée de parcours.
- La boucle « Mesurer et optimiser » reste sous la liste.
- Ouverture douce, désactivée si l'utilisateur a réduit les animations.
- Les explications restent présentes dans la page (bon pour le référencement).

## Inchangé
Tablette et ordinateur : grille actuelle avec l'explication en dessous au survol. Mêmes couleurs, mêmes textes.

## Technique
Dans `SystemDiagram.tsx` : ajouter un bloc `sm:hidden` avec boutons `aria-expanded`/`aria-controls` et panneau toujours dans le DOM (hauteur animée), et passer la grille + panneau actuels en `hidden sm:block`. Fonctionne pour les tons dark et light.
