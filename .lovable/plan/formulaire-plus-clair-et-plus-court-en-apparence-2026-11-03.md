# Formulaire plus clair et plus court en apparence

## 1. Texte d'invitation au-dessus des questions
In the form's top bar (where the logo is now on the campaign page), replace the logo with a short line:
- Title: "Sommes-nous l'agence qu'il vous faut ?"
- Sub: "Remplissez le formulaire ci-dessous pour le savoir. Ça prend 1 minute."

## 2. "1 minute" partout
Every "3 minutes" / "Moins de 3 minutes" mention tied to the diagnostic (pop-up intro, launcher card line) becomes "1 minute".

## 3. Progression en 4 étapes au lieu de 10
Questions stay the same (scoring unchanged), but they're grouped into 4 named stages:

```text
Étape 1 sur 4 · Votre activité       -> secteur, objectif
Étape 2 sur 4 · Publicité et budget  -> déjà investi, budget passé, budget 270 000, tranche (si affichée)
Étape 3 sur 4 · Votre entreprise     -> chiffre d'affaires, décision
Étape 4 sur 4 · Vos coordonnées      -> contact
```

- The progress bar shows 4 segments; the current one fills gradually as questions within the stage are answered.
- The welcome screen and the result screen are not counted.
- The "%" counter is removed (it revealed the real length).

Applies to both the inline form on the campaign page and the pop-up elsewhere.

## Technical details
- `DiagnosticModal.tsx`: add a `stage` map by question id; compute `stageIndex` and in-stage fraction; render 4 segments with partial `scaleX`; inline header shows the invitation text instead of the logo.
- Update "3 minutes" strings in `DiagnosticModal.tsx` and `DiagnosticLauncher.tsx`.
- Playwright check on desktop and phone.
