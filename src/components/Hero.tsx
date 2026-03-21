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

          {/* Right column — Image + overlapping card */}
          <div className="relative mt-8 lg:mt-0">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-image.jpg"
                alt="Expert marketing digital LGM à Abidjan"
                className="w-full h-[400px] sm:h-[500px] lg:h-[560px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping stats card */}
            <div className="absolute top-6 -left-4 sm:top-8 sm:-left-12 w-[280px] sm:w-[300px] bg-card/85 backdrop-blur-xl border border-border/50 rounded-2xl p-5 sm:p-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-bronze/5 via-transparent to-primary/5 rounded-2xl" />
              
              <div className="relative z-10">
                <p className="text-[10px] font-medium uppercase tracking-widest text-bronze mb-3">Résultats prouvés</p>
                
                <h2 className="font-serif text-lg sm:text-xl font-medium leading-tight mb-4">
                  De la stratégie aux{" "}
                  <span className="text-bronze italic">résultats concrets</span>
                </h2>

                {/* Rating display */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/30">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-bronze/10 border border-bronze/20">
                    <span className="text-xl font-bold text-bronze">9.6</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-bronze text-bronze" />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Satisfaction client</p>
                  </div>
                </div>

                {/* Active clients indicator */}
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-bronze/30 border-2 border-card" />
                    <div className="w-7 h-7 rounded-full bg-primary/30 border-2 border-card" />
                    <div className="w-7 h-7 rounded-full bg-accent/30 border-2 border-card" />
                    <div className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                      <span className="text-[9px] font-medium text-muted-foreground">+12</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Clients actifs</p>
                    <p className="text-[10px] text-muted-foreground">Entreprises accompagnées</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating pill — bottom right */}
            <div className="absolute -bottom-3 right-4 sm:bottom-4 sm:right-6 bg-card/90 backdrop-blur-md border border-bronze/20 rounded-full px-4 py-2 shadow-lg">
              <p className="text-xs font-medium text-bronze whitespace-nowrap">✨ Rejoignez l'avenir du marketing</p>
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
