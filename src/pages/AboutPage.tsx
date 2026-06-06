import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import { FinalCTA, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages } from "@/data/publicContent";

const principles = [
  { title: "Clarte radicale", text: "Chaque action doit etre reliee a une metrique et a une decision commerciale." },
  { title: "Culture locale", text: "Nous concevons pour Abidjan et les marches francophones d'Afrique de l'Ouest, avec leurs rythmes et leurs realites." },
  { title: "Craft visible", text: "Si votre marketing doit inspirer confiance, son execution visuelle doit deja le prouver." },
];

const timeline = [
  { label: "Diagnostic", text: "Nous lisons votre marche, vos offres, votre trafic, vos chiffres et vos points de friction." },
  { label: "Systeme", text: "Nous relions acquisition, conversion et fidelisation dans une feuille de route executable." },
  { label: "Execution", text: "Nous produisons les campagnes, pages, contenus, automations et tableaux de bord." },
  { label: "Pilotage", text: "Chaque semaine, nous arbitrons avec des donnees et des priorites nettes." },
];

const AboutPage = () => (
  <PageLayout>
    <Helmet>
      <title>A propos | LGM, Les Gens du Marketing</title>
      <meta name="description" content="Decouvrez LGM, l'agence marketing digital basee a Abidjan qui structure acquisition, conversion et fidelisation avec la methode ACF." />
      <link rel="canonical" href="https://lgm.marketing/a-propos" />
      <meta property="og:url" content="https://lgm.marketing/a-propos" />
      <meta property="og:image" content={publicImages.og} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
          { "@type": "ListItem", position: 2, name: "A propos" },
        ],
      })}</script>
    </Helmet>

    <PageHero
      eyebrow="L'agence"
      title={<>Les Gens du <span className="editorial-accent">Marketing</span></>}
      lead="LGM existe pour aider les entreprises ambitieuses d'Afrique de l'Ouest a transformer leur presence digitale en moteur commercial mesurable."
      image={publicImages.about}
      imageAlt="Image editoriale abstraite de l'identite LGM"
    />

    <section className="section-ivory section-pad">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:items-center">
        <Reveal>
          <ImageFrame src={publicImages.board} alt="Planche de direction artistique generee pour LGM" tone="light" className="min-h-[420px]" />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-kicker text-[#8b6914]">Position</p>
          <h2 className="public-h2 max-w-4xl text-ivory-text">Une agence qui doit inspirer la meme confiance que les marques qu'elle construit.</h2>
          <div className="mt-8 space-y-5 text-[1.02rem] leading-8 text-ivory-muted">
            <p>Nous combinons strategie, publicite, design, developpement et automatisation pour creer des systemes marketing complets.</p>
            <p>Notre difference n'est pas de promettre plus de visibilite. Notre difference est de relier chaque canal a une action mesurable : un prospect, une demande, une vente, une relation qui dure.</p>
            <p>Le site LGM doit donc faire ce que nous recommandons a nos clients : montrer le niveau d'exigence avant de demander la confiance.</p>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="section-espresso section-pad-tight">
      <div className="container-wide">
        <Reveal>
          <p className="section-kicker">Principes</p>
          <h2 className="public-h2 max-w-4xl">Ce qui guide notre maniere de travailler.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="public-card h-full p-6">
                <p className="font-display text-5xl font-extrabold text-[#e8c96b33]">{index + 1}</p>
                <h3 className="public-h3 mt-5 text-ivory">{item.title}</h3>
                <p className="public-body mt-3">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-ivory section-pad-tight">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.7fr_1fr]">
        <Reveal>
          <p className="section-kicker text-[#8b6914]">Process</p>
          <h2 className="public-h2 text-ivory-text">De la lecture du marche au pilotage hebdomadaire.</h2>
        </Reveal>
        <div className="border-t border-[rgba(26,21,16,0.16)]">
          {timeline.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <div className="grid gap-4 border-b border-[rgba(26,21,16,0.13)] py-6 md:grid-cols-[0.4fr_1fr]">
                <h3 className="public-h3 text-ivory-text">{item.label}</h3>
                <p className="public-body text-ivory-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <FinalCTA title="Votre marque merite une execution aussi serieuse que votre ambition." text="Le premier appel sert a comprendre votre contexte, pas a vous vendre une formule toute faite." button="Reserver un audit" />
  </PageLayout>
);

export default AboutPage;
