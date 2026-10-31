import {
  Building2, Factory, Store, Briefcase, HeartPulse, Shapes,
  Target, BarChart3, FileText, Megaphone, Ban,
  type LucideIcon,
} from "lucide-react";

export type Option = { value: string; label: string; hint?: string; icon?: LucideIcon };

export type QuestionStep = {
  id: "sector" | "objective" | "invested" | "pastBudget" | "minimum" | "budgetRange" | "revenue" | "decision";
  kicker: string;
  title: [string, string, string?]; // avant, mot cle, apres
  subtitle: string;
  layout: "tiles" | "rows" | "compact";
  options: Option[];
  info?: string;
};

const BUDGET_INFO =
  "Ce montant est celui que nous investissons en publicite sur Facebook, Google et Instagram pour vous. C'est lui qui genere vos prospects : plus de budget, plus de prospects, plus de chances de signer de nouveaux clients.";

export const PILOT_WARNING =
  "Avec ce budget, vous risquez de ne pas etre qualifie pour notre accompagnement complet. Nous pouvons vous proposer notre programme pilote : parlons-en pendant l'appel.";

export const questionSteps: QuestionStep[] = [
  {
    id: "sector",
    kicker: "Votre activite",
    title: ["Dans quel ", "secteur d'activite", " etes-vous ?"],
    subtitle: "Cela nous aide a adapter les prochaines questions a votre activite.",
    layout: "tiles",
    options: [
      { value: "btp", label: "Immobilier / BTP", icon: Building2 },
      { value: "industrie", label: "Industrie / Equipements", icon: Factory },
      { value: "commerce", label: "Commerce / Distribution", icon: Store },
      { value: "services", label: "Services B2B / Conseil", icon: Briefcase },
      { value: "sante", label: "Sante / Education", icon: HeartPulse },
      { value: "autre", label: "Autre secteur", icon: Shapes },
    ],
  },
  {
    id: "objective",
    kicker: "Vos objectifs",
    title: ["Quel est votre objectif principal dans les 90 ", "prochains jours", " ?"],
    subtitle: "Choisissez le resultat le plus important pour votre entreprise.",
    layout: "rows",
    options: [
      { value: "prospects", label: "Recevoir plus de prospects qualifies", hint: "Des contacts reellement interesses par vos offres.", icon: Target },
      { value: "ventes", label: "Augmenter mes ventes", hint: "Transformer plus de prospects en clients.", icon: BarChart3 },
      { value: "devis", label: "Obtenir plus de demandes de devis", hint: "Des demandes concretes, pretes a chiffrer.", icon: FileText },
      { value: "visibilite", label: "Developper ma visibilite en ligne", hint: "Etre plus present sur Google et les reseaux.", icon: Megaphone },
    ],
  },
  {
    id: "invested",
    kicker: "Votre experience",
    title: ["Avez-vous deja investi dans la ", "publicite en ligne", " ?"],
    subtitle: "Facebook, Google, Instagram, LinkedIn, TikTok…",
    layout: "rows",
    info: "Votre experience nous permet de mieux comprendre votre point de depart.",
    options: [
      { value: "oui", label: "Oui, j'ai deja investi", icon: Megaphone },
      { value: "non", label: "Non, jamais", icon: Ban },
    ],
  },
  {
    id: "pastBudget",
    kicker: "Votre historique",
    title: ["Quel etait votre ", "budget publicitaire", " mensuel moyen ?"],
    subtitle: "Montant verse aux plateformes (Facebook, Google…), hors honoraires d'agence.",
    layout: "compact",
    info: "Cette information nous aide a calibrer votre niveau d'investissement.",
    options: [
      { value: "moins_150k", label: "Moins de 150 000 FCFA" },
      { value: "150k_300k", label: "150 000 a 300 000 FCFA" },
      { value: "300k_600k", label: "300 000 a 600 000 FCFA" },
      { value: "plus_600k", label: "Plus de 600 000 FCFA" },
    ],
  },
  {
    id: "minimum",
    kicker: "Budget & engagement",
    title: ["Notre accompagnement demarre a ", "270 000 FCFA/mois", ". Est-ce envisageable ?"],
    subtitle: "Pour vous proposer un accompagnement adapte a vos moyens et a vos objectifs.",
    layout: "rows",
    info: BUDGET_INFO,
    options: [
      { value: "oui", label: "Oui", hint: "Je suis pret a investir des maintenant." },
      { value: "pas_encore", label: "Pas encore", hint: "Pas pour l'instant, mais j'y reflechis." },
      { value: "discuter", label: "J'ai besoin d'en discuter", hint: "Je dois en parler avec un associe ou un decideur." },
    ],
  },
  {
    id: "budgetRange",
    kicker: "Votre budget",
    title: ["Quel ", "budget mensuel", " pouvez-vous consacrer a votre acquisition ?"],
    subtitle: "Choisissez la tranche la plus proche de vos moyens actuels.",
    layout: "compact",
    info: BUDGET_INFO,
    options: [
      { value: "moins_100k", label: "Moins de 100 000 FCFA" },
      { value: "100k_200k", label: "100 000 a 200 000 FCFA" },
      { value: "200k_270k", label: "200 000 a 270 000 FCFA" },
      { value: "plus_270k", label: "270 000 FCFA ou plus" },
    ],
  },
  {
    id: "revenue",
    kicker: "Votre entreprise",
    title: ["Quel est votre ", "chiffre d'affaires", " mensuel approximatif ?"],
    subtitle: "Une estimation suffit. Vos reponses restent confidentielles.",
    layout: "compact",
    options: [
      { value: "moins_1m", label: "Moins de 1 million FCFA" },
      { value: "1m_5m", label: "1 a 5 millions FCFA" },
      { value: "5m_20m", label: "5 a 20 millions FCFA" },
      { value: "plus_20m", label: "Plus de 20 millions FCFA" },
    ],
  },
  {
    id: "decision",
    kicker: "Prise de decision",
    title: ["Qui prend la ", "decision", " d'investir ?"],
    subtitle: "Pour savoir qui inviter a l'appel strategique.",
    layout: "rows",
    options: [
      { value: "moi", label: "C'est moi qui decide", hint: "Je valide seul les investissements marketing." },
      { value: "associe", label: "Je decide avec un associe", hint: "Nous validons a deux." },
      { value: "autre", label: "Quelqu'un d'autre decide", hint: "Je prepare le dossier pour un decideur." },
    ],
  },
];

export const decisionBlocker: Record<string, string> = {
  associe: "La decision doit etre validee avec un associe.",
  autre: "La decision revient a une autre personne.",
};

export const optionLabel = (stepId: string, value?: string) =>
  questionSteps.find((s) => s.id === stepId)?.options.find((o) => o.value === value)?.label ?? value ?? "";
