import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { FinalCTA, ImageFrame, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages } from "@/data/publicContent";

const principles = [
  { title: "Clarte radicale", text: "Chaque action doit etre reliee a une metrique et a une decision commerciale." },
  { title: "Culture locale", text: "Nous concevons depuis Abidjan pour des entreprises de Cote d'Ivoire, du Senegal, du Cameroun et du Burkina Faso, avec leurs rythmes et leurs realites." },
  { title: "Craft visible", text: "Si votre marketing doit inspirer confiance, son execution visuelle doit deja le prouver." },
];

const timeline = [
  { label: "Diagnostic", text: "Nous lisons votre marche, vos offres, votre trafic, vos chiffres et vos points de friction." },
  { label: "Systeme", text: "Nous relions acquisition, conversion et fidelisation dans une feuille de route executable." },
  { label: "Execution", text: "Nous produisons les campagnes, pages, contenus, automations et tableaux de bord." },
  { label: "Pilotage", text: "Chaque semaine, nous arbitrons avec des donnees et des priorites nettes." },
];

const AboutPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
  <PageLayout>
    <Helmet>
      <title>A propos | Agence marketing et communication a Abidjan | LGM</title>
      <meta name="description" content="LGM, agence marketing et communication a Abidjan : acquisition, SEO/AEO/GEO, creation, IA, automatisation et logiciels sur mesure." />
      <link rel="canonical" href="https://lgm.marketing/a-propos" />
      <meta property="og:url" content="https://lgm.marketing/a-propos" />
      <meta property="og:image" content={`https://lgm.marketing${publicImages.og}`} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
          { "@type": "ListItem", position: 2, name: "A propos" },
        ],
      })}</script>
    </Helmet>

    <section ref={heroRef} className="relative flex min-h-[100dvh] items-center overflow-hidden bg-charcoal text-platinum md:items-end">
      <motion.img
        src={publicImages.about}
        alt="Equipe d'agence en salle de strategie avec ordinateur, brief client et revue de campagne"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: imageY, scale: 1.06 }}
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.45),rgba(7,11,18,0.2)_36%,rgba(7,11,18,0.92))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_64%,rgba(215,180,106,0.18),transparent_34%)]" />

      <div className="container-wide relative z-10 grid gap-10 pb-14 pt-28 md:pb-[clamp(4rem,9vw,7rem)] md:pt-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:items-start">
        <motion.div style={{ y: titleY }} className="max-w-5xl">
          <p className="section-kicker">L'agence</p>
          <h1 className="public-h1 max-w-[14ch]">
            <span className="block">Les Gens du</span>
            <span className="block corporate-accent">Marketing</span>
          </h1>
          <p className="public-lead max-w-[54ch] text-platinum/78">
            LGM existe pour aider les entreprises ambitieuses basees a Abidjan, Dakar, Douala et Ouagadougou a transformer leur presence digitale en moteur commercial mesurable.
          </p>
        </motion.div>
        <motion.div className="diagnostic-hero-panel" style={{ y: titleY }}>
          <DiagnosticHeroSlot sourcePage="about-hero" />
        </motion.div>
      </div>
    </section>

    <section className="section-platinum section-pad">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:items-center">
        <Reveal>
          <ImageFrame src={publicImages.board} alt="Studio marketing avec prototypes de campagne, contenu social et direction de marque" tone="light" className="min-h-[420px]" />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-kicker text-[#d7b46a]">Position</p>
          <h2 className="public-h2 max-w-4xl text-platinum-text">Une agence qui doit inspirer la meme confiance que les marques qu'elle construit.</h2>
          <div className="mt-8 space-y-5 text-[1.02rem] leading-8 text-platinum-muted">
            <p>Nous combinons strategie, publicite, design, developpement et automatisation pour creer des systemes marketing complets.</p>
            <p>Notre difference n'est pas de promettre plus de visibilite. Notre difference est de relier chaque canal a une action mesurable : un prospect, une demande, une vente, une relation qui dure.</p>
            <p>Le site LGM doit donc faire ce que nous recommandons a nos clients : montrer le niveau d'exigence avant de demander la confiance.</p>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="section-charcoal section-pad-tight">
      <div className="container-wide">
        <Reveal>
          <p className="section-kicker">Principes</p>
          <h2 className="public-h2 max-w-4xl">Ce qui guide notre maniere de travailler.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="public-card h-full p-6">
                <p className="font-display text-5xl font-extrabold text-[#f0d99633]">{index + 1}</p>
                <h3 className="public-h3 mt-5 text-platinum">{item.title}</h3>
                <p className="public-body mt-3">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-platinum section-pad-tight">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.7fr_1fr]">
        <Reveal>
          <p className="section-kicker text-[#d7b46a]">Process</p>
          <h2 className="public-h2 text-platinum-text">De la lecture du marche au pilotage hebdomadaire.</h2>
        </Reveal>
        <div className="border-t border-[rgba(16,24,39,0.16)]">
          {timeline.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <div className="grid gap-4 border-b border-[rgba(16,24,39,0.13)] py-6 md:grid-cols-[0.4fr_1fr]">
                <h3 className="public-h3 text-platinum-text">{item.label}</h3>
                <p className="public-body text-platinum-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <FinalCTA title="Votre marque merite une execution aussi serieuse que votre ambition." text="Le diagnostic sert a comprendre votre contexte avant de vous proposer une formule qui ne serait pas adaptee." />
  </PageLayout>
  );
};

export default AboutPage;
