import { Helmet } from "react-helmet-async";
import LeadShell from "@/components/lead/LeadShell";
import VideoSlot from "@/components/lead/VideoSlot";
import { leadAgenceConfig, formationWhatsappUrl } from "@/data/leadAgenceConfig";
import { siteContact } from "@/data/publicContent";

const programme = [
  {
    week: "Semaine 1",
    duration: "1 h",
    title: "Comprendre la publicite sur les reseaux sociaux — theorie",
    items: [
      "Comprendre le fonctionnement de la publicite sur les reseaux sociaux",
      "Comprendre pourquoi les gens achetent",
      "Comprendre les differentes etapes de la vente",
      "Faire la difference entre une simple publication et une veritable campagne publicitaire",
      "Comprendre les differents objectifs de campagne",
      "Savoir choisir les bons formats et les bons visuels",
      "Comprendre les notions de ciblage, de budget et de diffusion",
    ],
  },
  {
    week: "Semaine 2",
    duration: "2 a 3 h",
    title: "Mise en pratique : creer et lancer une campagne",
    items: [
      "La definition de votre cible",
      "Le choix de l'objectif adapte a votre activite",
      "Le choix des visuels et contenus a sponsoriser",
      "La creation et le parametrage d'une campagne",
      "La definition du budget",
      "Le lancement d'une campagne visant a generer des prospects et/ou des ventes",
    ],
  },
  {
    week: "Semaine 3",
    duration: "1 a 2 h",
    title: "Analyse et optimisation",
    items: [
      "Comprendre les principales statistiques d'une campagne",
      "Analyser les resultats",
      "Identifier ce qui fonctionne ou non",
      "Savoir quand arreter, modifier ou poursuivre une publicite",
      "Savoir quand augmenter ou reduire son budget",
      "Eviter le gaspillage de budget et ameliorer progressivement les performances",
    ],
  },
  {
    week: "Semaine 4",
    duration: "1 h",
    title: "Cas pratique et perfectionnement",
    items: [
      "L'analyse d'une campagne",
      "L'identification des points a ameliorer",
      "L'optimisation du ciblage, des visuels et du budget",
      "Les bonnes pratiques pour transformer les publicites en prospects et en ventes",
      "L'utilisation de Facebook et Instagram pour presenter ses produits et orienter les clients vers WhatsApp",
    ],
  },
];

const forWho = [
  "Vous vendez deja un produit ou un service, et vous voulez le faire connaitre.",
  "Vous avez un petit budget publicitaire et vous voulez qu'il serve a quelque chose.",
  "Vous voulez comprendre ce que vous faites, au lieu de dependre de quelqu'un d'autre.",
  "Vous pouvez etre present le mercredi a 19 h pendant 4 semaines.",
];

const notForWho = [
  "Vous cherchez une methode magique sans travail ni budget publicitaire.",
  "Vous ne voulez pas mettre les mains dans le gestionnaire de publicites.",
  "Vous preferez qu'une agence gere tout a votre place — dans ce cas, revenez vers nous quand votre budget publicitaire aura grandi.",
];

