# Corriger les boutons « Remplir le formulaire » de la page campagne

## Incohérence
Les boutons disent « 2 minutes » alors que le formulaire dit « Ça prend 1 minute ».
- Les 2 boutons (milieu de page + barre collante en bas sur téléphone) deviennent : « Remplir le formulaire — 1 minute ».
- La réponse FAQ « savoir en deux minutes » devient « en une minute ».

## Boutons qui ne répondent pas
Dans mon test sur téléphone, la page remonte bien jusqu'au formulaire. Mais le défilement « doux » peut être ignoré sur certains téléphones (Safari, navigateur intégré Facebook/Instagram), et quand on arrive au formulaire, rien n'indique que le clic a marché.
- Calculer la position du formulaire et défiler vers elle directement (avec une solution de secours instantanée si le défilement doux ne démarre pas).
- À l'arrivée : un court halo doré autour du formulaire pour montrer « c'est ici ».
- Respecter le réglage « réduire les animations » (défilement instantané, pas de halo).

## Vérification
Test sur téléphone (393px) et ordinateur : clic depuis le milieu de page et depuis la barre collante, le formulaire apparaît en haut de l'écran avec le halo.

## Technique
- `src/pages/LeadAgencePage.tsx` : `scrollToForm` → `window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 16 })`, vérif après 400 ms et saut direct si toujours loin ; ajoute une classe `dx-flash` 1,2 s.
- `src/index.css` : animation `dx-flash` (box-shadow doré), désactivée sous `prefers-reduced-motion`.
