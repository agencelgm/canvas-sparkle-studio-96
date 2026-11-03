# Page formation Facebook : version complète

Page : /lead-agence-marketing/formation-facebook (reste en noindex, hors sitemap).

## Contenu, de haut en bas
1. **En-tête** : « Gérez vos propres campagnes publicitaires », la promesse des 4 semaines, puis la nouvelle vidéo juste en dessous (lecteur de la page pilote).
2. **Bouton principal** : « Je réserve ma place à la prochaine session ». Il ouvre WhatsApp au +225 07 98 17 23 39 avec un message déjà rempli.
3. **Pour qui** : 4 points « faite pour vous si », et une ligne courte « pas faite pour vous si ».
4. **Format** : 6 petites cartes (4 semaines, mercredi 19h, Zoom en direct, sur votre activité, 50 000 FCFA, inscription WhatsApp).
5. **Programme semaine par semaine** : 4 blocs dépliables. Chacun a son objectif, ses points et son résultat de fin de séance. Le texte reste lisible par Google.
6. **Ce que vous saurez faire** : 6 points cochés.
7. **Pourquoi apprendre plutôt que déléguer** : les 2 paragraphes de la fiche.
8. **FAQ** (4 questions, texte toujours présent dans la page) :
   - Vous ne pouvez pas venir un mercredi : la rediffusion vous est envoyée après chaque séance.
   - Budget publicitaire : prévoir au moins 50 000 FCFA de publicité pendant la formation, en plus du prix de la formation.
9. **Bouton final** : « 50 000 FCFA, une seule fois. Places limitées, une session par mois. » et le même bouton de réservation.
10. **Lien discret en bas** : rejoindre la chaîne WhatsApp gratuite (inchangé).

Sur téléphone, une barre fixe en bas reprend le bouton de réservation. Les couleurs restent celles du site : fond sombre, or discret, polices actuelles.

## Détails techniques
- Envoi de la vidéo `Préparez_votre_rendez-vous_avec_LGM_1080p_2.mp4` sur le CDN, ajout d'un champ `formation` dans `leadAgenceConfig.ts`, réutilisation de `VideoSlot`.
- Le texte de la page va dans `src/data/formationContent.ts`.
- FAQ en `<details>/<summary>`, avec les données structurées FAQPage, Course et BreadcrumbList.
- Mise à jour du message WhatsApp pré-rempli de `formationWhatsappUrl` (« réserver ma place à la prochaine session »).
