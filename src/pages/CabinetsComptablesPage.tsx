import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CabinetQualificationForm from "@/components/CabinetQualificationForm";
import { siteContact } from "@/data/publicContent";

// Chiffres déjà publiés sur le site (SocialProof.tsx) — ne pas inventer de nouvelles statistiques.
const proofStats = [
  { value: "x7", label: "ROI moyen constaté chez les clients accompagnés plus de 6 mois" },
  { value: "24 h", label: "pour étudier votre demande et vous répondre" },
  { value: "12+", label: "secteurs d'activité accompagnés à Abidjan" },
];

const cabinetFaqItems = [
  {
    question: "Que fait exactement LGM pour un cabinet comptable ?",
    answer:
      "Une seule chose : faire en sorte que votre téléphone sonne. Nous créons des opportunités de vente pour votre cabinet — des prospects qualifiés à qui vous pouvez proposer vos services. Tout ce que nous mettons en place sert cet unique objectif.",
  },
  {
    question: "Quels outils utilisez-vous pour générer ces prospects ?",
    answer:
      "Publicité Facebook, création de sites internet, SEO, email marketing, systèmes d'intelligence artificielle et automatisations avec des agents IA. Les outils changent selon votre situation — l'objectif, lui, ne change pas : vous apporter des prospects.",
  },
  {
    question: "Comment choisissez-vous les outils adaptés à mon cabinet ?",
    answer:
      "C'est justement le but de l'appel. Nous analysons votre situation, votre façon actuelle de trouver des clients et vos objectifs, puis nous vous présentons un plan marketing qui montre exactement ce que nous ferons — et avec quels outils.",
  },
  {
    question: "Est-ce que je dois me déplacer ?",
    answer:
      "Non. Tout se fait en ligne : le rendez-vous se fait depuis votre bureau ou votre domicile, et le suivi à distance.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "Notre accompagnement complet démarre à 405 000 FCFA par mois — campagnes publicitaires, site, SEO et suivi inclus. Le montant exact dépend des leviers activés ; il est précisé dans le plan marketing présenté lors de l'appel.",
  },
  {
    question: "Que se passe-t-il après avoir rempli le formulaire ?",
    answer:
      "Vous recevez une réponse sur l'éligibilité de votre cabinet. Si c'est positif, vous réservez un rendez-vous en ligne avec un membre de l'équipe. Nous vous contactons du lundi au vendredi, de 9h à 17h.",
  },
];

const cabinetFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cabinetFaqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const processSteps = [
  {
    step: "1",
    title: "Remplissez le formulaire",
    body: "Vous recevez une réponse : votre cabinet est éligible ou non.",
  },
  {
    step: "2",
    title: "Réservez un rendez-vous en ligne",
    body: "Pas besoin de vous déplacer : l'appel se fait depuis votre bureau ou votre domicile.",
  },
  {
    step: "3",
    title: "On échange sur votre situation",
    body: "Nous approfondissons vos objectifs et votre façon actuelle de trouver des clients.",
  },
  {
    step: "4",
    title: "Vous recevez un plan marketing",
    body: "Si nous pouvons vous aider : un plan qui montre exactement ce que nous ferons pour attirer plus de prospects et développer votre cabinet.",
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
          content="LGM aide les cabinets comptables à Abidjan à obtenir des prospects qualifiés chaque mois, avec une garantie de résultats. Répondez à quelques questions pour voir si nous pouvons vous aider."
        />
        <script type="application/ld+json">{JSON.stringify(cabinetFaqSchema)}</script>
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
                Des prospects qualifiés pour votre cabinet chaque jour — ou nous vous remboursons les frais d'agence
              </h1>

              <button type="button" onClick={scrollToForm} className="btn-cobalt mt-6 w-full sm:w-auto lg:hidden">
                Remplir le formulaire — 2 minutes
              </button>

              <div className="public-lead space-y-3 text-platinum">
                <p>La plupart des cabinets dépendent encore du bouche-à-oreille et des références.</p>
                <p>
                  Résultat ? <strong className="font-bold">Un chiffre d'affaires irrégulier, difficile à prévoir.</strong>
                </p>
                <p>
                  Chez LGM, nous mettons en place un système qui vous apporte des prospects qualifiés chaque jour.
                </p>
              </div>

              <div className="metric-rail mt-10">
                {proofStats.map((stat) => (
                  <div key={stat.value}>
                    <p className="font-display text-2xl font-extrabold text-[#f0d996]">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-platinum/70">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="section-kicker">Comment ça marche</p>
                <div className="space-y-4">
                  {processSteps.map((item) => (
                    <div key={item.step} className="flex gap-4 rounded-md border border-[rgba(240,217,150,0.18)] p-4">
                      <span className="font-display text-xl font-extrabold text-[#f0d996]">{item.step}</span>
                      <div>
                        <p className="text-sm font-bold text-platinum">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-platinum/70">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
            <p className="section-kicker">Questions fréquentes</p>
            <h2 className="font-display text-2xl font-extrabold text-platinum md:text-3xl">
              Ce que vous devez savoir avant de nous contacter
            </h2>
            <div className="mt-8 grid max-w-3xl gap-6">
              {cabinetFaqItems.map((item) => (
                <article key={item.question} className="border-t border-[rgba(240,217,150,0.16)] pt-5">
                  <h3 className="text-base font-bold text-platinum md:text-lg">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-platinum/70">{item.answer}</p>
                </article>
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
