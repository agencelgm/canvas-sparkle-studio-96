# Formulaire simplifié et minimaliste (questions et évaluation conservées)

## Ce que le visiteur verra
- Une carte claire et sobre : une question à la fois, grand titre, réponses en simples boutons-listes (texte seul, sans icônes ni illustrations).
- Plus de jauge de score, de « Score de préparation », de détail du profil.
- Annonce : « 4 petites questions ». Progression par section : fine barre + « Section 2 / 4 ».
- Clic sur une réponse = passage automatique à la question suivante (pas de bouton « Suivant »), petit lien « Retour ».
- Animation légère : simple fondu entre les questions.

## Toutes les questions actuelles gardées, regroupées en 4 sections avec conditions
1. **Votre activité** : secteur (+ « Autre » avec champ libre), objectif principal (+ « Autre objectif »).
2. **Publicité et budget** :
   - « Avez-vous déjà investi en publicité en ligne ? »
   - Si **Oui** → « Quel budget mensuel avez-vous investi ? » (tranches). Si **Non** → cette question n'apparaît pas.
   - « Pouvez-vous investir 270 000 FCFA/mois ? » (avec l'explication budget pub).
   - Si **Pas encore / À discuter** → « Quel est votre budget ? » (tranches). Si **Oui** → n'apparaît pas.
3. **Votre entreprise** : chiffre d'affaires, qui décide.
4. **Vos coordonnées** : nom, WhatsApp, email sur un seul écran.

## Évaluation conservée à l'identique
- Même grille sur 100, même seuil de 65, mêmes règles : moins de 100 000 = exclu sans événement Facebook ; 100 000-270 000 = programme pilote ; 270 000+ = règle des 65 points.
- Même envoi vers GoHighLevel et mêmes pages de redirection.

## Détails techniques
- `diagnosticContent.ts` : retirer icônes/illustrations des options, ajouter une condition `showIf` par question (pastBudget si invested = oui ; budgetRange si minimum ≠ oui) ; textes « 4 petites questions ».
- `DiagnosticModal.tsx` : retirer ScoreGauge, sidebar, badges de points ; progression par section (STAGES existant) ; auto-avance au clic pour les questions à choix unique ; garder le mode inline et pop-up.
- Aucune modification de `diagnosticScore.ts` ni du webhook (réponses conditionnelles absentes déjà gérées).
- Nettoyer les classes `.dx-*` devenues inutiles.
- Vérification Playwright : parcours « déjà investi », « jamais investi », pilote et exclu, téléphone et ordinateur.
