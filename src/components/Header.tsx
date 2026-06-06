import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const navLinks = [
  { href: "/a-propos",  label: "À propos" },
  { href: "/services",  label: "Services" },
  { href: "/blog",      label: "Blog" },
  { href: "/contact",   label: "Contact" },
];

const Header = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: scrolled
            ? "rgba(13, 11, 8, 0.90)"
            : "rgba(13, 11, 8, 0)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
          borderBottom: scrolled
            ? "1px solid rgba(196, 154, 42, 0.09)"
            : "1px solid transparent",
        }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div
          className="container-wide flex items-center justify-between"
          style={{ height: "clamp(60px, 5vw, 76px)" }}
        >
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="LGM — accueil">
            <img
              src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png"
              alt="LGM"
              style={{ height: "clamp(28px, 3.2vw, 42px)", width: "auto" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Navigation principale">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="font-sans text-sm font-medium link-underline transition-colors duration-200"
                style={{
                  color: location.pathname === href
                    ? "#F0E8D5"
                    : "rgba(240, 232, 213, 0.55)",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== href)
                    (e.currentTarget as HTMLElement).style.color = "#F0E8D5";
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== href)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(240, 232, 213, 0.55)";
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact">
              <button
                className="btn-akan-outline"
                style={{ padding: "0.55rem 1.4rem", fontSize: "0.78rem", letterSpacing: "0.04em" }}
              >
                Nous contacter
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-5 h-px origin-center"
              style={{ background: "#F0E8D5" }}
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.span
              className="block w-5 h-px"
              style={{ background: "#F0E8D5" }}
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2, ease: EASE }}
            />
            <motion.span
              className="block w-5 h-px origin-center"
              style={{ background: "#F0E8D5" }}
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen overlay ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{
              background: "rgba(13, 11, 8, 0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Close at top-right (same position as hamburger) */}
            <div
              className="container-wide flex justify-end"
              style={{ height: "clamp(60px, 5vw, 76px)", alignItems: "center" }}
            >
              <button
                className="w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <span
                  className="block w-5 h-px origin-center rotate-45"
                  style={{ background: "#F0E8D5", transform: "translateY(0.5px) rotate(45deg)" }}
                />
                <span
                  className="block w-5 h-px origin-center -rotate-45"
                  style={{ background: "#F0E8D5", transform: "translateY(-0.5px) rotate(-45deg)" }}
                />
              </button>
            </div>

            {/* Links */}
            <nav
              className="flex-1 flex flex-col justify-center container-narrow"
              aria-label="Navigation mobile"
            >
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.32, delay: i * 0.06, ease: EASE }}
                >
                  <Link
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-serif border-b"
                    style={{
                      fontSize: "clamp(1.75rem, 7vw, 2.75rem)",
                      fontWeight: 400,
                      color: location.pathname === href ? "#E8C96B" : "#F0E8D5",
                      borderColor: "rgba(196, 154, 42, 0.10)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, delay: navLinks.length * 0.06 + 0.04, ease: EASE }}
                className="mt-10"
              >
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <button className="btn-akan w-full" style={{ justifyContent: "center" }}>
                    Prendre contact
                  </button>
                </Link>
              </motion.div>
            </nav>

            {/* Footer contact strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="container-narrow pb-8 pt-4"
            >
              <a
                href="mailto:contact@lgm.marketing"
                className="font-sans text-sm"
                style={{ color: "rgba(240, 232, 213, 0.4)" }}
              >
                contact@lgm.marketing
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
