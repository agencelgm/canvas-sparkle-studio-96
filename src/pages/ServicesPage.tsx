import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Arrow, FinalCTA, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages, publicServices } from "@/data/publicContent";

const ServicesPage = () => (
  <PageLayout>
    <Helmet>
      <title>Services | LGM, Les Gens du Marketing</title>
      <meta name="description" content="Generation de leads, SEO local, publicite digitale, creation de logo, logiciel sur mesure, automatisation IA et formations : les services LGM pour structurer votre croissance a Abidjan." />
      <link rel="canonical" href="https://lgm.marketing/services" />
      <meta property="og:url" content="https://lgm.marketing/services" />
      <meta property="og:image" content={publicImages.og} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
          { "@type": "ListItem", position: 2, name: "Services" },
        ],
      })}</script>
    </Helmet>

    <PageHero
      eyebrow="Services"
      title={<>Des leviers precis pour une <span className="editorial-accent">croissance visible.</span></>}
      lead="Nous ne vendons pas des prestations isolees. Chaque service est pense pour renforcer le systeme ACF de votre entreprise."
      image={publicImages.services}
      imageAlt="Image generative abstraite representant les services LGM"
    />

    <section className="section-espresso section-pad-tight">
      <div className="container-wide">
        <Reveal>
          <p className="section-kicker">Index des expertises</p>
          <h2 className="public-h2 max-w-5xl">Choisissez un point d'entree, nous relions le reste du systeme.</h2>
        </Reveal>
        <div className="mt-12 border-t border-[#e8c96b24]">
          {publicServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.045}>
              <Link to={`/services/${service.slug}`} className="service-row group text-ivory">
                <div>
                  <p className="font-display text-5xl font-extrabold text-[#e8c96b33]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm font-bold text-[#e8c96b]">{service.kicker}</p>
                </div>
                <div>
                  <h2 className="public-h3 transition-colors group-hover:text-[#e8c96b]">{service.title}</h2>
                  <p className="public-body mt-3 max-w-2xl">{service.description}</p>
                </div>
                <div className="tag-list">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#e8c96b3d] text-[#e8c96b] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-ivory section-pad-tight">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-center">
        <Reveal>
          <p className="section-kicker text-[#8b6914]">ACF en pratique</p>
          <h2 className="public-h2 max-w-4xl text-ivory-text">Un bon service ne suffit pas. Il doit s'inscrire dans le parcours complet du client.</h2>
          <p className="public-lead text-ivory-muted">
            C'est pourquoi nous commencons toujours par comprendre ou le systeme bloque : attirer, convertir, fideliser ou mesurer.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ImageFrame src={publicImages.method} alt="Methode ACF de LGM" tone="light" className="min-h-[360px]" />
        </Reveal>
      </div>
    </section>

    <FinalCTA title="Vous ne savez pas encore quel service choisir ?" text="C'est normal. L'audit sert justement a identifier le levier qui creera le plus d'impact en premier." button="Demander un diagnostic" />
  </PageLayout>
);

export default ServicesPage;
