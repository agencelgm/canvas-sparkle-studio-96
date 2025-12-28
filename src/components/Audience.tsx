import { Check, X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const Audience = () => {
  const forWho = [
    "Dirigeants impliqués dans les décisions",
    "Entreprises avec une ambition de croissance structurée",
    "Organisations prêtes à mesurer et ajuster"
  ];

  const notForWho = [
    "Recherche de solutions rapides",
    "Budgets marketing très faibles",
    "Refus de structurer un système"
  ];

  return (
    <section id="pour-qui" className="section-padding bg-card">
      <div className="container-wide">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
            Qualification
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Pour qui travaillons-nous ?
          </h2>
        </AnimatedSection>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* For who */}
          <motion.div 
            className="p-8 md:p-10 bg-background border border-border rounded-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-bronze/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-bronze" />
              </div>
              <h3 className="font-serif text-2xl font-medium">Pour vous si</h3>
            </div>
            <ul className="space-y-5">
              {forWho.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bronze/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-bronze" />
                  </span>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not for who */}
          <motion.div 
            className="p-8 md:p-10 bg-background border border-border rounded-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-serif text-2xl font-medium">Pas pour vous si</h3>
            </div>
            <ul className="space-y-5">
              {notForWho.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Audience;
