import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import QualificationForm from "@/components/QualificationForm";
import { publicImages } from "@/data/publicContent";
import { Arrow } from "@/components/public/PublicPrimitives";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-center overflow-hidden bg-charcoal text-platinum md:items-end">
      <motion.img
        src={publicImages.hero}
        alt="Studio creatif premium avec mur de campagnes, prototypes marketing et direction de croissance"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: imageY, scale: 1.06 }}
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.34),rgba(7,11,18,0.14)_36%,rgba(7,11,18,0.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_64%,rgba(215,180,106,0.18),transparent_34%)]" />

      <div className="container-wide relative z-10 grid gap-10 pb-14 pt-28 md:pb-[clamp(4rem,9vw,7rem)] md:pt-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:items-start">
        <motion.div style={{ y: titleY }} className="max-w-6xl">
          <p className="section-kicker">Agence marketing et communication a Abidjan</p>
          <h1 className="public-h1 hero-title max-w-[11ch]">
            <span className="block">Croissance digitale,</span>
            <span className="block corporate-accent">pilotee avec methode.</span>
          </h1>
          <p className="public-lead max-w-[54ch] text-platinum/78">
            LGM aide les entreprises a Abidjan et dans les marches francophones a generer des prospects, lancer des campagnes Facebook, renforcer leur SEO/AEO/GEO et automatiser leur suivi commercial.
          </p>
          <div className="mt-8">
            <Link to="#diagnostic" onClick={() => window.setTimeout(() => scrollToDiagnostic(), 0)} className="btn-cobalt group">
              <span>Demander un audit</span>
              <span className="btn-arrow-orb"><Arrow /></span>
            </Link>
          </div>
        </motion.div>
        <motion.div id="diagnostic" className="diagnostic-hero-panel" style={{ y: imageY }}>
          <QualificationForm sourcePage="home-hero" variant="hero" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
