import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import PackSiteCard from "@/components/services/PackSiteCard";
import OptionsAdditionnelles, { Option } from "@/components/services/OptionsAdditionnelles";
import SiteQuestionnaire from "@/components/services/SiteQuestionnaire";
import { EASE } from "@/components/public/PublicPrimitives";

const optionsSite: Option[] = [
  { label: "Page supplementaire standard", prix: "+5 000 FCFA/page" },
  { label: "Page supplementaire avec fonctionnalite avancee", prix: "+10 000 FCFA/page" },
  {
    label: "Redaction de contenu",
    prix: "+25 000 FCFA",
    note: "Si vous n'avez pas encore vos textes",
  },
  {
    label: "Adresse email professionnelle additionnelle",
    prix: "1 000 FCFA/mois",
  },
  {
    label: "Support technique apres les 6 premiers mois",
    prix: "20 000 FCFA/mois",
  },
  {
    label: "Site e-commerce",
    prix: "Sur devis",
    note: "Apres un appel de cadrage de 30 minutes",
  },
];

export default function ServicesSiteInternetPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Creation de Site Internet Vitrine a Abidjan | LGM</title>
        <meta
          name="description"
          content="Site internet professionnel cle en main a 165 000 FCFA : design responsive, SEO, hebergement, email. Remplissez notre questionnaire pour votre devis personnalise."
        />
        <link rel="canonical" href="https://lgm.marketing/services/site-internet" />
        <meta property="og:title" content="Creation de Site Internet Vitrine | LGM" />
        <meta property="og:description" content="Site vitrine professionnel a 165 000 FCFA, cle en main. Design, SEO, hebergement et email inclus." />
        <meta property="og:url" content="https://lgm.marketing/services/site-internet" />
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
              <p className="section-kicker">Site Internet</p>
              <h1 className="public-h1">
                Ta presence{" "}
                <span className="corporate-accent">professionnelle</span>{" "}
                en ligne
              </h1>
              <p className="public-lead">
                Un site vitrine complet, responsive et optimise pour le mobile. Domaine, hebergement et email inclus des la premiere annee. Remplis le questionnaire et on te propose quelque chose de precis.
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
              <Link to="/services/logo" className="btn-cobalt-outline">
                Voir aussi : Creation de Logo
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
              <p className="font-display text-[1.8rem] font-extrabold leading-none" style={{ color: "var(--cobalt-light)" }}>165 000</p>
              <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: "rgba(246,248,251,0.48)" }}>FCFA cle en main</p>
            </div>
            <div>
              <p className="font-display text-[1.8rem] font-extrabold leading-none" style={{ color: "var(--cobalt-light)" }}>5 pages</p>
              <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: "rgba(246,248,251,0.48)" }}>Incluses</p>
            </div>
            <div>
              <p className="font-display text-[1.8rem] font-extrabold leading-none" style={{ color: "var(--cobalt-light)" }}>6 mois</p>
              <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: "rgba(246,248,251,0.48)" }}>Support inclus</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PACK SITE */}
      <PackSiteCard onScrollToForm={scrollToForm} formRef={formRef} />

      {/* OPTIONS ADDITIONNELLES */}
      <OptionsAdditionnelles
        titre="Options additionnelles"
        options={optionsSite}
        theme="light"
      />

      {/* SECTION POURQUOI UN SITE - separateur visuel */}
      <section className="section-charcoal section-pad-tight">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                titre: "Mobile avant tout",
                texte: "Plus de 80% de vos visiteurs viennent sur mobile. Votre site est concu pour offrir une experience optimale sur smartphone des le depart.",
              },
              {
                titre: "Visible sur Google",
                texte: "Configuration SEO de base incluse : balises, vitesse, structure. Votre site est optimise pour etre trouve par vos clients potentiels.",
              },
              {
                titre: "Votre marque, votre adresse",
                texte: "Nom de domaine et email professionnel inclus la premiere annee. Fini les emails @gmail, votre marque est assise sur des bases solides.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.titre}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.64, delay: i * 0.1, ease: EASE }}
                className="public-card p-6"
              >
                <h3
                  className="mb-3 font-display text-[1.1rem] font-bold leading-snug"
                  style={{ color: "var(--cobalt-light)" }}
                >
                  {item.titre}
                </h3>
                <p className="public-body">{item.texte}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONNAIRE */}
      <section
        className="section-charcoal section-pad"
        ref={formRef}
        id="questionnaire"
        style={{
          scrollMarginTop: "5rem",
          background: "radial-gradient(circle at 85% 15%, rgba(215,180,106,0.1), transparent 28%), linear-gradient(180deg, #09101d 0%, var(--charcoal) 100%)",
        }}
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
              Quelques questions pour comprendre votre projet. On vous revient avec une proposition concrete sous 24 a 48h.
            </p>
          </motion.div>

          <SiteQuestionnaire />
        </div>
      </section>
    </PageLayout>
  );
}
