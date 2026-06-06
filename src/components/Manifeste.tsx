import { motion } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const Manifeste = () => (
  <section
    style={{
      background: "var(--ivory)",
      color: "var(--ivory-text)",
      paddingTop: "clamp(5.5rem, 14vw, 11rem)",
      paddingBottom: "clamp(5.5rem, 14vw, 11rem)",
    }}
  >
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {/* Opening quote mark — decorative, Cormorant Garamond */}
        <div
          className="font-serif italic select-none"
          style={{
            fontSize: "6rem",
            lineHeight: 0.75,
            color: "rgba(196, 154, 42, 0.18)",
            marginBottom: "0.6rem",
            fontWeight: 400,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* The manifeste */}
        <blockquote>
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(1.65rem, 3.8vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "-0.016em",
              color: "var(--ivory-text)",
              textWrap: "balance",
              maxWidth: "22ch",
            }}
          >
            Nous ne faisons pas de la publicité. Nous construisons des systèmes
            qui transforment des inconnus en clients fidèles.
          </p>

          {/* Attribution */}
          <footer className="mt-9 flex items-center gap-4">
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "var(--akan-gold)",
              }}
            />
            <cite
              className="font-sans not-italic"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--ivory-muted)",
              }}
            >
              La méthode ACF — LGM
            </cite>
          </footer>
        </blockquote>
      </motion.div>
    </div>
  </section>
);

export default Manifeste;
