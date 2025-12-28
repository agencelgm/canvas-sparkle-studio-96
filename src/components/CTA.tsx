import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="relative text-center p-10 md:p-16 lg:p-20 bg-primary rounded-lg overflow-hidden">
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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-primary-foreground leading-tight mb-6">
              Structurer votre croissance{" "}
              <span className="italic text-bronze-light block mt-2">commence par une décision.</span>
            </h2>

            {/* Subtext */}
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10">
              Parlez à un stratège LGM pour déterminer si notre approche est adaptée à votre situation.
            </p>

            {/* CTA Button */}
            <Button variant="bronze" size="xl" className="group">
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
