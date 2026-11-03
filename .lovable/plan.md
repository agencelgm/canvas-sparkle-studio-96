# Rééquilibrer vidéo et réservation (ordinateur)

Problème : la colonne de gauche (vidéo seule) est courte, alors que celle de droite (texte + calendrier) est très haute, ce qui laisse un grand vide sous la vidéo.

## Ce qui change
- **Colonne gauche** : la vidéo, puis juste dessous « L'appel dure environ 45 minutes… Nous parlerons de : » avec les 4 points, puis la ligne WhatsApp. Le contenu qui explique l'appel accompagne la vidéo.
- **Colonne droite** : « Étape 2 — Réservez votre appel », le titre et directement le calendrier. Elle devient plus courte.
- La colonne gauche reste visible en haut de l'écran pendant qu'on fait défiler le calendrier, donc plus de grand vide.
- Les deux cartes commencent à la même hauteur, et la vidéo est un peu plus large (environ 55 % / 45 %).
- Téléphone : même ordre qu'avant (vidéo, explications, calendrier, WhatsApp).

## Détails techniques
- `LeadAgenceRendezVousPage.tsx` : grille `lg:grid-cols-[1.15fr_1fr]`, colonne gauche `lg:sticky lg:top-24`; déplacer la liste `callPoints` et le paragraphe WhatsApp dans la carte 1 (bloc séparé sous la vidéo) ; sur mobile, conserver l'ordre via `order-*` si besoin pour que WhatsApp reste après le calendrier.
- Vérification Playwright à 1512px, 1024px et 394px.
