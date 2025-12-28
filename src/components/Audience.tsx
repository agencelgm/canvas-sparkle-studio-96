import { Check, X } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const Audience = () => {
  const forWho = [
    "Dirigeants impliqués dans les décisions",
    "Entreprises avec une ambition de croissance structurée",
    "Organisations prêtes à mesurer et ajuster"
  ];

  const notForWho = [
    "Recherche de solutions rapides",
    "Budgets marketing très faibles",
    "Refus de structurer un système"
  ];

  return (
    <section id="pour-qui" className="section-padding relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-15">
        <HexagonPattern />
      </div>

      {/* Divider lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      {/* Bronze gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-radial from-bronze/15 via-bronze/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

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

      {/* Background illustration - right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2/3 lg:w-1/2 h-[120%] pointer-events-none opacity-40">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {/* Abstract geometric illustration representing qualification/filtering */}
          <defs>
            <radialGradient id="qualGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(30, 60%, 50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(30, 60%, 50%)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(30, 60%, 45%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(35, 70%, 55%)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Funnel shape */}
          <path 
            d="M100,50 L200,50 L175,120 L175,200 L125,200 L125,120 Z" 
            fill="none" 
            stroke="url(#bronzeGrad)" 
            strokeWidth="1.5"
            className="opacity-60"
          />
          
          {/* Scattered dots entering funnel */}
          <circle cx="90" cy="30" r="3" fill="hsl(30, 60%, 50%)" className="opacity-30" />
          <circle cx="120" cy="25" r="2" fill="hsl(30, 60%, 50%)" className="opacity-40" />
          <circle cx="150" cy="20" r="3" fill="hsl(30, 60%, 50%)" className="opacity-35" />
          <circle cx="180" cy="28" r="2" fill="hsl(30, 60%, 50%)" className="opacity-45" />
          <circle cx="210" cy="35" r="3" fill="hsl(30, 60%, 50%)" className="opacity-30" />
          <circle cx="105" cy="45" r="2" fill="hsl(30, 60%, 50%)" className="opacity-50" />
          <circle cx="195" cy="42" r="2" fill="hsl(30, 60%, 50%)" className="opacity-40" />
          
          {/* Aligned dots exiting funnel */}
          <circle cx="150" cy="220" r="4" fill="hsl(30, 60%, 50%)" className="opacity-70" />
          <circle cx="150" cy="240" r="4" fill="hsl(30, 60%, 50%)" className="opacity-70" />
          <circle cx="150" cy="260" r="4" fill="hsl(30, 60%, 50%)" className="opacity-70" />
          
          {/* Checkmark structure */}
          <g transform="translate(220, 150)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="hsl(30, 60%, 50%)" strokeWidth="1" className="opacity-40" />
            <path d="M-12,0 L-4,8 L12,-8" fill="none" stroke="hsl(30, 60%, 50%)" strokeWidth="2" className="opacity-60" />
          </g>
          
          {/* X structure */}
          <g transform="translate(80, 180)">
            <circle cx="0" cy="0" r="25" fill="none" stroke="hsl(0, 60%, 50%)" strokeWidth="1" className="opacity-30" />
            <path d="M-8,-8 L8,8 M8,-8 L-8,8" fill="none" stroke="hsl(0, 60%, 50%)" strokeWidth="1.5" className="opacity-40" />
          </g>
          
          {/* Glow effect */}
          <circle cx="150" cy="150" r="80" fill="url(#qualGlow)" />
        </svg>
      </div>

      <div className="container-narrow relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-bronze/20 blur-xl rounded-full scale-150" />
            <span className="relative inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
              Qualification
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-4">
            Pour qui travaillons-nous ?
          </h2>
        </div>

        {/* Two-column layout: Content + Space for illustration */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side: Qualification content */}
          <div className="space-y-10">
            {/* For who */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bronze/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-bronze" />
                </div>
                <h3 className="font-serif text-2xl font-medium">Pour vous si</h3>
              </div>
              <ul className="space-y-4">
                {forWho.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze/60 mt-2.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-bronze/50 to-transparent" />

            {/* Not for who */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-serif text-2xl font-medium">Pas pour vous si</h3>
              </div>
              <ul className="space-y-4">
                {notForWho.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/40 mt-2.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right side: Empty space for the background illustration */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default Audience;
