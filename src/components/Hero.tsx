import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-bronze/5 rounded-full blur-3xl" />

      <div className="container-narrow relative z-10 text-center">
        {/* SEO Badge */}
        <div className="opacity-0 animate-fade-up">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-8">
            Agence marketing à Abidjan
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 opacity-0 animate-fade-up animation-delay-100">
          De la stratégie aux{" "}
          <span className="italic text-bronze">résultats mesurables</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up animation-delay-200">
          Si votre croissance est instable, le problème n'est ni votre marketing, ni votre vente. 
          C'est l'absence d'un{" "}
          <span className="text-foreground font-medium">système structuré et pilotable</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-300">
          <Button variant="hero" size="xl" className="group">
            Parler à un stratège
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="hero-secondary" size="xl">
            Découvrir notre approche
          </Button>
        </div>

        {/* Trust indicator */}
        <p className="mt-12 text-sm text-muted-foreground opacity-0 animate-fade-up animation-delay-400">
          Cabinet stratégique de croissance · Abidjan, Côte d'Ivoire
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-600">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
