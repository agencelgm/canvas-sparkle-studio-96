# Fiabiliser l'événement « prospect » vers Facebook

## Ce qui se passe aujourd'hui

- L'événement « Lead » part bien depuis la page rendez-vous (donc uniquement pour les qualifiés) : navigateur + envoi serveur avec le même identifiant, ce qui évite les doublons. Ça, c'est correct.
- Mais Facebook a déjà refusé l'événement avec le message « pas assez de données client ». Raison : nous n'avons ni email ni téléphone au moment de l'envoi.
- Vérifié à l'instant : la table des prospects du site est **vide** (0 enregistrement). La capture actuelle repose sur un message envoyé par le formulaire GoHighLevel à la page, ce que GoHighLevel ne transmet pas de façon fiable. Donc email/téléphone ne sont jamais connus, et l'événement part sans identité.

## Ce que je propose

1. **Récupérer l'identité via l'adresse de redirection**
   Dans GoHighLevel, la redirection des qualifiés pointera vers :
   `/lead-agence-marketing/rendez-vous?email={{contact.email}}&phone={{contact.phone}}&prenom={{contact.first_name}}&nom={{contact.last_name}}`
   La page lit ces valeurs, enregistre le prospect dans la base du site, puis envoie l'événement « Lead » avec email + téléphone. C'est la méthode fiable avec un formulaire embarqué.

2. **Nettoyer l'adresse après lecture**
   Les informations sont retirées de la barre d'adresse juste après enregistrement, pour ne pas laisser l'email visible ou partageable.

3. **Garder la capture actuelle en secours**
   Si GoHighLevel envoie quand même le message, on l'enregistre. Aucune perte, et pas de doublon : un même prospect n'est compté qu'une fois.

4. **Renforcer les identifiants techniques**
   Envoi systématique des identifiants publicitaires du navigateur (cookies Facebook), de l'adresse IP et du navigateur, plus le prénom/nom quand disponibles. Si l'email est absent malgré tout, l'événement part quand même avec ces identifiants au lieu d'être abandonné silencieusement.

5. **Vérification**
   Je teste la page avec des valeurs d'exemple dans l'adresse, je vérifie que le prospect apparaît bien dans l'admin « Leads agence » et que Facebook accepte l'événement (réponse sans erreur dans les journaux). Je te dirai quoi contrôler dans le gestionnaire d'événements Facebook.

## À faire de ton côté

- Mettre à jour l'adresse de redirection des qualifiés dans GoHighLevel avec les champs indiqués au point 1 (je te donnerai l'adresse exacte à copier).
- Le jeton Facebook a circulé dans le chat : je recommande toujours de le régénérer, je le remplacerai.

## Détails techniques

- `src/pages/LeadAgenceRendezVousPage.tsx` : lecture des paramètres, enregistrement puis appel de suivi dans un effet unique, avec `history.replaceState` pour nettoyer l'URL.
- `src/hooks/useLeadCapture.ts` : extraction d'une fonction `saveLead(payload)` réutilisable par la redirection et par le `postMessage`, en conservant la déduplication par empreinte en `sessionStorage`.
- `src/lib/facebookPixel.ts` : `trackQualifiedLead` accepte des contacts passés en argument (priorité) avant le repli sur `localStorage` ; ajout de `ln` (nom) au payload.
- `supabase/functions/facebook-capi/index.ts` : ajout du champ `last_name`, hachage SHA-256 côté serveur, conservation du renvoi 200 pour ne jamais casser la page.
- Pas de changement de schéma : `lead_agence_submissions` couvre déjà nom/email/téléphone/UTM.
