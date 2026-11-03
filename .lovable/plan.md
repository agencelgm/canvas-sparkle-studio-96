# Parcours pour les visiteurs sans budget (3 pages)

## Parcours

```text
Diagnostic (non qualifié, budget < 270 000 F)
   -> Page 1 : /lead-agence-marketing/programme-pilote
        "Un instant, ne fermez pas cette page" + vidéo
        à 50 % de la vidéo, 2 boutons apparaissent :
          -> Oui, je veux une place dans le programme pilote  => WhatsApp pré-rempli
          -> Non, 175 000 F c'est encore trop pour moi aujourd'hui => Page 2
   -> Page 2 : /lead-agence-marketing/formation-facebook
        Formation publicité Facebook (50 000 F) + bouton d'inscription
        lien discret "Pas intéressé par la formation ?" => Page 3
   -> Page 3 : /lead-agence-marketing/groupe-whatsapp
        Invitation à rejoindre la chaîne WhatsApp gratuite LGM
```

## Page 1 — Programme pilote
- Titre : « Un instant, ne fermez pas cette page ». Sous-titre : « Regardez cette vidéo pour savoir ce qui se passe et quoi faire ensuite. »
- Petit encadré : programme pilote pour très petites entreprises, limité à 5 entreprises, aucune nouvelle entrée tant qu'une place ne se libère pas.
- Vidéo (celle que tu vas m'envoyer). Les deux boutons apparaissent avec une animation dès 50 % de visionnage (restent visibles si on revient sur la page).
- « Oui » ouvre WhatsApp avec : « Bonjour LGM, je viens de votre site internet. Je voudrais adhérer au programme pilote. Est-ce que je peux avoir un rendez-vous avec un de vos spécialistes pour en discuter ? »

## Page 2 — Formation Facebook
- Structure prête, contenu définitif ajouté quand tu m'envoies les détails (prix, programme, bouton d'inscription). En attendant, la page reste invisible pour Google.

## Page 3 — Groupe WhatsApp
- Bouton vers https://whatsapp.com/channel/0029Va5QvIu6BIEdk2Gbcq0U (c'est un lien de chaîne WhatsApp, pas de groupe — je l'appellerai « chaîne WhatsApp gratuite » sauf avis contraire).

## Ce qui ne change pas
- Moins de 100 000 F : toujours exclu, aucun événement Facebook.
- Les qualifiés et le programme pilote via le score continuent vers la page rendez-vous.

## Détails techniques
- Le diagnostic redirige les non-qualifiés vers `/programme-pilote`; l'ancienne adresse `/lead-agence-marketing/formation` redirige vers la nouvelle (liens existants préservés).
- Les 3 pages : `noindex`, hors sitemap (règles 1 et 10). Textes dans `leadAgenceConfig.ts`.
- Seuil 50 % via l'événement `timeupdate` du lecteur vidéo, mémorisé en sessionStorage.
- En attente : la nouvelle vidéo et les détails de la formation.
