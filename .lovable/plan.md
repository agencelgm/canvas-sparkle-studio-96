# Calibration cachée du budget — formulaire de qualification

## Objectif

Trianguler la capacité d'investissement réelle du prospect via 3 questions indirectes posées à différentes étapes, plus 2 questions directes reformulées et espacées. Bloquer la soumission en cas d'incohérence forte. Stocker un score de cohérence visible côté admin.

## 1. Nouvelles questions indirectes

Réparties sur 3 étapes différentes pour éviter qu'on les voie « côte à côte ».

### Étape « Entreprise »

- **Chiffre d'affaires mensuel** (fourchettes) :
  - Moins de 500 000 FCFA
  - 500 000 — 2 000 000 FCFA
  - 2 — 10 millions FCFA
  - 10 — 50 millions FCFA
  - Plus de 50 millions FCFA
- **Combien d'employés avez-vous à temps plein** :
  - Solo / freelance
  - 2 à 5 personnes
  - 6 à 20 personnes
  - 21 à 50 personnes
  - Plus de 50

### Étape « Budget » (en fin de parcours)

- **Test d'ancrage** : « Si LGM vous proposait un plan d'accompagnement à 500 000 FCFA/mois, votre première réaction serait… »
  - C'est dans mes moyens
  - C'est élevé mais possible si le ROI est là
  - C'est trop pour moi aujourd'hui

## 2. Questions directes — reformulées et déplacées

- **« Êtes-vous en mesure d'investir au minimum 270 000 FCFA »** → seuil porté à **405 000 FCFA**. Reste à l'étape Budget.
- **Question « 10 000 FCFA/jour »** → reformulée en **« 5 000 FCFA par jour dans votre marketing »** ET **déplacée** hors de l'étape Budget : posée à l'étape **Objectif 90 jours**, juste après le détail de l'objectif (loin de la question 405k). Toujours conditionnée à `paidAdvertisingServices`.

## 3. Moteur de calibration (client + check serveur)

Calcul d'un `coherence_score` (0–100) et d'un `budget_band` (low / medium / high) à partir de :


| Signal                 | Source                          | Mapping band                                              |
| ---------------------- | ------------------------------- | --------------------------------------------------------- |
| CA mensuel             | étape Entreprise                | <500k = low, 500k–2M = low/med, 2M–10M = med, >10M = high |
| Taille équipe          | étape Entreprise                | solo/2-5 = low/med, 6-20 = med, >20 = high                |
| Réaction ancrage 500k  | étape Budget                    | « trop » = low, « possible » = med, « moyens » = high     |
| Capacité 405k déclarée | étape Budget                    | oui = ≥med, non = low                                     |
| 5k/jour publicité      | étape Objectif (si pub payante) | oui = ≥med, non = low                                     |


**Règle de cohérence forte (bloque la soumission) :**

- CA = « moins de 500k » **ET** capacité 405k = « oui » → incohérent
- CA = « moins de 500k » **ET** réaction ancrage = « dans mes moyens » → incohérent
- Capacité 405k = « non » **ET** réaction ancrage = « dans mes moyens » → incohérent

Message inline : *« Vos réponses semblent incohérentes. Reprenez les étapes Entreprise et Budget avant d'envoyer. »* + lien vers l'étape concernée.

## 4. Base de données

Migration `qualification_submissions` — ajout colonnes :

- `monthly_revenue_band` text
- `team_size_band` text
- `anchor_reaction` text
- `daily_ad_budget_ready_5k` boolean (remplace `can_invest_10000_daily` qui est conservé nullable pour l'historique)
- `coherence_score` integer
- `budget_band` text
- `coherence_flags` text[] (liste des règles déclenchées, vide si cohérent)

Les nouveaux champs sont nullables pour ne pas casser les anciennes lignes.

## 5. Admin — affichage

`src/pages/admin/AdminQualifications.tsx` :

- Badge couleur sur la liste : vert (cohérent + budget_band ≥ med), jaune (low ou flags faibles), rouge (flags forts — ne sera plus soumis mais montre l'historique).
- Détail : panneau « Calibration budget » qui affiche les 3 signaux indirects, la question directe, le score, et la liste des flags.

## 6. Fichiers modifiés

- `src/components/QualificationForm.tsx` — nouveaux champs FormData, nouveaux blocs UI sur les 3 étapes, reformulation 270→405k et déplacement 10k→5k, moteur de calibration côté soumission, blocage si incohérence forte.
- `src/data/publicContent.ts` — exporter les options des bandes CA / équipe / ancrage (centralisé).
- `src/pages/admin/AdminQualifications.tsx` — type + affichage badge + panneau calibration.
- Migration Supabase pour les nouvelles colonnes.

## Hors scope

- Pas de refonte des étapes existantes (Identité, Service, Histoire).
- Pas de A/B testing des formulations.
- Pas de webhook / notification — uniquement stockage + affichage admin.