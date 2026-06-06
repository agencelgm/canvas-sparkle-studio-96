import { Helmet } from "react-helmet-async";
import GrainOverlay from "@/components/GrainOverlay";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifeste from "@/components/Manifeste";
import Framework from "@/components/Framework";
import SocialProof from "@/components/SocialProof";
import Services from "@/components/Services";
import WhyLGM from "@/components/WhyLGM";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { faqSchema, localBusinessSchema } from "@/lib/faqSchema";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LGM — Agence de Marketing Digital à Abidjan</title>
        <meta
          name="description"
          content="LGM est l'agence de marketing digital à Abidjan. Acquisition, Conversion, Fidélisation — la méthode ACF pour transformer des inconnus en clients fidèles en Afrique de l'Ouest."
        />
        <meta
          name="keywords"
          content="marketing digital abidjan, agence marketing côte d'ivoire, leads qualifiés abidjan, publicité digitale afrique, SEO abidjan, génération leads côte d'ivoire, automatisation marketing IA, développement web abidjan"
        />
        <link rel="canonical" href="https://lgm.marketing" />

        {/* Open Graph */}
        <meta property="og:title" content="LGM — Agence de Marketing Digital à Abidjan" />
        <meta
          property="og:description"
          content="Acquisition, Conversion, Fidélisation — la méthode LGM pour multiplier votre chiffre d'affaires en Afrique de l'Ouest."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lgm.marketing" />
        <meta property="og:locale" content="fr_CI" />

        {/* JSON-LD — LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>

        {/* JSON-LD — FAQPage (AEO/GEO) */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Fixed grain texture over entire page */}
      <GrainOverlay />

      <div style={{ minHeight: "100dvh", background: "var(--espresso)" }}>
        <Header />
        <main>
          {/* DARK — Hero avec image éditoriale */}
          <Hero />

          {/* CRÈME — Manifeste philosophie */}
          <Manifeste />

          {/* DARK — Framework ACF animé */}
          <Framework />

          {/* CRÈME — Preuve sociale + compteurs */}
          <SocialProof />

          {/* DARK — Services éditoriaux */}
          <Services />

          {/* CRÈME — Pourquoi LGM */}
          <WhyLGM />

          {/* CRÈME — FAQ (AEO/GEO/SEO) */}
          <FAQ />

          {/* DARK — Contact Supabase */}
          <ContactSection />
        </main>

        {/* DARK — Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
