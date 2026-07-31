import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CabinetQualificationForm from "@/components/CabinetQualificationForm";
import { siteContact } from "@/data/publicContent";

// Chiffres déjà publiés sur le site (SocialProof.tsx) — ne pas inventer de nouvelles statistiques.
const proofStats = [
  { value: "x7", label: "ROI moyen constaté chez les clients accompagnés plus de 6 mois" },
  { value: "90 j", label: "fenêtre moyenne pour voir les premiers résultats concrets" },
  { value: "12+", label: "secteurs suivis entre Abidjan, Dakar, Douala et Ouagadougou" },
];

const trustPoints = [
  {
    title: "Garantie écrite",
    body: "Les objectifs sont définis ensemble, par écrit, avant le lancement. S'ils ne sont pas atteints, les frais d'agence vous sont remboursés.",
  },
  {
    title: "Pensé pour les cabinets",
    body: "Crédibilité, conformité, clients à forte valeur : une approche adaptée aux cabinets comptables, pas une formule générique.",
  },
  {
    title: "Étude avant l'appel",
    body: "Votre situation est analysée par un membre de l'équipe avant votre rendez-vous — pas par un robot.",
  },
];

const nextSteps = [
  { step: "1", title: "Vous remplissez le formulaire", body: "2 minutes, quelques questions simples." },
  {
    step: "2",
    title: "Nous étudions votre situation",
    body: "Si nous pouvons vous aider, vous réservez un appel directement avec notre équipe.",
  },
  {
    step: "3",
    title: "Vous recevez un plan concret",
    body: "Objectifs, budget, leviers prioritaires pour attirer des clients à votre cabinet.",
  },
];

const scrollToForm = () => {
  document.getElementById("formulaire")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CabinetsComptablesPage = () => {
  const [formInView, setFormInView] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const form = document.getElementById("formulaire");
    const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting));
    if (form) observer.observe(form);
    const onScroll = () => setScrolled(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const showStickyCta = scrolled && !formInView;

  return (
    <div className="public-shell">
      <Helmet>
        <title>Marketing digital pour cabinets comptables à Abidjan | Agence LGM</title>
        <meta
          name="description"
          content="LGM aide les cabinets comptables à Abidjan à obtenir des clients qualifiés chaque mois, avec une garantie de résultats. Répondez à quelques questions pour voir si nous pouvons vous aider."
        />
      </Helmet>

      <header className="border-b border-[rgba(240,217,150,0.14)]">
        <div className="container-wide flex items-center justify-between py-4">
          <span className="font-display text-lg font-extrabold tracking-tight text-platinum">
            LGM<span className="text-[#f0d996]">.</span>
          </span>
          <span className="text-xs font-semibold text-platinum/60">Agence de marketing digital — Abidjan</span>
        </div>
      </header>

      <main className="public-main">
        <section className="section-charcoal">
          <div className="container-wide grid gap-12 py-10 md:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div>
              <p className="section-kicker !mb-3">Pour les cabinets comptables et experts-comptables à Abidjan</p>

              <h1 className="font-display text-[clamp(2rem,5.4vw,3.9rem)] font-extrabold leading-[1.04] text-[#f0d996] [text-wrap:balance]">
                De nouveaux clients pour votre cabinet chaque mois — ou nous vous remboursons les frais d'agence
              </h1>

              <button type="button" onClick={scrollToForm} className="btn-cobalt mt-6 w-full sm:w-auto lg:hidden">
                Remplir le formulaire — 2 minutes
              </button>

              <p className="public-lead text-platinum">
                LGM est la seule agence de marketing digital à Abidjan qui garantit ses résultats aux cabinets
                comptables. Concurrence accrue, honoraires négociés, saisonnalité fiscale : un cabinet ne peut plus
                dépendre uniquement du bouche-à-oreille.{" "}
                <strong className="font-bold text-platinum">
                  Les objectifs sont définis ensemble, par écrit, avant le lancement. S'ils ne sont pas atteints, nous
                  vous remboursons les frais d'agence.
                </strong>
              </p>

              <div className="metric-rail mt-10">
                {proofStats.map((stat) => (
                  <div key={stat.value}>
                    <p className="font-display text-2xl font-extrabold text-[#f0d996]">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-platinum/70">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {trustPoints.map((point) => (
                  <div key={point.title} className="rounded-md border border-[rgba(240,217,150,0.18)] p-4">
                    <p className="text-sm font-extrabold text-[#f0d996]">{point.title}</p>
                    <p className="mt-2 text-xs leading-5 text-platinum/70">{point.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="formulaire" className="scroll-mt-6">
              <div className="public-card p-5 md:p-7">
                <div className="mb-6 text-center">
                  <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-platinum md:text-2xl">
                    Formulaire d'application
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-platinum/70">
                    Répondez à quelques questions pour découvrir si nous sommes l'agence marketing qu'il vous faut.
                  </p>
                </div>
                <CabinetQualificationForm />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(240,217,150,0.14)] bg-[#09101d]">
          <div className="container-wide py-12 md:py-16">
            <p className="section-kicker">Ce qui se passe ensuite</p>
            <div className="grid gap-6 md:grid-cols-3">
              {nextSteps.map((item) => (
                <div key={item.step} className="rounded-md border border-[rgba(240,217,150,0.16)] p-5">
                  <span className="font-display text-2xl font-extrabold text-[#f0d996]">{item.step}</span>
                  <p className="mt-2 text-sm font-bold text-platinum">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-platinum/70">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgba(240,217,150,0.14)] bg-[#070b12]">
        <div className="container-wide flex flex-col items-center gap-2 py-6 pb-24 text-center text-xs font-semibold text-platinum/60 md:flex-row md:justify-between md:pb-6 md:text-left">
          <span>© {new Date().getFullYear()} Agence LGM — {siteContact.address}</span>
          <span>
            {siteContact.phoneDisplay} · {siteContact.email}
          </span>
        </div>
      </footer>

      {showStickyCta && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(240,217,150,0.24)] bg-[#070b12]/95 p-3 backdrop-blur lg:hidden">
          <button type="button" onClick={scrollToForm} className="btn-cobalt w-full">
            Remplir le formulaire — 2 minutes
          </button>
        </div>
      )}
    </div>
  );
};

export default CabinetsComptablesPage;
