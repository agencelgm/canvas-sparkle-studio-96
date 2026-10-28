// Contenu editorial du "systeme d'acquisition" LGM.
// Les etapes, le role de chaque service et les roles de l'equipe sont
// centralises ici pour etre modifies sans toucher aux composants.

export type SystemStepId = "attirer" | "capter" | "qualifier" | "rendez-vous" | "vendre" | "fideliser";

export type SystemStep = {
  id: SystemStepId;
  number: string;
  title: string;
  short: string;
  question: string;
  description: string;
  tools: string[];
  metric: string;
  image: string;
  imageAlt: string;
  services: string[]; // slugs de publicServices
};

export const systemSteps: SystemStep[] = [
  {
    id: "attirer",
    number: "01",
    title: "Attirer",
    short: "Campagnes et visibilite",
    question: "Les bonnes personnes vous voient-elles ?",
    description:
      "Campagnes Facebook, Instagram et Google, referencement local et contenus utiles amenent vers vous des personnes qui ont deja le probleme que vous resolvez.",
    tools: ["Meta Ads", "Google Ads", "SEO / AEO / GEO", "Contenus"],
    metric: "Cout par visite utile",
    image: "/images/acf-social.jpg",
    imageAlt: "Composition de contenus sociaux et de campagnes publicitaires",
    services: ["publicite-facebook", "publicite-digitale", "seo-local"],
  },
  {
    id: "capter",
    number: "02",
    title: "Capter",
    short: "Pages et formulaires",
    question: "Le visiteur laisse-t-il ses coordonnees ?",
    description:
      "Une page claire, rapide sur mobile, avec une offre lisible et un formulaire court transforme l'attention en demande concrete.",
    tools: ["Landing pages", "Sites web", "Formulaires", "WhatsApp"],
    metric: "Taux de conversion de la page",
    image: "/images/acf-checklist.jpg",
    imageAlt: "Liste de controle d'une page de conversion",
    services: ["developpement-web", "generation-leads"],
  },
  {
    id: "qualifier",
    number: "03",
    title: "Qualifier",
    short: "Questions et scoring",
    question: "Ce contact peut-il vraiment acheter ?",
    description:
      "Des questions bien placees sur le besoin, le budget et l'urgence separent les prospects qualifies des simples curieux, avant le premier appel.",
    tools: ["Formulaire multi-etapes", "Scoring", "CRM"],
    metric: "Part de prospects qualifies",
    image: "/images/acf-validation.jpg",
    imageAlt: "Validation et tri des demandes entrantes",
    services: ["generation-leads", "automatisation-ia"],
  },
  {
    id: "rendez-vous",
    number: "04",
    title: "Obtenir un rendez-vous",
    short: "Calendrier et relances",
    question: "Le prospect parle-t-il a votre equipe rapidement ?",
    description:
      "Prise de rendez-vous en ligne, rappels automatiques et relances WhatsApp evitent que les demandes refroidissent dans une boite mail.",
    tools: ["Calendrier", "Rappels", "Relances WhatsApp", "Alertes"],
    metric: "Taux de rendez-vous honores",
    image: "/images/acf-chat.jpg",
    imageAlt: "Conversation de prise de rendez-vous",
    services: ["automatisation-ia"],
  },
  {
    id: "vendre",
    number: "05",
    title: "Vendre",
    short: "Suivi commercial",
    question: "Votre equipe conclut-elle avec methode ?",
    description:
      "Un pipeline lisible, des scripts d'appel et des propositions structurees aident vos commerciaux a transformer les rendez-vous en clients.",
    tools: ["Pipeline CRM", "Scripts", "Propositions", "Paiement"],
    metric: "Taux de closing",
    image: "/images/acf-payment.jpg",
    imageAlt: "Etape de paiement et de conclusion de vente",
    services: ["automatisation-ia", "formations-webinaires"],
  },
  {
    id: "fideliser",
    number: "06",
    title: "Fideliser",
    short: "Clients qui reviennent",
    question: "Vos clients rachetent-ils et vous recommandent-ils ?",
    description:
      "Messages apres-vente, offres de reachat, demandes d'avis et parrainage font de chaque client une source de nouvelles ventes.",
    tools: ["Sequences apres-vente", "Avis", "Parrainage", "Offres"],
    metric: "Valeur client sur la duree",
    image: "/images/acf-loyalty.jpg",
    imageAlt: "Relation client et fidelisation",
    services: ["automatisation-ia", "logiciel-sur-mesure"],
  },
];

