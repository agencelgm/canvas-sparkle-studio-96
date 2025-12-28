import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-wide flex items-center justify-between h-14 md:h-16 lg:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0">
          <img 
            alt="LGM - Les Gens du Marketing" 
            className="h-8 sm:h-10 md:h-12 w-auto" 
            src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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

        {/* Desktop CTA */}
        <Button variant="hero" size="default" className="hidden sm:flex text-sm">
          Parler à un stratège
        </Button>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container-wide py-4 flex flex-col gap-4">
            <a 
              href="#methode" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Méthode
            </a>
            <a 
              href="#services" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Services
            </a>
            <a 
              href="#pour-qui" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Pour qui
            </a>
            <Button variant="hero" size="default" className="w-full mt-2">
              Parler à un stratège
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
