import QualificationForm from "@/components/QualificationForm";
import { publicImages, siteContact } from "@/data/publicContent";
import { ImageFrame, Reveal } from "@/components/public/PublicPrimitives";

const ContactSection = () => (
  <section id="contact" className="section-charcoal section-pad relative overflow-hidden">
    <div className="public-ambient public-ambient-one" aria-hidden="true" />
    <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-[0.86fr_1fr] lg:items-start">
      <Reveal>
        <p className="section-kicker">Qualification</p>
        <h2 className="public-h2 max-w-3xl">Validez si LGM est la bonne agence pour votre prochaine phase.</h2>
        <p className="public-lead">
          Le formulaire sert a comprendre votre entreprise, votre objectif a 90 jours et votre capacite d'investissement avant un premier echange utile.
        </p>
        <div className="mt-8">
          <ImageFrame src={publicImages.contact} alt="Audit marketing avec brief client, CRM et suivi des prospects" className="min-h-[340px]" />
        </div>
        <div className="mt-7 grid gap-3 text-sm font-semibold text-platinum/64 sm:grid-cols-2">
          <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="public-card p-4 transition-colors hover:text-platinum">
            Besoin d'une reponse maintenant ?<br />
            WhatsApp {siteContact.phoneDisplay}<br />
            <span className="text-xs text-platinum/44">{siteContact.hours}</span>
          </a>
          <a href={`mailto:${siteContact.email}`} className="public-card p-4 transition-colors hover:text-platinum">
            Email<br />
            {siteContact.email}
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <QualificationForm sourcePage="home" />
      </Reveal>
    </div>
  </section>
);

export default ContactSection;
