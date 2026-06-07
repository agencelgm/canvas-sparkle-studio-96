import { publicImages } from "@/data/publicContent";
import { ImageFrame, MagneticLink, Reveal } from "@/components/public/PublicPrimitives";

const pillars = [
  {
    title: "Acquisition",
    text: "Trouver les audiences qui ont deja une intention, puis creer les messages qui meritent leur attention.",
    tags: ["Ads", "SEO", "Lead magnets", "Social"],
  },
  {
    title: "Conversion",
    text: "Transformer l'interet en demande concrete avec des pages, offres et parcours qui retirent la friction.",
    tags: ["Landing pages", "CRO", "Copywriting", "Tracking"],
  },
  {
    title: "Fidelisation",
    text: "Rendre la relation plus rentable apres la premiere vente : relances, offres, automation et preuve client.",
    tags: ["CRM", "Email", "Loyalty", "Upsell"],
  },
];

const Framework = () => (
  <section id="framework" className="section-charcoal section-pad relative overflow-hidden">
    <div className="public-ambient public-ambient-one" aria-hidden="true" />
    <div className="container-wide relative z-10">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="section-kicker">Methode ACF</p>
        <h2 className="public-h2">Trois leviers, un seul moteur de croissance.</h2>
        <p className="public-lead">
          LGM ne traite pas la publicite, le site et le CRM comme des chantiers separes. Nous les relions pour que chaque prospect avance dans un systeme clair.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticLink to="/services" variant="outline">Explorer la methode</MagneticLink>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-5xl">
        <ImageFrame src={publicImages.method} alt="Schema editorial de la methode ACF avec trois leviers connectes" className="min-h-[320px]" />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08}>
            <article className="public-card flex h-full flex-col gap-4 p-6 md:p-7">
              <div className="font-display text-5xl font-extrabold text-[#f0d99633]">{index + 1}</div>
              <h3 className="public-h3 text-platinum">{pillar.title}</h3>
              <p className="public-body">{pillar.text}</p>
              <div className="tag-list mt-auto pt-3">
                {pillar.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Framework;
