import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import PackLogoCards from "@/components/services/PackLogoCards";
import OptionsAdditionnelles, { Option } from "@/components/services/OptionsAdditionnelles";
import LogoPortfolioGallery from "@/components/services/LogoPortfolioGallery";
import LogoQuestionnaire from "@/components/services/LogoQuestionnaire";
import { EASE } from "@/components/public/PublicPrimitives";

const optionsLogo: Option[] = [
  { label: "Carte de visite seule", prix: "+15 000 FCFA" },
  { label: "Design pour textile (t-shirts, casquettes...)", prix: "+20 000 FCFA" },
  {
    label: "Mini kit reseaux sociaux",
    prix: "+15 000 a 20 000 FCFA",
    note: "Pour le Pack Essentiel uniquement",
  },
  { label: "Guide de marque detaille", prix: "+25 000 a 30 000 FCFA" },
];

export default function ServicesLogoPage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectPack = (pack: string) => {
    setSelectedPack(pack);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Creation de Logo & Identite Visuelle a Abidjan | LGM</title>
        <meta
          name="description"
          content="Faites creer votre logo professionnel par LGM. 3 packs disponibles a partir de 50 000 FCFA. Remplissez notre questionnaire en ligne pour recevoir votre devis personnalise."
        />
        <link rel="canonical" href="https://lgm.marketing/services/logo" />
        <meta property="og:title" content="Creation de Logo & Identite Visuelle | LGM" />
        <meta property="og:description" content="Faites creer votre logo professionnel par LGM a partir de 50 000 FCFA." />
        <meta property="og:url" content="https://lgm.marketing/services/logo" />
      </Helmet>

      {/* HERO */}
      <section className="public-page-hero">
        <div className="public-ambient public-ambient-one" aria-hidden="true" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78, ease: EASE }}
            >
              <p className="section-kicker">Logo & Identite Visuelle</p>
              <h1 className="public-h1">
                Lance ton image{" "}
                <span className="corporate-accent">professionnelle</span>
              </h1>
              <p className="public-lead">
                Trois niveaux d'offre selon ton besoin et ton budget. Remplis le questionnaire en bas de page et on te revient avec une proposition personnalisee sous 24 a 48h.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.18, ease: EASE }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button onClick={scrollToForm} className="btn-cobalt group">
                Remplir le questionnaire
                <span className="btn-arrow-orb">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <Link to="/services/site-internet" className="btn-cobalt-outline">
                Voir aussi : Site Internet
              </Link>
            </motion.div>
          </div>

          {/* Indicateurs visuels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="metric-rail mt-16 max-w-2xl"
          >
            <div>
              <p className="font-display text-[1.8rem] font-extrabold leading-none" style={{ color: "var(--cobalt-light)" }}>50 000</p>
              <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: "rgba(246,248,251,0.48)" }}>FCFA a partir de</p>
            </div>
            <div>
              <p className="font-display text-[1.8rem] font-extrabold leading-none" style={{ color: "var(--cobalt-light)" }}>4-10j</p>
              <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: "rgba(246,248,251,0.48)" }}>Delai de livraison</p>
            </div>
            <div>
              <p className="font-display text-[1.8rem] font-extrabold leading-none" style={{ color: "var(--cobalt-light)" }}>24h</p>
              <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: "rgba(246,248,251,0.48)" }}>Reponse sous</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PACKS LOGO */}
      <PackLogoCards onSelectPack={handleSelectPack} formRef={formRef} />

      {/* OPTIONS ADDITIONNELLES */}
      <OptionsAdditionnelles
        titre="Options additionnelles"
        options={optionsLogo}
        theme="light"
      />

      {/* GALERIE PORTFOLIO */}
      <LogoPortfolioGallery />

      {/* QUESTIONNAIRE */}
      <section
        className="section-charcoal section-pad"
        ref={formRef}
        id="questionnaire"
        style={{ scrollMarginTop: "5rem" }}
      >
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.72, ease: EASE }}
            className="mb-12"
          >
            <p className="section-kicker">Questionnaire de projet</p>
            <h2 className="public-h2">
              Obtenez votre devis{" "}
              <span className="corporate-accent">personnalise</span>
            </h2>
            <p className="public-lead">
              7 etapes rapides. On analyse votre projet et on vous envoie une proposition taillee a votre besoin sous 24 a 48h.
            </p>
          </motion.div>

          <LogoQuestionnaire initialPack={selectedPack} />
        </div>
      </section>
    </PageLayout>
  );
}
