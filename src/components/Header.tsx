import { Button } from "@/components/ui/button";
import lgmLogo from "@/assets/lgm-logo.png";
const Header = () => {
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img alt="LGM - Les Gens du Marketing" className="h-10 md:h-12 w-auto" src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png" />
          <span className="hidden sm:block text-xs text-muted-foreground font-sans uppercase tracking-widest">
            Les Gens du Marketing
          </span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#methode" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline">
            Méthode
          </a>
          <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline">
            Services
          </a>
          <a href="#pour-qui" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline">
            Pour qui
          </a>
        </nav>

        {/* CTA */}
        <Button variant="hero" size="default">
          Parler à un stratège
        </Button>
      </div>
    </header>;
};
export default Header;