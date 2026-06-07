import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { MagneticLink, Reveal } from "@/components/public/PublicPrimitives";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <Helmet>
        <title>Page introuvable | LGM</title>
        <meta name="description" content="Cette page LGM est introuvable. Retournez a l'accueil ou demandez un audit marketing." />
      </Helmet>

      <section className="public-page-hero min-h-[100dvh]">
        <div className="container-wide relative z-10 grid gap-10 pt-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:items-start">
          <Reveal>
            <p className="section-kicker">404</p>
            <h1 className="public-h1 max-w-[10ch]">Cette page n'est plus ici.</h1>
            <p className="public-lead">Le chemin demande ne correspond a aucune page publique. Repartons sur une route utile.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticLink to={{ pathname: location.pathname, hash: "#diagnostic" }}>Demander un audit</MagneticLink>
              <Link to="/" className="btn-cobalt-outline">Retour a l'accueil</Link>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="diagnostic-hero-panel">
            <DiagnosticHeroSlot sourcePage="404-hero" />
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
