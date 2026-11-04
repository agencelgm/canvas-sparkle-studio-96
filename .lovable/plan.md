## Test A/B sur /lead-agence-marketing (même adresse, 50/50)

### Les deux versions
- **Version A (actuelle)** : la page complète telle qu'elle est (texte, preuves, FAQ, formulaire en haut à droite).
- **Version B (courte)** : une seule page avec le titre, une phrase de promesse, le formulaire, et une ligne de confiance (gratuit, sans engagement, 1 minute). Pas de FAQ, pas de sections longues, pas de barre collante.

### Répartition 50/50
- À la première visite, chaque visiteur est tiré au sort A ou B (50/50).
- Le choix est mémorisé sur son appareil : s'il revient, il revoit la même version (sinon les résultats seraient faussés).
- L'adresse ne change pas. Pour vos propres vérifications, ajouter `?v=a` ou `?v=b` à l'adresse force une version.

### Suivi des prospects par version
- Chaque formulaire envoyé enregistre la version vue (A ou B) avec le score, qualifié oui/non et le palier (complet, pilote, exclu).
- La version est aussi envoyée à GoHighLevel (champ « version_page ») pour filtrer dans vos automatisations, et en étiquette Microsoft Clarity pour comparer les enregistrements.
- Un nouvel onglet « Test A/B » dans l'espace admin affiche par version : nombre de leads, nombre et % de qualifiés (65+), pilotes, exclus, score moyen.
  - Limite : les visites (pages vues) par version ne sont pas comptées dans l'admin ; on compare donc les leads. Pour le taux de conversion visiteurs → leads, Clarity le montre via l'étiquette de version.

### Point à confirmer dans GoHighLevel
- Créer un champ personnalisé « version_page » si vous voulez le voir sur la fiche contact (sinon la donnée arrive quand même dans le webhook).

### Technique
- `src/lib/abVariant.ts` : tirage + localStorage `lgm_lp_variant` + override `?v=`.
- `LeadAgencePage.tsx` : choisit le rendu A (existant) ou B (nouveau composant `LeadAgenceShortVariant`), même JSON-LD/canonical, Clarity `clarity("set","lp_variant",v)`.
- `DiagnosticModal` : nouvelle prop `variant`, envoyée dans le corps (`variant`), aussi ajoutée à `answers`.
- Migration : colonne `variant text` sur `qualification_submissions`.
- `ghl-webhook` : valide `variant` (`a|b`, optionnel), l'enregistre, l'ajoute au payload GHL (`version_page`), redéploiement.
- Admin : onglet statistiques par variante (requête groupée côté client, accès admin existant).
- Ajouter une règle dans AGENTS.md (variantes gérées par `abVariant.ts`).
