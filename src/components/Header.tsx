import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { To } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "@/data/publicContent";
import { EASE } from "@/components/public/PublicPrimitives";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 48));

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => location.pathname === href || (href !== "/" && location.pathname.startsWith(`${href}/`));
  const diagnosticTo: To = { pathname: location.pathname, search: location.search, hash: "#diagnostic" };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5"
        initial={false}
      >
        <motion.div
          className="container-wide flex items-center justify-between"
          animate={{
            backgroundColor: scrolled ? "rgba(7, 11, 18, 0.82)" : "rgba(7, 11, 18, 0.38)",
            borderColor: scrolled ? "rgba(240, 217, 150, 0.22)" : "rgba(240, 217, 150, 0.10)",
            backdropFilter: "blur(20px)",
          }}
          transition={{ duration: 0.36, ease: EASE }}
          style={{
            minHeight: "64px",
            border: "1px solid rgba(240, 217, 150, 0.14)",
            borderRadius: "999px",
            boxShadow: scrolled ? "0 18px 60px rgba(0,0,0,0.24)" : "0 8px 36px rgba(0,0,0,0.12)",
          }}
        >
          <Link to="/" className="flex items-center gap-3" aria-label="LGM, accueil">
            <img
              src="/lovable-uploads/lgm-logo-light.png"
              alt="LGM"
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                style={{
                  color: isActive(href) ? "#070b12" : "rgba(246,248,251,0.72)",
                  background: isActive(href) ? "#f0d996" : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link to={diagnosticTo} onClick={() => window.setTimeout(() => scrollToDiagnostic(), 0)} className="btn-cobalt-outline min-h-0 px-5 py-2 text-[0.78rem]">
              Demander un audit
            </Link>
          </div>

          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#f0d99633] md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <motion.span
              className="absolute h-px w-5 bg-platinum"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
            <motion.span
              className="absolute h-px w-5 bg-platinum"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
          </button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-[#070b12]/95 px-5 pb-8 pt-28 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <nav className="flex flex-1 flex-col justify-center" aria-label="Navigation mobile">
              {navLinks.map(({ href, label }, index) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.36, delay: index * 0.06, ease: EASE }}
                >
                  <Link
                    to={href}
                    className="block border-b border-[#f0d9961f] py-5 font-display text-[clamp(2.2rem,11vw,4rem)] font-extrabold leading-none text-platinum"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link to={diagnosticTo} onClick={() => window.setTimeout(() => scrollToDiagnostic(), 0)} className="btn-cobalt w-full justify-center">
              Demander un audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
