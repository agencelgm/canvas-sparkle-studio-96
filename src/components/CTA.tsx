import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const CTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-10">
        <HexagonPattern />
      </div>

      {/* Bronze gradient orbs - hidden on mobile */}
      <div className="hidden sm:block absolute top-1/3 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      <div className="container-narrow relative z-10">
        <div className="relative text-center p-6 sm:p-10 md:p-16 lg:p-20 bg-secondary/40 border border-border rounded-lg overflow-hidden backdrop-blur-sm">
          {/* Geometric border accent - hidden on mobile */}
          <div className="hidden sm:block absolute inset-0 border-2 border-bronze/20 rounded-lg m-3 sm:m-4" />
          
          {/* Decorative corner hexagons - hidden on mobile */}
          <svg className="hidden sm:block absolute top-3 sm:top-4 left-3 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 text-bronze/20" viewBox="0 0 100 100">
            <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <svg className="hidden sm:block absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 text-bronze/20" viewBox="0 0 100 100">
            <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-bronze/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 sm:w-48 h-24 sm:h-48 bg-bronze/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-4 sm:mb-6">
              Structurer votre croissance{" "}
              <span className="italic text-bronze block mt-1 sm:mt-2">commence par une décision.</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-2">
              Parlez à un stratège LGM pour déterminer si notre approche est adaptée à votre situation.
            </p>

            {/* CTA Button */}
            <Button variant="hero" size="lg" className="group w-full sm:w-auto">
              Parler à un stratège
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
