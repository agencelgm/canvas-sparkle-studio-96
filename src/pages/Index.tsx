import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import SystemDiagram from "@/components/system/SystemDiagram";
import { Arrow, FinalCTA, TextLink } from "@/components/public/PublicPrimitives";
import { publicServices } from "@/data/publicContent";
import { serviceSystemRoles, systemSteps } from "@/data/systemContent";
import { faqSchema, localBusinessSchema, websiteSchema } from "@/lib/faqSchema";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

const title = "LGM | Systeme d'acquisition client, agence marketing Abidjan";
const description = "LGM relie campagnes, pages, qualification, CRM, rendez-vous, vente et fidelisation dans un systeme complet pour les entreprises d'Abidjan.";

const problems = [
  { n: "01", t: "Des campagnes sans suite", d: "La publicite amene des clics, mais personne ne sait ce qu'ils deviennent." },
  { n: "02", t: "Des demandes non triees", d: "Votre equipe passe son temps avec des contacts qui ne peuvent pas acheter." },
  { n: "03", t: "Des prospects qui refroidissent", d: "Sans relance ni rendez-vous rapide, les meilleures demandes partent chez un concurrent." },
  { n: "04", t: "Des clients qui ne reviennent pas", d: "Une vente conclue n'est jamais suivie, le cout d'acquisition reste eleve." },
];

const Index = () => {
  const stageServices = serviceSystemRoles.filter((r) => r.role === "etape");
  const supportServices = serviceSystemRoles.filter((r) => r.role === "soutien");
  const svc = (slug: string) => publicServices.find((s) => s.slug === slug);

  return (
    <PageLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:locale" content="fr_CI" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Hero />

      {/* Probleme */}
      <section className="section-platinum section-pad-tight">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker !text-cobalt-dark">Le constat</p>
            <h2 className="public-h2 text-platinum-text">Des actions isolees ne font pas un systeme.</h2>
            <p className="public-lead text-platinum-muted">
              La plupart des entreprises achetent de la publicite, un site ou un CRM separement. Chaque outil fonctionne seul, et les prospects se perdent entre deux.
            </p>
          </div>
          <ol className="border-t border-[rgba(16,24,39,0.14)]">
            {problems.map((p) => (
              <li key={p.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[rgba(16,24,39,0.12)] py-5">
                <span className="font-display text-xl font-bold text-cobalt-dark">{p.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase leading-none text-platinum-text">{p.t}</h3>
                  <p className="public-body mt-2 text-platinum-muted">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Systeme */}
      <section className="section-charcoal section-pad-tight">
        <div className="container-wide">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-kicker">La methode ACF</p>
              <h2 className="public-h2 max-w-[18ch]">Six etapes reliees, une seule boucle de mesure.</h2>
              <p className="public-lead">
                Acquisition, Conversion, Fidelisation : chaque etape a un role, un indicateur et des outils. Survolez ou parcourez les etapes au clavier pour voir ce qu'elles font.
              </p>
            </div>
            <TextLink to="/systeme-acquisition">Explorer le systeme en detail</TextLink>
          </div>
          <SystemDiagram />
        </div>
      </section>

      {/* Services relies */}
      <section className="section-platinum section-pad-tight">
        <div className="container-wide">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-kicker !text-cobalt-dark">Services relies</p>
              <h2 className="public-h2 max-w-[18ch] text-platinum-text">Chaque service a sa place dans le parcours.</h2>
            </div>
            <Link to="/services" className="public-text-link !text-cobalt-dark">Tous les services <Arrow /></Link>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <ul className="border-t border-[rgba(16,24,39,0.14)]">
              {stageServices.map((r) => {
                const s = svc(r.slug);
                if (!s) return null;
                return (
                  <li key={r.slug}>
                    <Link to={`/services/${r.slug}`} className="group grid gap-2 border-b border-[rgba(16,24,39,0.12)] py-5 sm:grid-cols-[0.9fr_1fr_auto] sm:items-center sm:gap-6">
                      <span className="font-display text-2xl font-bold uppercase leading-none text-platinum-text group-hover:text-cobalt-dark">{s.title}</span>
                      <span className="text-sm text-platinum-muted">
                        <strong className="text-platinum-text">{r.steps.map((id) => systemSteps.find((x) => x.id === id)?.title).join(" · ")}</strong> — {r.roleText}
                      </span>
                      <Arrow className="hidden text-cobalt-dark sm:block" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <aside className="panel-light p-6">
              <p className="section-kicker !text-cobalt-dark">Soutiens transversaux</p>
              <p className="public-body text-platinum-muted">Ils ne sont pas une etape : ils renforcent tout le parcours.</p>
              <ul className="mt-5 space-y-4">
                {supportServices.map((r) => {
                  const s = svc(r.slug);
                  if (!s) return null;
                  return (
                    <li key={r.slug}>
                      <Link to={`/services/${r.slug}`} className="font-display text-xl font-bold uppercase text-platinum-text underline-offset-4 hover:underline">{s.title}</Link>
                      <p className="text-sm text-platinum-muted">{r.benefit}</p>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <SocialProof />
      <FAQ />

      <FinalCTA
        title="Quelle etape de votre parcours perd le plus de clients ?"
        text="Le diagnostic en quelques etapes permet de le savoir et de verifier si LGM peut vous aider, avant tout appel."
        button="Faire mon diagnostic"
      />
    </PageLayout>
  );
};

export default Index;
