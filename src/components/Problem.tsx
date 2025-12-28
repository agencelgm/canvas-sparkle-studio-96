import { useIllustration } from "@/hooks/useIllustration";
import HexagonPattern from "./HexagonPattern";

const Problem = () => {
  const { image, isLoading } = useIllustration();

  return (
    <section className="section-padding bg-gradient-to-b from-card via-background to-card relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-10">
        <HexagonPattern />
      </div>

      {/* Geometric divider lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      
      {/* Bronze gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      {/* Decorative diagonal lines - top right */}
      <svg className="absolute top-10 right-0 w-80 h-80 opacity-15" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="20" y1="0" x2="100" y2="80" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="40" y1="0" x2="100" y2="60" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="60" y1="0" x2="100" y2="40" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
      </svg>

      {/* Decorative diagonal lines - bottom left */}
      <svg className="absolute bottom-10 left-0 w-80 h-80 opacity-15" viewBox="0 0 100 100">
        <line x1="100" y1="100" x2="0" y2="0" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="80" y1="100" x2="0" y2="20" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="60" y1="100" x2="0" y2="40" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
        <line x1="40" y1="100" x2="0" y2="60" stroke="currentColor" strokeWidth="0.3" className="text-bronze" />
      </svg>

      <div className="container-narrow relative z-10">
        {/* Section intro */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            {/* Glow behind badge */}
            <div className="absolute inset-0 bg-bronze/20 blur-xl rounded-full scale-150" />
            <span className="relative inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
              Le constat
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-4">
            Le problème n'est pas l'effort.<br />
            <span className="text-muted-foreground">C'est l'absence de structure.</span>
          </h2>
        </div>

        {/* Two-column layout: Text + Illustration */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: Narrative text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                La majorité des entreprises accumulent <span className="text-bronze font-medium">des actions marketing</span>, <span className="text-bronze font-medium">des prestataires</span> et <span className="text-bronze font-medium">des outils</span>…
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                Sans jamais construire un système cohérent.
              </p>
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-bronze/50 to-transparent" />

            <div className="space-y-4">
              <p className="text-lg text-foreground font-medium">Le résultat ?</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze/60 mt-2.5 flex-shrink-0" />
                  <span>Des décisions prises à l'aveugle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze/60 mt-2.5 flex-shrink-0" />
                  <span>Des performances irrégulières</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze/60 mt-2.5 flex-shrink-0" />
                  <span>Une dépendance permanente au prochain "test marketing"</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side: AI Illustration */}
          <div className="relative">
            {/* Glow behind illustration */}
            <div className="absolute inset-0 bg-gradient-radial from-bronze/20 via-bronze/5 to-transparent blur-2xl scale-110" />
            
            {/* Illustration container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-bronze/20 bg-background/50 backdrop-blur-sm">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Shimmer effect */}
                    <div className="w-32 h-32 rounded-full border border-bronze/30 animate-pulse" />
                    <div className="absolute inset-0 w-32 h-32 rounded-full border border-bronze/20 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-4 w-24 h-24 rounded-full bg-gradient-radial from-bronze/10 to-transparent animate-pulse" />
                  </div>
                </div>
              ) : image ? (
                <img 
                  src={image} 
                  alt="Illustration abstraite représentant la transformation du chaos en structure"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Fallback decorative SVG */
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <svg viewBox="0 0 200 200" className="w-full h-full opacity-30">
                    {/* Scattered fragments on left */}
                    <g className="text-bronze/50">
                      <polygon points="20,80 30,75 35,85 25,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="40,60 50,55 55,65 45,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="15,120 25,115 30,125 20,130" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="50,100 60,95 65,105 55,110" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="30,140 40,135 45,145 35,150" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </g>
                    
                    {/* Connecting lines */}
                    <g className="text-bronze/30">
                      <line x1="60" y1="90" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                      <line x1="70" y1="70" x2="110" y2="85" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                      <line x1="65" y1="120" x2="105" y2="115" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                    </g>
                    
                    {/* Hexagonal structure on right */}
                    <g className="text-bronze">
                      <polygon 
                        points="140,70 160,80 160,100 140,110 120,100 120,80" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1"
                      />
                      <polygon 
                        points="160,100 180,110 180,130 160,140 140,130 140,110" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1"
                      />
                      <polygon 
                        points="120,100 140,110 140,130 120,140 100,130 100,110" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1"
                      />
                      {/* Glow effect */}
                      <circle cx="140" cy="100" r="25" fill="url(#bronzeGlow)" />
                    </g>
                    
                    <defs>
                      <radialGradient id="bronzeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(30, 60%, 50%)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(30, 60%, 50%)" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-bronze/30 rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-bronze/30 rounded-br-lg" />
          </div>
        </div>

        {/* Quote at bottom */}
        <div className="mt-16 pt-16 border-t border-border text-center relative">
          {/* Subtle glow behind quote */}
          <div className="absolute inset-0 bg-gradient-radial from-bronze/5 via-transparent to-transparent" />
          <p className="font-serif text-2xl md:text-3xl text-foreground italic relative">
            "Le problème n'est pas l'effort.{" "}
            <span className="text-bronze">Le problème est l'absence de structure.</span>"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
