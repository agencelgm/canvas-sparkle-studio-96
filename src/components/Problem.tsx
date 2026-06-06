import { motion } from "framer-motion";

const PROBLEMS = [
  "Des décisions prises à l'aveugle",
  "Des performances irrégulières",
  "Une dépendance permanente au prochain « test marketing »",
];

const Problem = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.2) 50%, transparent 100%)" }} />

      <div className="container-narrow relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            className="pill-gold mb-8 inline-flex"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-2 self-center" style={{ background: "#C9A227" }} />
            Le constat
          </motion.p>

          {/* Headline */}
          <motion.h2
            className="font-serif text-foreground mb-8"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            Le problème n'est pas l'effort.{" "}
            <span className="text-muted-foreground">C'est l'absence de structure.</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            className="text-muted-foreground font-sans leading-relaxed mb-10"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            La majorité des entreprises accumulent des actions marketing, des prestataires et des outils… sans jamais construire un système cohérent.
          </motion.p>

          {/* Problem list */}
          <div className="space-y-3">
            {PROBLEMS.map((problem, i) => (
              <motion.div
                key={problem}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="flex-shrink-0 mt-2 w-1 h-1 rounded-full"
                  style={{ background: "rgba(201,162,39,0.5)" }}
                />
                <span className="text-muted-foreground font-sans" style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)" }}>
                  {problem}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
