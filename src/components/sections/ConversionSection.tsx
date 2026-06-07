import { publicServices } from "@/data/publicContent";
import { Reveal } from "@/components/public/PublicPrimitives";

const ConversionSection = () => {
  const service = publicServices.find((item) => item.slug === "developpement-web") || publicServices[3];
  return (
    <section className="section-platinum section-pad-tight">
      <div className="container-wide">
        <Reveal>
          <p className="section-kicker text-[#d7b46a]">Conversion</p>
          <h2 className="public-h2 max-w-4xl text-platinum-text">{service.headline}</h2>
          <p className="public-lead text-platinum-muted">{service.description}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default ConversionSection;
