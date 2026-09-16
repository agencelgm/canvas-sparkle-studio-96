import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import LeadShell from "@/components/lead/LeadShell";
import GhlQualificationForm from "@/components/lead/GhlQualificationForm";

// Chiffres deja publies sur le site (SocialProof.tsx) — ne pas inventer de statistiques.
const proofStats = [
  { value: "x7", label: "ROI moyen constate chez les clients accompagnes plus de 6 mois" },
  { value: "24 h", label: "pour etudier votre demande et vous repondre" },
  { value: "12+", label: "secteurs d'activite accompagnes a Abidjan" },
];

const processSteps = [
  { step: "1", title: "Remplissez le formulaire", body: "Quelques questions sur votre activite, vos objectifs et votre budget publicitaire." },
  { step: "2", title: "Vous recevez une reponse immediate", body: "Soit votre entreprise est eligible a l'accompagnement, soit nous vous orientons vers notre formation." },
  { step: "3", title: "Vous reservez un appel", body: "45 minutes en ligne avec un membre de l'equipe, sans deplacement." },
  { step: "4", title: "Vous recevez un plan marketing", body: "Un plan concret qui montre les leviers que nous activerions pour vous apporter des prospects." },
];

const faqItems = [
  {
    question: "Que fait exactement LGM pour mon entreprise ?",
    answer:
      "Une seule chose : faire en sorte que votre telephone sonne. Nous creons des opportunites de vente — des prospects qualifies a qui vous pouvez proposer vos produits ou services. Publicite Facebook et Instagram, pages de vente, relances automatiques : tout sert cet objectif.",
  },
  {
    question: "Pourquoi un formulaire avant de parler a quelqu'un ?",
    answer:
      "Parce que nous ne pouvons pas aider tout le monde. Le formulaire nous permet de savoir en deux minutes si votre situation correspond a ce que nous faisons. Si oui, vous reservez un appel immediatement. Si non, vous recevez une alternative utile plutot qu'un silence.",
  },
  {
    question: "Faut-il un budget publicitaire minimum ?",
    answer:
      "Oui. Pour qu'une agence gere vos campagnes, il faut un budget publicitaire suffisant pour tester, apprendre et optimiser. En dessous de ce seuil, gerer vos publicites a votre place n'a pas de sens : nous vous proposons alors notre formation pour que vous appreniez a les gerer vous-meme.",
  },
  {
    question: "Est-ce que je dois me deplacer ?",
    answer:
      "Non. Tout se fait en ligne : le rendez-vous depuis votre bureau ou votre domicile, et le suivi a distance. Nous sommes bases a Abidjan et travaillons avec des entreprises partout en Cote d'Ivoire et en Afrique francophone.",
  },
  {
    question: "Combien de temps avant de voir des resultats ?",
    answer:
      "Les premieres demandes arrivent souvent dans les premiers jours d'une campagne. La phase d'optimisation, elle, prend generalement de 4 a 8 semaines : c'est le temps necessaire pour identifier les audiences, messages et offres les plus rentables.",
  },
  {
    question: "Que se passe-t-il apres avoir rempli le formulaire ?",
    answer:
      "Vous etes redirige vers la page correspondant a votre situation : reservation d'un appel si votre entreprise est eligible, ou presentation de notre formation publicite si votre budget actuel ne permet pas encore un accompagnement. Nous repondons du lundi au vendredi, de 9h a 17h.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const scrollToForm = () => {
  document.getElementById("formulaire")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const LeadAgencePage = () => {
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
    <LeadShell>
      <Helmet>
        <title>Des prospects qualifies chaque jour | Agence LGM Abidjan</title>
        <meta
          name="description"
          content="Repondez a quelques questions pour savoir si LGM peut generer des prospects qualifies pour votre entreprise a Abidjan."
        />
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="section-charcoal">
        <div className="container-wide grid items-start gap-12 py-10 md:py-16 lg:grid-cols-[1fr_minmax(420px,0.95fr)] lg:gap-14">
          <div>
            <p className="section-kicker !mb-3">Pour les entreprises qui veulent plus de clients a Abidjan</p>

            <h1 className="font-display text-[clamp(2rem,5.4vw,3.9rem)] font-extrabold leading-[1.04] text-[#f0d996] [text-wrap:balance]">
              Des prospects qualifies pour votre entreprise chaque jour, sans dependre du bouche-a-oreille
            </h1>

            <button type="button" onClick={scrollToForm} className="btn-cobalt mt-6 w-full sm:w-auto lg:hidden">
              Remplir le formulaire — 2 minutes
            </button>

            <div className="public-lead space-y-3 text-platinum">
              <p>La plupart des entreprises attendent que les clients viennent d'eux-memes.</p>
              <p>
                Resultat ? <strong className="font-bold">Un chiffre d'affaires irregulier, impossible a prevoir.</strong>
              </p>
              <p>
                Chez LGM, nous installons un systeme d'acquisition : publicites, page de vente, relances. Objectif
                unique : que votre telephone sonne chaque jour.
              </p>
              <p className="text-platinum/70">
                Repondez au formulaire pour savoir immediatement si nous pouvons travailler ensemble.
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
          </div>

          <div id="formulaire" className="scroll-mt-6 lg:sticky lg:top-24">
            <div className="public-card p-4 md:p-6">
              <div className="mb-4 text-center">
                <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-platinum md:text-2xl">
                  Formulaire de qualification
                </h2>
                <p className="mt-2 text-sm leading-6 text-platinum/70">
                  2 minutes. Vous saurez tout de suite quelle est votre prochaine etape.
                </p>
              </div>
              <div className="overflow-hidden rounded-md bg-white" style={{ minHeight: 1200 }}>
                <GhlQualificationForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(240,217,150,0.14)] bg-[#09101d]">
        <div className="container-wide py-12 md:py-16">
          <div className="text-center">
            <p className="section-kicker">Comment ca marche</p>
            <h2 className="font-display text-2xl font-extrabold text-platinum md:text-3xl">
              Quatre etapes, sans deplacement
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step} className="flex h-full flex-col rounded-md border border-[rgba(240,217,150,0.18)] p-5">
                <span className="font-display text-2xl font-extrabold text-[#f0d996]">{item.step}</span>
                <p className="mt-3 text-base font-bold text-platinum">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-platinum/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(240,217,150,0.14)] bg-[#09101d]">
        <div className="container-wide py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="section-kicker">Questions frequentes</p>
              <h2 className="font-display text-2xl font-extrabold text-platinum md:text-3xl">
                Ce que vous devez savoir avant de nous contacter
              </h2>
            </div>
            <div className="mt-8 grid gap-6">
              {faqItems.map((item) => (
                <article key={item.question} className="border-t border-[rgba(240,217,150,0.16)] pt-5">
                  <h3 className="text-base font-bold text-platinum md:text-lg">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-platinum/70">{item.answer}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button type="button" onClick={scrollToForm} className="btn-cobalt">
                Remplir le formulaire — 2 minutes
              </button>
            </div>
          </div>
        </div>
      </section>

      {showStickyCta && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(240,217,150,0.24)] bg-[#070b12]/95 p-3 backdrop-blur lg:hidden">
          <button type="button" onClick={scrollToForm} className="btn-cobalt w-full">
            Remplir le formulaire — 2 minutes
          </button>
        </div>
      )}
    </LeadShell>
  );
};

export default LeadAgencePage;
