import { Helmet } from "react-helmet-async";
import GrainOverlay from "@/components/GrainOverlay";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifeste from "@/components/Manifeste";
import Framework from "@/components/Framework";
import SocialProof from "@/components/SocialProof";
import Services from "@/components/Services";
import WhyLGM from "@/components/WhyLGM";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LGM — Agence de Marketing Digital à Abidjan</title>
        <meta
          name="description"
          content="LGM est l'agence de marketing digital à Abidjan. Acquisition, Conversion, Fidélisation — la méthode complète pour multiplier votre chiffre d'affaires en Afrique de l'Ouest."
        />
        <meta
          name="keywords"
          content="marketing digital abidjan, agence marketing côte d'ivoire, leads qualifiés, publicité digitale, automatisation IA, SEO abidjan, génération leads, développement web abidjan"
        />
        <link rel="canonical" href="https://lgm.marketing" />
        <meta property="og:title" content="LGM — Agence de Marketing Digital à Abidjan" />
        <meta
          property="og:description"
          content="Acquisition, Conversion, Fidélisation — la méthode pour transformer des inconnus en clients fidèles."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lgm.marketing" />
      </Helmet>

      {/* Fixed grain texture over entire page */}
      <GrainOverlay />

      <div style={{ minHeight: "100dvh", background: "var(--espresso)" }}>
        <Header />
        <main>
          {/* DARK — Hero */}
          <Hero />

          {/* CRÈME — Manifeste */}
          <Manifeste />

          {/* DARK — Framework ACF */}
          <Framework />

          {/* CRÈME — Preuve sociale */}
          <SocialProof />

          {/* DARK — Services */}
          <Services />

          {/* CRÈME — Pourquoi LGM */}
          <WhyLGM />

          {/* DARK — Contact */}
          <ContactSection />
        </main>

        {/* DARK — Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
