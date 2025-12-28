import { Target, Gauge, LineChart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

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
    <section className="section-padding">
      <div className="container-wide">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
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
        </AnimatedSection>

        {/* Promise cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <motion.div 
              key={index}
              className="group relative p-8 md:p-10 bg-card border border-border rounded-lg hover:border-bronze/30 transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              <span className="absolute top-6 right-8 font-serif text-6xl font-medium text-border opacity-50">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promise;
