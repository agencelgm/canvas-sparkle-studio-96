# Page programme pilote : optimisations + test A/B "Vidéo" vs "Page de vente"

## Pourquoi les gens ne regardent pas la vidéo
- Les boutons sont cachés tant que 50 % de la vidéo n'est pas vu : ceux qui ne lancent pas la vidéo n'ont aucune action possible et partent.
- La vidéo ne démarre pas toute seule, pas de miniature accrocheuse, et le titre "Ne fermez pas cette page" ne dit pas ce qu'on y gagne.
- Aucun texte ne résume l'offre pour ceux qui ne veulent pas de son (beaucoup sont sur téléphone, dans Facebook).

## Version A — "Vidéo" (améliorée, garde la vidéo au centre)
- Titre orienté bénéfice : "Votre budget est plus petit ? Il existe une autre solution."
- Vidéo qui démarre automatiquement en muet avec un gros bouton "Activer le son", et une durée affichée.
- Boutons qui apparaissent dès 25 % (au lieu de 50 %), et dans tous les cas après 60 secondes sur la page, pour ne jamais bloquer quelqu'un.
- Petit lien discret sous la vidéo : "Je préfère lire" qui affiche le résumé de l'offre.

## Version B — "Page de vente" (sans attendre la vidéo)
Page lisible en 30 secondes, boutons visibles tout de suite :
1. Titre + phrase : programme pilote pour très petites entreprises, 175 000 F/mois, seulement 5 places.
2. "Ce que vous obtenez" : 3–4 points courts.
3. "Pour qui / pas pour qui".
4. Comment ça se passe : 3 étapes (WhatsApp → appel → démarrage).
5. La vidéo plus bas, en option ("Voir la présentation en vidéo").
6. Les deux mêmes boutons : "Oui, je veux une place" (WhatsApp, = conversion) et "Non, 175 000 F c'est encore trop" (vers la formation).
7. Barre fixe en bas sur téléphone avec le bouton WhatsApp.

Le texte reste fidèle à ce qui est vrai : pas de résultats inventés, pas de faux témoignages.

## Le test A/B
- Le test actuel de cette page est remplacé par : A = Vidéo, B = Page de vente, 50/50, même adresse.
- Conversion = clic sur "Oui, je veux une place" (inchangé). Règle inchangée : 100 visites par version, gagnant si +20 %.
- On mesure aussi en plus, visible dans l'onglet Test A/B : % qui lancent la vidéo, % qui atteignent 25 %, clics "Non → formation".

## À me confirmer
- Ce que comprend exactement le programme pilote à 175 000 F (publicité incluse ? durée ? nombre de visuels, suivi…) — je n'écrirai que ce que vous me donnez.
- Les 5 places : toujours vrai ? Combien en reste-t-il ?

## Détails techniques
- `LeadAgencePilotePage.tsx` : choisit la mise en page via `content.layout` ("video" | "sales") de `useAbTest("programme-pilote")`; textes de la page de vente dans `src/data/piloteContent.ts`.
- Seuil de déblocage 25 % + minuteur 60 s; vidéo `autoPlay muted playsInline` + bouton son.
- Événements supplémentaires `video_play`, `video_25`, `decline` dans `ab_events` (event_type libre, dédupliqué par visiteur), affichés dans AdminAbTest.
- SQL : arrêter l'expérience programme-pilote existante (status stopped), en créer une "running" avec les variantes A `{layout:"video"}` et B `{layout:"sales"}`.
