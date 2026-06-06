import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import VideoHero from "@/components/VideoHero";
import Problem from "@/components/Problem";
import FrameworkACF3D from "@/components/FrameworkACF3D";
import AcquisitionSection from "@/components/sections/AcquisitionSection";
import ConversionSection from "@/components/sections/ConversionSection";
import FidelisationSection from "@/components/sections/FidelisationSection";
import Results from "@/components/Results";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LGM — Agence de Marketing Digital et Communication à Abidjan</title>
        <meta
          name="description"
          content="LGM est l'agence de marketing digital à Abidjan. Acquisition, Conversion, Fidélisation — le framework complet pour multiplier votre chiffre d'affaires."
        />
        <meta name="keywords" content="marketing digital abidjan, communication abidjan, agence marketing côte d'ivoire, leads qualifiés, publicité digitale, automatisation IA, SEO abidjan, génération leads, développement web abidjan" />
        <link rel="canonical" href="https://lgm.marketing" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <VideoHero />
          <Problem />
          <FrameworkACF3D />
          <AcquisitionSection />
          <ConversionSection />
          <FidelisationSection />
          <Results />
          <Services />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
