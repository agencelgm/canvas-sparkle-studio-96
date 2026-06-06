import { Link } from "react-router-dom";
import { publicImages, publicServices } from "@/data/publicContent";
import { Arrow, ImageFrame, Reveal } from "@/components/public/PublicPrimitives";

const Services = () => (
  <section id="services" className="section-espresso section-pad overflow-hidden">
    <div className="container-wide">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
        <Reveal>
          <p className="section-kicker">Services</p>
          <h2 className="public-h2 max-w-4xl">Ce que nous faisons, et pourquoi ca marche.</h2>
          <p className="public-lead">
            Chaque service est utile seul, mais la vraie puissance arrive quand acquisition, conversion et fidelisation sont pilotees ensemble.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ImageFrame src={publicImages.services} alt="Composition editoriale de services marketing LGM" className="min-h-[300px]" />
        </Reveal>
      </div>

      <div className="mt-12 border-t border-[#e8c96b24]">
        {publicServices.slice(0, 6).map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.045}>
            <Link to={`/services/${service.slug}`} className="service-row group text-ivory">
              <p className="font-display text-4xl font-extrabold text-[#e8c96b42]">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <p className="text-sm font-bold text-[#e8c96b]">{service.kicker}</p>
                <h3 className="public-h3 mt-1 transition-colors group-hover:text-[#e8c96b]">{service.title}</h3>
              </div>
              <p className="public-body max-w-xl">{service.description}</p>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#e8c96b3d] text-[#e8c96b] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
