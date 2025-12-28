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
    <section id="methode" className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze-light border border-bronze-light/30 rounded-full mb-6">
            Notre méthode
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Une méthodologie claire{" "}
            <span className="italic text-bronze-light">en 4 étapes</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-bronze/40 to-transparent z-0" />
              )}

              <div className="relative z-10 p-8 border border-primary-foreground/10 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-all duration-300">
                {/* Step number */}
                <span className="font-serif text-5xl font-medium text-bronze mb-6 block">
                  {step.number}
                </span>

                {/* Content */}
                <h3 className="font-serif text-2xl font-medium mb-4">
                  {step.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
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
