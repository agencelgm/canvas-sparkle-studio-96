import { publicImages } from "@/data/publicContent";
import { ImageFrame, MagneticLink, Reveal } from "@/components/public/PublicPrimitives";

const benefits = [
  "Vous voyez si votre objectif a 90 jours est realiste avant de bloquer un appel.",
  "Vous identifiez le levier prioritaire : publicite, SEO, site, IA, logo ou logiciel.",
  "Vous gagnez du temps si LGM n'est pas l'agence la plus adaptee a votre situation.",
];

const ContactSection = () => (
  <section id="contact" className="section-charcoal section-pad relative overflow-hidden">
    <div className="public-ambient public-ambient-one" aria-hidden="true" />
    <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-[0.86fr_1fr] lg:items-center">
      <Reveal>
        <p className="section-kicker">Diagnostic</p>
        <h2 className="public-h2 public-h2-long">Commencez par verifier si nous sommes la bonne agence.</h2>
        <p className="public-lead">
          L'audit vous donne un premier filtre utile : budget, objectif, maturite marketing et priorite commerciale.
        </p>
        <div className="mt-8">
          <MagneticLink to="#diagnostic">Demander un audit</MagneticLink>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {benefits.map((benefit) => (
            <article key={benefit} className="diagnostic-benefit-card diagnostic-benefit-card-dark">
              <span className="mb-4 block h-2 w-2 rounded-full bg-[#f0d996]" aria-hidden="true" />
              <p className="font-semibold leading-relaxed text-platinum">{benefit}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <ImageFrame src={publicImages.contact} alt="Audit marketing avec brief client, CRM et suivi des prospects" className="min-h-[300px]" />
        </div>
      </Reveal>
    </div>
  </section>
);

export default ContactSection;
