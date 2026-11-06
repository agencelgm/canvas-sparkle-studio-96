# Page programme pilote : vidéo qui démarre au clic + nouveau bouton « Non »

## 1. Vidéo : plus de lecture automatique sans le son
Aujourd'hui la vidéo démarre seule, sans le son, donc les gens ratent le début.

Nouveau fonctionnement (version A, vidéo) :
- La vidéo reste en pause sur sa première image, assombrie.
- Au centre, un gros bouton doré rond « Lecture » qui pulse doucement (léger halo qui s'agrandit), avec le texte : **« Cliquez ici pour regarder la vidéo »** et en dessous « Le son est activé · 2 minutes ».
- Au-dessus de la vidéo, une petite flèche animée qui pointe vers elle.
- Un clic n'importe où sur la vidéo la lance **depuis le début, avec le son**.
- Le bouton « Activer le son » disparaît (il n'a plus de raison d'être).
- On garde : boutons qui apparaissent à 25 % de la vidéo ou après 60 secondes, le lien « Je préfère lire », et le suivi des lectures dans le test A/B.
- L'animation s'arrête pour les personnes qui ont réduit les animations sur leur téléphone.

La version B (page de vente) garde sa vidéo actuelle, qui ne démarre déjà qu'au clic.

## 2. Bouton « Non » : faire ressentir l'occasion manquée
Remplacer « Non, 175 000 F c'est encore trop pour moi aujourd'hui » par une phrase où la personne admet qu'elle n'est pas prête à développer son entreprise. Propositions :

1. « Non, je laisse passer ma place : je ne suis pas prêt à développer mon entreprise maintenant »
2. « Non merci, je préfère rester où j'en suis pour l'instant »
3. « Non, je renonce à ma place — développer mon entreprise attendra »
4. « Non, je ne suis pas encore prêt à faire grandir mon entreprise »
5. « Non, je laisse ma place à une autre entreprise »

Par défaut j'applique la **n°1** (elle mentionne la place perdue et le fait de ne pas être prêt). Dites-moi si vous en préférez une autre.

Le bouton garde son style discret (gris, sans doré) et mène toujours vers la page formation. Le changement s'applique aux deux versions du test.

## Détails techniques
- `LeadAgencePilotePage.tsx` : retirer `autoPlay`/`muted`, ajouter un état `started` ; superposition `<button>` plein cadre avec icône Play + anneau `motion-safe:animate-ping` ; au clic `v.currentTime = 0; v.muted = false; v.play()`.
- Texte du bouton « Non » déplacé dans `src/data/piloteContent.ts` (`declineLabel`) pour pouvoir le modifier sans toucher la page.
