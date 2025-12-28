import { Target, Gauge, LineChart } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const Promise = () => {
  const promises = [
    {
      icon: Target,
      title: "Clarté stratégique",
      description: "Avant toute action, nous clarifions ce qui doit réellement être fait — et ce qui doit être ignoré."
    },
    {
      icon: Gauge,
      title: "Système pilotable",
      description: "Chaque levier est mesuré, suivi et intégré dans un ensemble cohérent."
    },
    {
      icon: LineChart,
      title: "Résultats mesurables",
      description: "Les décisions sont prises à partir de données réelles, pas d'intuitions."
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-10">
        <HexagonPattern />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      {/* Bronze gradient orbs - smaller on mobile */}
      <div className="hidden sm:block absolute top-1/4 right-10 w-48 md:w-72 h-48 md:h-72 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-1/4 left-10 w-40 md:w-64 h-40 md:h-64 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      {/* Decorative floating shapes - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-24 lg:w-32 h-24 lg:h-32 border border-bronze/20 rounded-full" />
      <div className="hidden lg:block absolute top-40 left-20 w-16 h-16 border border-bronze/10 rounded-full" />
      <div className="hidden md:block absolute bottom-32 right-20 w-20 lg:w-24 h-20 lg:h-24 border border-bronze/15 rounded-full" />
      
      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-2">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-4 sm:mb-6">
            Notre promesse
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 sm:mb-6">
            Une approche structurée,{" "}
            <span className="italic text-bronze">orientée business</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Nous n'intervenons pas sur des actions isolées. 
            Nous structurons un système de croissance pilotable.
          </p>
        </div>

        {/* Promise cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {promises.map((promise, index) => (
            <div 
              key={index}
              className="group relative p-6 sm:p-8 md:p-10 bg-secondary/30 border border-border rounded-lg hover:border-bronze/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-bronze/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-bronze/20 transition-colors">
                <promise.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-bronze" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4">
                {promise.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {promise.description}
              </p>

              {/* Decorative number - hidden on small screens */}
              <span className="hidden sm:block absolute top-4 sm:top-6 right-6 sm:right-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-bronze/10">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promise;
