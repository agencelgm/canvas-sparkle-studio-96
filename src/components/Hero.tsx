import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const line1 = ["L'excellence", "marketing,"];
const line2 = ["faite", "en", "Afrique."];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "var(--espresso)" }}
    >
      {/* ── Background editorial image with parallax ──────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY }}
        aria-hidden="true"
      >
        <img
          src="/images/hero-editorial.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.12)", transformOrigin: "center 40%" }}
        />
        {/* Layered dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,11,8,0.72) 0%, rgba(13,11,8,0.22) 45%, rgba(13,11,8,0.82) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,11,8,0.28)" }}
        />
      </motion.div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div
        className="container-wide relative z-10"
        style={{ paddingTop: "clamp(7rem, 18vh, 12rem)", paddingBottom: "5rem" }}
      >
        <div style={{ maxWidth: "820px" }}>

          {/* Headline */}
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.9rem, 7.8vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              color: "#F5EFE0",
              marginBottom: "0.08em",
              textWrap: "balance",
            }}
          >
            {/* Line 1 */}
            <span className="block overflow-hidden">
              {line1.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  style={{ marginRight: "0.24em" }}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.72, delay: 0.18 + i * 0.13, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2 — italic gold */}
            <span
              className="block overflow-hidden italic"
              style={{ color: "var(--akan-gold-light)" }}
            >
              {line2.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  style={{ marginRight: "0.24em" }}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.72, delay: 0.42 + i * 0.10, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Gold divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.75, ease: EASE }}
            style={{
              height: "1px",
              width: "52px",
              background: "var(--akan-gold)",
              transformOrigin: "left",
              margin: "1.75rem 0",
            }}
          />

          {/* Subtitle */}
          <motion.p
            className="font-sans"
            style={{
              fontSize: "clamp(0.95rem, 1.75vw, 1.08rem)",
              lineHeight: 1.72,
              color: "rgba(245, 239, 224, 0.66)",
              maxWidth: "46ch",
              marginBottom: "2.5rem",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
          >
            Nous construisons des systèmes qui transforment des inconnus en clients
            fidèles. Acquisition, Conversion, Fidélisation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          >
            <Link to="/contact">
              <button className="btn-akan group">
                Démarrer votre croissance
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ background: "rgba(13,11,8,0.22)" }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8L8 2M8 2H4M8 2V6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </Link>
            <button
              className="btn-akan-outline"
              onClick={() =>
                document
                  .getElementById("framework")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Notre méthode ACF
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — vertical line only, no text */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <div
          style={{
            width: "1px",
            height: "44px",
            background:
              "linear-gradient(to bottom, transparent, rgba(196,154,42,0.45))",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
