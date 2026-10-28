# Supprimer la bande sombre à droite sur mobile

## Cause (vérifiée)
La ligne noire entourée en rouge n'est pas un décalage du contenu : c'est la barre de défilement personnalisée du site (6 px, fond charbon). Sur les sections claires, ce fond sombre ressort et donne l'impression que la page est poussée vers la gauche/droite. Les marges du contenu sont bien égales (20 px de chaque côté) et rien ne dépasse de l'écran.

## Ce qui sera fait
1. Sur téléphone et tablette (moins de 1024 px) : masquer complètement la barre de défilement personnalisée. Le défilement au doigt continue de fonctionner normalement.
2. Sur ordinateur : garder une barre fine, mais avec un fond transparent au lieu du charbon, pour qu'elle ne forme plus une bande sombre sur les sections claires. Le curseur doré reste.
3. Vérifier en format téléphone sur l'accueil, Services et Système d'acquisition que la bande a disparu.

## Détails techniques
- `src/index.css` : `::-webkit-scrollbar-track { background: transparent }` ; dans `@media (max-width: 1023px)` : `html { scrollbar-width: none }` et `::-webkit-scrollbar { width: 0; display: none }`.
