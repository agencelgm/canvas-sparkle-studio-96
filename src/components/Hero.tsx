import { Link } from "react-router-dom";
import QualificationForm from "@/components/QualificationForm";
import { publicImages } from "@/data/publicContent";
import { Arrow } from "@/components/public/PublicPrimitives";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

const chain = ["Campagnes", "Pages", "Qualification", "CRM", "Rendez-vous", "Vente", "Fidelisation"];

const Hero = () => (
  <section className="relative overflow-hidden bg-charcoal text-platinum">
    <img
      src={publicImages.hero}
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-35"
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,11,18,0.96)_30%,rgba(7,11,18,0.7)_65%,rgba(7,11,18,0.85))]" />

    <div className="container-wide relative z-10 grid gap-12 pb-24 pt-32 md:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)] lg:items-start">
      <div>
        <p className="section-kicker">Agence marketing a Abidjan</p>
        <h1 className="public-h1 max-w-[13ch]">
          Un systeme complet pour <span className="text-cobalt-light">attirer, convertir et fideliser</span> vos clients.
        </h1>
        <p className="public-lead text-platinum/80">
          LGM relie vos campagnes, vos pages, la qualification de vos prospects, votre CRM, la prise de rendez-vous, la vente et la fidelisation. Chaque piece alimente la suivante, et tout est mesure.
        </p>

        <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-semibold text-platinum/75" aria-label="Le parcours relie par LGM">
          {chain.map((c, i) => (
            <li key={c} className="flex items-center gap-2">
              <span className="rounded-full border border-[#f0d99640] px-3 py-1">{c}</span>
              {i < chain.length - 1 && <span aria-hidden="true" className="text-cobalt-light">→</span>}
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="#diagnostic" onClick={() => window.setTimeout(() => scrollToDiagnostic(), 0)} className="btn-cobalt group">
            <span>Faire mon diagnostic</span>
            <span className="btn-arrow-orb"><Arrow /></span>
          </Link>
          <Link to="/systeme-acquisition" className="btn-cobalt-outline">Voir comment ca marche</Link>
        </div>
      </div>

      <div id="diagnostic" className="diagnostic-hero-panel">
        <QualificationForm sourcePage="home-hero" variant="hero" />
      </div>
    </div>
  </section>
);

export default Hero;
