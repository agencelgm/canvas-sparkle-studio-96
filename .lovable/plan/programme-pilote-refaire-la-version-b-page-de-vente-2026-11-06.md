# Programme pilote — refaire la version B (page de vente)

## Le problème
Dans la version B, la vidéo est tout en bas, après tous les détails. Personne ne la voit, et la page ressemble à un long texte avant d'arriver à l'essentiel.

## Nouvel ordre de la version B
1. Titre + une phrase (inchangés).
2. **La vidéo juste en dessous**, avec le même bouton doré qui pulse « Cliquez ici pour regarder la vidéo » (le son démarre au clic, depuis le début).
3. **Les deux boutons tout de suite sous la vidéo** (pas besoin de regarder pour décider : c'est la vraie différence avec la version A, où les boutons n'apparaissent qu'après 25 % de la vidéo ou 60 secondes).
4. « Ce que vous obtenez » : la liste courte.
5. « Comment ça se passe » : les 3 étapes.
6. « C'est pour vous si… / Ce n'est pas pour vous si… »
7. Phrase sur les 5 places + les deux boutons une dernière fois.
8. Sur téléphone : la barre « Je veux une place » reste en bas de l'écran.

La section « Voir la présentation en vidéo » en bas de page est supprimée (la vidéo n'apparaît qu'une fois, en haut).

## Ce qui ne change pas
- La version A (vidéo d'abord, boutons débloqués ensuite).
- Le test 50/50, le suivi des lectures vidéo et des clics, le message WhatsApp, le lien vers la formation.
- Les textes de l'offre.

## Détails techniques
- `LeadAgencePilotePage.tsx`, branche `sales` : déplacer `video(true)` juste après l'en-tête, déplacer le premier bloc `Choices` sous la vidéo, réordonner les sections, supprimer le bloc vidéo du bas.
- Comme une seule vidéo est affichée à la fois, `videoRef` et le suivi `video_play` / `video_25` restent valables pour les deux versions.
