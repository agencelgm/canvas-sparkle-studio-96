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

      {/* Bronze gradient orbs */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      {/* Decorative floating shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-bronze/20 rounded-full" />
      <div className="absolute top-40 left-20 w-16 h-16 border border-bronze/10 rounded-full" />
      <div className="absolute bottom-32 right-20 w-24 h-24 border border-bronze/15 rounded-full" />
      
      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
            Notre promesse
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
            Une approche structurée,{" "}
            <span className="italic text-bronze">orientée business</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nous n'intervenons pas sur des actions isolées. 
            Nous structurons un système de croissance pilotable.
          </p>
        </div>

        {/* Promise cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <div 
              key={index}
              className="group relative p-8 md:p-10 bg-secondary/30 border border-border rounded-lg hover:border-bronze/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-bronze/10 flex items-center justify-center mb-6 group-hover:bg-bronze/20 transition-colors">
                <promise.icon className="w-6 h-6 text-bronze" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl md:text-2xl font-medium mb-4">
                {promise.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {promise.description}
              </p>

              {/* Decorative number */}
              <span className="absolute top-6 right-8 font-serif text-6xl font-medium text-bronze/10">
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
