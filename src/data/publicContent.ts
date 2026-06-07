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
    metaDescription: "Agence marketing pour Dakar : generation de leads, publicite Facebook, SEO local, creation de logo, automatisation IA et logiciels metier pour entreprises senegalaises.",
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
