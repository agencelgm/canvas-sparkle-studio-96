import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { publicServices } from "@/data/publicContent";
import { serviceSystemRoles, systemSteps } from "@/data/systemContent";
import { Arrow, EASE } from "@/components/public/PublicPrimitives";

const stepLabel = (ids: string[]) =>
  ids.map((id) => systemSteps.find((s) => s.id === id)?.title).filter(Boolean).join(" · ");

const items = serviceSystemRoles
  .map((role) => ({ role, service: publicServices.find((s) => s.slug === role.slug) }))
  .filter((x): x is { role: (typeof serviceSystemRoles)[number]; service: (typeof publicServices)[number] } => Boolean(x.service));

const groups = [
  { label: "Les etapes du parcours", items: items.filter((x) => x.role.role === "etape") },
  { label: "Soutiens transversaux", items: items.filter((x) => x.role.role === "soutien") },
];

/** Liste de services + panneau contextuel (survol ET focus clavier). Accordeon au toucher. */
const ServiceExplorer = () => {
  const [active, setActive] = useState(items[0].service.slug);
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = items.find((x) => x.service.slug === active) ?? items[0];
  let counter = 0;

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {groups.map((g) => (
            <div key={g.label} className="mb-10">
              <p className="section-kicker">{g.label}</p>
              <ul className="border-t border-[#f0d99626]">
                {g.items.map(({ service, role }) => {
                  counter += 1;
                  return (
                    <li key={service.slug}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="numbered-row"
                        data-active={active === service.slug}
                        onMouseEnter={() => setActive(service.slug)}
                        onFocus={() => setActive(service.slug)}
                        aria-describedby="service-panel"
                      >
                        <span className="row-num">{String(counter).padStart(2, "0")}</span>
                        <span>
                          <span className="row-title block">{service.title}</span>
                          <span className="mt-1 block text-xs font-semibold text-platinum/50">
                            {role.role === "soutien" ? "Soutien transversal" : stepLabel(role.steps)}
                          </span>
                        </span>
                        <Arrow className="text-cobalt-light" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <div className="sticky top-28">
            <div id="service-panel" className="context-panel" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.service.slug}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <img src={current.role.image} alt="" className="aspect-[16/10] w-full object-cover" />
                  <div className="p-7">
                    <p className="section-kicker mb-2">{current.service.kicker}</p>
                    <p className="font-display text-4xl font-bold uppercase leading-none text-platinum">{current.service.title}</p>
                    <p className="mt-4 text-lg font-semibold leading-snug text-platinum">{current.role.benefit}</p>
                    <p className="public-body mt-3">
                      <strong className="text-cobalt-light">Role dans le systeme : </strong>
                      {current.role.roleText}
                    </p>
                    <Link to={`/services/${current.service.slug}`} className="btn-cobalt mt-6">
                      Voir le service {current.service.title}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tactile : accordeon */}
      <div className="lg:hidden">
        {groups.map((g) => (
          <div key={g.label} className="mb-8">
            <p className="section-kicker">{g.label}</p>
            <ul className="border-t border-[#f0d99626]">
              {g.items.map(({ service, role }) => {
                const isOpen = open === service.slug;
                const panelId = `svc-${service.slug}`;
                return (
                  <li key={service.slug} className="border-b border-[#f0d99626]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-4 text-left text-platinum"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : service.slug)}
                    >
                      <span className="font-display text-2xl font-bold uppercase leading-none">{service.title}</span>
                      <span aria-hidden="true" className="text-2xl text-cobalt-light">{isOpen ? "−" : "+"}</span>
                    </button>
                    <div id={panelId} hidden={!isOpen} className="pb-5">
                      <img src={role.image} alt="" loading="lazy" className="aspect-[16/9] w-full rounded-lg object-cover" />
                      <p className="mt-4 font-semibold text-platinum">{role.benefit}</p>
                      <p className="public-body mt-2">{role.roleText}</p>
                      <Link to={`/services/${service.slug}`} className="public-text-link mt-4">
                        Voir le service {service.title} <Arrow />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceExplorer;
