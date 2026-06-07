import { siteContact } from "@/data/publicContent";
import { Reveal } from "@/components/public/PublicPrimitives";

const QuickResponseBand = () => (
  <section className="section-platinum section-pad-tight">
    <div className="container-wide grid gap-8 lg:grid-cols-[0.92fr_1fr] lg:items-end">
      <Reveal>
        <p className="section-kicker text-[#d7b46a]">Reponse rapide</p>
        <h2 className="public-h2 public-h2-long text-platinum-text">Besoin d'une reponse rapide ?</h2>
        <p className="public-lead text-platinum-muted">
          Faites d'abord le diagnostic pour savoir si LGM est la bonne agence pour vous. Si votre demande est urgente, vous pouvez aussi contacter le service client pendant les heures d'ouverture.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="grid gap-4 sm:grid-cols-3">
          <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="diagnostic-benefit-card text-platinum-text transition-colors hover:border-[#d7b46a]">
            <span className="block text-sm font-bold text-[#d7b46a]">WhatsApp</span>
            <span className="mt-2 block text-lg font-extrabold">{siteContact.phoneDisplay}</span>
            <span className="mt-2 block text-sm text-platinum-muted">{siteContact.hours}</span>
          </a>
          <a href={`tel:${siteContact.phoneHref}`} className="diagnostic-benefit-card text-platinum-text transition-colors hover:border-[#d7b46a]">
            <span className="block text-sm font-bold text-[#d7b46a]">Appel service client</span>
            <span className="mt-2 block text-lg font-extrabold">{siteContact.phoneDisplay}</span>
            <span className="mt-2 block text-sm text-platinum-muted">{siteContact.hours}</span>
          </a>
          <a href={`mailto:${siteContact.email}`} className="diagnostic-benefit-card text-platinum-text transition-colors hover:border-[#d7b46a]">
            <span className="block text-sm font-bold text-[#d7b46a]">Email</span>
            <span className="mt-2 block break-words text-lg font-extrabold">{siteContact.email}</span>
            <span className="mt-2 block text-sm text-platinum-muted">Reponse selon disponibilite</span>
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default QuickResponseBand;
