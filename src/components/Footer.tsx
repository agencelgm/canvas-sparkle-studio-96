const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-semibold text-foreground">
              LGM
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Les Gens du Marketing
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <a href="#methode" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Méthode
            </a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#pour-qui" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pour qui
            </a>
          </nav>

          {/* Location */}
          <p className="text-sm text-muted-foreground">
            Abidjan, Côte d'Ivoire
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LGM — Les Gens du Marketing. De la stratégie aux résultats mesurables.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
