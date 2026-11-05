# Budget prioritaire + alerte email à l'équipe administrative

## Ce qui s'est passé (dernier prospect, 5 nov. à 15h38)
Il a répondu **« Oui » aux 270 000 FCFA/mois**. Il a pourtant eu 47/100 et a été disqualifié, à cause de ses autres réponses :
- secteur « Autre »
- objectif « Visibilité »
- ancien budget publicitaire faible
- chiffre d'affaires inférieur à 1 million
- une pénalité de −10 pour « incohérence »

Aujourd'hui, le budget ne compte que pour 25 points sur 100.

## 1. Le budget devient décisif, avec une confirmation en cas de doute
- **« Oui, je peux investir 270 000 FCFA/mois » = qualifié** (accompagnement complet), quel que soit le score, **sauf** si son chiffre d'affaires est inférieur à 1 million.
- Dans ce cas, une question de confirmation s'affiche juste après celle sur le chiffre d'affaires :
  - « Attention, une incohérence a été détectée. »
  - « Vous avez indiqué un chiffre d'affaires de moins de 1 million FCFA. Pour travailler avec nous, il faut pouvoir investir au minimum 270 000 FCFA par mois, soit environ 30 % de ce chiffre d'affaires. Êtes-vous sûr de pouvoir démarrer avec 270 000 FCFA par mois pendant 3 mois ? »
  - **Oui** → qualifié. **Non** → non qualifié (envoyé vers la page du programme pilote, sans conversion Facebook).
- La pénalité de −10 pour « incohérence » est supprimée : c'est cette confirmation qui la remplace.
- Les règles budget ne changent pas :
  - 100 000 à 270 000 FCFA = programme pilote (qualifié)
  - moins de 100 000 FCFA = exclu, sans conversion Facebook
- « Pas encore » ou « À discuter » : on garde la règle des 65/100.
- Le score et l'alerte d'incohérence restent visibles dans GoHighLevel, seulement pour préparer l'appel.

## 2. Email immédiat à l'équipe administrative
- Destinataires : deborahlgm146@gmail.com et agencelgm@gmail.com.
- **Dès qu'un prospect qualifié (complet ou pilote) envoie le formulaire**, les deux adresses reçoivent un email, qu'il réserve un rendez-vous ou non.
- Contenu de l'email : nom, WhatsApp (lien cliquable), email, secteur, objectif, budget, score, type (complet ou pilote) et la mention « à appeler pour fixer un rendez-vous ».
- Aucune tâche automatique planifiée, donc aucun coût récurrent.

**À faire avant :** l'envoi d'emails demande un domaine expéditeur (par exemple notify.agencelgm.com). Une fenêtre de configuration s'ouvrira au début de la mise en place.

## Détails techniques
- `diagnosticScore.ts` : nouvelle réponse `confirmMinimum` ("oui" | "non").
  - Si `minimum === "oui"` et que le chiffre d'affaires n'est pas inférieur à 1M → "full".
  - Si `minimum === "oui"` et chiffre d'affaires inférieur à 1M → "full" quand `confirmMinimum === "oui"`, sinon "none".
  - Suppression de `INCOHERENCE_PENALTY` dans le calcul ; le flag reste pour information.
- `diagnosticContent.ts` : étape conditionnelle `confirmMinimum` placée après `revenue` (section 3). `ghl-webhook` : ajout de cette réponse dans le schéma zod.
- Tests unitaires : « oui » avec un score bas = qualifié ; CA < 1M + confirmation oui = qualifié ; confirmation non = non qualifié ; pilote ; exclu.
- Emails :
  - configuration du domaine, puis de l'infrastructure, puis génération des emails de l'app ;
  - création d'un modèle `qualified-lead-alert`.
- `ghl-webhook` : après l'insertion, si le prospect est qualifié, un appel à `send-transactional-email` par destinataire, avec la clé d'idempotence `lead-alert-<id>-<adresse>`. Une erreur d'envoi ne bloque pas la réponse au formulaire.
- Les destinataires et la règle du budget sont enregistrés en mémoire du projet.
