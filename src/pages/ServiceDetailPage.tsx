import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { BackArrow, FinalCTA, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { findService, publicImages } from "@/data/publicContent";

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
            <Link to="/services" className="btn-akan mt-8">Retour aux services</Link>
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
    areaServed: [
      { "@type": "City", name: "Abidjan" },
      { "@type": "Country", name: "Cote d'Ivoire" },
    ],
    url: canonicalUrl,
  };
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
        <title>{service.title} | LGM</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${service.title} | LGM`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={publicImages.og} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageHero
        eyebrow={service.kicker}
        title={<>{service.title}</>}
        lead={service.headline}
        image={publicImages.services}
        imageAlt={`Image generative pour le service ${service.title}`}
      />

      <section className="section-ivory section-pad-tight">
        <div className="container-wide">
          <Link to="/services" className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-[#8b6914]">
            <BackArrow />
            Tous les services
          </Link>
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
            <Reveal>
              <p className="section-kicker text-[#8b6914]">Pourquoi ce levier</p>
              <h2 className="public-h2 max-w-3xl text-ivory-text">{service.headline}</h2>
              <p className="public-lead text-ivory-muted">{service.description}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="border-t border-[rgba(26,21,16,0.16)] pt-4">
                    <span className="mb-4 block h-2 w-2 rounded-full bg-[#8b6914]" aria-hidden="true" />
                    <p className="font-semibold leading-relaxed text-ivory-text">{benefit}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-espresso section-pad-tight">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <Reveal>
            <p className="section-kicker">Process</p>
            <h2 className="public-h2 max-w-3xl">Comment nous l'activons.</h2>
            <div className="mt-8">
              <ImageFrame src={publicImages.method} alt="Visualisation du processus LGM" className="min-h-[320px]" />
            </div>
          </Reveal>
          <div className="border-t border-[#e8c96b24]">
            {service.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <article className="grid gap-4 border-b border-[#e8c96b1f] py-6 md:grid-cols-[0.22fr_1fr]">
                  <p className="font-display text-4xl font-extrabold text-[#e8c96b33]">{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h3 className="public-h3 text-ivory">{step.title}</h3>
                    <p className="public-body mt-2">{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA title={`Vous voulez activer ${service.title.toLowerCase()} avec methode ?`} text="Nous commencons par comprendre vos objectifs, votre marche et les freins actuels avant de proposer une feuille de route." button="Parler de ce service" />
    </PageLayout>
  );
};

export default ServiceDetailPage;
