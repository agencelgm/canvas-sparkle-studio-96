import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { publicImages } from "@/data/publicContent";
import { Arrow } from "@/components/public/PublicPrimitives";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-center overflow-hidden bg-espresso text-ivory md:items-end">
      <motion.img
        src={publicImages.hero}
        alt="Deux dirigeants ouest-africains dans une scene editoriale de strategie marketing"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: imageY, scale: 1.06 }}
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,11,8,0.34),rgba(13,11,8,0.14)_36%,rgba(13,11,8,0.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_64%,rgba(232,201,107,0.2),transparent_34%)]" />

      <div className="container-wide relative z-10 pb-14 pt-28 md:pb-[clamp(4rem,9vw,7rem)] md:pt-32">
        <motion.div style={{ y: titleY }} className="max-w-6xl">
          <p className="section-kicker">Agence marketing digital a Abidjan</p>
          <h1 className="public-h1 hero-title max-w-[11ch]">
            <span className="block">L'excellence marketing,</span>
            <span className="block editorial-accent">basee a Abidjan.</span>
          </h1>
          <p className="public-lead max-w-[54ch] text-ivory/78">
            Nous construisons des systemes qui transforment des inconnus en clients fideles : acquisition, conversion et fidelisation orchestrees pour votre marche.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-akan group">
              <span>Demander un audit</span>
              <span className="btn-arrow-orb"><Arrow /></span>
            </Link>
            <Link to="/services" className="btn-akan-outline group">
              <span>Voir les services</span>
              <span className="btn-arrow-orb"><Arrow /></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
