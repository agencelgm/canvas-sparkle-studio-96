# Nouvelle lead page agence + 3 pages de remerciement

Objectif : une page d'acquisition avec le formulaire de qualification GoHighLevel, puis trois pages de suite selon le parcours du prospect.

## Les 4 pages

```text
/lead-agence-marketing            -> formulaire de qualification (GHL)
   |
   |-- qualifie -----------> /lead-agence-marketing/rendez-vous
   |                            (video + calendrier GHL)
   |                                   |
   |                                   v
   |                         /lead-agence-marketing/rendez-vous-confirme
   |                            (video "prochaine etape")
   |
   \-- non qualifie -------> /lead-agence-marketing/formation
                                (video + page de vente formation 4 semaines)
```

Les redirections qualifie / non qualifie sont deja configurees dans GoHighLevel : je cree simplement les adresses correspondantes.

### 1. Page principale — /lead-agence-marketing
- En-tete sobre avec le logo LGM, sans menu, pour garder l'attention sur le formulaire.
- Titre principal centre sur la promesse : des prospects qualifies chaque jour pour votre entreprise a Abidjan.
- Bloc de reassurance court (le probleme : dependance au bouche-a-oreille, chiffre d'affaires irregulier).
- Chiffres deja publies sur le site (x7 ROI, reponse en 24 h, 12+ secteurs) — aucune nouvelle statistique inventee.
- Formulaire GoHighLevel intégré, en position visible des l'arrivee (colonne collante sur ordinateur, bouton flottant "Remplir le formulaire" sur mobile).
- Section "Comment ca marche" en 4 etapes.
- Section FAQ (6 questions, reponses toujours presentes dans le code de la page).
- Pied de page minimal (copyright + adresse).

### 2. Page qualifie — /lead-agence-marketing/rendez-vous
- Message : "Felicitations, votre entreprise est eligible. Prochaine etape : reservez votre appel."
- Emplacement video en haut (format 16/9, pret a recevoir la video ; en attendant, un cadre avec un visuel et un texte d'attente).
- Calendrier GoHighLevel intégré juste en dessous.
- Rappel de ce qui se passe pendant l'appel (45 min, plan marketing) + alternative WhatsApp.
- Lien vers la chaine WhatsApp en bas.

### 3. Page rendez-vous confirme — /lead-agence-marketing/rendez-vous-confirme
- Message : "Votre rendez-vous est reserve."
- Emplacement video "Quelle est la prochaine etape ?".
- Checklist de preparation (3 a 4 points : chiffres actuels, objectif, budget, personnes presentes a l'appel).
- Rappel des horaires de contact + lien chaine WhatsApp.

### 4. Page non qualifie — /lead-agence-marketing/formation
Vraie page de vente, pas un simple merci.
- Message d'ouverture honnete : le budget publicitaire actuel ne permet pas encore qu'une agence gere les campagnes — mais on peut vous former comme un membre de votre equipe.
- Emplacement video.
- Format : 4 semaines, chaque mercredi 19 h, en ligne sur Zoom, en direct.
- Programme detaille semaine par semaine, exactement le contenu fourni :
  - Semaine 1 (1 h) — comprendre la publicite sur les reseaux sociaux : fonctionnement, pourquoi les gens achetent, etapes de la vente, publication vs campagne, objectifs de campagne, formats et visuels, ciblage / budget / diffusion.
  - Semaine 2 (2 a 3 h) — creer et lancer une campagne : cible, objectif, visuels a sponsoriser, parametrage, budget, lancement d'une campagne prospects/ventes.
  - Semaine 3 (1 a 2 h) — analyse et optimisation : statistiques cles, lecture des resultats, quoi arreter ou poursuivre, quand augmenter ou baisser le budget, eviter le gaspillage.
  - Semaine 4 (1 h) — cas pratique : analyse d'une campagne, points a ameliorer, optimisation ciblage/visuels/budget, transformer les publicites en prospects, Facebook/Instagram vers WhatsApp.
- Section "Pour qui c'est / pas pour qui".
- FAQ formation (5 questions, reponses en clair dans le code).
- Bouton d'inscription : pour l'instant vers WhatsApp (message pre-rempli "Je veux m'inscrire a la formation"). A remplacer par un lien de paiement ou un formulaire quand tu me le donnes.
- Prix non affiche tant que tu ne me l'as pas donne.

## Enregistrement des prospects (sans webhook)

Le formulaire GoHighLevel communique avec la page qui l'affiche quand il est soumis. On ecoute ce signal sur la lead page et on enregistre ce qu'il contient dans la base de donnees du site, en plus de GoHighLevel.

Limite a connaitre : selon la configuration de GoHighLevel, ce signal peut ne contenir qu'une confirmation de soumission (sans tous les champs). Dans ce cas on enregistre au minimum la soumission, sa date, la page d'origine et les parametres de campagne (utm). Si les champs ne remontent pas, la seule facon d'avoir 100 % des donnees restera un webhook — je te le dirai apres verification en direct.

## Facebook

- Le pixel 673688814007270 est ajoute au site (chargement sur toutes les pages).
- Evenement `Lead` envoye uniquement sur la page qualifie — donc aucun evenement pour les non qualifies.
- Le jeton d'API de conversions (CAPI) que tu as colle est une cle sensible : je le range dans le coffre des secrets du projet et je le fais utiliser cote serveur pour doubler l'evenement `Lead`. Change-le dans Facebook si tu veux etre prudent, puisqu'il a circule dans le chat.

## Details techniques

- Nouvelles pages React : `LeadAgencePage`, `LeadAgenceRendezVousPage`, `LeadAgenceRendezVousConfirmePage`, `LeadAgenceFormationPage`, routes ajoutees dans `App.tsx`.
- Config centralisee dans `src/data/leadAgenceConfig.ts` : id du formulaire GHL, url du calendrier, urls des videos, lien WhatsApp, chemins des pages.
- Composant `VideoSlot` reutilisable (ratio 16/9, accepte une url YouTube/Vimeo/mp4, affiche un cadre d'attente si vide) — les 3 emplacements video sont prets a recevoir tes videos, il suffira de coller les liens dans le fichier de config.
- Composant `GhlEmbed` pour charger `form_embed.js` une seule fois et afficher formulaire ou calendrier.
- Nouvelle table `lead_agence_submissions` (donnees du formulaire en JSON, page source, utm, date) : insertion publique autorisee, lecture reservee aux administrateurs, avec les droits d'acces necessaires.
- Vue admin `/admin/leads-agence` pour consulter les soumissions.
- Pixel Facebook dans `index.html` (le repli `noscript` place dans le corps de la page, pas dans l'en-tete).
- Fonction serveur `facebook-capi` pour l'evenement `Lead` cote serveur, jeton lu depuis les secrets.
- SEO : les 4 pages sont en `noindex` (trafic publicitaire, evite la cannibalisation avec `/services`) et exclues du `sitemap.xml`. Style conforme a la charte : graphite, creme, bronze, Cormorant Garamond + Inter, sans animation d'apparition au scroll.

## Ce qu'il me manque pour finir
- Les 3 liens de video (a coller plus tard, les emplacements seront prets).
- Le prix de la formation et le lien d'inscription/paiement.
