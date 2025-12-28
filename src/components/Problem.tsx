import { useIllustration } from "@/hooks/useIllustration";
import HexagonPattern from "./HexagonPattern";

const Problem = () => {
  const { image, isLoading } = useIllustration();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-15">
        <HexagonPattern />
      </div>

      {/* Geometric divider lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      
      {/* Bronze gradient orbs - smaller on mobile */}
      <div className="absolute top-20 left-0 sm:left-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 right-1/4 w-60 lg:w-80 h-60 lg:h-80 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      {/* Decorative diagonal lines - hidden on mobile */}
      <svg className="hidden md:block absolute top-10 right-0 w-60 lg:w-80 h-60 lg:h-80 opacity-15" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="20" y1="0" x2="100" y2="80" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="40" y1="0" x2="100" y2="60" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="60" y1="0" x2="100" y2="40" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
      </svg>

      {/* Decorative diagonal lines - hidden on mobile */}
      <svg className="hidden md:block absolute bottom-10 left-0 w-60 lg:w-80 h-60 lg:h-80 opacity-15" viewBox="0 0 100 100">
        <line x1="100" y1="100" x2="0" y2="0" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="80" y1="100" x2="0" y2="20" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="60" y1="100" x2="0" y2="40" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="40" y1="100" x2="0" y2="60" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
      </svg>

      {/* AI Illustration - hidden on mobile, visible on larger screens */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[120%] pointer-events-none">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-64 h-64 rounded-full border border-bronze/30 animate-pulse" />
          </div>
        ) : image ? (
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center right',
              backgroundRepeat: 'no-repeat',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, transparent 80%)',
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <svg viewBox="0 0 200 200" className="w-3/4 h-3/4">
              <g className="text-bronze/50">
                <polygon points="20,80 30,75 35,85 25,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <polygon points="40,60 50,55 55,65 45,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <polygon points="15,120 25,115 30,125 20,130" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <polygon points="50,100 60,95 65,105 55,110" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <polygon points="30,140 40,135 45,145 35,150" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </g>
              <g className="text-bronze/30">
                <line x1="60" y1="90" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                <line x1="70" y1="70" x2="110" y2="85" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                <line x1="65" y1="120" x2="105" y2="115" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
              </g>
              <g className="text-bronze">
                <polygon points="140,70 160,80 160,100 140,110 120,100 120,80" fill="none" stroke="currentColor" strokeWidth="1" />
                <polygon points="160,100 180,110 180,130 160,140 140,130 140,110" fill="none" stroke="currentColor" strokeWidth="1" />
                <polygon points="120,100 140,110 140,130 120,140 100,130 100,110" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="140" cy="100" r="25" fill="url(#bronzeGlow)" />
              </g>
              <defs>
                <radialGradient id="bronzeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(30, 60%, 50%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(30, 60%, 50%)" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>

      <div className="container-narrow relative z-10">
        {/* Section intro */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-bronze/20 blur-xl rounded-full scale-150" />
            <span className="relative inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-4 sm:mb-6">
              Le constat
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-4">
            Le problème n'est pas l'effort.<br />
            <span className="text-muted-foreground">C'est l'absence de structure.</span>
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-xl lg:max-w-none">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                La majorité des entreprises accumulent <span className="text-bronze font-medium">des actions marketing</span>, <span className="text-bronze font-medium">des prestataires</span> et <span className="text-bronze font-medium">des outils</span>…
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed italic">
                Sans jamais construire un système cohérent.
              </p>
            </div>

            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-bronze/50 to-transparent" />

            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg text-foreground font-medium">Le résultat ?</p>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-bronze/60 mt-2 flex-shrink-0" />
                  <span>Des décisions prises à l'aveugle</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-bronze/60 mt-2 flex-shrink-0" />
                  <span>Des performances irrégulières</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-bronze/60 mt-2 flex-shrink-0" />
                  <span>Une dépendance permanente au prochain "test marketing"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quote at bottom */}
        <div className="mt-10 sm:mt-12 lg:mt-16 pt-8 sm:pt-12 lg:pt-16 border-t border-border text-center relative">
          <div className="absolute inset-0 bg-gradient-radial from-bronze/5 via-transparent to-transparent" />
          <p className="font-serif text-lg sm:text-2xl md:text-3xl text-foreground italic relative px-2">
            "Le problème n'est pas l'effort.{" "}
            <span className="text-bronze">Le problème est l'absence de structure.</span>"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
