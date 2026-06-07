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
import { faqSchema, localBusinessSchema, websiteSchema } from "@/lib/faqSchema";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LGM | Agence marketing et communication a Abidjan</title>
        <meta
          name="description"
          content="Agence marketing et communication a Abidjan : publicite digitale, Facebook Ads, generation de leads, SEO/AEO/GEO, logo, sites web, IA, automatisation et logiciels sur mesure."
        />
        <meta
          name="keywords"
          content="agence marketing Abidjan, agence de communication Abidjan, entreprise de marketing, agence de publicite, agence Facebook, services Facebook, generation de leads, SEO Abidjan, AEO, GEO, creation de logo, automatisation IA, logiciel sur mesure"
        />
        <link rel="canonical" href="https://lgm.marketing" />
        <meta property="og:title" content="LGM | Agence marketing et communication a Abidjan" />
        <meta property="og:description" content="Publicite digitale, Facebook Ads, SEO/AEO/GEO, logo, sites web, IA, automatisation et logiciels sur mesure pour entreprises ambitieuses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lgm.marketing" />
        <meta property="og:locale" content="fr_CI" />
        <meta property="og:image" content={`https://lgm.marketing${publicImages.og}`} />
        <meta name="twitter:image" content={`https://lgm.marketing${publicImages.og}`} />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
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
