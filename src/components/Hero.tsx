import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Hexagon pattern background */}
      <HexagonPattern className="absolute inset-0 opacity-30" />
      
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      {/* Decorative bronze orbs */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-gradient-radial from-bronze/20 via-bronze/5 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-1/3 left-5 w-64 h-64 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-radial from-bronze/10 to-transparent rounded-full blur-xl" />

      <div className="container-narrow relative z-10 text-center">
        {/* SEO Badge */}
        <div>
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-8">
            Agence marketing à Abidjan
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6">
          De la stratégie aux{" "}
          <span className="italic text-bronze">résultats mesurables</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Si votre croissance est instable, le problème n'est ni votre marketing, ni votre vente. 
          C'est l'absence d'un{" "}
          <span className="text-foreground font-medium">système structuré et pilotable</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="xl" className="group">
            Parler à un stratège
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="hero-secondary" size="xl">
            Découvrir notre approche
          </Button>
        </div>

        {/* Trust indicator */}
        <p className="mt-12 text-sm text-muted-foreground">
          Cabinet stratégique de croissance · Abidjan, Côte d'Ivoire
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
