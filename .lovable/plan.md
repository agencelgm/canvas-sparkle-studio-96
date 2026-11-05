# Budget prioritaire + alertes email pour prospects qualifiés

## Constat (dernier prospect, 5 nov. 15h38 — kagninmingnou toure)
Il a répondu **« Oui » aux 270 000 FCFA/mois**, mais il a obtenu 47/100 et a été disqualifié, parce que :
- secteur « Autre » (6), objectif « Visibilité » (6), ancien budget pub < 150k (3), chiffre d'affaires < 1M (2)
- une pénalité de −10 « incohérence » (oui au budget alors que le CA est < 1M)

Aujourd'hui, le budget ne pèse que 25 points sur 100, donc les autres réponses peuvent faire échouer quelqu'un qui peut payer.

## 1. Le budget devient décisif
- **« Oui, je peux investir 270 000 FCFA/mois » → toujours qualifié** (accompagnement complet), quel que soit le score.
- Les règles budget actuelles ne changent pas : 100k–270k = programme pilote (qualifié), < 100k = exclu, sans événement Facebook.
- « Pas encore / À discuter » sans tranche choisie : on garde la règle des 65/100.
- Le score /100 et l'alerte « incohérence » restent calculés et envoyés dans GoHighLevel **pour information** (pour préparer l'appel), mais ils ne bloquent plus quelqu'un qui a dit Oui.
- Facebook : ces prospects comptent comme une conversion (ils sont qualifiés).

## 2. Email aux commerciaux 30 minutes après le formulaire
- Destinataires : deborahlgm146@gmail.com et agencelgm@gmail.com.
- Pour chaque prospect qualifié (complet ou pilote), **30 minutes après le formulaire**, s'il **n'a pas encore réservé de rendez-vous**, chacun reçoit un email : nom, WhatsApp (lien cliquable), email, secteur, budget, score, type (complet / pilote) et un rappel « à appeler pour prendre rendez-vous ».
- « A réservé » = la personne a atteint la page de confirmation du rendez-vous après le calendrier. Si elle a réservé, pas d'email.
- Une vérification automatique tourne toutes les 5 minutes (288 fois/jour). Le retard maximal est donc d'environ 35 minutes. Ça entraîne un petit coût Cloud récurrent, même sans prospect.

**Prérequis :** l'envoi d'emails demande de configurer un domaine expéditeur (par exemple notify.agencelgm.com). Une fenêtre de configuration va s'ouvrir avant la mise en place.

## Détails techniques
- `diagnosticScore.ts` : si `minimum === "oui"`, alors tier = "full". Le test de seuil s'applique seulement aux autres cas. Le score et les flags restent inchangés. On ajoute un test unitaire pour cette règle, plus des tests pour pilot et excluded.
- Migration : ajout des colonnes `booked_at` et `notified_at` sur `qualification_submissions`.
- `ghl-webhook` renvoie l'id de la soumission. Le site le garde en sessionStorage, et la page rendez-vous-confirme appelle une petite fonction publique qui renseigne `booked_at` (id seulement, validé).
- Emails : configuration du domaine, mise en place de l'infrastructure, puis un modèle `qualified-lead-alert`. Une fonction `notify-qualified-leads` sélectionne les lignes qualifiées où created_at < now() − 30 min, booked_at est null et notified_at est null. Elle envoie un email à chaque destinataire (clé d'idempotence = id + adresse), puis renseigne `notified_at`. Appel par pg_cron toutes les 5 minutes.
- La liste des destinataires est enregistrée en mémoire du projet.
