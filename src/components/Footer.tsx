import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const Footer = () => (
  <footer
    style={{
      background: "var(--espresso)",
      borderTop: "1px solid rgba(196, 154, 42, 0.10)",
      paddingTop: "clamp(3.5rem, 8vw, 5.5rem)",
      paddingBottom: "2.5rem",
    }}
  >
    <div className="container-wide">
      {/* Main grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* Col 1 — Brand */}
        <div>
          <Link to="/" aria-label="LGM — accueil">
            <img
              src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png"
              alt="LGM"
              style={{ height: "36px", width: "auto", marginBottom: "1.25rem" }}
            />
          </Link>
          <p
            className="font-sans"
            style={{
              fontSize: "0.83rem",
              lineHeight: 1.68,
              color: "rgba(240, 232, 213, 0.38)",
              maxWidth: "28ch",
            }}
          >
            L'agence qui transforme des inconnus en clients fidèles. Acquisition,
            Conversion, Fidélisation — Abidjan.
          </p>

          {/* Social links */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://facebook.com/lgmmarketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LGM sur Facebook"
              style={{ color: "rgba(240,232,213,0.3)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--akan-gold-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,232,213,0.3)")}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/lgmmarketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LGM sur Instagram"
              style={{ color: "rgba(240,232,213,0.3)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--akan-gold-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,232,213,0.3)")}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/2250767009629"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LGM sur WhatsApp"
              style={{ color: "rgba(240,232,213,0.3)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--akan-gold-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,232,213,0.3)")}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div>
          <p
            className="font-display mb-5"
            style={{
              fontSize: "0.63rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240, 232, 213, 0.28)",
              fontWeight: 700,
            }}
          >
            Navigation
          </p>
          <nav className="flex flex-col gap-3" aria-label="Navigation footer">
            {[
              { href: "/a-propos", label: "À propos" },
              { href: "/services", label: "Services" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="font-sans"
                style={{
                  fontSize: "0.84rem",
                  color: "rgba(240, 232, 213, 0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0E8D5")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240, 232, 213, 0.45)")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <p
            className="font-display mb-5"
            style={{
              fontSize: "0.63rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240, 232, 213, 0.28)",
              fontWeight: 700,
            }}
          >
            Contact
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:contact@lgm.marketing"
              className="font-sans"
              style={{
                fontSize: "0.84rem",
                color: "rgba(240, 232, 213, 0.45)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0E8D5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240, 232, 213, 0.45)")}
            >
              contact@lgm.marketing
            </a>
            <a
              href="tel:+2250767009629"
              className="font-sans"
              style={{
                fontSize: "0.84rem",
                color: "rgba(240, 232, 213, 0.45)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0E8D5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240, 232, 213, 0.45)")}
            >
              +225 07 67 00 96 29
            </a>
            <p
              className="font-sans"
              style={{ fontSize: "0.82rem", color: "rgba(240, 232, 213, 0.28)", lineHeight: 1.55 }}
            >
              Château, Camp Militaire
              <br />
              Angré, Abidjan
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(196, 154, 42, 0.08)",
          paddingTop: "1.5rem",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <p
          className="font-sans"
          style={{ fontSize: "0.72rem", color: "rgba(240, 232, 213, 0.22)" }}
        >
          © {new Date().getFullYear()} LGM — Les Gens du Marketing. Tous droits réservés.
        </p>
        <div className="flex gap-5">
          <Link
            to="/mentions-legales"
            className="font-sans"
            style={{ fontSize: "0.72rem", color: "rgba(240, 232, 213, 0.22)", textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,232,213,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,232,213,0.22)")}
          >
            Mentions légales
          </Link>
          <Link
            to="/confidentialite"
            className="font-sans"
            style={{ fontSize: "0.72rem", color: "rgba(240, 232, 213, 0.22)", textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,232,213,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,232,213,0.22)")}
          >
            Confidentialité
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
