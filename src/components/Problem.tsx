import { X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const Problem = () => {
  const problems = [
    "des actions marketing",
    "des prestataires",
    "des outils"
  ];

  const results = [
    "des décisions prises à l'aveugle",
    "des performances irrégulières",
    "une dépendance permanente au prochain \"test marketing\""
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-narrow">
        {/* Section intro */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
            Le constat
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Le problème n'est pas l'effort.<br />
            <span className="text-muted-foreground">C'est l'absence de structure.</span>
          </h2>
        </AnimatedSection>

        {/* Problem grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* What companies accumulate */}
          <AnimatedSection variant="slideLeft" delay={0.1} className="space-y-6">
            <p className="text-lg text-foreground font-medium">
              La majorité des entreprises accumulent :
            </p>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-4 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-medium text-foreground">{index + 1}</span>
                  </span>
                  {problem}
                </motion.li>
              ))}
            </ul>
            <p className="text-muted-foreground italic pt-2">
              Sans jamais construire un système cohérent.
            </p>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection variant="slideRight" delay={0.2} className="space-y-6">
            <p className="text-lg text-foreground font-medium">
              Résultat :
            </p>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-4 text-muted-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </span>
                  {result}
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        {/* Divider with emphasis */}
        <AnimatedSection delay={0.4} className="mt-16 pt-16 border-t border-border text-center">
          <p className="font-serif text-2xl md:text-3xl text-foreground italic">
            "Le problème n'est pas l'effort.{" "}
            <span className="text-bronze">Le problème est l'absence de structure.</span>"
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Problem;