const faqItems = [
  {
    question: "Pourquoi je ne suis pas eligible a l'accompagnement de l'agence ?",
    answer:
      "Ce n'est pas une question de valeur de votre entreprise. C'est une question de budget publicitaire : pour qu'une agence gere vos campagnes, il faut assez de budget pour tester des audiences, des messages et des offres, puis optimiser. En dessous de ce seuil, les frais d'agence mangeraient l'essentiel de votre budget. La formation est la meilleure reponse a votre situation actuelle.",
  },
  {
    question: "Comment se deroule la formation ?",
    answer:
      "Elle dure 4 semaines. Chaque mercredi a 19 h, nous nous retrouvons en direct sur Zoom. Vous voyez l'ecran, vous posez vos questions, et vous appliquez sur votre propre compte publicitaire. Ce n'est pas une video enregistree : c'est un accompagnement en direct, comme si vous etiez un membre de notre equipe.",
  },
  {
    question: "Est-ce que j'apprends sur mon propre projet ?",
    answer:
      "Oui. Des la semaine 2, vous creez et lancez une campagne pour votre propre activite : votre cible, vos visuels, votre budget. Les semaines 3 et 4 servent a analyser vos resultats reels et a corriger ce qui ne fonctionne pas.",
  },
  {
    question: "De quel budget publicitaire ai-je besoin pour suivre la formation ?",
    answer:
      "Vous pouvez commencer avec un petit budget quotidien : l'objectif est d'apprendre a lire les resultats et a decider. Nous vous montrons comment repartir votre budget pour ne pas le gaspiller pendant la phase de test.",
  },
  {
    question: "Et si je veux travailler avec l'agence plus tard ?",
    answer:
      "C'est le chemin naturel de beaucoup de participants. Quand votre budget publicitaire atteint le seuil necessaire, vous nous ecrivez et nous reprenons la conversation sur un accompagnement complet. Vous aurez alors une longueur d'avance : vous saurez exactement de quoi nous parlons.",
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

const LeadAgenceFormationPage = () => (
  <LeadShell>
    <Helmet>
      <title>Formation publicite Facebook en direct — 4 semaines | LGM</title>
      <meta name="robots" content="noindex, follow" />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>

    <section className="section-charcoal">
      <div className="container-narrow py-12 md:py-16">
        <div className="text-center">
          <p className="section-kicker">Votre demande est bien recue</p>
          <h1 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-[#f0d996] [text-wrap:balance]">
            Nous ne pouvons pas encore gerer vos campagnes — mais nous pouvons vous former
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-platinum/75">
            Soyons directs : votre budget publicitaire actuel ne permet pas qu'une agence gere vos publicites de facon
            rentable. Ce n'est pas un refus, c'est une question de moment. En attendant, nous vous apprenons a le faire
            vous-meme — exactement avec le systeme que nous utilisons pour nos clients.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <div className="public-card p-4 md:p-6">
            <p className="section-kicker mb-3">A regarder maintenant</p>
            <VideoSlot
              url={leadAgenceConfig.videos.formation}
              title="Pourquoi la formation est votre meilleure prochaine etape"
              placeholder="La video explique pourquoi une agence a besoin d'un budget minimum, et ce que la formation change pour vous."
            />
          </div>

          <div className="public-card p-5 md:p-7">
            <p className="section-kicker mb-2">Le format</p>
            <h2 className="font-display text-2xl font-extrabold text-platinum md:text-3xl">
              4 semaines, en direct, chaque mercredi a 19 h
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-md border border-[rgba(240,217,150,0.18)] p-4">
                <p className="font-display text-xl font-extrabold text-[#f0d996]">50 000 FCFA</p>
                <p className="mt-1 text-sm leading-6 text-platinum/70">Paiement unique pour les 4 semaines de formation.</p>
              </div>
              <div className="rounded-md border border-[rgba(240,217,150,0.18)] p-4">
                <p className="font-display text-xl font-extrabold text-[#f0d996]">4 semaines</p>
                <p className="mt-1 text-sm leading-6 text-platinum/70">Une seance par semaine, du debut a la maitrise.</p>
              </div>
              <div className="rounded-md border border-[rgba(240,217,150,0.18)] p-4">
                <p className="font-display text-xl font-extrabold text-[#f0d996]">Mercredi 19 h</p>
                <p className="mt-1 text-sm leading-6 text-platinum/70">En direct sur Zoom, questions-reponses incluses.</p>
              </div>
              <div className="rounded-md border border-[rgba(240,217,150,0.18)] p-4">
                <p className="font-display text-xl font-extrabold text-[#f0d996]">100 % en ligne</p>
                <p className="mt-1 text-sm leading-6 text-platinum/70">Aucun deplacement, depuis votre bureau ou chez vous.</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-platinum/70">
              L'objectif est simple : que vous puissiez comprendre, creer, lancer, suivre et optimiser vos propres
              campagnes publicitaires. Approche tres pratique : vous travaillez sur votre activite, pas sur des exemples
              theoriques.
            </p>
          </div>

          <div className="public-card p-5 md:p-7">
            <p className="section-kicker mb-2">Le programme</p>
            <h2 className="font-display text-2xl font-extrabold text-platinum md:text-3xl">Semaine par semaine</h2>
            <div className="mt-6 space-y-6">
              {programme.map((block) => (
                <article key={block.week} className="border-t border-[rgba(240,217,150,0.16)] pt-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-lg font-extrabold text-[#f0d996]">{block.week}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-platinum/60">
                      Duree {block.duration}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-platinum md:text-lg">{block.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-platinum/70">
                        <span className="mt-[2px] text-[#f0d996]">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="public-card p-5 md:p-6">
              <h2 className="font-display text-xl font-extrabold text-platinum">C'est pour vous si</h2>
              <ul className="mt-4 space-y-2">
                {forWho.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-platinum/70">
                    <span className="mt-[2px] text-[#f0d996]">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="public-card p-5 md:p-6">
              <h2 className="font-display text-xl font-extrabold text-platinum">Ce n'est pas pour vous si</h2>
              <ul className="mt-4 space-y-2">
                {notForWho.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-platinum/70">
                    <span className="mt-[2px] text-platinum/50">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="public-card p-5 md:p-7">
            <p className="section-kicker mb-2">Questions frequentes</p>
            <h2 className="font-display text-2xl font-extrabold text-platinum md:text-3xl">
              Ce que les participants demandent
            </h2>
            <div className="mt-6 grid gap-6">
              {faqItems.map((item) => (
                <article key={item.question} className="border-t border-[rgba(240,217,150,0.16)] pt-5">
                  <h3 className="text-base font-bold text-platinum md:text-lg">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-platinum/70">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="public-card p-6 text-center md:p-8">
            <h2 className="font-display text-2xl font-extrabold text-platinum md:text-3xl">
              Reservez votre place pour la prochaine session
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-platinum/70">
              Les groupes sont volontairement reduits pour que chacun puisse travailler sur son propre compte
              publicitaire. Ecrivez-nous sur WhatsApp : nous vous confirmons la date de demarrage et les modalites
              d'inscription.
            </p>
            <a
              href={formationWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cobalt mt-6 w-full sm:w-auto"
            >
              Je veux m'inscrire a la formation
            </a>
            <p className="mt-4 text-xs font-semibold text-platinum/60">
              {siteContact.phoneDisplay} — {siteContact.hours}
            </p>
            <a
              href={leadAgenceConfig.whatsappChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-bold text-[#f0d996] underline"
            >
              Ou rejoignez d'abord notre chaine WhatsApp de conseils gratuits
            </a>
          </div>
        </div>
      </div>
    </section>
  </LeadShell>
);

export default LeadAgenceFormationPage;
