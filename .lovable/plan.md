# Budget questions: new title and explanation

## Question "Quel budget…" (shown after "Pas encore" / "J'ai besoin d'en discuter")
- **Title:** "Pour bien vous orienter : combien pouvez-vous investir chaque mois pour attirer de nouveaux clients ?"
- **Explanation, right under the title** (replaces "Choisissez la tranche…"): "Pour attirer des clients, il faut de la publicité et quelqu'un pour la gérer. Ce budget couvre les deux."
- The explanation no longer appears at the bottom.

## Question "Notre accompagnement démarre à 270 000 FCFA/mois…" (fix)
Its explanation currently says the full amount goes into advertising, which is wrong because your fees are included. It will get the same explanation: "Pour attirer des clients, il faut de la publicité et quelqu'un pour la gérer. Ce budget couvre les deux."

Answer ranges, scoring and budget rules stay the same.

## Technical
- `src/data/diagnosticContent.ts`: update the `title`/`subtitle` of `budgetRange`, remove its `info`; update the `minimum` subtitle; delete the unused `BUDGET_INFO`.
