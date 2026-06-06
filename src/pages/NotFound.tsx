import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import { ImageFrame, MagneticLink, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages } from "@/data/publicContent";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <Helmet>
        <title>Page introuvable | LGM</title>
        <meta name="description" content="Cette page LGM est introuvable. Retournez a l'accueil ou contactez l'agence." />
      </Helmet>

      <section className="public-page-hero min-h-[100dvh]">
        <div className="container-wide relative z-10 grid gap-10 pt-32 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <Reveal>
            <p className="section-kicker">404</p>
            <h1 className="public-h1 max-w-[10ch]">Cette page n'est plus ici.</h1>
            <p className="public-lead">Le chemin demande ne correspond a aucune page publique. Repartons sur une route utile.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticLink to="/">Retour a l'accueil</MagneticLink>
              <Link to="/services" className="btn-akan-outline">Voir les services</Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ImageFrame src={publicImages.blog} alt="Composition editoriale LGM pour page introuvable" className="min-h-[420px]" />
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
