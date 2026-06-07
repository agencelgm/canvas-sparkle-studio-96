import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import QualificationForm from "@/components/QualificationForm";
import { ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages, siteContact } from "@/data/publicContent";

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
    />

    <section className="section-charcoal section-pad-tight">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.74fr_1fr] lg:items-start">
        <Reveal>
          <p className="section-kicker">Formulaire d'application</p>
          <h2 className="public-h2 max-w-3xl">Quelques questions pour filtrer les bonnes demandes.</h2>
          <p className="public-lead">
            Nos accompagnements commencent a 270 000 FCFA. Pour les demandes publicitaires, il faut aussi prevoir un budget media d'au moins 10 000 FCFA par jour.
          </p>
          <div className="mt-8 grid gap-4">
            <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="public-card p-5 text-platinum/72 transition-colors hover:text-platinum">
              <span className="block text-sm font-bold text-[#f0d996]">Besoin d'une reponse maintenant ?</span>
              <span className="mt-1 block text-lg font-bold">WhatsApp {siteContact.phoneDisplay}</span>
              <span className="mt-1 block text-sm text-platinum/52">{siteContact.hours}</span>
            </a>
            <a href={`tel:${siteContact.phoneHref}`} className="public-card p-5 text-platinum/72 transition-colors hover:text-platinum">
              <span className="block text-sm font-bold text-[#f0d996]">Appel service client</span>
              <span className="mt-1 block text-lg font-bold">{siteContact.phoneDisplay}</span>
            </a>
            <a href={`mailto:${siteContact.email}`} className="public-card p-5 text-platinum/72 transition-colors hover:text-platinum">
              <span className="block text-sm font-bold text-[#f0d996]">Email</span>
              <span className="mt-1 block text-lg font-bold">{siteContact.email}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <QualificationForm sourcePage="contact" />
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
