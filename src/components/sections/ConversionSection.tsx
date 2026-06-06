import { publicServices } from "@/data/publicContent";
import { Reveal } from "@/components/public/PublicPrimitives";

const ConversionSection = () => {
  const service = publicServices.find((item) => item.slug === "developpement-web") || publicServices[3];
  return (
    <section className="section-ivory section-pad-tight">
      <div className="container-wide">
        <Reveal>
          <p className="section-kicker text-[#8b6914]">Conversion</p>
          <h2 className="public-h2 max-w-4xl text-ivory-text">{service.headline}</h2>
          <p className="public-lead text-ivory-muted">{service.description}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default ConversionSection;
