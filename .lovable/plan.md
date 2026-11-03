# Formulaire en panneau clair, plus reposant

## Ce qui change visuellement
- Le formulaire devient une carte crème (fond #F7F3EA, cases blanches) posée sur la page sombre : il ressort sans agresser.
- Texte bleu nuit foncé (#1B2537), texte secondaire gris-bleu doux.
- L'or (#B8913F, plus sobre) n'apparaît plus qu'à 3 endroits : le bouton « Continuer », la réponse choisie, la barre de progression.
- Les icônes des réponses passent en gris-bleu discret (plus de pastilles dorées partout) ; elles deviennent or seulement quand la réponse est choisie.
- Suppression des halos lumineux et ombres dorées ; contours fins et nets.
- Un peu plus d'espace entre les réponses et des titres légèrement plus petits sur téléphone.
- Le compteur de score et l'encadré d'explication du budget adoptent les mêmes tons clairs.
- Les animations restent (transitions entre questions), mais plus douces.

## Où
- S'applique au formulaire de la page campagne et au pop-up du reste du site (même apparence partout).
- Le reste de la page (fond sombre, titres) ne change pas.

## Vérification
Captures téléphone (393px) et ordinateur : première question, question budget, coordonnées, écran de résultat. Contraste du texte vérifié lisible.

## Technique
- Tout se fait dans les classes `.dx-*` de `src/index.css` via des variables locales (`--dx-bg`, `--dx-card`, `--dx-ink`, `--dx-muted`, `--dx-line`, `--dx-gold`) définies sur `.dx-panel` / `.dx-launcher`, pour pouvoir réajuster les tons en un seul endroit.
- Retouches ponctuelles dans `DiagnosticModal.tsx` / `ScoreGauge.tsx` seulement si des couleurs y sont codées en dur.
- Aucune modification des questions, du score ni des règles de qualification.
