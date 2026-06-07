import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { Arrow, FinalCTA, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages, publicServices } from "@/data/publicContent";

const ServicesPage = () => (
  <PageLayout>
    <Helmet>
      <title>Services marketing, communication, IA et logiciel | LGM Abidjan</title>
      <meta name="description" content="Services LGM a Abidjan : agence marketing, agence de communication, publicite digitale, Facebook Ads, SEO/AEO/GEO, logo, sites web, automatisation IA et logiciel sur mesure." />
      <link rel="canonical" href="https://lgm.marketing/services" />
      <meta property="og:url" content="https://lgm.marketing/services" />
      <meta property="og:image" content={`https://lgm.marketing${publicImages.og}`} />
      <meta property="og:title" content="Services marketing, communication, IA et logiciel | LGM" />
      <meta property="og:description" content="Generation de leads, publicite, Facebook Ads, SEO/AEO/GEO, logo, sites web, IA, automatisation et logiciels sur mesure." />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
              { "@type": "ListItem", position: 2, name: "Services" },
            ],
          },
          {
            "@type": "ItemList",
            name: "Services LGM",
            itemListElement: publicServices.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.title,
              url: `https://lgm.marketing/services/${service.slug}`,
            })),
          },
        ],
      })}</script>
    </Helmet>

    <PageHero
      eyebrow="Services"
      title={<>Des leviers precis pour une <span className="corporate-accent">croissance visible.</span></>}
      lead="Agence marketing, agence de communication, publicite Facebook, SEO/AEO/GEO, IA, automatisation, sites web, logo et logiciels sur mesure : chaque service renforce le systeme ACF de votre entreprise."
      image={publicImages.services}
      imageAlt="Poste de travail marketing avec landing page, acquisition de prospects et contenus sociaux"
      rightSlot={<DiagnosticHeroSlot sourcePage="services-hero" />}
    />

    <section className="section-charcoal section-pad-tight">
      <div className="container-wide">
        <Reveal>
          <p className="section-kicker">Index des expertises</p>
          <h2 className="public-h2 max-w-5xl">Choisissez un point d'entree, nous relions le reste du systeme.</h2>
        </Reveal>
        <div className="mt-12 border-t border-[#f0d99624]">
          {publicServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.045}>
              <Link to={`/services/${service.slug}`} className="service-row group text-platinum">
                <div>
                  <p className="font-display text-5xl font-extrabold text-[#f0d99633]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm font-bold text-[#f0d996]">{service.kicker}</p>
                </div>
                <div>
                  <h2 className="public-h3 transition-colors group-hover:text-[#f0d996]">{service.title}</h2>
                  <p className="public-body mt-3 max-w-2xl">{service.description}</p>
                </div>
                <div className="tag-list">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#f0d9963d] text-[#f0d996] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-platinum section-pad-tight">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-center">
        <Reveal>
          <p className="section-kicker text-[#d7b46a]">ACF en pratique</p>
          <h2 className="public-h2 max-w-4xl text-platinum-text">Un bon service ne suffit pas. Il doit s'inscrire dans le parcours complet du client.</h2>
          <p className="public-lead text-platinum-muted">
            C'est pourquoi nous commencons toujours par comprendre ou le systeme bloque : attirer, convertir, fideliser ou mesurer.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ImageFrame src={publicImages.method} alt="Visualisation du parcours Acquisition Conversion Fidelisation pour piloter la croissance" tone="light" className="min-h-[360px]" />
        </Reveal>
      </div>
    </section>

    <FinalCTA title="Vous ne savez pas encore quel service choisir ?" text="C'est normal. L'audit sert justement a identifier le levier qui creera le plus d'impact en premier." />
  </PageLayout>
);

export default ServicesPage;
