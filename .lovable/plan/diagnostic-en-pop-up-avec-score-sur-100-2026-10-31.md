# Diagnostic en pop-up avec score sur 100

## Ce qui change pour le visiteur

- Partout sur le site (accueil, services, contact, blog, page cabinets comptables, page lead campagne), le formulaire affiché dans la page est remplacé par un bouton « Commencer mon diagnostic ».
- Le bouton ouvre un pop-up plein écran sur mobile (feuille qui monte du bas, poignée, bouton fermer) et une grande fenêtre centrée sur ordinateur.
- Mise en page reprise des maquettes : logo LGM en haut, jauge « Score de préparation » qui monte en direct à chaque réponse (+X après la réponse), barre d'étapes « Étape N sur 10 », grand titre avec un mot clé en couleur, cartes-réponses avec icône et coche, bandeau info, boutons Précédent / Suivant.
- Couleurs adaptées au site : fond bleu nuit/charbon, cartes claires, or/bronze à la place du bleu-violet ; titres Barlow Condensed, texte Manrope.
- Mouvement : ouverture en fondu + glissement, questions qui glissent à chaque étape, réponses qui apparaissent en cascade, jauge et chiffre animés, petit rebond au choix. Tout est coupé si l'appareil demande moins d'animations.

## Les 10 étapes

1. Accueil (4 garanties : confidentiel, moins de 3 min, recommandations, sans engagement)
2. Secteur d'activité (cartes illustrées)
3. Objectif principal à 90 jours (+ autre objectif facultatif)
4. Déjà investi en publicité en ligne ?
5. Budget publicitaire mensuel moyen (tranches)
6. Accompagnement à partir de 405 000 FCFA/mois : envisageable ? (Oui / Pas encore / Besoin d'en discuter)
7. Chiffre d'affaires mensuel / taille d'équipe (vérification discrète du budget, comme aujourd'hui)
8. Qui prend la décision ?
9. Coordonnées : prénom, nom, email, WhatsApp (+225)
10. Résultat : score final et suite

## Grille de score (sur 100)

- Budget envisageable 405 000 FCFA : 25
- Budget publicitaire déjà dépensé : 15
- Chiffre d'affaires / taille d'équipe : 15
- Décideur : 15
- Déjà investi en publicité : 10
- Objectif clair : 10
- Secteur adapté : 10
- Les réponses incohérentes sur le budget retirent des points (logique actuelle conservée).
- **65 et plus = qualifié.** En dessous = non qualifié.

## Après l'envoi

- Qualifié : page rendez-vous actuelle (vidéo + calendrier), puis page « rendez-vous confirmé ».
- Non qualifié : page actuelle « Votre demande a bien été reçue » (contact sous 24 h).
- Ces pages sont restylées pour suivre exactement le pop-up (mêmes cartes, jauge du score, boutons), sans changer leur fonctionnement.
- L'événement Facebook « prospect » reste envoyé uniquement aux qualifiés.

## Enregistrement et GoHighLevel

- Chaque diagnostic est enregistré chez nous avec toutes les réponses, le score et le statut, visible dans l'admin.
- Une fonction serveur envoie ensuite le contact à ton adresse GoHighLevel (webhook entrant) avec score, statut qualifié/non qualifié, réponses, page d'origine et UTM — pour déclencher tes automatisations et l'assignation aux commerciaux.
- Je te demanderai l'adresse du webhook via un formulaire sécurisé.

## Détails techniques

- Nouveau `DiagnosticModal` (Dialog/Drawer + framer-motion `AnimatePresence`), ouvert via un contexte global `useDiagnostic().open(source)` ; le contenu des questions et la grille vivent dans `src/data/diagnosticContent.ts`, le calcul dans `src/lib/diagnosticScore.ts` (+ tests vitest sur le seuil 65).
- Remplacement de `QualificationForm`, `CabinetQualificationForm`, `GhlQualificationForm` par un bouton déclencheur.
- Migration : colonnes `score`, `qualified`, `answers jsonb`, `ghl_status` ajoutées à `qualification_submissions` (additif).
- Edge function `ghl-webhook` : validation zod, insertion service role, POST vers le secret `GHL_WEBHOOK_URL`, met à jour `ghl_status`.
- Redirections actuelles conservées ; la page rendez-vous reçoit les données sans passer par GHL.
- Webhook is: [https://services.leadconnectorhq.com/hooks/bYBrfkNK5nfKneUURhX9/webhook-trigger/e9f34aaa-e349-4513-a56e-1d973c024a71](https://services.leadconnectorhq.com/hooks/bYBrfkNK5nfKneUURhX9/webhook-trigger/e9f34aaa-e349-4513-a56e-1d973c024a71)