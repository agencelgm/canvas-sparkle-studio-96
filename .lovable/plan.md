## En-tête du formulaire plus grand, centré et plus clair

Dans la version intégrée à la page campagne uniquement (le pop-up garde le logo) :

- Centrer les deux lignes et les étaler sur toute la largeur de la carte.
- Titre « Sommes-nous l'agence qu'il vous faut ? » agrandi (environ 3xl sur téléphone, 4xl sur ordinateur), texte foncé.
- Consigne réécrite et rendue plus visible, avec une flèche vers le bas pour indiquer l'action :
  « Répondez aux 4 petites questions ci-dessous pour le savoir — ça prend 1 minute. » en plus grand (lg/xl), plus gras, texte foncé (plus en gris pâle).
- Petite flèche dorée animée doucement vers le bas sous la consigne (désactivée si l'utilisateur préfère moins d'animations).

### Technique
- `DiagnosticModal.tsx` lignes 383-387 : conteneur `w-full text-center`, tailles `text-3xl sm:text-4xl` et `text-lg sm:text-xl font-semibold dx-ink`, icône `ArrowDown` de lucide avec `motion-safe:animate-bounce`.
- Vérifier que `.dx-header` (justify-between) n'empêche pas le centrage : ajouter `justify-center` en mode inline.
