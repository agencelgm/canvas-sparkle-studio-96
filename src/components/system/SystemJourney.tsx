import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { measureLoop, systemSteps } from "@/data/systemContent";
import { publicServices } from "@/data/publicContent";
import { EASE } from "@/components/public/PublicPrimitives";

const serviceTitle = (slug: string) => publicServices.find((s) => s.slug === slug)?.title ?? slug;

/**
 * Parcours en six etapes. Desktop : la colonne de texte defile et active
 * l'etape visible dans le panneau collant. Mobile : chaque etape est
 * entierement lisible, sans dependre du scroll.
 */
const SystemJourney = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const step = systemSteps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
      <ol className="relative">
        <span aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 hidden w-px bg-[#f0d99633] lg:block" />
        {systemSteps.map((s, i) => (
          <li
            key={s.id}
            id={s.id}
            ref={(el) => (refs.current[i] = el)}
            data-index={i}
            className="relative scroll-mt-32 border-b border-[#f0d9961f] py-10 lg:flex lg:min-h-[62vh] lg:items-center lg:border-0 lg:py-0 lg:pl-16"
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border font-display text-lg font-bold transition-colors duration-300 lg:flex ${active === i ? "border-cobalt-light bg-cobalt-light text-charcoal" : "border-[#f0d99640] bg-charcoal text-cobalt-light"}`}
            >
              {s.number}
            </span>
            <div className={`transition-opacity duration-300 ${active === i ? "lg:opacity-100" : "lg:opacity-45"}`}>
              <p className="section-kicker lg:hidden">Etape {s.number}</p>
              <h3 className="public-h2">{s.title}</h3>
              <p className="mt-3 font-display text-2xl font-semibold uppercase text-cobalt-light">{s.question}</p>
              <p className="public-lead">{s.description}</p>
              <div className="tag-list mt-5">
                {s.tools.map((t) => <span key={t}>{t}</span>)}
              </div>
              <p className="mt-5 text-sm font-semibold text-platinum/70">
                Indicateur suivi : <strong className="text-platinum">{s.metric}</strong>
              </p>
              <p className="mt-2 text-sm text-platinum/70">
                Services lies :{" "}
                {s.services.map((slug, k) => (
                  <span key={slug}>
                    <Link to={`/services/${slug}`} className="font-semibold text-cobalt-light underline">{serviceTitle(slug)}</Link>
                    {k < s.services.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <img src={s.image} alt={s.imageAlt} loading="lazy" className="mt-6 aspect-[16/10] w-full rounded-lg object-cover lg:hidden" />
              {i < systemSteps.length - 1 && (
                <p className="mt-6 text-sm font-bold text-platinum/60 lg:hidden" aria-hidden="true">↓ {systemSteps[i + 1].title}</p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="context-panel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.id}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <img src={step.image} alt={step.imageAlt} className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <p className="section-kicker mb-1">Etape {step.number} sur 06</p>
                  <p className="font-display text-4xl font-bold uppercase leading-none text-platinum">{step.title}</p>
                  <p className="mt-2 text-sm text-platinum/70">{step.short}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-1.5 px-6 pb-6" aria-hidden="true">
              {systemSteps.map((s, i) => (
                <span key={s.id} className={`h-1 flex-1 rounded-full ${i <= active ? "bg-cobalt-light" : "bg-[#f0d99626]"}`} />
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-[#f0d99659] p-4 text-sm text-platinum/70">
            <strong className="text-platinum">{measureLoop.title}</strong> — boucle permanente sur les six etapes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemJourney;
