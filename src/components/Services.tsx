import { Users, Search, Globe, Database, Mail, Share2 } from "lucide-react";

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
    <section id="services" className="section-padding">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-widest text-bronze border border-bronze/30 rounded-full mb-6">
            Nos expertises
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
            Expertises intégrées{" "}
            <span className="italic text-bronze">au système</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ces expertises ne sont jamais utilisées isolément. 
            Elles font partie d'un système cohérent.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group flex items-center gap-5 p-6 bg-card border border-border rounded-lg hover:border-bronze/30 hover:bg-card/80 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center group-hover:bg-bronze/20 transition-colors">
                <service.icon className="w-5 h-5 text-bronze" />
              </div>
              <span className="font-medium text-foreground">
                {service.title}
              </span>
            </div>
          ))}
        </div>

        {/* Emphasis note */}
        <p className="text-center mt-10 text-muted-foreground italic">
          👉 Ces services ne sont jamais activés isolément.
        </p>
      </div>
    </section>
  );
};

export default Services;
