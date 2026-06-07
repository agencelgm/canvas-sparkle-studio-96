import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/canvas/ParticleBackground";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

const CTA = () => {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-background">
      {/* Dense particle field for cinematic depth */}
      <ParticleBackground count={150} color="#2F6BFF" size={0.009} spread={14} />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,162,39,0.07) 0%, rgba(201,162,39,0.02) 50%, transparent 75%)",
        }}
      />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.25) 50%, transparent 100%)" }}
      />

      <div className="container-narrow relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Kicker */}
          <p className="pill-gold mb-8 mx-auto inline-flex">
            <span className="w-1.5 h-1.5 rounded-full mr-2 self-center" style={{ background: "#2F6BFF" }} />
            Passez Ãƒ  l'action
          </p>

          {/* Headline */}
          <h2
            className="font-display text-foreground mb-6 mx-auto"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textWrap: "balance",
              maxWidth: "18ch",
            }}
          >
            Structurer votre croissance commence par une dÃƒÂ©cision.
          </h2>

          {/* Body */}
          <p
            className="text-muted-foreground font-sans leading-relaxed mb-12 mx-auto max-w-[48ch]"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)" }}
          >
            Demandez un audit. Nous analysons votre situation et identifions si LGM peut vraiment vous aider avant de planifier un appel.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="#diagnostic" onClick={() => window.setTimeout(() => scrollToDiagnostic(), 0)}>
              <button className="btn-gold group flex items-center gap-3">
                Demander un audit
                <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Link>
            <Link to="/services">
              <button className="btn-gold-outline">
                Voir nos services
              </button>
            </Link>
          </div>

          {/* Trust micro-line */}
          <p className="text-muted-foreground/50 font-sans text-xs mt-8 tracking-wide uppercase">
            Sans engagement Ã¢â‚¬â€ RÃƒÂ©ponse sous 24h
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
