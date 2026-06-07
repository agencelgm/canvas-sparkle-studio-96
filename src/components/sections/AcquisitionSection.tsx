import { publicServices } from "@/data/publicContent";
import { Reveal } from "@/components/public/PublicPrimitives";

const AcquisitionSection = () => {
  const service = publicServices[0];
  return (
    <section className="section-charcoal section-pad-tight">
      <div className="container-wide">
        <Reveal>
          <p className="section-kicker">Acquisition</p>
          <h2 className="public-h2 max-w-4xl">{service.headline}</h2>
          <p className="public-lead">{service.description}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default AcquisitionSection;
