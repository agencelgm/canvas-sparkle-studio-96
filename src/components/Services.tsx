import { motion } from "framer-motion";
import { Users, Search, Globe, Database, Mail, Share2 } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Génération de leads qualifiés",
    description: "Attirez des prospects qualifiés grâce à des campagnes ciblées et efficaces.",
  },
  {
    icon: Search,
    title: "SEO & SEO local à Abidjan",
    description: "Dominez le marché d'Abidjan et améliorez votre visibilité en ligne.",
  },
  {
    icon: Globe,
    title: "Développement web & sites conversion",
    description: "Transformez votre présence en ligne avec un site web sur mesure.",
  },
  {
    icon: Database,
    title: "Automatisation grâce à l'IA",
    description: "Boostez votre efficacité avec des technologies d'automatisation avancées.",
  },
  {
    icon: Mail,
    title: "Publicités payantes & digitales",
    description: "Maximisez votre ROI avec des campagnes Google, Facebook et Instagram.",
  },
  {
    icon: Share2,
    title: "Réseaux sociaux orientés business",
    description: "Construisez une communauté engagée et renforcez votre marque.",
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.2) 50%, transparent 100%)" }} />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="pill-gold mb-6 mx-auto inline-flex">
            <span className="w-1.5 h-1.5 rounded-full mr-2 self-center" style={{ background: "#C9A227" }} />
            Nos expertises
          </p>
          <h2
            className="font-serif text-foreground mb-5 mx-auto"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textWrap: "balance",
              maxWidth: "22ch",
            }}
          >
            Transformez votre entreprise{" "}
            <em>avec nos services</em>
          </h2>
          <p
            className="text-muted-foreground font-sans mx-auto max-w-[52ch] leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
          >
            Ces expertises font partie d'un système cohérent — jamais activées isolément.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            >
              {/* Double-bezel card */}
              <div
                className="rounded-xl p-px h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(201,162,39,0.08), transparent)",
                  border: "1px solid rgba(201,162,39,0.08)",
                }}
              >
                <div
                  className="rounded-[calc(0.75rem-1px)] p-6 h-full flex flex-col gap-3"
                  style={{
                    background: "rgba(14,14,18,0.7)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.12)" }}
                  >
                    <service.icon className="w-4.5 h-4.5" style={{ color: "#C9A227", width: "18px", height: "18px" }} />
                  </div>
                  <p className="font-serif text-foreground" style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", fontWeight: 500 }}>
                    {service.title}
                  </p>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed mt-auto">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
