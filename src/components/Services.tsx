import { Users, Search, Globe, Database, Mail, Share2 } from "lucide-react";
import HexagonPattern from "./HexagonPattern";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Génération de leads qualifiés",
    },
    {
      icon: Search,
      title: "SEO & SEO local à Abidjan",
    },
    {
      icon: Globe,
      title: "Sites orientés conversion",
    },
    {
      icon: Database,
      title: "CRM & automatisation",
    },
    {
      icon: Mail,
      title: "Email marketing",
    },
    {
      icon: Share2,
      title: "Réseaux sociaux orientés business",
    },
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-10">
        <HexagonPattern />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      {/* Bronze gradient orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-radial from-bronze/12 via-bronze/4 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-radial from-bronze/10 via-bronze/3 to-transparent rounded-full blur-3xl" />

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--bronze)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--bronze)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
            Nos expertises
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
            Expertises intégrées <span className="italic text-bronze">au système</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ces expertises ne sont jamais utilisées isolément. Elles font partie d'un système cohérent.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex items-center gap-5 p-6 bg-secondary/30 border border-border rounded-lg hover:border-bronze/30 hover:bg-secondary/50 backdrop-blur-sm transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center group-hover:bg-bronze/20 transition-colors">
                <service.icon className="w-5 h-5 text-bronze" />
              </div>
              <span className="font-medium text-foreground">{service.title}</span>
            </div>
          ))}
        </div>

        {/* Emphasis note */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground italic">Ces services ne sont jamais activés isolément.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
