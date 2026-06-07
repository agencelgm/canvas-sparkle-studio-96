export const siteContact = {
  email: "contact@lgm.marketing",
  phoneDisplay: "+225 07 98 17 23 39",
  phoneHref: "+2250798172339",
  whatsapp: "https://wa.me/2250798172339",
  address: "Chateau, Camp Militaire, Angre, Abidjan",
  hours: "Lundi–vendredi, 9h–17h",
};

import aboutHeroAsset from "@/assets/about-hero.jpg.asset.json";

export const publicImages = {
  hero: "/images/lgm-hero.png",
  about: aboutHeroAsset.url,
  method: "/images/lgm-method.png",
  services: "/images/lgm-services.png",
  contact: "/images/lgm-contact.png",
  blog: "/images/lgm-blog.png",
  og: "/images/og-lgm.png",
  board: "/images/lgm-imagegen-board.png",
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
    title: "SEO local",
    kicker: "Visibilite",
    headline: "Etre trouve a Abidjan avant que le prospect ne demande autour de lui.",
    description: "Nous structurons votre presence locale pour Google, les recherches geographiques et les intentions fortes : fiches, contenus, pages locales et signaux de confiance.",
    tags: ["Google Business", "SEO technique", "Pages locales", "Avis clients"],
    benefits: ["Meilleure presence locale", "Plus d'appels entrants", "Contenu utile et durable", "Base SEO plus propre"],
    process: [
      { title: "Audit", description: "Technique, contenus, fiches, concurrence et intentions locales." },
      { title: "Architecture", description: "Pages, maillage, mots cles et priorites geographiques." },
      { title: "Optimisation", description: "Metas, contenus, citations, avis et Google Business." },
      { title: "Suivi", description: "Positions, appels, formulaires et ajustements mensuels." },
    ],
  },
  {
    slug: "publicite-digitale",
    title: "Publicite digitale",
    kicker: "Performance",
    headline: "Des campagnes payantes qui servent le chiffre, pas seulement la visibilite.",
    description: "Nous gerons vos budgets publicitaires avec une logique de test, d'attribution et de conversion. Chaque campagne a un role clair dans le systeme ACF.",
    tags: ["Google Ads", "Meta Ads", "Retargeting", "A/B testing"],
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
    title: "Automatisation & IA",
    kicker: "Systeme",
    headline: "Moins de relances manuelles, plus de decisions prises au bon moment.",
    description: "Nous connectons CRM, emails, formulaires, scoring et IA pour automatiser ce qui ralentit vos ventes, sans retirer l'humain la ou il compte.",
    tags: ["CRM", "Email flows", "Chatbots IA", "Dashboards"],
    benefits: ["Moins de taches repetitives", "Relances plus rapides", "Meilleur suivi client", "Donnees consolidees"],
    process: [
      { title: "Cartographie", description: "Process actuels, pertes de temps et points de friction." },
      { title: "Workflow", description: "Scenarios, outils, regles et messages automatises." },
      { title: "Integration", description: "CRM, formulaires, emails, dashboards et alertes." },
      { title: "Formation", description: "Documentation simple et adoption par les equipes." },
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
    title: "Publicite Facebook",
    kicker: "Social ads",
    headline: "Des campagnes Facebook qui parlent a votre marche, pas a une audience abstraite.",
    description: "Nous construisons des campagnes Meta adaptees au contexte local, avec ciblage precis, creation lisible, retargeting et suivi des conversions.",
    tags: ["Facebook Ads", "Instagram Ads", "Creatifs", "Retargeting"],
    benefits: ["Ciblage plus fin", "Creatifs mieux testes", "Suivi des prospects", "Optimisation continue"],
    process: [
      { title: "Consultation", description: "Offre, audience, budget et objectifs commerciaux." },
      { title: "Creation", description: "Angles, visuels, messages et pages de conversion." },
      { title: "Diffusion", description: "Campagnes, tracking, exclusions et retargeting." },
      { title: "Amelioration", description: "Tests hebdomadaires et arbitrages chiffres en main." },
    ],
  },
  {
    slug: "creation-logo",
    title: "Creation de logo & identite visuelle",
    kicker: "Identite",
    headline: "Une marque qui inspire confiance avant meme que le prospect lise un mot.",
    description: "Logo, typographie, palette, charte graphique — pensees pour les entreprises ambitieuses d'Afrique de l'Ouest.",
    tags: ["Logo", "Charte graphique", "Branding", "Identite visuelle"],
    benefits: ["Identite memorable et differenciante", "Coherence sur tous les supports", "Charte utilisable en interne", "Positionnement visuel professionnel"],
    process: [
      { title: "Brief", description: "Positionnement, valeurs, cibles et univers de reference." },
      { title: "Exploration", description: "Pistes creatives, moodboards et directions artistiques." },
      { title: "Creation", description: "Logo, declinaisons, typographies et palette couleurs." },
      { title: "Livraison", description: "Fichiers sources, charte graphique et guide d'utilisation." },
    ],
  },
  {
    slug: "logiciel-sur-mesure",
    title: "Logiciel sur mesure",
    kicker: "Technologie",
    headline: "Un outil construit pour votre metier, pas pour un cas generique.",
    description: "CRM, portails clients, outils internes, dashboards — avec une logique metier pensee depuis vos vrais besoins.",
    tags: ["CRM sur mesure", "Portail client", "Dashboard", "Outils internes"],
    benefits: ["Outil adapte a vos processus", "Adoption rapide par les equipes", "Moins de friction operationnelle", "Donnees consolidees et lisibles"],
    process: [
      { title: "Analyse", description: "Processus, flux de donnees, utilisateurs et contraintes techniques." },
      { title: "Conception", description: "Architecture, wireframes et logique metier." },
      { title: "Developpement", description: "Build iteratif avec tests et validations intermediaires." },
      { title: "Deploiement", description: "Mise en production, formation et documentation utilisateur." },
    ],
  },
];

export const serviceOptions = [
  "Generation de leads",
  "SEO local",
  "Publicite digitale",
  "Sites web & developpement",
  "Automatisation & IA",
  "Formations & webinaires",
  "Publicite Facebook",
  "Autre / Je ne sais pas encore",
];

export const findService = (slug?: string) => publicServices.find((service) => service.slug === slug);
