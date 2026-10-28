import { Helmet } from "react-helmet-async";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ServiceExplorer from "@/components/system/ServiceExplorer";
import SystemDiagram from "@/components/system/SystemDiagram";
import { FinalCTA, TextLink } from "@/components/public/PublicPrimitives";
import { publicServices } from "@/data/publicContent";
import { OG_IMAGE, absUrl, breadcrumbSchema } from "@/lib/site";

const title = "Services marketing relies a votre parcours client | LGM Abidjan";
const description = "Publicite Facebook et Google, SEO, sites web, generation de leads, CRM et automatisation : chaque service LGM joue un role precis dans votre systeme.";

const ServicesPage = () => (
  <PageLayout>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absUrl("/services")} />
      <meta property="og:url" content={absUrl("/services")} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Services" }]))}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Services LGM",
        itemListElement: publicServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: absUrl(`/services/${service.slug}`),
        })),
      })}</script>
    </Helmet>

    <section className="public-page-hero !min-h-0">
      <div className="container-wide relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)] lg:items-start">
        <div>
          <Breadcrumbs className="mb-6" items={[{ label: "Accueil", to: "/" }, { label: "Services" }]} />
          <p className="section-kicker">Services</p>
          <h1 className="public-h1">Des services relies, pas des prestations isolees.</h1>
          <p className="public-lead">
            Chaque service LGM correspond a une etape de votre parcours client, ou renforce l'ensemble. Vous savez toujours a quoi sert ce que vous achetez.
          </p>
        </div>
        <DiagnosticHeroSlot sourcePage="services-hero" />
      </div>
    </section>

    <section className="section-charcoal section-pad-tight">
      <div className="container-wide">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Index des services</p>
          <h2 className="public-h2">Choisissez un point d'entree.</h2>
          <p className="public-lead">Survolez ou parcourez la liste au clavier pour voir le benefice et le role de chaque service. Sur mobile, touchez un service pour l'ouvrir.</p>
        </div>
        <ServiceExplorer />
      </div>
    </section>

    <section className="section-platinum section-pad-tight">
      <div className="container-wide">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker !text-cobalt-dark">Ou se placent les services</p>
            <h2 className="public-h2 max-w-[20ch] text-platinum-text">Le parcours qu'ils construisent ensemble.</h2>
          </div>
          <TextLink tone="light" to="/systeme-acquisition">Le systeme en detail</TextLink>
        </div>
        <SystemDiagram tone="light" />
      </div>
    </section>

    <FinalCTA title="Vous ne savez pas par quel service commencer ?" text="C'est normal. Le diagnostic sert justement a identifier l'etape qui creera le plus d'impact en premier." button="Faire mon diagnostic" />
  </PageLayout>
);

export default ServicesPage;
