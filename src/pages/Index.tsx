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
import { publicImages } from "@/data/publicContent";
import { faqSchema, localBusinessSchema } from "@/lib/faqSchema";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LGM, agence de marketing digital a Abidjan</title>
        <meta
          name="description"
          content="LGM est l'agence de marketing digital a Abidjan. Acquisition, Conversion, Fidelisation : la methode ACF pour transformer des inconnus en clients fideles."
        />
        <meta
          name="keywords"
          content="marketing digital Abidjan, agence de communication Abidjan, agence de publicite Abidjan, agence Facebook Abidjan, creation de logo Abidjan, logiciel sur mesure Abidjan, generation leads, publicite digitale Afrique, SEO Abidjan, automatisation marketing IA, integration IA entreprise"
        />
        <link rel="canonical" href="https://lgm.marketing" />
        <meta property="og:title" content="LGM, agence de marketing digital a Abidjan" />
        <meta property="og:description" content="La methode ACF pour structurer acquisition, conversion et fidelisation a Abidjan, Cote d'Ivoire — avec accompagnements a distance au Senegal, Cameroun, Burkina Faso." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lgm.marketing" />
        <meta property="og:locale" content="fr_CI" />
        <meta property="og:image" content={publicImages.og} />
        <meta name="twitter:image" content={publicImages.og} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <GrainOverlay />
      <div className="public-shell">
        <Header />
        <main className="public-main">
          <Hero />
          <Manifeste />
          <Framework />
          <SocialProof />
          <Services />
          <WhyLGM />
          <FAQ />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
