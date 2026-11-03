# Étape 2 à droite de la vidéo (ordinateur)

Page : rendez-vous de qualification.

## Ce qui change
- Sur ordinateur (écran large), « Étape 1 — Regardez cette vidéo » à gauche et « Étape 2 — Réservez votre appel » (texte, calendrier, WhatsApp) à droite, côte à côte, alignés en haut.
- La page s'élargit un peu sur ordinateur pour que les deux colonnes aient de la place (la vidéo garde une taille confortable, le calendrier reste lisible).
- Sur téléphone et tablette : rien ne change, l'étape 2 reste sous la vidéo.
- Le titre, le badge de score et l'avertissement « programme pilote » restent centrés au-dessus.

## Détails techniques
- `LeadAgenceRendezVousPage.tsx` : remplacer `space-y-8` par `grid gap-8 lg:grid-cols-2 lg:items-start` ; élargir le conteneur sur `lg` (ex. `lg:max-w-6xl`) en gardant `container-narrow` pour mobile.
- Vérification Playwright à 1512px et 394px.
