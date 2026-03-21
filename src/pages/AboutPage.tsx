import PageLayout from "@/components/layout/PageLayout";
import { Target, Users, Lightbulb, Award, TrendingUp, Heart } from "lucide-react";
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

const AboutPage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>À propos | LGM - Les Gens du Marketing</title>
        <meta name="description" content="Découvrez LGM, votre partenaire stratégique en marketing digital à Abidjan. Une équipe passionnée dédiée à la croissance de votre entreprise." />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <HexagonPattern />
        </div>
        
        {/* Bronze gradient orb */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-bronze/20 to-bronze-dark/10 rounded-full blur-3xl hidden md:block" />
        
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-bronze text-sm font-medium tracking-wider uppercase mb-4 animate-fade-up">
              À propos de nous
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6 animate-fade-up animation-delay-100">
              Les Gens du <span className="text-gradient-bronze">Marketing</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up animation-delay-200">
              Nous sommes une agence de marketing stratégique basée à Abidjan, 
              dédiée à transformer vos ambitions en résultats concrets et mesurables.
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
                Notre histoire
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fondée avec la vision de révolutionner le marketing digital en Afrique de l'Ouest, 
                  LGM est née d'une frustration : trop d'entreprises investissent dans le marketing 
                  sans voir de retour concret.
                </p>
                <p>
                  Notre approche est différente. Nous ne vendons pas des "likes" ou des "impressions". 
                  Nous construisons des systèmes d'acquisition qui génèrent des leads qualifiés et 
                  des clients réels.
                </p>
                <p>
                  Aujourd'hui, nous accompagnons des PME, des startups et des grandes entreprises 
                  dans leur croissance, avec une seule obsession : le ROI.
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

      {/* Values Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <HexagonPattern />
        </div>
        
        <div className="container-wide relative z-10">
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
      <section className="section-padding bg-card/50">
        <div className="container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Prêt à travailler ensemble ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Discutons de vos objectifs et voyons comment nous pouvons vous aider à les atteindre.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-bronze hover:bg-bronze-dark text-background font-medium rounded-md transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
