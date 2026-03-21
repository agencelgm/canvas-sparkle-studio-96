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
        <title>LGM — Agence de Marketing Digital et Communication à Abidjan</title>
        <meta 
          name="description" 
          content="LGM est l'agence de marketing digital à Abidjan spécialisée en résultats tangibles. Obtenez plus de prospects qualifiés et augmentez votre chiffre d'affaires grâce à des stratégies éprouvées." 
        />
        <meta name="keywords" content="marketing digital abidjan, communication abidjan, agence marketing côte d'ivoire, leads qualifiés, publicité digitale, automatisation IA, SEO abidjan, génération leads, développement web abidjan" />
        <link rel="canonical" href="https://lgm.marketing" />
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
