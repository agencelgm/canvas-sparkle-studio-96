import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SystemJourney from "@/components/system/SystemJourney";
import { FinalCTA, TextLink } from "@/components/public/PublicPrimitives";
import { measureLoop, systemSteps } from "@/data/systemContent";
import { OG_IMAGE, absUrl, breadcrumbSchema } from "@/lib/site";

const title = "Systeme d'acquisition client en 6 etapes | LGM Abidjan";
const description = "Attirer, capter, qualifier, obtenir un rendez-vous, vendre, fideliser : le systeme LGM relie chaque etape et la mesure chaque semaine.";
const url = absUrl("/systeme-acquisition");

const SystemeAcquisitionPage = () => (
  <PageLayout>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Systeme d'acquisition" }]))}</script>
    </Helmet>

    <section className="public-page-hero !min-h-0">
      <div className="container-wide relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)] lg:items-start">
        <div>
          <Breadcrumbs className="mb-6" items={[{ label: "Accueil", to: "/" }, { label: "Systeme d'acquisition" }]} />
          <p className="section-kicker">Le systeme LGM</p>
          <h1 className="public-h1">Six etapes. Un seul parcours client.</h1>
          <p className="public-lead">
            Un client ne passe pas directement de la publicite a l'achat. Il vous decouvre, laisse ses coordonnees, est qualifie, prend rendez-vous, achete puis revient. LGM construit et relie chacune de ces etapes.
          </p>
          <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Sommaire des etapes">
            {systemSteps.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block rounded-lg border border-[#f0d99633] px-3 py-2 text-sm font-semibold text-platinum/80 hover:border-cobalt-light hover:text-platinum">
                  <span className="text-cobalt-light">{s.number}</span> {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <DiagnosticHeroSlot sourcePage="systeme-acquisition-hero" />
      </div>
    </section>

    <section className="section-charcoal section-pad-tight" aria-labelledby="etapes-titre">
      <div className="container-wide">
        <h2 id="etapes-titre" className="sr-only">Les six etapes du systeme</h2>
        <SystemJourney />
      </div>
    </section>

    <section className="section-platinum section-pad-tight">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="section-kicker !text-cobalt-dark">La boucle</p>
          <h2 className="public-h2 text-platinum-text">{measureLoop.title} en continu.</h2>
          <p className="public-lead text-platinum-muted">{measureLoop.text}</p>
          <ul className="mt-6 space-y-2 text-platinum-text">
            {measureLoop.points.map((p) => (
              <li key={p} className="flex gap-3 font-semibold"><span className="text-cobalt-dark" aria-hidden="true">●</span>{p}</li>
            ))}
          </ul>
          <div className="mt-8"><TextLink tone="light" to="/services">Voir les services qui composent le systeme</TextLink></div>
        </div>
        <figure className="panel-light p-6" aria-label="Schema de la boucle de mesure">
          <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-sm" role="img" aria-labelledby="loop-title">
            <title id="loop-title">Les six etapes disposees en cercle autour de la mesure</title>
            <circle cx="200" cy="200" r="140" fill="none" stroke="#a97a28" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="58" fill="#101827" />
            <text x="200" y="196" textAnchor="middle" fill="#f0d996" fontFamily="Barlow Condensed" fontWeight="700" fontSize="20">MESURER</text>
            <text x="200" y="218" textAnchor="middle" fill="#f6f8fb" fontFamily="Barlow Condensed" fontWeight="600" fontSize="15">ET OPTIMISER</text>
            {systemSteps.map((s, i) => {
              const a = (i / systemSteps.length) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(a) * 140;
              const y = 200 + Math.sin(a) * 140;
              return (
                <g key={s.id}>
                  <circle cx={x} cy={y} r="34" fill="#fff" stroke="#a97a28" strokeWidth="1.5" />
                  <text x={x} y={y - 4} textAnchor="middle" fill="#a97a28" fontFamily="Barlow Condensed" fontWeight="700" fontSize="14">{s.number}</text>
                  <text x={x} y={y + 13} textAnchor="middle" fill="#101827" fontFamily="Barlow Condensed" fontWeight="700" fontSize="12">{s.title.split(" ").slice(-1)[0].toUpperCase()}</text>
                </g>
              );
            })}
          </svg>
        </figure>
      </div>
    </section>

    <FinalCTA
      title="Ou votre parcours perd-il des clients ?"
      text="Le diagnostic identifie l'etape la plus faible de votre systeme et verifie si LGM peut vous aider."
      button="Faire mon diagnostic"
    />
  </PageLayout>
);

export default SystemeAcquisitionPage;
