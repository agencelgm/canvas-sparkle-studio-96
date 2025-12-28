import { X } from "lucide-react";

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
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
            Le constat
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Le problème n'est pas l'effort.<br />
            <span className="text-muted-foreground">C'est l'absence de structure.</span>
          </h2>
        </div>

        {/* Problem grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* What companies accumulate */}
          <div className="space-y-6">
            <p className="text-lg text-foreground font-medium">
              La majorité des entreprises accumulent :
            </p>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-medium text-foreground">{index + 1}</span>
                  </span>
                  {problem}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground italic pt-2">
              Sans jamais construire un système cohérent.
            </p>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <p className="text-lg text-foreground font-medium">
              Résultat :
            </p>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li key={index} className="flex items-start gap-4 text-muted-foreground">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </span>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider with emphasis */}
        <div className="mt-16 pt-16 border-t border-border text-center">
          <p className="font-serif text-2xl md:text-3xl text-foreground italic">
            "Le problème n'est pas l'effort.{" "}
            <span className="text-bronze">Le problème est l'absence de structure.</span>"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
