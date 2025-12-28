import PageLayout from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Search, Megaphone, FileText, BarChart3, MessageCircle } from "lucide-react";
import HexagonPattern from "@/components/HexagonPattern";

const services = [
  {
    icon: Users,
    title: "Génération de leads",
    slug: "generation-leads",
    description: "Attirez des prospects qualifiés grâce à des stratégies ciblées et des campagnes optimisées pour la conversion.",
    features: ["Landing pages optimisées", "Campagnes publicitaires ciblées", "Lead magnets stratégiques", "Nurturing automatisé"]
  },
  {
    icon: Search,
    title: "SEO Local",
    slug: "seo-local",
    description: "Dominez les résultats de recherche locaux et attirez des clients de votre zone géographique.",
    features: ["Optimisation Google Business", "Citations locales", "Avis clients", "Contenu géolocalisé"]
  },
  {
    icon: Megaphone,
    title: "Publicité Digitale",
    slug: "publicite-digitale",
    description: "Maximisez votre ROI avec des campagnes publicitaires ciblées sur Google, Facebook et Instagram.",
    features: ["Google Ads", "Facebook & Instagram Ads", "Retargeting", "A/B Testing"]
  },
  {
    icon: FileText,
    title: "Stratégie de contenu",
    slug: "strategie-contenu",
    description: "Créez du contenu qui engage, éduque et convertit votre audience en clients fidèles.",
    features: ["Calendrier éditorial", "Rédaction SEO", "Content marketing", "Storytelling de marque"]
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    slug: "analytics-reporting",
    description: "Prenez des décisions éclairées grâce à des tableaux de bord clairs et des analyses approfondies.",
    features: ["Tableaux de bord personnalisés", "Suivi des conversions", "Attribution marketing", "Rapports mensuels"]
  },
  {
    icon: MessageCircle,
    title: "Social Media Management",
    slug: "social-media",
    description: "Construisez une communauté engagée et renforcez votre présence sur les réseaux sociaux.",
    features: ["Stratégie social media", "Création de contenu", "Community management", "Influence marketing"]
  }
];

const ServicesPage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Nos Services | LGM - Les Gens du Marketing</title>
        <meta name="description" content="Découvrez nos services de marketing digital : génération de leads, SEO local, publicité digitale, stratégie de contenu et plus encore." />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <HexagonPattern />
        </div>
        
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-bronze/20 to-bronze-dark/10 rounded-full blur-3xl hidden md:block" />
        
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-bronze text-sm font-medium tracking-wider uppercase mb-4 animate-fade-up">
              Nos services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6 animate-fade-up animation-delay-100">
              Des solutions <span className="text-gradient-bronze">sur mesure</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up animation-delay-200">
              Chaque entreprise est unique. Nous adaptons nos services à vos objectifs 
              pour maximiser votre retour sur investissement.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-card/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Link 
                key={index}
                to={`/services/${service.slug}`}
                className="group bg-card border border-border/50 rounded-lg p-6 lg:p-8 hover:border-bronze/50 transition-all duration-300 hover:shadow-lg hover:shadow-bronze/5"
              >
                <div className="w-14 h-14 rounded-lg bg-bronze/10 flex items-center justify-center mb-6 group-hover:bg-bronze/20 transition-colors">
                  <service.icon className="w-7 h-7 text-bronze" />
                </div>
                
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-3">
                  {service.title}
                </h2>
                
                <p className="text-sm text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-bronze rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center gap-2 text-bronze text-sm font-medium group-hover:gap-3 transition-all">
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Besoin d'un service personnalisé ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Chaque projet est unique. Contactez-nous pour discuter de vos besoins spécifiques.
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

export default ServicesPage;
