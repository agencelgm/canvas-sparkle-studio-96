import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { To } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { navLinks } from "@/data/publicContent";
import { EASE } from "@/components/public/PublicPrimitives";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 48));

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return () => { document.body.style.overflow = ""; };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => location.pathname === href || (href !== "/" && location.pathname.startsWith(`${href}/`));
  const diagnosticTo: To = { pathname: location.pathname, search: location.search, hash: "#diagnostic" };
  const goDiagnostic = () => window.setTimeout(() => scrollToDiagnostic(), 0);

  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div
          className="container-wide flex items-center justify-between gap-4 rounded-full border transition-colors duration-300"
          style={{
            minHeight: "64px",
            backdropFilter: "blur(18px)",
            background: scrolled ? "rgba(7, 11, 18, 0.88)" : "rgba(7, 11, 18, 0.5)",
            borderColor: scrolled ? "rgba(240, 217, 150, 0.22)" : "rgba(240, 217, 150, 0.12)",
          }}
        >
          <Link to="/" className="flex shrink-0 items-center" aria-label="LGM, accueil">
            <img src="/lovable-uploads/lgm-logo-light.png" alt="LGM" className="h-8 w-auto md:h-9" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {navLinks.map(({ href, label }) => (
              <Link key={href} to={href} className="nav-link" aria-current={isActive(href) ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>

          <Link to={diagnosticTo} onClick={goDiagnostic} className="btn-cobalt hidden min-h-0 px-5 py-2.5 text-[0.8rem] lg:inline-flex">
            Faire mon diagnostic
          </Link>

          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#f0d99633] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            <motion.span className="absolute h-px w-5 bg-platinum" animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ duration: reduce ? 0 : 0.28, ease: EASE }} />
            <motion.span className="absolute h-px w-5 bg-platinum" animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ duration: reduce ? 0 : 0.28, ease: EASE }} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-charcoal/95 px-5 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.24, ease: EASE }}
          >
            <nav className="flex flex-1 flex-col justify-center" aria-label="Navigation mobile">
              {[{ href: "/", label: "Accueil" }, ...navLinks].map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  aria-current={location.pathname === href ? "page" : undefined}
                  className="block border-b border-[#f0d9961f] py-4 font-display text-[clamp(2.2rem,11vw,3.6rem)] font-extrabold uppercase leading-none text-platinum aria-[current=page]:text-cobalt-light"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link to={diagnosticTo} onClick={goDiagnostic} className="btn-cobalt w-full justify-center">
              Faire mon diagnostic
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
