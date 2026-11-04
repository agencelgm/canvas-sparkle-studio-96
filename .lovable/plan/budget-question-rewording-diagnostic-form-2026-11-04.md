# Budget question rewording (diagnostic form)

Changes to the question "Notre accompagnement démarre à 270 000 FCFA/mois…" (same in the inline form and the pop-up):

1. **New question title**
   "Notre accompagnement démarre à **270 000 FCFA/mois**. Est-ce un montant que vous pouvez investir chaque mois ?"
   (proper French accents restored; "chaque mois" reads more naturally than "mensuellement")

2. **Explanation moved to the top**
   The text "Ce montant est celui que nous investissons en publicité sur Facebook, Google et Instagram pour vous…" replaces the subtitle "Pour vous proposer un accompagnement adapté…", directly under the question.

3. **Bottom repetition removed** on this question (the explanation no longer appears at the end).

Answers (Oui / Pas encore / J'ai besoin d'en discuter), scoring and budget rules stay unchanged. The follow-up "Quel budget mensuel…" question keeps its explanation at the bottom unless you want the same treatment.

## Technical
- `src/data/diagnosticContent.ts`, step `minimum`: update `title`, set `subtitle` to BUDGET_INFO text (with accents), remove `info`.
