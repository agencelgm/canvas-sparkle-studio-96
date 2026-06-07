import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { BackArrow, FinalCTA, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { findService, publicImages, serviceAreaPages } from "@/data/publicContent";
import { codeGraph, findNode } from "@/data/siteGraph";

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = findService(slug);

  if (!service) {
    return (
      <PageLayout>
        <section className="public-page-hero min-h-[70dvh]">
          <div className="container-narrow relative z-10 pt-28 text-center">
            <h1 className="public-h2">Service introuvable</h1>
            <p className="public-lead mx-auto">Cette page n'existe pas ou a ete deplacee.</p>
            <Link to="/services" className="btn-cobalt mt-8">Retour aux services</Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const canonicalUrl = `https://lgm.marketing/services/${service.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.kicker,
    provider: {
      "@type": "Organization",
      name: "LGM, Les Gens du Marketing",
      url: "https://lgm.marketing",
    },
    areaServed: serviceAreaPages.map((area) => ({ "@type": "City", name: `${area.city}, ${area.country}` })),
    url: canonicalUrl,
  };
  const metaDescription = `${service.description} Service disponible pour Abidjan, Dakar, Douala, Ouagadougou et les entreprises francophones.`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://lgm.marketing/services" },
      { "@type": "ListItem", position: 3, name: service.title },
    ],
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{service.title} a Abidjan | LGM</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${service.title} a Abidjan | LGM`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`https://lgm.marketing${publicImages.og}`} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageHero
        eyebrow={service.kicker}
        title={<>{service.title}</>}
        lead={service.headline}
        image={publicImages.services}
        imageAlt={`Environnement marketing professionnel pour piloter ${service.title.toLowerCase()} et le flux de prospects`}
        rightSlot={<DiagnosticHeroSlot sourcePage={`service-${service.slug}`} />}
      />

      <section className="section-platinum section-pad-tight">
        <div className="container-wide">
          <Breadcrumbs
            tone="light"
            className="mb-6"
            items={[
              { label: "Accueil", to: "/" },
              { label: "Services", to: "/services" },
              { label: service.title },
            ]}
          />
          <Link to="/services" className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-[#d7b46a]">
            <BackArrow />
            Tous les services
          </Link>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
            <Reveal>
              <p className="section-kicker text-[#d7b46a]">Pourquoi ce levier</p>
              <h2 className="public-h2 public-h2-long text-platinum-text">{service.headline}</h2>
              <p className="public-lead text-platinum-muted">{service.description}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="diagnostic-benefit-card flex flex-col justify-between">
                    <span className="mb-4 block h-2 w-2 rounded-full bg-[#d7b46a]" aria-hidden="true" />
                    <p className="font-semibold leading-relaxed text-platinum-text">{benefit}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-charcoal section-pad-tight">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <Reveal>
            <p className="section-kicker">Process</p>
            <h2 className="public-h2 max-w-3xl">Comment nous l'activons.</h2>
            <div className="mt-8">
              <ImageFrame src={publicImages.method} alt="Parcours marketing ACF reliant acquisition, conversion et fidelisation" className="min-h-[320px]" />
            </div>
          </Reveal>
          <div className="border-t border-[#f0d99624]">
            {service.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <article className="grid gap-4 border-b border-[#f0d9961f] py-6 md:grid-cols-[0.22fr_1fr]">
                  <p className="font-display text-4xl font-extrabold text-[#f0d99633]">{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h3 className="public-h3 text-platinum">{step.title}</h3>
                    <p className="public-body mt-2">{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {(() => {
        const node = findNode(codeGraph, `/services/${service.slug}`);
        return node ? <RelatedLinks current={node} count={6} /> : null;
      })()}

      <FinalCTA title={`Vous voulez activer ${service.title.toLowerCase()} avec methode ?`} text="Nous commencons par comprendre vos objectifs, votre marche et les freins actuels avant de proposer une feuille de route." />
    </PageLayout>
  );
};

export default ServiceDetailPage;
