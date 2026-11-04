# Formulaire simplifié et minimaliste (évaluation conservée)

## Ce que le visiteur verra
- Une carte claire et sobre : une question à la fois, grand titre, réponses en simples boutons-listes (texte seul, sans icônes ni illustrations).
- Plus de jauge de score, plus de « Score de préparation », plus de détail du profil, plus de noms d'étapes : seulement une fine barre de progression et « Question 2 / 6 ».
- Clic sur une réponse = passage automatique à la question suivante (pas de bouton « Suivant »), petit lien « Retour ».
- Animation légère : simple fondu entre les questions.

## Questions réduites (de 8-9 à 6)
1. Secteur d'activité
2. Objectif principal
3. Budget publicitaire mensuel possible (tranches : moins de 100 000 / 100 000-270 000 / 270 000-500 000 / plus de 500 000 FCFA), avec une ligne d'explication courte sur le budget pub
4. Chiffre d'affaires mensuel
5. Qui prend la décision
6. Coordonnées : nom, WhatsApp, email (un seul écran)

Les questions « Avez-vous déjà investi ? » et « Budget passé » sont retirées ; la question Oui/Pas encore + tranche est fusionnée en une seule question budget.

## Évaluation conservée
- Score sur 100 toujours calculé (invisible pour le visiteur), seuil qualifié à 65.
- Règles budget inchangées : moins de 100 000 = non qualifié, aucun événement Facebook ; 100 000-270 000 = programme pilote ; 270 000+ = règle des 65 points.
- Même envoi vers GoHighLevel et mêmes pages de redirection.

## Détails techniques
- `diagnosticContent.ts` : nouvelle liste de 5 questions, options texte seul.
- `diagnosticScore.ts` (partagé site + serveur) : nouvelle grille sur 100 — budget 35, CA 20, décision 20, objectif 15, secteur 10 ; tier dérivé directement de la tranche budget. Redéployer `ghl-webhook` et adapter la validation zod (champs retirés optionnels pour compatibilité).
- `DiagnosticModal.tsx` : retirer ScoreGauge, sidebar, STAGES, illustrations ; auto-avance au clic ; mode inline et pop-up gardent la même structure simplifiée.
- Nettoyer les classes `.dx-*` devenues inutiles.
- Vérification Playwright : un parcours qualifié, pilote et exclu, téléphone et ordinateur.
