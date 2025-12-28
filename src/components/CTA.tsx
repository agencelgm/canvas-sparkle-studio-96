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

      {/* Bronze gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      <div className="container-narrow relative z-10">
        <div className="relative text-center p-10 md:p-16 lg:p-20 bg-secondary/40 border border-border rounded-lg overflow-hidden backdrop-blur-sm">
          {/* Geometric border accent */}
          <div className="absolute inset-0 border-2 border-bronze/20 rounded-lg m-4" />
          
          {/* Decorative corner hexagons */}
          <svg className="absolute top-4 left-4 w-12 h-12 text-bronze/20" viewBox="0 0 100 100">
            <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <svg className="absolute bottom-4 right-4 w-12 h-12 text-bronze/20" viewBox="0 0 100 100">
            <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-bronze/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Headline */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-6">
              Structurer votre croissance{" "}
              <span className="italic text-bronze block mt-2">commence par une décision.</span>
            </h2>

            {/* Subtext */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Parlez à un stratège LGM pour déterminer si notre approche est adaptée à votre situation.
            </p>

            {/* CTA Button */}
            <Button variant="hero" size="xl" className="group">
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
