import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TEXT_PHASES = [
  {
    range: [0, 0.2] as [number, number],
    kicker: "Le dÃ©fi de toute entreprise",
    headline: "Et si votre croissance\ndÃ©pendait d'un seul systÃ¨me ?",
    body: "La plupart des entreprises travaillent sans mÃ©thode. RÃ©sultat : stagnation, frustration, chiffre d'affaires en dents de scie.",
    cta: false,
  },
  {
    range: [0.2, 0.4] as [number, number],
    kicker: "Levier 01",
    headline: "Acquisition",
    body: "PublicitÃ©s, SEO, rÃ©seaux sociaux â€” chaque jour, des prospects qualifiÃ©s entrent dans votre systÃ¨me. En flux continu.",
    cta: false,
  },
  {
    range: [0.4, 0.6] as [number, number],
    kicker: "Levier 02",
    headline: "Conversion",
    body: "Ces prospects deviennent des clients. Pas plus tard. Maintenant. Avec les bons outils, le bon suivi, la bonne mÃ©thode.",
    cta: false,
  },
  {
    range: [0.6, 0.8] as [number, number],
    kicker: "Levier 03",
    headline: "FidÃ©lisation",
    body: "Vos clients reviennent, rachÃ¨tent, vous recommandent. Le cycle de croissance tourne, sans vous Ã©puiser.",
    cta: false,
  },
  {
    range: [0.8, 1.0] as [number, number],
    kicker: "Le rÃ©sultat",
    headline: "+277%",
    body: "C'est ce qui se passe quand les 3 leviers travaillent ensemble. Un systÃ¨me. Une mÃ©thode. Des rÃ©sultats.",
    cta: true,
  },
];

const VideoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll â†’ video.currentTime
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !videoReady || prefersReducedMotion) return;
    const duration = video.duration;
    if (!duration || isNaN(duration)) return;
    video.currentTime = latest * duration;

    // Update active phase
    for (let i = 0; i < TEXT_PHASES.length; i++) {
      const [start, end] = TEXT_PHASES[i].range;
      if (latest >= start && latest < end) {
        setActivePhase(i);
        break;
      }
      if (latest >= 0.95) setActivePhase(TEXT_PHASES.length - 1);
    }
  });

  // Parallax on the gradient overlay
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0.55, 0.45, 0.45, 0.65]);

  const phase = TEXT_PHASES[activePhase];

  return (
    <div
      ref={containerRef}
      style={{ height: "250vh" }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100dvh" }}>

        {/* Video layer â€” full cover */}
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          playsInline
          muted
          preload="auto"
          onLoadedMetadata={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: "none" }}
        />

        {/* Gradient vignette */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.3) 70%, rgba(10,10,10,0.8) 100%)",
            opacity: overlayOpacity,
          }}
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.95))" }}
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Kicker */}
                <p className="pill-gold mb-4 inline-flex">
                  <span
                    className="w-1.5 h-1.5 rounded-full mr-2 self-center"
                    style={{ background: "#2F6BFF" }}
                  />
                  {phase.kicker}
                </p>

                {/* Headline */}
                <h1
                  className="font-display text-foreground leading-tight mb-4"
                  style={{
                    fontSize: activePhase === 4
                      ? "clamp(4rem, 12vw, 9rem)"
                      : "clamp(2.25rem, 5vw, 4.5rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    textWrap: "balance",
                    whiteSpace: "pre-line",
                  }}
                >
                  {activePhase === 4 ? (
                    <span className="text-gold-shimmer">{phase.headline}</span>
                  ) : (
                    phase.headline
                  )}
                </h1>

                {/* Body */}
                <p
                  className="text-foreground/75 font-sans leading-relaxed mb-8 max-w-[52ch]"
                  style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)" }}
                >
                  {phase.body}
                </p>

                {/* CTA â€” only on last phase */}
                {phase.cta && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link to="/contact">
                      <button className="btn-gold group flex items-center gap-3">
                        DÃ©couvrir la mÃ©thode
                        <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </Link>
                    <Link to="/services">
                      <button className="btn-gold-outline">
                        Nos services
                      </button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicator */}
          <div className="absolute right-6 md:right-10 bottom-1/2 translate-y-1/2 flex flex-col gap-2.5">
            {TEXT_PHASES.map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full transition-all duration-500"
                style={{
                  height: i === activePhase ? 28 : 10,
                  background: i === activePhase ? "#2F6BFF" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Fallback for reduced motion â€” static frame with intro text */}
        {prefersReducedMotion && (
          <div className="absolute inset-0 flex items-end pb-20 px-6 md:px-12 lg:px-20 pointer-events-none">
            <div className="max-w-3xl">
              <p className="pill-gold mb-4 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full mr-2 self-center" style={{ background: "#2F6BFF" }} />
                MÃ©thode LGM
              </p>
              <h1 className="font-display text-foreground leading-tight mb-4"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Un systÃ¨me pour accÃ©lÃ©rer votre croissance
              </h1>
              <p className="text-foreground/75 font-sans leading-relaxed mb-8 max-w-[52ch]"
                style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)" }}>
                Acquisition, Conversion, FidÃ©lisation â€” les 3 leviers que toute entreprise doit activer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHero;
