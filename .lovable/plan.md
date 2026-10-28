# Corriger le décalage vers la droite sur mobile

## Constat actuel (vérifié en format téléphone 393 px)
- Aucun élément ne dépasse de l'écran sur l'accueil et la page ne défile pas sur le côté.
- Les marges de contenu sont de 20 px à gauche et à droite, mais la barre du haut (logo + menu) a seulement 12 px de marge : le logo n'est donc pas aligné avec les titres et le texte en dessous, ce qui peut donner une impression de décalage.
- La cause exacte reste à confirmer avec ta capture d'écran.

## Ce qui sera fait
1. Avec ta capture, identifier l'élément exact qui paraît décalé.
2. Aligner la barre du haut sur les mêmes marges que le contenu (20 px) pour que logo, titres et boutons partent de la même ligne.
3. Vérifier toutes les pages publiques en format téléphone (393 px et 360 px) : aucun élément ne dépasse, marges gauche et droite égales.
4. Corriger tout élément qui dépasse ou qui est décentré (formulaires, listes, cartes, images).
5. Rien ne change sur ordinateur et tablette.

## Détails techniques
- Script Playwright qui mesure, pour chaque page du sitemap, les éléments dont `right > clientWidth` ou dont marges gauche/droite diffèrent de plus de 8 px.
- Harmoniser le padding horizontal du header flottant avec `container-wide` sur mobile.
