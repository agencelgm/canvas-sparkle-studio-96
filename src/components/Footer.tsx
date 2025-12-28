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
              De la stratégie aux résultats mesurables.
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
              <p>Abidjan, Côte d'Ivoire</p>
              <a href="mailto:contact@lgm.ci" className="hover:text-bronze transition-colors">
                contact@lgm.ci
              </a>
              <a href="tel:+2250700000000" className="hover:text-bronze transition-colors">
                +225 07 00 00 00 00
              </a>
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