export const measureLoop = {
  title: "Mesurer et optimiser",
  text: "Chaque semaine, les chiffres de chaque etape sont relus ensemble : ou le parcours perd-il des personnes ? On corrige l'etape la plus faible, puis on recommence.",
  points: ["Tableau de bord par etape", "Point hebdomadaire", "Une priorite corrigee a la fois"],
};

export type ServiceSystemRole = {
  slug: string;
  role: "etape" | "soutien";
  steps: SystemStepId[];
  benefit: string;
  roleText: string;
  image: string;
};

// Role de chaque service dans le systeme. Les soutiens transversaux
// (logo, logiciel, formation) renforcent toutes les etapes.
export const serviceSystemRoles: ServiceSystemRole[] = [
  { slug: "publicite-facebook", role: "etape", steps: ["attirer"], benefit: "Des personnes ciblees par metier, zone et interet decouvrent votre offre chaque jour.", roleText: "Alimente le haut du parcours avec une audience locale precise.", image: "/images/acf-social.jpg" },
  { slug: "publicite-digitale", role: "etape", steps: ["attirer"], benefit: "Votre budget media est reparti entre Google et Meta selon ce qui produit des demandes.", roleText: "Capte la demande existante et cree la nouvelle demande.", image: "/images/lgm-services.jpg" },
  { slug: "seo-local", role: "etape", steps: ["attirer"], benefit: "Vous etes trouve sur Google et dans les reponses des IA quand un client cherche votre service.", roleText: "Apporte des visites qualifiees sans payer chaque clic.", image: "/images/lgm-blog.jpg" },
  { slug: "developpement-web", role: "etape", steps: ["capter"], benefit: "Des pages rapides et claires qui transforment une visite en demande.", roleText: "Recoit le trafic et le convertit en contacts.", image: "/images/acf-checklist.jpg" },
  { slug: "generation-leads", role: "etape", steps: ["capter", "qualifier"], benefit: "Un flux regulier de prospects tries avant d'arriver a votre equipe.", roleText: "Relie campagnes, pages et questions de qualification.", image: "/images/acf-validation.jpg" },
  { slug: "automatisation-ia", role: "etape", steps: ["qualifier", "rendez-vous", "vendre", "fideliser"], benefit: "Alertes, relances et CRM fonctionnent sans dependre de la memoire de chacun.", roleText: "Fait circuler chaque prospect d'une etape a la suivante.", image: "/images/acf-chat.jpg" },
  { slug: "creation-logo-identite", role: "soutien", steps: [], benefit: "Une image coherente qui inspire confiance avant meme le premier echange.", roleText: "Soutien transversal : renforce la credibilite a chaque etape.", image: "/images/lgm-imagegen-board.jpg" },
  { slug: "logiciel-sur-mesure", role: "soutien", steps: [], benefit: "Un outil metier adapte a votre facon de vendre et de suivre vos clients.", roleText: "Soutien transversal : structure les donnees de tout le parcours.", image: "/images/lgm-method.jpg" },
  { slug: "formations-webinaires", role: "soutien", steps: [], benefit: "Vos equipes savent lire les chiffres et appliquer la methode au quotidien.", roleText: "Soutien transversal : rend votre equipe autonome sur le systeme.", image: "/images/lgm-about.jpg" },
];

export const findServiceRole = (slug?: string) => serviceSystemRoles.find((r) => r.slug === slug);

export type TeamRole = {
  id: string;
  role: string;
  focus: string;
  description: string;
  // A completer plus tard : nom et photo reels.
  name?: string;
  photo?: string;
};

export const teamRoles: TeamRole[] = [
  { id: "direction", role: "Direction strategie", focus: "Diagnostic et priorites", description: "Lit vos chiffres, choisit l'etape a corriger en premier et pilote la feuille de route." },
  { id: "acquisition", role: "Acquisition & media", focus: "Attirer", description: "Construit et optimise les campagnes Meta et Google chaque semaine." },
  { id: "creation", role: "Creation & contenu", focus: "Attirer et capter", description: "Produit les visuels, videos, textes et pages qui donnent envie d'agir." },
  { id: "web", role: "Web & developpement", focus: "Capter", description: "Livre des pages rapides, des formulaires fiables et des outils sur mesure." },
  { id: "automatisation", role: "CRM & automatisation", focus: "Qualifier et relancer", description: "Relie formulaires, CRM, calendrier et relances pour qu'aucun prospect ne se perde." },
  { id: "commercial", role: "Relation commerciale", focus: "Rendez-vous et vente", description: "Rappelle les demandes, ecoute la situation et oriente vers la bonne solution." },
];
