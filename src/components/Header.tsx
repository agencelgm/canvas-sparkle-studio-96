import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "@/data/publicContent";
import { EASE } from "@/components/public/PublicPrimitives";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 48));

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => location.pathname === href || (href !== "/" && location.pathname.startsWith(`${href}/`));

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5"
        initial={false}
      >
        <motion.div
          className="container-wide flex items-center justify-between"
          animate={{
            backgroundColor: scrolled ? "rgba(13, 11, 8, 0.82)" : "rgba(13, 11, 8, 0.38)",
            borderColor: scrolled ? "rgba(232, 201, 107, 0.22)" : "rgba(232, 201, 107, 0.10)",
            backdropFilter: "blur(20px)",
          }}
          transition={{ duration: 0.36, ease: EASE }}
          style={{
            minHeight: "64px",
            border: "1px solid rgba(232, 201, 107, 0.14)",
            borderRadius: "999px",
            boxShadow: scrolled ? "0 18px 60px rgba(0,0,0,0.24)" : "0 8px 36px rgba(0,0,0,0.12)",
          }}
        >
          <Link to="/" className="flex items-center gap-3" aria-label="LGM, accueil">
            <img
              src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png"
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
                  color: isActive(href) ? "#0d0b08" : "rgba(245,239,224,0.72)",
                  background: isActive(href) ? "#e8c96b" : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="https://wa.me/2250767009629" target="_blank" rel="noreferrer" className="public-text-link text-[0.82rem]">
              WhatsApp
            </a>
            <Link to="/contact" className="btn-akan-outline min-h-0 px-5 py-2 text-[0.78rem]">
              Audit gratuit
            </Link>
          </div>

          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e8c96b33] md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <motion.span
              className="absolute h-px w-5 bg-ivory"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
            <motion.span
              className="absolute h-px w-5 bg-ivory"
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
            className="fixed inset-0 z-40 flex flex-col bg-[#0d0b08]/95 px-5 pb-8 pt-28 backdrop-blur-2xl md:hidden"
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
                    className="block border-b border-[#e8c96b1f] py-5 font-display text-[clamp(2.2rem,11vw,4rem)] font-extrabold leading-none text-ivory"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link to="/contact" className="btn-akan w-full justify-center">
              Demander un audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
