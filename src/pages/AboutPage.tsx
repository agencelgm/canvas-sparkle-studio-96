import PageLayout from "@/components/layout/PageLayout";
import { Target, TrendingUp, Heart, MessageSquare, BarChart3 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import HexagonPattern from "@/components/HexagonPattern";

const values = [
  {
    icon: Target,
    title: "Transparence Totale",
    description: "Nous vous tenons informés des moindres détails de votre campagne marketing, des stratégies employées aux résultats obtenus. Nous partageons avec vous toutes les données et analyses."
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Nous proposons un modèle basé sur la performance. Si les objectifs convenus ne sont pas atteints, nous vous remboursons les frais d'agence. Notre agence travaille en harmonie avec vos objectifs."
  },
  {
    icon: Heart,
    title: "Approche Personnalisée",
    description: "Chaque entreprise à Abidjan est unique. Nous concevons des stratégies sur mesure, de la page de lead aux campagnes publicitaires, pour générer des leads de qualité de manière durable."
  }
];

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Obtenez une consultation gratuite",
    description: "Commencez votre voyage vers le succès en marketing digital en remplissant simplement notre formulaire. Lors de cette rencontre, nous discuterons de vos objectifs, analyserons vos besoins et proposerons des stratégies adaptées."
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Observez les résultats",
    description: "Une fois votre stratégie en place, notre société de marketing digital se charge de tout — des campagnes publicitaires à l'optimisation continue. Vous verrez l'impact à travers l'augmentation de votre visibilité et une croissance significative de vos conversions."
  }
];

const AboutPage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>À propos | LGM - Société de Marketing Digital à Abidjan</title>
        <meta name="description" content="Découvrez pourquoi LGM est la société de marketing digital de référence à Abidjan. De la stratégie aux résultats concrets : prospects qualifiés et croissance mesurable." />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <HexagonPattern />
        </div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-bronze/20 to-bronze-dark/10 rounded-full blur-3xl hidden md:block" />
        
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-bronze text-sm font-medium tracking-wider uppercase mb-4 animate-fade-up">
              Société de Marketing Digital à Abidjan
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6 animate-fade-up animation-delay-100">
              Les Gens du <span className="text-gradient-bronze">Marketing</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up animation-delay-200">
              Découvrez pourquoi nous sommes la société de marketing digital de référence à Abidjan. 
              De la stratégie aux résultats concrets.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-card/50">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                Avec LGM, investissez dans le marketing digital en toute confiance
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous aidons les propriétaires d'entreprises ambitieux à obtenir plus de prospects qualifiés 
                  et à augmenter leur chiffre d'affaires, sans se ruiner, grâce à des stratégies de marketing 
                  digital éprouvées.
                </p>
                <p>
                  Chez LGM, nous combinons expertise locale et approches globales pour offrir des solutions 
                  de marketing digital sur mesure. En tant que société leader en marketing digital à Abidjan, 
                  nous nous engageons à transformer votre présence en ligne avec des stratégies innovantes 
                  et des résultats mesurables.
                </p>
                <p>
                  Aujourd'hui, nous accompagnons des PME, des startups et des grandes entreprises 
                  à Abidjan et en Côte d'Ivoire dans leur croissance, avec une seule obsession : 
                  des résultats concrets.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-bronze/20 to-bronze-dark/10 rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png" 
                  alt="LGM Logo" 
                  className="w-32 h-32 object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre approche Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <HexagonPattern />
        </div>
        
        <div className="container-wide relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <span className="inline-block text-bronze text-sm font-medium tracking-wider uppercase mb-4">
              Notre approche
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              Découvrez l'approche unique de notre entreprise de marketing digital
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-card/50 border border-border/50 rounded-lg p-6 lg:p-8 hover:border-bronze/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-bronze/10 flex items-center justify-center group-hover:bg-bronze/20 transition-colors">
                    <step.icon className="w-6 h-6 text-bronze" />
                  </div>
                  <span className="font-serif text-3xl font-medium text-bronze">{step.number}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card/50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              Nos valeurs
            </h2>
            <p className="text-muted-foreground">
              Les principes qui guident chacune de nos actions et décisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-card/50 border border-border/50 rounded-lg p-6 hover:border-bronze/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-bronze/10 flex items-center justify-center mb-4 group-hover:bg-bronze/20 transition-colors">
                  <value.icon className="w-6 h-6 text-bronze" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Lancez votre success story avec LGM
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Remplissez le formulaire pour réserver un rendez-vous avec nos experts marketing.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-bronze hover:bg-bronze-dark text-background font-medium rounded-md transition-colors"
          >
            Réservez une consultation gratuite
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
