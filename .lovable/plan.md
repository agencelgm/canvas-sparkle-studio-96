# Budget follow-up question: explanation on top, reworded

Question shown to people who answered "Pas encore" or "J'ai besoin d'en discuter" on the 270 000 FCFA question.

## Changes
1. **Title** (accents fixed): "Quel budget mensuel pouvez-vous consacrer à votre publicité ?"
2. **Explanation moved under the title**, replacing "Choisissez la tranche la plus proche…", and reworded for people who didn't understand why we ask:

   "Pas de souci, précisons. Ce budget ne nous rémunère pas : il sert à diffuser vos publicités sur Facebook, Google et Instagram, et c'est lui qui vous amène des prospects. Indiquez le montant que vous pourriez y consacrer chaque mois, même s'il est inférieur à 270 000 FCFA."

3. **Bottom text removed** on this question.

Answer ranges, scoring and the budget rules (under 100 000 / pilot 100 000–270 000 / 270 000+) stay the same.

## Technical
- `src/data/diagnosticContent.ts`, step `budgetRange`: update `title` and `subtitle`, remove `info`. `BUDGET_INFO` is no longer used anywhere after this, so delete it.
