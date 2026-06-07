import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { BackArrow, FinalCTA, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { findServiceArea, publicImages, publicServices, siteContact } from "@/data/publicContent";

const baseUrl = "https://lgm.marketing";

const ServiceAreaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const area = findServiceArea(slug);

  if (!area) {
    return (
      <PageLayout>
        <section className="public-page-hero min-h-[70dvh]">
          <div className="container-narrow relative z-10 pt-28 text-center">
            <h1 className="public-h2">Zone introuvable</h1>
            <p className="public-lead mx-auto">Cette page locale n'existe pas ou a ete deplacee.</p>
            <Link to="/services" className="btn-cobalt mt-8">Retour aux services</Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const canonicalUrl = `${baseUrl}/zones/${area.slug}`;
  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.title,
    description: area.metaDescription,
    provider: {
      "@type": ["LocalBusiness", "ProfessionalService"],
      name: "LGM - Les Gens du Marketing",
      url: baseUrl,
      telephone: siteContact.phoneHref,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteContact.address,
        addressLocality: "Abidjan",
        addressCountry: "CI",
      },
    },
    areaServed: {
      "@type": "City",
      name: area.city,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services LGM pour ${area.city}`,
      itemListElement: publicServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${baseUrl}/services/${service.slug}`,
        },
      })),
    },
    url: canonicalUrl,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Zones", item: `${baseUrl}/zones/${area.slug}` },
      { "@type": "ListItem", position: 3, name: area.city },
    ],
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{area.title} | LGM</title>
        <meta name="description" content={area.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${area.title} | LGM`} />
        <meta property="og:description" content={area.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`https://lgm.marketing${publicImages.og}`} />
        <script type="application/ld+json">{JSON.stringify(areaSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageHero
        eyebrow={`${area.city}, ${area.country}`}
        title={<>{area.title}</>}
        lead={area.lead}
        image={publicImages.contact}
        imageAlt={`Agence marketing LGM pour les entreprises a ${area.city}, avec campagnes, prospects, CRM et automatisation`}
      />

      <section className="section-platinum section-pad-tight">
        <div className="container-wide">
          <Link to="/services" className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-[#d7b46a]">
            <BackArrow />
            Voir tous les services
          </Link>
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1fr] lg:items-start">
            <Reveal>
              <p className="section-kicker text-[#d7b46a]">Position locale</p>
              <h2 className="public-h2 max-w-3xl text-platinum-text">LGM est basee a Abidjan, mais l'accompagnement n'est pas limite par la ville.</h2>
              <p className="public-lead text-platinum-muted">
                Nous combinons strategie marketing, creation, publicite, SEO, IA et developpement logiciel pour aider les entreprises de {area.city} a structurer un vrai flux de prospects et de clients.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid gap-4 sm:grid-cols-3">
                {area.proof.map((item) => (
                  <article key={item} className="border-t border-[rgba(16,24,39,0.14)] pt-4">
                    <span className="mb-4 block h-2 w-2 rounded-full bg-[#d7b46a]" aria-hidden="true" />
                    <p className="font-semibold leading-relaxed text-platinum-text">{item}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-charcoal section-pad-tight">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.68fr_1fr] lg:items-start">
          <Reveal>
            <p className="section-kicker">Services disponibles</p>
            <h2 className="public-h2 max-w-3xl">Marketing, communication, IA et logiciel dans un seul systeme.</h2>
            <p className="public-lead">
              Les entreprises de {area.city} peuvent commencer par un seul besoin, puis relier les autres leviers au fur et a mesure que le systeme devient plus mesurable.
            </p>
            <div className="mt-8">
              <ImageFrame src={publicImages.services} alt={`Services marketing et communication LGM pour ${area.city}`} className="min-h-[320px]" />
            </div>
          </Reveal>
          <div className="border-t border-[#f0d99624]">
            {publicServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.035}>
                <Link to={`/services/${service.slug}`} className="grid gap-4 border-b border-[#f0d9961f] py-5 text-platinum md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <p className="font-display text-4xl font-extrabold text-[#f0d99633]">{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h3 className="public-h3 text-[clamp(1.16rem,1.8vw,1.65rem)]">{service.title}</h3>
                    <p className="public-body mt-2 max-w-2xl">{service.description}</p>
                  </div>
                  <span className="text-sm font-bold text-[#f0d996]">Details</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title={`Vous cherchez une agence marketing pour ${area.city} ?`}
        text={`Remplissez le formulaire de qualification. Nous verifierons si LGM est la meilleure agence pour votre objectif commercial a 90 jours.`}
        button="Remplir le formulaire"
      />
    </PageLayout>
  );
};

export default ServiceAreaPage;
