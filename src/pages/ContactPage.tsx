import { Helmet } from "react-helmet-async";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages } from "@/data/publicContent";

const ContactPage = () => (
  <PageLayout>
    <Helmet>
      <title>Formulaire de qualification | Agence marketing LGM Abidjan</title>
      <meta name="description" content="Remplissez le formulaire de qualification LGM a Abidjan pour publicite digitale, Facebook Ads, SEO/AEO/GEO, logo, site web, IA, automatisation ou logiciel sur mesure." />
      <link rel="canonical" href="https://lgm.marketing/contact" />
      <meta property="og:url" content="https://lgm.marketing/contact" />
      <meta property="og:image" content={`https://lgm.marketing${publicImages.og}`} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
          { "@type": "ListItem", position: 2, name: "Qualification" },
        ],
      })}</script>
    </Helmet>

    <PageHero
      eyebrow="Qualification"
      title={<>Valider si LGM est <span className="corporate-accent">la bonne agence.</span></>}
      lead="Avant de parler solution, nous voulons comprendre votre entreprise, votre budget et l'objectif que vous voulez atteindre en 90 jours."
      image={publicImages.contact}
      imageAlt="Rendez-vous d'audit marketing autour d'un ordinateur et d'un pipeline de prospects"
      rightSlot={<DiagnosticHeroSlot sourcePage="contact-hero" />}
    />

    <section className="section-charcoal section-pad-tight">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.74fr_1fr] lg:items-center">
        <Reveal>
          <p className="section-kicker">Pourquoi commencer ici</p>
          <h2 className="public-h2 public-h2-long">Un audit d'abord, pour eviter les appels inutiles.</h2>
          <p className="public-lead">
            Le diagnostic vous aide a savoir rapidement si votre besoin, votre budget et votre objectif a 90 jours correspondent a ce que LGM peut vraiment traiter.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              "Vous clarifiez le levier prioritaire avant de parler solution.",
              "Vous savez tout de suite si le budget minimum est coherent.",
              "Vous evitez un appel commercial si LGM n'est pas le bon partenaire.",
            ].map((benefit) => (
              <article key={benefit} className="diagnostic-benefit-card diagnostic-benefit-card-dark">
                <span className="mb-4 block h-2 w-2 rounded-full bg-[#f0d996]" aria-hidden="true" />
                <p className="font-semibold leading-relaxed text-platinum">{benefit}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    <section className="section-platinum section-pad-tight">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <Reveal>
          <p className="section-kicker text-[#d7b46a]">Avant l'appel</p>
          <h2 className="public-h2 max-w-4xl text-platinum-text">Les bonnes informations accelerent le diagnostic.</h2>
          <p className="public-lead text-platinum-muted">
            Partagez votre secteur, vos investissements marketing passes, vos objectifs commerciaux et le budget disponible. Nous saurons vite si nous pouvons vous aider serieusement.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ImageFrame src={publicImages.contact} alt="Preparation d'un audit marketing avec brief client et suivi CRM" tone="light" className="min-h-[340px]" />
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default ContactPage;
