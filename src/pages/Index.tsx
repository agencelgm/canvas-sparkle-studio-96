import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Promise from "@/components/Promise";
import Method from "@/components/Method";
import Services from "@/components/Services";
import Audience from "@/components/Audience";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LGM — Agence Marketing à Abidjan | De la stratégie aux résultats mesurables</title>
        <meta 
          name="description" 
          content="LGM est un cabinet stratégique de croissance à Abidjan. Nous structurons votre système de revenus : marketing, vente, tracking et automatisation. Résultats mesurables garantis." 
        />
        <meta name="keywords" content="agence marketing abidjan, cabinet stratégique, croissance entreprise, génération leads, SEO Abidjan" />
        <link rel="canonical" href="https://lgm.ci" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Problem />
          <Promise />
          <Method />
          <Services />
          <Audience />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
