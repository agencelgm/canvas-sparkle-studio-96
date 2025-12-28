import HexagonPattern from "./HexagonPattern";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 lg:py-12 border-t border-border relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-5">
        <HexagonPattern />
      </div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              alt="LGM - Les Gens du Marketing" 
              className="h-8 sm:h-10 w-auto" 
              src="/lovable-uploads/460b0f55-ebe1-4114-80c5-911ba76028f2.png" 
            />
          </div>

          {/* Links */}
          <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <a href="#methode" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
              Méthode
            </a>
            <a href="#services" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
              Services
            </a>
            <a href="#pour-qui" className="text-xs sm:text-sm text-muted-foreground hover:text-bronze transition-colors">
              Pour qui
            </a>
          </nav>

          {/* Location */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            Abidjan, Côte d'Ivoire
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 border-t border-border text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} LGM — Les Gens du Marketing. De la stratégie aux résultats mesurables.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
