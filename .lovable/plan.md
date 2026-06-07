# Refonte du formulaire de qualification

## 1. Champs supprimés (étape Entreprise)

- **Ville / pays** → supprimé du formulaire ET de l'insertion DB (`location` envoyé comme chaîne vide ou `"Non renseigné"` pour respecter la contrainte NOT NULL existante).
- **Site / page Facebook / Instagram / LinkedIn** → supprimé du formulaire (`website_or_social` envoyé à `null`).

Pas de migration DB : on garde les colonnes pour l'historique.

## 2. Nouvelle structure : 4 étapes avec budget réparti

Au lieu d'empiler toutes les questions budget à la fin, on les disperse pour casser les patterns que les prospects peuvent reconnaître.

### Étape 1 — Identité + signal CA

- Nom, email, téléphone/WhatsApp
- **Quel est votre Chiffre d'affaires mensuel approximatif** (déplacé ici depuis Entreprise) — présenté comme contexte de profil

### Étape 2 — Entreprise + signal équipe + ancrage

- Avez-vous déjà une entreprise ?
- nom (si oui)
- **Combien d'employés à temps plein** (reste ici)
- **Réaction au plan à 500 000 FCFA/mois** (déplacé depuis Budget) — posée tôt, avant que le prospect ne devine que c'est un test budget

### Étape 3 — Besoin (multi-select) + signal pub quotidien

- Quel est votre besoin principal ? **Sélection multiple** (1 ou plusieurs services)
- **Si au moins un service de pub payante est sélectionné** : « Pouvez-vous mettre au moins 10 000 FCFA/jour dans votre marketing ? Soit un budget mensuel de 300 000 FCFA » (déplacé depuis Objectif)
- L'étape « Publicité » (historique pub) est **fusionnée** dans cette étape, conditionnée comme avant à la sélection d'un service de pub payante : « Avez-vous déjà investi en marketing ? » + montant + résultat

### Étape 4 — Objectif 90 jours (multi-select) + capacité 405k + budget conditionnel

- Objectif principal à 90 jours : **sélection multiple**
- Précisez votre objectif (textarea)
- **Êtes-vous en mesure d'investir au minimum 405 000 FCFA ?** (Oui / Non)
- **Si « Non » uniquement** : « Quel est votre budget marketing mensuel complet en FCFA ? » apparaît (avec la confirmation d'arrondi 1 000/10 000/100 000). Si « Oui », pas de question budget supplémentaire — on considère que 405k+ est confirmé.

## 3. Stockage des sélections multiples

`service` et `objective_90_days` restent en `text` en DB ; on **joint les valeurs avec " | "** côté client (`["Plus de leads", "Plus de ventes"].join(" | ")`). Pas de migration. `paidAdvertisingServices` test passe à « au moins un service de la sélection appartient au set pub payante ».

## 4. Scroll auto en haut du formulaire à chaque étape

Ajouter un `useRef` sur le `<form>` et, dans `goNext`/`goBack`, faire :

```ts
formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
```

Compatible avec Lenis (qui intercepte scrollIntoView).

## 5. Lisibilité des questions

Les libellés actuels (`.contact-label`) sont visuellement écrasés par le titre `public-h3`. On augmente la taille/poids des libellés de questions dans ce formulaire uniquement, via une classe locale :

```
question-label : text-base md:text-lg font-bold text-platinum (clair ou foncé selon tone)
```

Appliquée à tous les `<p className="contact-label">` qui introduisent un bloc de choix, et au `<label>` des champs principaux. Le titre `public-h3` peut être légèrement réduit (`text-[clamp(1.2rem,1.8vw,1.6rem)]`) pour rééquilibrer la hiérarchie.

## 6. Calibration — adaptations

Le moteur `computeCalibration` reste, mais :

- `normalizedBudget` devient optionnel (seulement présent si l'utilisateur a répondu « Non » à 405k).
- Règle bloquante adaptée : si `canInvestMinimum === "no"` ET `monthlyBudgetRaw` < 405 000 → toujours marqué incohérent avec l'ancrage « affordable », flagué mais pas bloquant (le « non » est cohérent en soi).
- Les 3 incohérences fortes existantes restent.

## 7. Fichiers modifiés

- `src/components/QualificationForm.tsx` — restructuration steps, multi-select UI (toggle), suppression champs location/website, scroll-to-top, classe question-label, conditionnel budget.
- Aucune migration DB.

## Hors scope

- Aucun changement sur l'admin (`AdminQualifications.tsx`) — les colonnes restent identiques, l'affichage continue de fonctionner.
- Pas de refonte du design global de la carte formulaire.