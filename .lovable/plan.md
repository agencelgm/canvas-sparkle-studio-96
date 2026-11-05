# Vérification : envois "Lead" à Facebook

## Constat (vérifié)
- Le site n'envoie un "Lead" qu'à un seul moment : quand le formulaire est enregistré ET que la personne est qualifiée (65+ ou programme pilote).
- L'écran « Nous avons reçu votre demande » et le bouton « Continuer » n'envoient rien. La page suivante (rendez-vous) n'envoie rien non plus.
- Le navigateur et le serveur envoient le même événement avec le même identifiant : Facebook le compte une seule fois.
- Les 2 formulaires d'aujourd'hui (scores 46 et 47) n'étaient pas qualifiés : rien n'a été envoyé à Facebook (enregistré comme « ignoré – non qualifié »).

## Donc d'où viennent les conversions en trop ?
Pas du site actuel. Pistes probables :
1. Des visiteurs avec l'ancienne version encore en cache (elle envoyait un Lead à chaque ouverture de la page rendez-vous).
2. GoHighLevel qui a peut-être sa propre connexion Facebook (envoi d'un Lead à la création du contact ou à la réservation).

## Étapes proposées
1. Vous vérifiez dans GoHighLevel (Paramètres → Intégrations / Workflows) s'il y a une action « Facebook Conversion » ou le pixel 673688814007270 sur le calendrier.
2. Dans le Gestionnaire d'événements Facebook, regarder la source (navigateur ou serveur) et l'URL des Leads d'aujourd'hui.
3. Aucun changement de code nécessaire côté site.
