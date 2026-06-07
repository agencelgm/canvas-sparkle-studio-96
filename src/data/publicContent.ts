export const siteContact = {
  email: "contact@lgm.marketing",
  phoneDisplay: "+225 07 98 17 23 39",
  phoneHref: "+2250798172339",
  whatsapp: "https://wa.me/2250798172339",
  hours: "Lundi au vendredi, 9h-17h",
  address: "Chateau, Camp Militaire, Angre, Abidjan",
};

export const publicImages = {
  hero: "/images/lgm-hero.jpg",
  about: "/images/lgm-about.jpg",
  method: "/images/lgm-method.jpg",
  services: "/images/lgm-services.jpg",
  contact: "/images/lgm-contact.jpg",
  blog: "/images/lgm-blog.jpg",
  og: "/images/og-lgm.jpg",
  board: "/images/lgm-imagegen-board.jpg",
};

export const navLinks = [
  { href: "/a-propos", label: "A propos" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export type PublicService = {
  slug: string;
  title: string;
  kicker: string;
  headline: string;
  description: string;
  tags: string[];
  benefits: string[];
  process: { title: string; description: string }[];
  longDescription: string;
  faq: { question: string; answer: string }[];
};

export type ServiceAreaPage = {
  slug: string;
  city: string;
  country: string;
  title: string;
  metaDescription: string;
  lead: string;
  proof: string[];
};

export const publicServices: PublicService[] = [
  {
    slug: "generation-leads",
    title: "Generation de leads",
    kicker: "Acquisition",
    headline: "Un flux regulier de prospects que votre equipe peut vraiment closer.",
    description: "Nous construisons les pages, campagnes et messages qui attirent des prospects qualifies, puis nous filtrons le bruit pour que votre equipe commerciale parle aux bonnes personnes.",
    tags: ["Meta Ads", "Google Ads", "Landing pages", "Nurturing"],
    benefits: ["Leads mieux qualifies", "Cout par acquisition controle", "CRM et suivi propres", "Reporting hebdomadaire"],
    process: [
      { title: "Cadrage marche", description: "Personas, objections, offre et canaux prioritaires." },
      { title: "Production", description: "Landing, ads, lead magnet et parcours de qualification." },
      { title: "Pilotage", description: "Optimisation des audiences, messages et couts chaque semaine." },
      { title: "Transmission", description: "Passage commercial clair avec scoring et donnees utiles." },
    ],
    longDescription: `La generation de leads a Abidjan pose un defi specifique : le volume de contacts n'est pas le probleme — c'est leur qualite. La majorite des entreprises ivoiriennes qui investissent en publicite digitale obtiennent des remplissages de formulaire qui ne donnent rien. Des appels non qualifies. Des prospects sans budget, sans urgence ou sans pouvoir de decision.

Notre approche commence par identifier ce qui distingue un bon prospect dans votre secteur. Nous travaillons sur les personas, les objections frequentes et les signaux d'intention avant de toucher a un budget publicitaire. Cela nous permet de construire des landing pages et des messages qui filtrent naturellement les contacts non pertinents.

Nous activons ensuite les canaux adaptes a votre offre et a votre cycle de vente. Google Ads pour capturer une intention de recherche active, Meta Ads pour creer la demande et atteindre une audience precise par metier, secteur ou geographie. Les deux systemes fonctionnent ensemble avec des exclusions croisees et un suivi de conversion rigoureux.

Le suivi est hebdomadaire et lisible. Cout par lead, volume, taux de qualification, prospects closes : chaque semaine, vous avez une lecture nette de ce qui avance. Nous ajustons les audiences, les visuels et les messages en continu, sans attendre la fin du mois pour reagir.

La transmission vers votre equipe commerciale est documentee. Nous configurons le CRM, les alertes et les sequences de relance pour que les leads ne refroidissent pas dans une boite mail. Un bon systeme de generation de leads n'a de valeur que s'il alimente vraiment le pipe commercial.`,
    faq: [
      {
        question: "Qu'est-ce qu'un lead qualifie pour LGM ?",
        answer: "Un lead qualifie est un contact qui correspond a votre cible (secteur, taille, budget, decision), qui a exprime un besoin reel et qui peut etre contacte par votre equipe dans les 24 a 48 heures. Nous definissons ces criteres avec vous avant le lancement.",
      },
      {
        question: "Combien de temps avant d'avoir des leads entrants ?",
        answer: "Les premiers leads arrivent generalement dans les 7 a 14 jours apres le lancement des campagnes. Le volume et la qualite s'ameliorent au fil des optimisations, avec un bon rythme constate entre 30 et 60 jours.",
      },
      {
        question: "Quel budget publicitaire minimum prevoir ?",
        answer: "Nous recommandons un minimum de 150 000 FCFA par mois de budget media pour avoir des donnees suffisantes a optimiser. Nos honoraires de gestion s'ajoutent a cela. En dessous, les volumes sont trop faibles pour tirer des conclusions fiables.",
      },
      {
        question: "Quels canaux utilisez-vous pour la generation de leads ?",
        answer: "Principalement Meta Ads (Facebook / Instagram) et Google Ads selon l'intention. Nous utilisons aussi les formulaires leads natifs, les landing pages optimisees et, selon le secteur, LinkedIn ou WhatsApp comme canal de nurturing.",
      },
      {
        question: "Comment gerez-vous les leads apres la capture ?",
        answer: "Nous configurons un CRM ou une integration avec votre outil existant, des alertes en temps reel et des sequences de relance automatiques pour que chaque lead soit contacte dans les 24h. Nous formons aussi votre equipe commerciale au script de qualification.",
      },
    ],
  },
  {
    slug: "seo-local",
    title: "SEO, AEO & GEO a Abidjan",
    kicker: "Visibilite organique",
    headline: "Etre trouve a Abidjan quand vos clients cherchent une agence marketing, une agence de communication ou un prestataire digital.",
    description: "Nous structurons votre presence pour Google, les moteurs de reponse IA et les recherches geographiques : SEO technique, pages locales, contenus utiles, FAQ visibles et signaux de confiance.",
    tags: ["SEO Abidjan", "AEO", "GEO", "Google Business", "Pages locales"],
    benefits: ["Meilleure presence locale", "Plus d'appels entrants", "Reponses visibles pour les IA", "Base SEO plus propre"],
    process: [
      { title: "Audit", description: "Technique, contenus, fiches, concurrence et intentions locales." },
      { title: "Architecture", description: "Pages, maillage, mots cles et priorites geographiques." },
      { title: "Optimisation", description: "Metas, contenus, citations, avis et Google Business." },
      { title: "Suivi", description: "Positions, appels, formulaires et ajustements mensuels." },
    ],
    longDescription: `Le SEO en Cote d'Ivoire a longtemps ete sous-exploite. La concurrence est encore limitee sur de nombreux mots cles locaux, ce qui signifie qu'une entreprise qui investit correctement aujourd'hui peut prendre des positions solides avec relativement peu d'efforts. Cette fenetre ne restera pas ouverte indefiniment.

Mais le SEO classique ne suffit plus. Depuis 2023, une nouvelle dimension s'est ajoutee : l'AEO (Answer Engine Optimization). Quand un client cherche "agence marketing Abidjan" sur ChatGPT, Perplexity ou Google SGE, ce sont des moteurs de reponse qui synthesisent l'information — pas une liste de liens. Apparaitre dans ces reponses demande une structure differente : FAQ visibles dans le HTML, donnees structurees JSON-LD, contenus articules autour de questions reelles.

Nous combinons les trois dimensions. Le SEO technique (vitesse, indexation, architecture du site), le SEO local (fiche Google Business, pages par ville, citations coherentes, avis clients) et l'AEO (schemas FAQ, contenus reponses, llms.txt pour les IA crawlers). Chaque levier se renforce mutuellement.

La dimension geographique (GEO) est particulierement importante pour les entreprises qui servent Abidjan, la Cote d'Ivoire nationale ou d'autres marches comme Dakar, Douala ou Ouagadougou. Nous creeons des pages locales specifiques avec un contenu utile et des signaux de confiance adaptes a chaque marche.

Le suivi est mensuel avec des rapports de positions, de trafic organique et de conversions (appels, formulaires). Le SEO est un investissement dont les effets s'accumulent : les contenus et les liens construits aujourd'hui continuent de travailler dans 6, 12 et 24 mois.`,
    faq: [
      {
        question: "Combien de temps pour voir des resultats en SEO a Abidjan ?",
        answer: "Les premiers mouvements de positions apparaissent en 4 a 8 semaines pour les mots cles peu competitifs. Les resultats durables en trafic organique se consolident entre 3 et 6 mois. Le SEO local (Google Business, recherches geographiques) reagit souvent plus vite.",
      },
      {
        question: "Qu'est-ce que l'AEO et pourquoi c'est important maintenant ?",
        answer: "L'AEO (Answer Engine Optimization) est l'optimisation pour les moteurs de reponse comme ChatGPT, Perplexity et Google AI Overviews. Ces systemes lisent votre site differemment des robots Google classiques : ils cherchent des reponses claires, des schemas structures et des contenus fiables. Apparaitre dans ces reponses donne une visibilite croissante que les liens classiques ne donnent plus.",
      },
      {
        question: "Le SEO local est-il utile pour une entreprise B2B a Abidjan ?",
        answer: "Oui. De nombreuses decisions d'achat B2B commencent par une recherche Google. Cabinets de conseil, agences, fournisseurs de services professionnels : le SEO local capture ces intentions. C'est un canal encore sous-exploite par les entreprises B2B ivoiriennes, ce qui cree une opportunite reelle aujourd'hui.",
      },
      {
        question: "Vous occupez-vous de la fiche Google Business ?",
        answer: "Oui, l'optimisation Google Business Profile fait partie de notre service SEO local. Nous configurons les informations, les categories, les photos, les produits ou services, et nous mettons en place un processus de collecte d'avis clients.",
      },
      {
        question: "Pouvez-vous faire du SEO pour des entreprises hors de Cote d'Ivoire ?",
        answer: "Oui. Nous travaillons pour des entreprises basees a Dakar, Douala, Ouagadougou et dans toute l'Afrique de l'Ouest francophone. La methodologie est identique, adaptee aux specificites du marche local et aux intentions de recherche locales.",
      },
    ],
  },
  {
    slug: "publicite-digitale",
    title: "Agence de publicite digitale",
    kicker: "Performance",
    headline: "Des campagnes payantes qui servent le chiffre, pas seulement la visibilite.",
    description: "Nous gerons vos budgets publicitaires avec une logique de test, d'attribution et de conversion. Chaque campagne Facebook, Instagram ou Google Ads a un role clair dans le systeme ACF.",
    tags: ["Agence publicite", "Google Ads", "Meta Ads", "Retargeting", "A/B testing"],
    benefits: ["Budget mieux alloue", "Creation d'annonces plus nette", "Retargeting utile", "Lecture claire du ROI"],
    process: [
      { title: "Plan media", description: "Objectifs, budget, audiences et sequence de tests." },
      { title: "Creation", description: "Messages, visuels et pages adaptes a chaque audience." },
      { title: "Lancement", description: "Tracking, campagnes, exclusions et controles qualite." },
      { title: "Optimisation", description: "Tests creatifs, enchere, ciblage et arbitrages budgetaires." },
    ],
    longDescription: `La publicite digitale en Cote d'Ivoire a muri rapidement. Les consommateurs sont plus exposes aux publicites, les audiences plus saturees, et les couts par resultat ont augmente. Gerer des campagnes Meta ou Google Ads en 2025 demande une methode rigoureuse — pas seulement un compte publicitaire actif.

Notre approche traite chaque budget publicitaire comme un systeme de test, pas comme une diffusion de masse. Nous commenceons par definir l'objectif commercial reel (leads, ventes, appels, formulaires), l'audience cible avec precision, et le message qui repond a une intention specifique. Nous lanceons des variantes et nous optimisons sur la base de donnees, pas d'intuitions.

L'attribution est un point cle que la majorite des entreprises negligent. Savoir qu'une campagne a genere 50 leads ne suffit pas : il faut savoir lesquels ont ete contactes, lesquels ont ete closes, et a quel cout. Nous configurons le tracking complet (pixel Meta, Google Tag Manager, conversions hors ligne si necessaire) pour avoir une lecture honnete du ROI.

Le retargeting est un levier sous-utilise sur le marche ivoirien. Nous construisons des sequences de reciblage pour les visiteurs du site, les contacts CRM et les engagements sociaux. Ces audiences ont deja montre de l'interet — les convertir coute nettement moins cher que d'en chercher de nouvelles.

Les rapports sont hebdomadaires et lisibles. Pas des tableaux Excel de 40 colonnes : un resume des metriques cles, ce qui a ete teste, ce qui a ete ajuste, et les priorites de la semaine suivante.`,
    faq: [
      {
        question: "Quelle difference entre vous et une agence de communication classique ?",
        answer: "Nous pilotons des budgets avec des objectifs commerciaux mesurables (leads, ventes, appels). Une agence de communication classique se concentre souvent sur la creation de contenu et la presence de marque. Notre focus est sur l'acquisition et la conversion — pas sur la notoriete seule.",
      },
      {
        question: "Quel budget minimum pour la publicite digitale ?",
        answer: "Nous recommandons 200 000 FCFA minimum par mois de budget media pour avoir suffisamment de donnees a optimiser. Ce budget s'ajoute a nos honoraires de gestion. En dessous de ce seuil, les volumes sont trop faibles pour tirer des conclusions fiables sur les tests.",
      },
      {
        question: "Pouvez-vous reprendre la gestion de campagnes deja lancees ?",
        answer: "Oui. Nous faisons d'abord un audit des campagnes existantes pour identifier les points forts a conserver et les problemes a corriger. La transition est documentee pour assurer la continuite des performances. Nous avons repris des comptes avec des historiques importants sans perte de donnees.",
      },
      {
        question: "Comment mesurez-vous le retour sur investissement ?",
        answer: "Nous configurons un tracking complet : pixel Meta, Google Ads, Google Analytics et, si possible, une integration avec votre CRM. Nous suivons le cout par lead, le taux de qualification et, avec votre equipe commerciale, le cout par client acquis. C'est cela le vrai ROI, pas le cout par clic.",
      },
      {
        question: "Gerez-vous a la fois Google Ads et Meta Ads ?",
        answer: "Oui. Nous recommandons souvent les deux en parallele car ils capturent des intentions differentes : Google Ads capte la demande existante (chercheurs actifs), Meta Ads cree la demande et atteint des audiences qui ne cherchent pas encore. La coordination entre les deux evite les doublons et maximise l'efficacite.",
      },
    ],
  },
  {
    slug: "developpement-web",
    title: "Sites web & developpement",
    kicker: "Conversion",
    headline: "Un site qui donne envie, rassure et transforme l'attention en action.",
    description: "Nous concevons des sites et landing pages rapides, lisibles et orientes conversion, avec un design assez fort pour soutenir une marque ambitieuse.",
    tags: ["React", "Landing pages", "CRO", "Performance"],
    benefits: ["Experience mobile solide", "Pages plus persuasives", "Tracking integre", "Meilleure vitesse percue"],
    process: [
      { title: "Diagnostic", description: "Parcours, contenu, SEO, analytics et freins visuels." },
      { title: "Design", description: "Direction artistique, sections, copy et prototypes." },
      { title: "Build", description: "Integration responsive, formulaire, metas et performances." },
      { title: "Iteration", description: "Tests, retours utilisateurs et optimisations CRO." },
    ],
    longDescription: `La majorite des sites d'entreprises ivoiriennes ont le meme probleme : ils existent, mais ils ne convertissent pas. Un visiteur arrive, il ne comprend pas immediatement ce que l'entreprise fait, pourquoi lui faire confiance, ni quoi faire ensuite. Il repart. C'est un probleme de structure et de message, pas seulement de design.

Nous concevons des sites et landing pages en partant du parcours de l'utilisateur. Quelle est sa question en arrivant ? Quelle preuve cherche-t-il ? Quelle action voulons-nous qu'il prenne ? Cette logique de conversion est integree dans chaque section, chaque titre, chaque bouton. Le design sert l'argument, pas l'inverse.

En Afrique de l'Ouest, le mobile-first n'est pas une option — c'est la realite. Plus de 80% du trafic web provient de telephones, souvent sur des connexions variables. Nous optimisons la vitesse de chargement, la lisibilite sur petit ecran et l'accessibilite des formulaires pour des conditions reelles, pas ideales.

Le tracking est integre des le build. Google Analytics 4, Google Tag Manager, pixels publicitaires : nous configurons les evenements qui comptent (formulaire soumis, appel initie, page vue) pour que vous puissiez mesurer ce qui fonctionne et ce qui freine les conversions.

Nous livrons du code propre, documenté, et accompagnons le transfert de competences si vous souhaitez gerer le site en interne. Les projets incluent toujours un guide d'utilisation pour les mises a jour courantes.`,
    faq: [
      {
        question: "Combien de temps pour livrer un site web professionnel ?",
        answer: "Une landing page optimisee est livree en 2 a 3 semaines. Un site vitrine complet avec 5 a 8 pages prend 4 a 6 semaines. Les projets avec fonctionnalites specifiques (e-commerce, espace client, formulaires complexes) demandent 8 a 14 semaines selon la scope.",
      },
      {
        question: "Sur quelle technologie construisez-vous les sites ?",
        answer: "Nous utilisons React / Vite pour les sites haute performance et Webflow pour les projets ou le client veut une gestion de contenu visuelle autonome. Nous travaillons aussi sur WordPress si l'ecosysteme de plugins est critique pour le projet. Le choix depend des besoins en performance, SEO et autonomie.",
      },
      {
        question: "Le SEO est-il inclus dans la conception du site ?",
        answer: "Oui, les bases SEO sont systematiquement integrees : structure HTML semantique, metas, canonicals, vitesse, sitemap, schema JSON-LD. Si vous voulez une strategie SEO de contenu en plus, c'est un service separe que nous pouvons activer en parallele.",
      },
      {
        question: "Qui heberge le site et combien ca coute ?",
        answer: "Nous recommandons Vercel ou Netlify pour les sites React (gratuit ou tres peu couteux pour la majorite des sites). Pour WordPress, nous recommandons des hebergeurs comme Siteground ou o2switch. Nous vous guidons sur le choix et la configuration initiale.",
      },
      {
        question: "Puis-je gerer le contenu du site moi-meme apres livraison ?",
        answer: "Oui. Selon la technologie choisie, nous configurons soit un CMS headless (Contentful, Sanity), soit Webflow Editor, soit l'administration WordPress. Nous formons votre equipe a la gestion courante : modification de textes, ajout d'images, publication d'articles.",
      },
    ],
  },
  {
    slug: "automatisation-ia",
    title: "IA, automatisation & integration d'entreprise",
    kicker: "Systeme",
    headline: "Integrer l'intelligence artificielle dans vos operations sans perdre le controle commercial.",
    description: "Nous connectons CRM, emails, formulaires, scoring, agents IA et tableaux de bord pour automatiser ce qui ralentit vos ventes, votre suivi client et vos operations internes.",
    tags: ["Automatisation entreprise", "Agents IA", "CRM", "Chatbots IA", "Dashboards"],
    benefits: ["Moins de taches repetitives", "Relances plus rapides", "Meilleur suivi client", "Donnees consolidees"],
    process: [
      { title: "Cartographie", description: "Process actuels, pertes de temps et points de friction." },
      { title: "Workflow", description: "Scenarios, outils, regles et messages automatises." },
      { title: "Integration", description: "CRM, formulaires, emails, dashboards et alertes." },
      { title: "Formation", description: "Documentation simple et adoption par les equipes." },
    ],
    longDescription: `L'automatisation et l'IA ne sont plus reservees aux grandes entreprises. Les PME africaines qui les adoptent aujourd'hui prennent une avance significative sur leur marche : elles suivent plus de clients, repondent plus vite et perdent moins de prospects dans les creux operationnels.

Nous commen­cons par identifier ce qui coute vraiment du temps dans vos operations. Les relances commerciales non faites, les leads qui refroidissent dans une boite mail, les rapports prepares manuellement chaque semaine, les formulaires qui n'alimentent pas de CRM. Ce sont des pertes mesurables, et elles sont systematiquement automatisables.

Nos integrations connectent les outils que vous utilisez deja : formulaires web, CRM (HubSpot, Pipedrive, Notion, Airtable), messagerie (WhatsApp Business, Gmail, Outlook), calendriers et outils de facturation. Nous construisons des workflows qui declenchent les bonnes actions au bon moment — sans intervention humaine pour les taches repetitives.

L'IA intervient a des moments specifiques : scoring de leads, qualification automatique via chatbot, generation de premieres reponses a des demandes entrantes, synthese de reunions, extraction de donnees depuis des documents. Nous ne deployons pas de l'IA pour faire moderne — nous l'utilisons uniquement quand elle reduit reellement une friction.

La formation et l'adoption sont incluses. Un workflow non utilise ne vaut rien. Nous livrons une documentation simple, nous formons vos equipes en situation reelle, et nous ajustons les scenarios en fonction de l'usage observe dans les premieres semaines.`,
    faq: [
      {
        question: "Est-ce que je dois avoir des systemes informatiques complexes pour commencer ?",
        answer: "Non. Nous travaillons avec ce que vous avez : Google Sheets, WhatsApp Business, un formulaire de contact basique. Nous construisons d'abord les automatisations simples qui donnent des resultats immediatement, puis nous complexifions progressivement selon les besoins reels.",
      },
      {
        question: "Quels outils utilisez-vous pour automatiser ?",
        answer: "Principalement Make (ex-Integromat), Zapier, n8n et des integrations natives via API. Pour les agents IA, nous utilisons des frameworks bases sur des modeles de langage comme Claude ou GPT-4, selon le cas d'usage. Nous recommandons toujours l'outil le moins couteux qui repond au besoin.",
      },
      {
        question: "Est-ce que l'IA peut remplacer mon equipe commerciale ?",
        answer: "Non — et ce n'est pas l'objectif. L'IA gere les taches repetitives et a faible valeur ajoutee (premiere reponse, qualification de base, relance automatique). Votre equipe commerciale se concentre sur ce qu'elle fait le mieux : convaincre, negocier et closer. L'objectif est d'augmenter la productivite commerciale, pas de supprimer des postes.",
      },
      {
        question: "Combien de temps pour deployer un systeme d'automatisation ?",
        answer: "Un premier workflow fonctionnel (capture de leads + integration CRM + relance automatique) est en place en 2 a 3 semaines. Un systeme complet avec scoring IA, chatbot et dashboards prend 6 a 10 semaines selon la complexite et les intégrations requises.",
      },
      {
        question: "Qui gere les automatisations apres la livraison ?",
        answer: "Vous. Nous livrons avec une documentation claire et une formation pratique pour que votre equipe puisse modifier les regles, ajouter des etapes ou ajuster les messages sans nous appeler. Pour les evolutions importantes, nous restons disponibles en maintenance ponctuelle.",
      },
    ],
  },
  {
    slug: "creation-logo-identite",
    title: "Creation de logo & identite visuelle",
    kicker: "Agence de communication",
    headline: "Une identite qui donne a votre entreprise la presence d'une marque serieuse des le premier contact.",
    description: "Nous creons des logos, chartes graphiques, univers visuels et supports de communication pour les entreprises qui veulent inspirer confiance avant meme le premier rendez-vous.",
    tags: ["Creation logo", "Identite visuelle", "Charte graphique", "Branding", "Agence communication Abidjan"],
    benefits: ["Image plus credible", "Supports coherents", "Design applicable au digital", "Base claire pour les campagnes"],
    process: [
      { title: "Direction", description: "Positionnement, references, marche et niveau de premium attendu." },
      { title: "Creation", description: "Pistes logo, palette, typographie, systeme graphique et usages." },
      { title: "Validation", description: "Selection, ajustements, lisibilite et coherence business." },
      { title: "Livraison", description: "Fichiers, mini-charte et formats pour web, reseaux sociaux et impression." },
    ],
    longDescription: `Une identite visuelle n'est pas un logo. C'est un systeme : la combinaison d'un symbole, d'une palette de couleurs, d'une typographie, d'un ton de voix et de regles d'application qui permettent a une marque d'etre reconnaissable sur tous ses supports — de la carte de visite au site web en passant par les visuels Instagram.

A Abidjan, la majorite des PME sous-investissent dans leur identite visuelle. Elles utilisent un logo fait rapidement, des couleurs changeantes d'un support a l'autre, des visuels de communication inconsistants. Le resultat : une image qui inspire peu confiance, independamment de la qualite de l'offre. La forme signale la qualite du fond avant que le contenu soit lu.

Notre processus commence par comprendre votre positionnement et votre marche. Un cabinet de conseil premium n'a pas le meme vocabulaire visuel qu'une marque de grande consommation populaire. Nous travaillons sur des references, un brief de direction artistique et un niveau de premium attendu avant de dessiner la premiere forme.

Nous livrons plusieurs pistes de logo, une palette principale et secondaire, des typographies validees et un guide d'application simple. Le guide couvre les usages digitaux (site, reseaux sociaux, publicites) et physiques (documents, signage, impression) pour que votre equipe puisse appliquer l'identite de facon coherente sans nous appeler a chaque nouveau support.

Tous les fichiers source sont livres dans les formats standards : SVG, EPS, PNG transparent, PDF vectoriel. Si votre identite visuelle existante a besoin d'une refonte plutot que d'une creation from scratch, nous adaptons le processus en consequence.`,
    faq: [
      {
        question: "Qu'est-ce qui est inclus dans une identite visuelle complete ?",
        answer: "Logo principal et ses variantes (couleur, monochrome, fond clair et fonce), palette de couleurs primaire et secondaire, typographies validees, exemples d'application (carte de visite, entete email, vignette reseaux sociaux) et mini-charte d'utilisation. Les formats livres couvrent le web et l'impression.",
      },
      {
        question: "Combien de temps prend la creation d'un logo et d'une identite ?",
        answer: "La creation d'un logo avec charte simple prend 3 a 4 semaines. Une identite visuelle complete (logo + charte + guide d'application + templates de supports) prend 5 a 8 semaines, selon la complexite du brief et le nombre de cycles de validation.",
      },
      {
        question: "Combien de propositions de logo recevrai-je ?",
        answer: "Nous livrons 2 a 3 pistes creatives differentes dans une premiere presentation. Une fois la direction choisie, nous faisons les ajustements demandes en 2 cycles de retours. Des revisions supplementaires sont possibles selon le contrat.",
      },
      {
        question: "Puis-je utiliser mon nouveau logo partout : web, impression, enseignes ?",
        answer: "Oui. Nous livrons des fichiers vectoriels (SVG, EPS, PDF) utilisables a toute taille sans perte de qualite, ainsi que des formats raster (PNG transparent) pour le web et les reseaux sociaux. Nous indiquons aussi les contraintes d'utilisation selon le fond et le format.",
      },
      {
        question: "Proposez-vous aussi la creation de supports de communication ?",
        answer: "Oui — carte de visite, plaquette commerciale, presentation PowerPoint ou Google Slides aux couleurs de la marque, templates reseaux sociaux, entete et pied de page email. Ces elements peuvent etre ajoutes au projet ou commandes separement apres la livraison de l'identite.",
      },
    ],
  },
  {
    slug: "logiciel-sur-mesure",
    title: "Logiciel sur mesure pour entreprises",
    kicker: "Developpement metier",
    headline: "Transformer vos process internes en outils simples, propres et vraiment utilises par vos equipes.",
    description: "Nous concevons des logiciels sur mesure, portails clients, CRM internes, dashboards et outils d'automatisation adaptes a votre facon de vendre, suivre et servir vos clients.",
    tags: ["Logiciel sur mesure", "CRM interne", "Portail client", "Dashboard", "Automatisation"],
    benefits: ["Process mieux controles", "Moins de travail manuel", "Donnees centralisees", "Outil adapte a l'entreprise"],
    process: [
      { title: "Cartographie", description: "Flux actuels, utilisateurs, donnees et irritants operationnels." },
      { title: "Prototype", description: "Parcours, ecrans, droits, logique metier et priorites." },
      { title: "Developpement", description: "Application web, integrations, base de donnees et controles qualite." },
      { title: "Adoption", description: "Formation, documentation et ameliorations apres usage reel." },
    ],
    longDescription: `Un logiciel sur mesure devient pertinent quand les outils generiques — CRM standard, tableurs, outils no-code — ne s'adaptent plus a votre facon de travailler. Quand vos equipes contournent l'outil plutot que de l'utiliser. Quand les donnees sont dispersees dans plusieurs endroits et que personne n'a une vue complete. C'est ce moment qui justifie l'investissement dans un developpement specifique.

Nous construisons principalement des applications web internes : CRM metier, portails clients, dashboards de pilotage, outils de suivi de commandes, plateformes de gestion de contrats ou de formation. Ces applications sont accessibles depuis un navigateur, sans installation, avec des droits d'acces geres par role.

Notre processus commence par une cartographie des flux actuels, pas par le code. Qui fait quoi ? Quelles donnees sont saisies ou consultees ? Quels sont les points de friction quotidiens ? Ce diagnostic permet de concevoir un outil qui correspond a la realite operationnelle, pas a un ideal theorique.

Nous livrons le code source complet. Vous etes proprietaire de votre logiciel, heberge sur votre infrastructure ou celle que vous choisissez. Il n'y a pas de dependance a une plateforme tierce ni de frais d'abonnement caches. La documentation technique et fonctionnelle est incluse dans chaque livraison.

L'adoption est le critere de reussite, pas la livraison. Nous formons les equipes en situation reelle, nous collectons les retours des premiers utilisateurs et nous integrons les ajustements necessaires dans les semaines suivant la mise en production. Un outil non utilise n'a aucune valeur.`,
    faq: [
      {
        question: "Comment savoir si j'ai besoin d'un logiciel sur mesure ?",
        answer: "Vous en avez besoin quand vos outils actuels vous font perdre plus de temps qu'ils n'en economisent, quand vos donnees sont dans 5 endroits differents, quand vos equipes ont cree des contournements (Excel, WhatsApp) pour compenser les limites de vos outils, ou quand vous avez des regles metier que les solutions standard ne peuvent pas implementer.",
      },
      {
        question: "Quels types de logiciels developpez-vous ?",
        answer: "CRM internes, portails clients, plateformes de gestion de commandes, dashboards de pilotage, outils de suivi de contrats, applications de gestion de formation, tableaux de bord RH ou financiers, et tout outil qui structure un process interne repetitif. Nous developpons des applications web, pas des applications mobiles natives.",
      },
      {
        question: "Est-ce que je suis proprietaire du code ?",
        answer: "Oui, completement. Nous vous livrons le code source, la documentation technique et les acces a l'infrastructure. Il n'y a aucune dependance a notre structure apres la livraison. Vous pouvez le faire evoluer avec n'importe quel autre developpeur.",
      },
      {
        question: "Combien de temps prend le developpement d'un logiciel sur mesure ?",
        answer: "Un outil simple (dashboard de suivi, formulaire avec base de donnees, portail avec authentification) prend 6 a 10 semaines. Un CRM complet ou une plateforme multi-utilisateurs avec regles metier complexes prend 3 a 6 mois. Nous livrons par increments — les premieres fonctionnalites sont utilisables avant la fin du projet.",
      },
      {
        question: "Assurez-vous la maintenance apres la livraison ?",
        answer: "Nous proposons un contrat de maintenance optionnel couvrant les corrections de bugs, les mises a jour de securite et les petites evolutions. Pour les developpements importants post-livraison, nous travaillons sur devis au cas par cas. La documentation est suffisante pour qu'un autre developpeur puisse reprendre le projet.",
      },
    ],
  },
  {
    slug: "formations-webinaires",
    title: "Formations & webinaires",
    kicker: "Transmission",
    headline: "Former vos equipes a comprendre, piloter et ameliorer leur marketing.",
    description: "Nous creons des sessions pratiques pour equipes dirigeantes, commerciales et marketing, avec des exercices bases sur vos vrais enjeux.",
    tags: ["Ateliers", "Coaching", "Playbooks", "Webinaires"],
    benefits: ["Equipes plus autonomes", "Meilleure lecture des chiffres", "Process documentes", "Priorites plus claires"],
    process: [
      { title: "Brief", description: "Niveau des equipes, objectifs et cas concrets." },
      { title: "Programme", description: "Modules courts, exercices et supports adaptes." },
      { title: "Session", description: "Formation pratique avec decisions applicables." },
      { title: "Suivi", description: "Ressources, plan d'action et points de controle." },
    ],
    longDescription: `La formation marketing que nous proposons n'est pas une serie de slides generiques sur le digital. C'est une session construite autour de vos enjeux reels : vos chiffres, vos campagnes existantes, votre equipe, votre marche. Les exercices portent sur vos donnees, pas sur des exemples fictifs.

Nous formons deux types de profils. Les equipes dirigeantes qui veulent comprendre les leviers digitaux pour mieux superviser leurs prestataires et prendre de meilleures decisions d'investissement. Et les equipes operationnelles (marketing, commercial) qui veulent piloter leurs campagnes en interne ou mieux travailler avec leurs agences.

Les sujets couverts incluent : la publicite digitale (Meta Ads, Google Ads), le SEO et l'AEO, la generation de leads et le nurturing, l'automatisation marketing, l'analyse des performances et la lecture des tableaux de bord. Chaque session est construite sur un format court et dense — 3 a 4 heures par module — avec des livrables concrets a la fin.

Les webinaires sont une version plus accessible, ouverte a plusieurs entreprises en meme temps, avec un format standardise. Ils sont particulierement adaptes aux dirigeants qui veulent une mise a niveau rapide sur un sujet precis avant de prendre une decision d'investissement.

Nous livrons systematiquement un support de formation reutilisable, un plan d'action prioritaire et, pour les formations en entreprise, une session de suivi 30 jours apres pour verifier l'application et repondre aux questions qui emergent sur le terrain.`,
    faq: [
      {
        question: "Les formations sont-elles en presentiel ou en ligne ?",
        answer: "Les deux. Les formations en entreprise se font de preference en presentiel a Abidjan ou en visioconference pour les equipes hors de Cote d'Ivoire. Les webinaires sont systematiquement en ligne, avec un replay disponible. Nous nous adaptons a la configuration de votre equipe.",
      },
      {
        question: "Peut-on commander une formation sans autre prestation LGM ?",
        answer: "Absolument. Nos formations et webinaires sont disponibles independamment de la gestion de campagnes ou du conseil. Nous formons aussi des equipes qui travaillent avec d'autres agences et qui veulent mieux superviser ces relations.",
      },
      {
        question: "Quelle est la taille idéale d'un groupe pour une formation en entreprise ?",
        answer: "Nous recommandons des groupes de 4 a 12 personnes pour les sessions en entreprise. Au-dela de 12, les exercices pratiques perdent en qualite. Pour les groupes plus larges, nous divisons en sous-groupes avec des sessions separees ou nous adaptons le format.",
      },
      {
        question: "Livrez-vous un certificat ou une attestation de formation ?",
        answer: "Oui, nous delivrons une attestation de formation avec le programme, la duree et les competences travaillees. Pour les formations en entreprise, nous pouvons adapter le document aux exigences administratives de votre organisation.",
      },
      {
        question: "Quels sont les sujets les plus demandes en formation ?",
        answer: "Les sujets les plus demandes sont : Meta Ads et Google Ads (gestion et lecture des resultats), SEO pour dirigeants (comprendre et superviser), generation de leads et qualification commerciale, automatisation marketing avec Make ou Zapier, et lecture de tableaux de bord Google Analytics. Nous construisons aussi des programmes sur mesure.",
      },
    ],
  },
  {
    slug: "publicite-facebook",
    title: "Agence Facebook & Meta Ads",
    kicker: "Social ads",
    headline: "Des campagnes Facebook qui parlent a votre marche, pas a une audience abstraite.",
    description: "Nous construisons des campagnes Facebook et Instagram adaptees au contexte local, avec ciblage precis, creation lisible, retargeting, formulaire de leads et suivi des conversions.",
    tags: ["Agence Facebook", "Services Facebook", "Meta Ads", "Instagram Ads", "Retargeting"],
    benefits: ["Ciblage plus fin", "Creatifs mieux testes", "Suivi des prospects", "Optimisation continue"],
    process: [
      { title: "Consultation", description: "Offre, audience, budget et objectifs commerciaux." },
      { title: "Creation", description: "Angles, visuels, messages et pages de conversion." },
      { title: "Diffusion", description: "Campagnes, tracking, exclusions et retargeting." },
      { title: "Amelioration", description: "Tests hebdomadaires et arbitrages chiffres en main." },
    ],
    longDescription: `Facebook et Instagram restent les plateformes publicitaires les plus puissantes en Cote d'Ivoire. La penetration mobile est elevee, l'engagement sur les contenus locaux est fort, et les couts par impression restent competitifs. Mais la plateforme a change : les vieilles methodes de ciblage ultra-precis ont disparu apres les mises a jour de confidentialite, et les algorithmes recompensent des approches differentes.

Notre expertise Meta Ads est construite sur la connaissance du marche local. Nous savons quels comportements visuels fonctionnent a Abidjan, quels codes de confiance rassurer, quelle frequence d'exposition eviter, et comment WhatsApp s'integre dans le parcours d'achat ivoirien. Ces details font la difference entre une campagne qui performe et une qui brule du budget.

Nous construisons des campagnes avec une logique de test systematique. Plusieurs angles creatifs, plusieurs audiences, plusieurs formats (image, video, carrousel, formulaire lead natif). Les meilleurs elements sont identifies en 7 a 10 jours, et nous concentrons le budget sur ce qui fonctionne, pas sur ce qui semble raisonnable a priori.

Les formulaires leads natifs Facebook sont particulierement efficaces sur le marche ivoirien pour deux raisons : l'experience est entierement dans l'application (pas de redirection vers un site) et les informations sont pre-remplies depuis le profil Meta. Le taux de completion est nettement superieur. Nous les utilisons strategiquement selon l'offre et le cycle de vente.

Le suivi des leads generes est configure pour que chaque contact arrive dans votre CRM ou soit notifie par WhatsApp dans les minutes suivant la soumission. La rapidite de contact est le facteur numero un de qualification reussie sur ces audiences.`,
    faq: [
      {
        question: "Quel budget minimum pour une campagne Meta Ads efficace en Cote d'Ivoire ?",
        answer: "Nous recommandons 150 000 FCFA minimum par mois de budget media. En dessous, les volumes sont insuffisants pour que l'algorithme Meta optimise correctement. Ce budget s'ajoute aux honoraires de gestion. Pour des resultats solides avec tests et retargeting, 300 000 FCFA et plus est plus adapte.",
      },
      {
        question: "Vaut-il mieux utiliser les formulaires leads Facebook ou une landing page externe ?",
        answer: "Ca depend de l'offre. Les formulaires leads natifs Facebook donnent des taux de conversion plus eleves car l'experience reste dans l'application, mais la qualite des leads peut etre plus variable. Une landing page externe permet plus de qualification (l'utilisateur doit faire plus d'effort) et un meilleur tracking. Nous testons les deux et orientons selon les resultats.",
      },
      {
        question: "Gerez-vous aussi Instagram ?",
        answer: "Oui. Les campagnes Meta Ads incluent systematiquement Instagram dans les placements. Nous adaptons les formats selon les placements : ratio 9:16 pour les Stories et Reels, ratio 1:1 pour le feed. Selon votre audience, Instagram peut etre plus performant que Facebook sur certains segments.",
      },
      {
        question: "Combien de variantes de publicites testez-vous ?",
        answer: "Nous lancons generalement 3 a 5 angles creatifs differents au debut d'une campagne, avec 2 a 3 visuels ou videos par angle. Apres 7 a 10 jours, nous identifions les variantes performantes et nous arretons les autres. Ce processus se repete chaque mois avec de nouveaux angles pour eviter la fatigue publicitaire.",
      },
      {
        question: "Vos campagnes sont-elles vraiment adaptees au marche ivoirien ?",
        answer: "Oui — nous sommes bases a Abidjan depuis 2019 et nous gerons des campagnes pour des entreprises ivoiriennes quotidiennement. Nous connaissons les codes visuels locaux, les moments de la journee ou les audiences sont actives, les objections frequentes et les messages qui resonent selon les secteurs.",
      },
    ],
  },
];

export const serviceOptions = [
  "Generation de leads",
  "SEO, AEO & GEO",
  "Agence de publicite digitale",
  "Sites web & developpement",
  "IA, automatisation & integration d'entreprise",
  "Creation de logo / identite visuelle",
  "Logiciel sur mesure",
  "Formations & webinaires",
  "Agence Facebook & Meta Ads",
  "Autre / Je ne sais pas encore",
];

export const qualificationServiceOptions = [
  "Publicite digitale / agence de publicite",
  "Facebook / Meta Ads",
  "Generation de leads",
  "SEO / AEO / GEO",
  "Creation de logo / identite visuelle",
  "Site web / landing page",
  "Automatisation & IA",
  "Logiciel sur mesure",
  "Formation",
  "Autre",
];

export const findService = (slug?: string) => publicServices.find((service) => service.slug === slug);

export const serviceAreaPages: ServiceAreaPage[] = [
  {
    slug: "abidjan",
    city: "Abidjan",
    country: "Cote d'Ivoire",
    title: "Agence marketing et communication a Abidjan",
    metaDescription: "LGM, agence marketing et communication a Abidjan : Facebook Ads, SEO/AEO/GEO, sites web, IA, automatisation et logiciels sur mesure.",
    lead: "Basee a Abidjan, LGM accompagne les entreprises qui veulent structurer leur acquisition, convertir plus de prospects et professionnaliser leur presence digitale.",
    proof: ["Equipe basee a Abidjan", "Connaissance du marche ivoirien", "Accompagnement marketing, communication, IA et logiciel"],
  },
  {
    slug: "dakar",
    city: "Dakar",
    country: "Senegal",
    title: "Agence marketing pour entreprises a Dakar",
    metaDescription: "Agence marketing pour Dakar : generation de leads, publicite Facebook, SEO local, automatisation IA et logiciels metier.",
    lead: "Depuis Abidjan, LGM accompagne les entreprises de Dakar avec des systemes marketing adaptes aux marches francophones et aux cycles commerciaux locaux.",
    proof: ["Strategie adaptee aux entreprises senegalaises", "Campagnes Meta et Google pilotees a distance", "Reporting clair pour les equipes commerciales"],
  },
  {
    slug: "douala-cameroun",
    city: "Douala",
    country: "Cameroun",
    title: "Agence marketing pour entreprises au Cameroun",
    metaDescription: "Agence marketing pour le Cameroun : publicite digitale, agence Facebook, SEO/AEO/GEO, IA, automatisation, sites web et logiciels sur mesure depuis Abidjan.",
    lead: "LGM aide les entreprises au Cameroun a clarifier leur offre, generer des prospects qualifies et mettre en place des outils marketing mesurables.",
    proof: ["Approche adaptee aux marches francophones", "Acquisition, conversion et fidelisation", "Automatisation, CRM et suivi commercial"],
  },
  {
    slug: "ouagadougou",
    city: "Ouagadougou",
    country: "Burkina Faso",
    title: "Agence marketing pour entreprises a Ouagadougou",
    metaDescription: "Agence marketing pour Ouagadougou : publicite digitale, Facebook Ads, SEO local, creation de logo, sites web, automatisation IA et logiciels sur mesure.",
    lead: "LGM accompagne les entreprises de Ouagadougou qui veulent passer d'actions marketing dispersees a un systeme commercial plus lisible.",
    proof: ["Accompagnement a distance structure", "Pages, campagnes et formulaires de qualification", "Services marketing, communication et IA dans un seul systeme"],
  },
];

export const findServiceArea = (slug?: string) => serviceAreaPages.find((area) => area.slug === slug);
