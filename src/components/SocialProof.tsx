import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

/* Reusable animated counter — same engine as Results.tsx */
function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(target * ease(progress)));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const miniStats = [
  { value: 12, suffix: "+", label: "clients accompagnés sur 6 mois+" },
  { value: 90, suffix: " jours", label: "délai moyen pour les premiers résultats" },
];

const SocialProof = () => (
  <section
    style={{
      background: "var(--ivory)",
      paddingTop: "clamp(5.5rem, 14vw, 10rem)",
      paddingBottom: "clamp(5.5rem, 14vw, 10rem)",
    }}
  >
    <div className="container-wide">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left — Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* Decorative quote */}
          <div
            className="font-serif italic select-none"
            style={{
              fontSize: "5rem",
              lineHeight: 0.8,
              color: "rgba(196, 154, 42, 0.15)",
              marginBottom: "1.25rem",
              fontWeight: 400,
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <blockquote>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)",
                fontWeight: 400,
                lineHeight: 1.45,
                letterSpacing: "-0.012em",
                color: "var(--ivory-text)",
                maxWidth: "36ch",
                textWrap: "pretty",
              }}
            >
              En trois mois, LGM a transformé notre acquisition. On est passé de{" "}
              <em style={{ color: "#8B6914" }}>12 leads par mois à plus de 90</em>, tous qualifiés.
              Leur méthode n'est pas du marketing — c'est de l'ingénierie commerciale.
            </p>

            <footer className="mt-8 flex items-center gap-4">
              {/* Avatar initials */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(196, 154, 42, 0.12)",
                  border: "1px solid rgba(196, 154, 42, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  className="font-display"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em", color: "#8B6914", fontWeight: 700 }}
                >
                  MK
                </span>
              </div>
              <div>
                <cite
                  className="font-sans not-italic"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--ivory-text)",
                  }}
                >
                  Moussa Konaté
                </cite>
                <span
                  className="font-sans"
                  style={{ fontSize: "0.75rem", color: "var(--ivory-muted)" }}
                >
                  Directeur Commercial, Immotech CI
                </span>
              </div>
            </footer>
          </blockquote>
        </motion.div>

        {/* Right — Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
        >
          {/* Gold rule top */}
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "var(--akan-gold)",
              marginBottom: "2rem",
            }}
          />

          {/* Big animated stat */}
          <div
            className="font-display"
            style={{
              fontSize: "clamp(4rem, 9vw, 7.5rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ color: "var(--akan-gold)" }}>
              ×<Counter target={7} duration={1400} />
            </span>
          </div>

          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--ivory-text)",
              marginBottom: "1.25rem",
            }}
          >
            de retour sur investissement moyen
            <br />constaté chez nos clients à 6 mois.
          </p>

          <p
            className="font-sans"
            style={{
              fontSize: "0.84rem",
              lineHeight: 1.68,
              color: "var(--ivory-muted)",
              maxWidth: "38ch",
              marginBottom: "2rem",
            }}
          >
            Ce chiffre n'est pas une promesse. C'est la médiane mesurée sur nos clients
            accompagnés sur au moins 6 mois — acquisition, conversion et fidélisation activées ensemble.
          </p>

          {/* Mini-stats */}
          <div
            className="grid grid-cols-2 gap-5"
            style={{
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(196, 154, 42, 0.18)",
            }}
          >
            {miniStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: EASE }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "var(--ivory-text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} duration={1200} />
                </div>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "0.75rem",
                    lineHeight: 1.45,
                    color: "var(--ivory-muted)",
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom context */}
          <p
            className="font-sans mt-4"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(42,31,14,0.3)",
            }}
          >
            Abidjan · Dakar · Douala · 2022–2025
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default SocialProof;
