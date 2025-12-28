import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/a-propos", label: "À propos" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-wide flex items-center justify-between h-14 md:h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img 
            alt="LGM - Les Gens du Marketing" 
            className="h-8 sm:h-10 md:h-12 w-auto" 
            src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href} 
              className={`text-sm font-medium transition-colors link-underline ${
                location.pathname === link.href 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link to="/contact">
          <Button variant="hero" size="default" className="hidden sm:flex text-sm">
            Parler à un stratège
          </Button>
        </Link>

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
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors py-2 ${
                  location.pathname === link.href 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button variant="hero" size="default" className="w-full mt-2">
                Parler à un stratège
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
