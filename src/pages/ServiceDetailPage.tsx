import PageLayout from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Users, Search, Megaphone, FileText, BarChart3, MessageCircle } from "lucide-react";
import HexagonPattern from "@/components/HexagonPattern";

const servicesData: Record<string, {
  icon: typeof Users;
  title: string;
  headline: string;
  description: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
}> = {
  "generation-leads": {
    icon: Users,
    title: "Génération de leads",
    headline: "Attirez des prospects qualifiés qui se transforment en clients",
    description: "Notre approche de génération de leads combine stratégies inbound et outbound pour attirer des prospects qualifiés et les convertir en clients. Nous créons des systèmes d'acquisition automatisés qui travaillent pour vous 24h/24.",
    benefits: [
      "Leads qualifiés et prêts à l'achat",
      "Réduction du coût par acquisition",
      "Processus de conversion optimisé",
      "Nurturing automatisé des prospects",
      "Suivi et reporting en temps réel",
      "Intégration avec votre CRM"
    ],
    process: [
      { step: 1, title: "Audit", description: "Analyse de votre marché et de vos personas cibles" },
      { step: 2, title: "Stratégie", description: "Définition des canaux et des messages clés" },
      { step: 3, title: "Exécution", description: "Création et lancement des campagnes" },
      { step: 4, title: "Optimisation", description: "Amélioration continue basée sur les données" }
    ]
  },
  "seo-local": {
    icon: Search,
    title: "SEO Local",
    headline: "Dominez les résultats de recherche dans votre zone",
    description: "Le SEO local est essentiel pour les entreprises qui servent une clientèle géographiquement définie. Nous optimisons votre présence en ligne pour que vous apparaissiez en premier lorsque vos clients potentiels recherchent vos services.",
    benefits: [
      "Visibilité accrue sur Google Maps",
      "Meilleur classement local",
      "Plus d'appels et de visites",
      "Gestion des avis clients",
      "Citations locales optimisées",
      "Contenu géolocalisé"
    ],
    process: [
      { step: 1, title: "Audit SEO", description: "Analyse de votre présence locale actuelle" },
      { step: 2, title: "Optimisation GMB", description: "Configuration et optimisation Google Business" },
      { step: 3, title: "Citations", description: "Création de citations locales cohérentes" },
      { step: 4, title: "Contenu", description: "Création de contenu local pertinent" }
    ]
  },
  "publicite-digitale": {
    icon: Megaphone,
    title: "Publicité Digitale",
    headline: "Maximisez votre ROI publicitaire",
    description: "Nos experts en publicité digitale créent et gèrent des campagnes performantes sur Google, Facebook, Instagram et autres plateformes. Chaque euro investi est optimisé pour générer le maximum de résultats.",
    benefits: [
      "Ciblage précis de votre audience",
      "Optimisation continue des campagnes",
      "Suivi des conversions en temps réel",
      "A/B testing systématique",
      "Retargeting intelligent",
      "Rapports de performance détaillés"
    ],
    process: [
      { step: 1, title: "Stratégie", description: "Définition des objectifs et du budget" },
      { step: 2, title: "Création", description: "Design des annonces et copywriting" },
      { step: 3, title: "Lancement", description: "Configuration et lancement des campagnes" },
      { step: 4, title: "Optimisation", description: "Ajustements basés sur les performances" }
    ]
  },
  "strategie-contenu": {
    icon: FileText,
    title: "Stratégie de contenu",
    headline: "Créez du contenu qui engage et convertit",
    description: "Le contenu est roi, mais seulement s'il est stratégique. Nous développons des stratégies de contenu qui positionnent votre marque comme référence dans votre secteur et génèrent des leads qualifiés.",
    benefits: [
      "Positionnement d'expert",
      "Trafic organique qualifié",
      "Engagement de l'audience",
      "Support à la vente",
      "SEO amélioré",
      "Fidélisation client"
    ],
    process: [
      { step: 1, title: "Audit", description: "Analyse de votre contenu existant" },
      { step: 2, title: "Stratégie", description: "Définition des piliers de contenu" },
      { step: 3, title: "Calendrier", description: "Planification éditoriale" },
      { step: 4, title: "Production", description: "Création et publication du contenu" }
    ]
  },
  "analytics-reporting": {
    icon: BarChart3,
    title: "Analytics & Reporting",
    headline: "Prenez des décisions basées sur les données",
    description: "Sans mesure, pas de progrès. Nous mettons en place des systèmes de tracking complets et créons des tableaux de bord personnalisés pour que vous puissiez suivre vos performances en temps réel.",
    benefits: [
      "Tableaux de bord personnalisés",
      "Suivi multi-canal",
      "Attribution marketing",
      "Alertes automatiques",
      "Rapports automatisés",
      "Insights actionnables"
    ],
    process: [
      { step: 1, title: "Audit", description: "Analyse de votre tracking actuel" },
      { step: 2, title: "Configuration", description: "Mise en place des outils de mesure" },
      { step: 3, title: "Dashboard", description: "Création de tableaux de bord" },
      { step: 4, title: "Formation", description: "Formation à l'utilisation des outils" }
    ]
  },
  "social-media": {
    icon: MessageCircle,
    title: "Social Media Management",
    headline: "Construisez une communauté engagée",
    description: "Les réseaux sociaux sont un canal puissant pour construire votre marque et engager votre audience. Nous gérons votre présence sociale pour créer une communauté fidèle autour de votre marque.",
    benefits: [
      "Présence cohérente sur les réseaux",
      "Contenu engageant et viral",
      "Community management réactif",
      "Croissance organique",
      "Partenariats influenceurs",
      "Reporting mensuel"
    ],
    process: [
      { step: 1, title: "Audit", description: "Analyse de votre présence sociale" },
      { step: 2, title: "Stratégie", description: "Définition de la ligne éditoriale" },
      { step: 3, title: "Contenu", description: "Création et planification du contenu" },
      { step: 4, title: "Community", description: "Animation et engagement quotidien" }
    ]
  }
};

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <PageLayout>
        <div className="section-padding container-narrow text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Service non trouvé</h1>
          <Link to="/services" className="text-bronze hover:underline">
            Retour aux services
          </Link>
        </div>
      </PageLayout>
    );
  }

  const IconComponent = service.icon;

  return (
    <PageLayout>
      <Helmet>
        <title>{service.title} | LGM - Les Gens du Marketing</title>
        <meta name="description" content={service.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <HexagonPattern />
        </div>
        
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-bronze/20 to-bronze-dark/10 rounded-full blur-3xl hidden md:block" />
        
        <div className="container-narrow relative z-10">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les services
          </Link>

          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-lg bg-bronze/10 flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-8 h-8 text-bronze" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                {service.headline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section-padding bg-card/50">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Pourquoi ce service ?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Bénéfices
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-bronze mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground text-center mb-12">
            Notre processus
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-5xl font-serif font-bold text-bronze/20 mb-2">
                  {String(step.step).padStart(2, '0')}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card/50">
        <div className="container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Discutons de vos objectifs et voyons comment nous pouvons vous aider.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-bronze hover:bg-bronze-dark text-background font-medium rounded-md transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetailPage;
