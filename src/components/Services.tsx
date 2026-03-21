import { Users, Search, Globe, Database, Mail, Share2 } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Génération de leads qualifiés",
      description: "Attirez des prospects qualifiés grâce à des campagnes ciblées et efficaces.",
    },
    {
      icon: Search,
      title: "SEO & SEO local à Abidjan",
      description: "Dominez le marché d'Abidjan et améliorez votre visibilité en ligne.",
    },
    {
      icon: Globe,
      title: "Développement web & sites conversion",
      description: "Transformez votre présence en ligne avec un site web sur mesure.",
    },
    {
      icon: Database,
      title: "Automatisation d'entreprise grâce à l'IA",
      description: "Boostez votre efficacité avec des technologies avancées.",
    },
    {
      icon: Mail,
      title: "Publicités payantes & digitales",
      description: "Maximisez votre ROI avec des campagnes Google, Facebook et Instagram.",
    },
    {
      icon: Share2,
      title: "Réseaux sociaux orientés business",
      description: "Construisez une communauté engagée et renforcez votre marque.",
    },
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-10">
        <HexagonPattern />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      {/* Bronze gradient orbs - hidden on mobile */}
      <div className="hidden sm:block absolute top-20 right-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-radial from-bronze/12 via-bronze/4 to-transparent rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 left-20 w-48 md:w-72 h-48 md:h-72 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--bronze)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--bronze)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-2">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-4 sm:mb-6">
            Nos expertises
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 sm:mb-6">
            Expertises intégrées <span className="italic text-bronze">au système</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Ces expertises ne sont jamais utilisées isolément. Elles font partie d'un système cohérent.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 sm:gap-4 lg:gap-5 p-4 sm:p-5 lg:p-6 bg-secondary/30 border border-border rounded-lg hover:border-bronze/30 hover:bg-secondary/50 backdrop-blur-sm transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-bronze/10 flex items-center justify-center group-hover:bg-bronze/20 transition-colors">
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-bronze" />
              </div>
              <span className="font-medium text-sm sm:text-base text-foreground">{service.title}</span>
            </div>
          ))}
        </div>

        {/* Emphasis note */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground italic">Ces services ne sont jamais activés isolément.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
