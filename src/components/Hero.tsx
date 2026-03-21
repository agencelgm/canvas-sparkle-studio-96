import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 px-4 overflow-hidden">
      {/* Hexagon pattern background */}
      <HexagonPattern className="absolute inset-0 opacity-30" />
      
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      {/* Decorative bronze orbs - hidden on very small screens */}
      <div className="hidden sm:block absolute top-1/4 right-10 w-48 md:w-80 h-48 md:h-80 bg-gradient-radial from-bronze/20 via-bronze/5 to-transparent rounded-full blur-2xl" />
      <div className="hidden sm:block absolute bottom-1/3 left-5 w-40 md:w-64 h-40 md:h-64 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-2xl" />
      <div className="hidden md:block absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-radial from-bronze/10 to-transparent rounded-full blur-xl" />

      <div className="container-narrow relative z-10 text-center">
        {/* SEO Badge */}
        <div>
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6 sm:mb-8">
            Agence de Marketing Digital et Communication à Abidjan
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight mb-4 sm:mb-6">
          De la stratégie de marketing digital aux{" "}
          <span className="italic text-bronze">résultats mesurables</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Obtenez plus de <span className="text-foreground font-medium">prospects qualifiés</span> et 
          augmentez votre <span className="text-foreground font-medium">chiffre d'affaires</span> grâce 
          à un système structuré et pilotable.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button variant="hero" size="lg" className="group w-full sm:w-auto">
            Réservez une consultation gratuite
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="hero-secondary" size="lg" className="w-full sm:w-auto">
            Découvrir notre approche
          </Button>
        </div>

        {/* Trust indicator */}
        <p className="mt-8 sm:mt-12 text-xs sm:text-sm text-muted-foreground">
          La seule agence marketing à Abidjan qui garantit des résultats · Côte d'Ivoire
        </p>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:block absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1.5 md:p-2">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
