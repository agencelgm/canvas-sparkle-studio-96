import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll to switch from transparent to opaque
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: "/a-propos", label: "À propos" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        animate={{
          background: scrolled
            ? "rgba(10,10,12,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,162,39,0.1)"
            : "1px solid transparent",
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container-wide flex items-center justify-between" style={{ height: "clamp(56px, 5vw, 72px)" }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              alt="LGM - Les Gens du Marketing"
              className="w-auto"
              style={{ height: "clamp(28px, 3.5vw, 44px)" }}
              src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 link-underline ${
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-foreground/65 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link to="/contact" className="hidden sm:block">
            <button className="btn-gold-outline group flex items-center gap-2 !py-2.5 !px-5 !text-xs">
              Parler à un stratège
              <span className="w-5 h-5 rounded-full bg-bronze/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </button>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(10,10,12,0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col justify-center h-full px-8 pt-20">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 font-serif text-foreground/80 hover:text-foreground transition-colors"
                      style={{ fontSize: "clamp(1.5rem, 5vw, 2.25rem)", fontWeight: 500 }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.28 }}
                className="mt-8"
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <button className="btn-gold w-full justify-center group flex items-center gap-3">
                    Consultation gratuite
                    <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
