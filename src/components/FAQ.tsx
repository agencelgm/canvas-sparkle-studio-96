import { useState } from "react";
import { motion } from "framer-motion";
import { EASE, Reveal } from "@/components/public/PublicPrimitives";

export const faqItems = [
  {
    question: "Combien de temps avant de voir les premiers resultats ?",
    answer: "Les premiers signaux apparaissent souvent entre 3 et 6 semaines selon les canaux actives. Les resultats durables se consolident plutot entre 60 et 90 jours, avec un suivi hebdomadaire clair.",
  },
  {
    question: "Quelle est la methode ACF de LGM ?",
    answer: "ACF signifie Acquisition, Conversion, Fidelisation. Nous traitons ces leviers comme un systeme unique : attirer sans convertir coute cher, convertir sans fideliser limite la croissance.",
  },
  {
    question: "Travaillez-vous avec toutes les tailles d'entreprises ?",
    answer: "Nous accompagnons surtout des PME et entreprises en croissance qui ont deja une offre validee et veulent structurer leur acquisition commerciale.",
  },
  {
    question: "Quel budget minimum prevoir ?",
    answer: "Les accompagnements demarrent generalement autour de 300 000 FCFA par mois pour un levier, et augmentent selon le marche, les canaux et le niveau d'execution attendu.",
  },
  {
    question: "Etes-vous uniquement bases a Abidjan ?",
    answer: "Notre base est a Abidjan, mais nous accompagnons aussi des entreprises au Senegal, au Cameroun et dans d'autres marches francophones d'Afrique de l'Ouest.",
  },
  {
    question: "Que comprend le suivi hebdomadaire ?",
    answer: "Vous recevez les metriques cles, les actions menees, les arbitrages proposes et les priorites de la semaine suivante. L'objectif est de garder une lecture nette de ce qui avance.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-ivory section-pad-tight overflow-hidden">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.72fr_1fr]">
        <Reveal>
          <p className="section-kicker text-[#8b6914]">Questions</p>
          <h2 className="public-h2 max-w-2xl text-ivory-text">Ce que les dirigeants demandent avant de signer.</h2>
        </Reveal>
        <div className="border-t border-[rgba(26,21,16,0.16)]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 0.04}>
                <div className="border-b border-[rgba(26,21,16,0.13)]">
                  <button
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="public-h3 text-[clamp(1.15rem,2vw,1.8rem)] text-ivory-text">{item.question}</span>
                    <motion.span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#8b691444] text-[#8b6914]"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.36, ease: EASE }}
                    className="overflow-hidden"
                    aria-hidden={!isOpen}
                  >
                    <p className="public-body max-w-3xl pb-6 text-ivory-muted">{item.answer}</p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
