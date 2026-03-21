import { Link } from "react-router-dom";
import HexagonPattern from "./HexagonPattern";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 lg:py-12 border-t border-border relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-5">
        <HexagonPattern />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                alt="LGM - Les Gens du Marketing" 
                className="h-8 sm:h-10 w-auto" 
                src="/lovable-uploads/460b0f55-ebe1-4114-80c5-911ba76028f2.png" 
              />
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground">
              De la stratégie de marketing digital aux résultats mesurables.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/a-propos" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                À propos
              </Link>
              <Link to="/services" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                Services
              </Link>
              <Link to="/blog" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/services/generation-leads" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                Génération de leads
              </Link>
              <Link to="/services/seo-local" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                SEO Local
              </Link>
              <Link to="/services/publicite-digitale" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                Publicité Digitale
              </Link>
              <Link to="/services/strategie-contenu" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
                Stratégie de contenu
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
              <p>Chateau, Camp Militaire, Angré, Abidjan</p>
              <a href="mailto:contact@lgm.marketing" className="hover:text-bronze transition-colors">
                contact@lgm.marketing
              </a>
              <a href="tel:+2250767009629" className="hover:text-bronze transition-colors">
                +225 07 67 00 96 29
              </a>
              <div className="flex items-center gap-3 mt-2">
                <a href="https://facebook.com/lgmmarketing" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com/lgmmarketing" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} LGM — Les Gens du Marketing. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
