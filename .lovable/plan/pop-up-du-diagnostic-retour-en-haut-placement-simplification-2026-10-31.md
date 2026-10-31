# Pop-up du diagnostic : retour en haut, placement, simplification

## 1. Retour en haut à chaque étape
- Quand on passe d'une question à l'autre (Suivant, Précédent ou choix d'une réponse), la zone du pop-up remonte toute seule tout en haut. On voit donc toujours la jauge et le titre de la nouvelle question.
- Sur mobile, la jauge reste visible en haut sans qu'il faille remonter à la main.

## 2. Carte « Diagnostic » mal placée sur la page
- Entre la taille téléphone et la taille ordinateur (votre capture), la carte est poussée vers la droite et paraît décalée.
- Correction : sur ces largeurs, la carte prend toute la largeur de la colonne, alignée à gauche avec le texte au-dessus. Elle ne passe à droite qu'à côté du titre, sur grand écran.

## 3. Simplifier la carte d'entrée et l'écran d'accueil du pop-up
Aujourd'hui, les mêmes 4 encadrés (confidentiel, 3 minutes, recommandations, sans engagement) apparaissent deux fois, avec un texte en plus : c'est trop chargé.

Carte sur la page (avant d'ouvrir) :
- Un petit titre, le grand titre « Diagnostic digital interactif », une phrase courte.
- Le bouton « Commencer mon diagnostic ».
- En dessous, une seule ligne discrète : « Gratuit · Sans engagement · 3 minutes · Confidentiel », séparée par des points, sans encadrés.

Accueil du pop-up (étape 1) :
- Grand titre + une phrase courte.
- Trois points maximum en liste simple, avec une petite icône dorée : « Moins de 3 minutes », « Résultat immédiat sur 100 », « Gratuit et sans engagement ». Pas de cartes, pas de sous-texte.
- Le bouton « Commencer le diagnostic » et la mention de confidentialité en petit dessous.
- Résultat : l'écran tient sur un téléphone sans faire défiler.

## Détails techniques
- `DiagnosticModal` : ref sur `.dx-scroll`, `scrollTo({ top: 0 })` à chaque changement de `step` (instantané si les animations sont réduites).
- `.diagnostic-hero-panel` : `justify-self: stretch` + `max-width: none` sous `lg`, `justify-self: end` gardé à partir de `lg`.
- `DiagnosticLauncher` et l'étape 0 du modal : suppression des grilles d'avantages, remplacées par une ligne / une liste de 3 éléments.
