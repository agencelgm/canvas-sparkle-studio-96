import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import HexagonPattern from "./HexagonPattern";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 px-4 overflow-hidden">
      {/* Hexagon pattern background */}
      <HexagonPattern className="absolute inset-0 opacity-30" />
      
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      {/* Decorative bronze orbs */}
      <div className="hidden sm:block absolute top-1/4 right-10 w-48 md:w-80 h-48 md:h-80 bg-gradient-radial from-bronze/20 via-bronze/5 to-transparent rounded-full blur-2xl" />
      <div className="hidden sm:block absolute bottom-1/3 left-5 w-40 md:w-64 h-40 md:h-64 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-2xl" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column — Text & CTAs */}
          <div className="text-left">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6 sm:mb-8">
              Agence de Marketing Digital et Communication à Abidjan
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium leading-tight mb-4 sm:mb-6">
              De la stratégie de marketing digital aux{" "}
              <span className="italic text-bronze">résultats mesurables</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 leading-relaxed">
              Obtenez plus de <span className="text-foreground font-medium">prospects qualifiés</span> et 
              augmentez votre <span className="text-foreground font-medium">chiffre d'affaires</span> grâce 
              à un système structuré et pilotable.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Réservez une consultation gratuite
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="hero-secondary" size="lg" className="w-full sm:w-auto">
                  Découvrir notre approche
                </Button>
              </Link>
            </div>

            <p className="mt-8 sm:mt-12 text-xs sm:text-sm text-muted-foreground">
              De la stratégie aux résultats concrets · Abidjan, Côte d'Ivoire
            </p>
          </div>

          {/* Right column — Visual card composition */}
          <div className="relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Background decorative elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-radial from-bronze/15 to-transparent rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-8 w-48 h-48 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-xl" />

            {/* Main floating card */}
            <div className="relative w-full max-w-md">
              {/* Primary card */}
              <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 sm:p-8 shadow-2xl transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-bronze/5 via-transparent to-primary/5 rounded-2xl" />
                
                <div className="relative z-10">
                  <p className="text-xs font-medium uppercase tracking-widest text-bronze mb-4">Résultats prouvés</p>
                  
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-tight mb-6">
                    De la stratégie aux{" "}
                    <span className="text-bronze italic">résultats concrets</span>
                  </h2>

                  {/* Rating display */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/30">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-bronze/10 border border-bronze/20">
                      <span className="text-2xl font-bold text-bronze">9.6</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-bronze text-bronze" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Satisfaction client</p>
                    </div>
                  </div>

                  {/* Active clients indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-bronze/30 border-2 border-card" />
                        <div className="w-8 h-8 rounded-full bg-primary/30 border-2 border-card" />
                        <div className="w-8 h-8 rounded-full bg-accent/30 border-2 border-card" />
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                          <span className="text-[10px] font-medium text-muted-foreground">+12</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Clients actifs</p>
                        <p className="text-xs text-muted-foreground">Entreprises accompagnées</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating secondary pill */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-card/90 backdrop-blur-md border border-bronze/20 rounded-full px-4 py-2 shadow-lg">
                <p className="text-xs font-medium text-bronze whitespace-nowrap">✨ Rejoignez l'avenir du marketing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden sm:block absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1.5 md:p-2">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
