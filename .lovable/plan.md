# Transformer la page de non-qualification en confirmation de prise en charge

## Objectif
Ne plus présenter la formation ni donner l'impression que le prospect est refusé. Toute personne envoyée par GoHighLevel vers la page actuelle recevra une confirmation claire : sa demande a été reçue et un membre de l'équipe LGM la contactera sous 24 heures pour mieux comprendre sa situation.

## Changements prévus
- Conserver l'adresse actuelle `/lead-agence-marketing/formation` afin de ne pas casser la redirection déjà configurée dans GoHighLevel.
- Remplacer entièrement le contenu de vente de la formation : prix, programme, vidéo, FAQ et bouton d'inscription seront retirés de cette page.
- Créer une page de confirmation courte et rassurante avec :
  - « Votre demande a bien été reçue » ;
  - l'engagement d'un contact par un membre de l'équipe sous 24 heures ;
  - une explication simple indiquant que l'appel servira à mieux comprendre la situation, les objectifs et les moyens disponibles ;
  - un rappel de garder son téléphone disponible et de vérifier WhatsApp ;
  - le numéro WhatsApp LGM comme solution si la personne souhaite écrire avant l'appel.
- Garder l'identité visuelle actuelle du parcours : logo officiel, fond graphite, texte crème et accents dorés.
- Maintenir cette page en `noindex` et hors du sitemap, comme toute page de remerciement.

## Ce qui ne change pas
- Le parcours des prospects qualifiés, la page de prise de rendez-vous et la page de rendez-vous confirmé restent inchangés.
- L'assignation aux commerciaux et les notifications restent gérées dans GoHighLevel, comme prévu.
- L'enregistrement actuel des soumissions et l'envoi de l'événement Facebook réservé aux prospects qualifiés restent inchangés.

## Détails techniques
- Réutiliser la page React existante derrière `/lead-agence-marketing/formation` pour éviter toute modification de redirection.
- Nettoyer les imports et données devenus inutiles après le retrait de la formation.
- Mettre à jour le titre et les métadonnées de cette page pour refléter la confirmation de demande.
- Vérifier la page sur ordinateur et mobile, puis contrôler qu'aucune erreur n'apparaît.
