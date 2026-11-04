## Système de tests A/B continus sur toutes les pages du parcours

### Ce que vous verrez dans l'admin (onglet « Test A/B »)
- **Une carte par page testée** : page campagne, rendez-vous (qualifiés), programme pilote (non qualifiés), formation Facebook, groupe WhatsApp.
- Sur chaque carte :
  - les boutons **« Voir la version A »** et **« Voir la version B »**, qui ouvrent la vraie page dans un nouvel onglet. Vos propres visites ne sont pas comptées ;
  - une description claire de **ce qui change** entre A et B (ex. « B : page courte sans FAQ », « B : titre X au lieu de Y ») ;
  - les chiffres en direct : visites, conversions, taux de conversion et progression vers les 100 visites par version.
- **Historique** : la liste de tous les tests terminés, avec les dates, ce qui a été modifié, les chiffres finaux et la raison de la décision (ex. « B : 18 % contre 12 %, soit +50 %, au-dessus du seuil de +20 % »).

### Ce qui compte comme conversion
- **Page campagne** : nous suivons les formulaires envoyés ET les prospects qualifiés (65+). C'est le nombre de qualifiés qui désigne le gagnant.
- **Rendez-vous** : clic sur la réservation du créneau.
- **Programme pilote** : clic sur « Oui, je veux une place » (WhatsApp).
- **Formation** : clic sur le bouton d'inscription.
- **Groupe WhatsApp** : clic pour rejoindre le groupe.

### Règle du gagnant
1. On attend que **chaque version ait au moins 100 visites**.
2. Si la meilleure version convertit **au moins 20 % de plus** que l'autre (en relatif), elle gagne.
3. Sinon, le test continue et la règle est revérifiée tous les 100 nouveaux visiteurs par version.
4. La vérification tourne automatiquement chaque nuit, et aussi quand vous ouvrez l'onglet.

### La boucle d'optimisation
```text
Test en cours -> gagnant trouvé -> le gagnant devient la version A
      ^                                  |
      |                                  v
Vous validez  <-  l'IA propose une nouvelle version B (titre, sous-titre, texte du bouton)
```
- L'IA s'appuie sur la page gagnante et sur l'historique des tests (ce qui a marché ou non), puis propose une version B accompagnée d'une explication d'une phrase.
- Rien n'est mis en ligne sans votre clic sur **« Lancer ce test »**. Vous pouvez aussi modifier le texte proposé ou le refuser.
- Sur la page campagne, le test actuel (page complète contre page courte) continue tel quel comme premier test.

### Limites à connaître
- L'IA ne modifie que les textes clés (titre, sous-titre, bouton). Un changement de structure, comme retirer une section, se fait avec moi.
- Une page n'a qu'un seul test à la fois.
- Chaque proposition de l'IA consomme quelques crédits IA.
- J'ai interprété « statique » comme la page campagne ; dites-moi si c'est une autre page.

### Technique
- Tables (avec GRANT et RLS ; lecture réservée aux admins) :
  - `ab_experiments` : clé de page, statut running/concluded/proposed, dates, gagnant, raison, chiffres figés ;
  - `ab_variants` : experiment_id, a|b, libellé, description du changement, `content` jsonb (headline, subtitle, cta) ;
  - `ab_events` : visitor_id anonyme, experiment_id, variant, type view|convert|qualified.
- Edge function `ab-track` (publique, validée avec zod, insère les événements, déduplique les vues par visiteur) et `ab-config` (renvoie la variante active et son contenu pour une page).
- Hook `useAbTest(pageKey)` : tirage 50/50 stocké par expérience, `?v=` force la version et coupe le suivi (`noTrack`). Il applique les textes du jsonb sur des valeurs par défaut. `trackConversion()` est branché sur les boutons principaux de chaque page.
- La page campagne garde ses rendus A et B actuels ; les conversions « qualifié » viennent de `ghl-webhook` (insertion d'un événement lié à l'experiment_id).
- Edge function `ab-evaluate` : applique la règle 100 visites / +20 %, clôture le test, crée le suivant avec le gagnant en A, puis appelle Lovable AI (`openai/gpt-6-astra`, réponses en streaming, sortie JSON stricte) pour proposer B au statut `proposed`. Elle tourne chaque nuit via pg_cron et peut être lancée par un admin.
- Page admin : refonte de `AdminAbTest` (cartes, aperçus, validation ou modification des propositions, historique).
- Tests : un test unitaire de la règle du gagnant (moins de 100 visites, moins de +20 %, +20 % ou plus).
- Une règle ajoutée dans AGENTS.md, qui remplace la règle A/B actuelle.
