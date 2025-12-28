import HexagonPattern from "./HexagonPattern";

const Method = () => {
  const steps = [
    {
      number: "01",
      title: "Diagnostic",
      description: "Comprendre la situation réelle, sans biais ni suppositions."
    },
    {
      number: "02",
      title: "Structuration",
      description: "Aligner stratégie, marketing, vente et suivi."
    },
    {
      number: "03",
      title: "Implémentation",
      description: "Activer uniquement ce qui a un impact réel."
    },
    {
      number: "04",
      title: "Optimisation",
      description: "Mesurer, ajuster et décider en continu."
    }
  ];

  return (
    <section id="methode" className="section-padding relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-10">
        <HexagonPattern />
      </div>

      {/* Divider lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      {/* Bronze gradient orbs - smaller on mobile */}
      <div className="hidden sm:block absolute top-1/3 left-1/4 w-48 md:w-80 h-48 md:h-80 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-1/4 right-10 w-40 md:w-64 h-40 md:h-64 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      {/* Connected nodes background visual */}
      <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="currentColor" className="text-bronze" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Decorative connected line - hidden on mobile */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-2">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-4 sm:mb-6">
            Notre méthode
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Une méthodologie claire{" "}
            <span className="italic text-bronze">en 4 étapes</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group h-full"
            >
              {/* Connector line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-bronze/40 to-transparent z-0" />
              )}
              
              {/* Node dot */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-full w-3 h-3 rounded-full bg-bronze/50 z-10 -translate-x-1" />
              )}

              <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 lg:p-8 border border-border rounded-lg bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm transition-all duration-300 hover:border-bronze/30">
                {/* Step number */}
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-bronze mb-3 sm:mb-4 lg:mb-6 block">
                  {step.number}
                </span>

                {/* Content */}
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-medium mb-2 sm:mb-3 lg:mb-4">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed mt-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
