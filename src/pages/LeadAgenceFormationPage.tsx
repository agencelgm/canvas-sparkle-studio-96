import { Helmet } from "react-helmet-async";
import { CheckCircle2, Clock3, MessageCircle, PhoneCall } from "lucide-react";
import ScoreResultBadge from "@/components/diagnostic/ScoreResultBadge";
import LeadShell from "@/components/lead/LeadShell";
import { leadAgenceConfig } from "@/data/leadAgenceConfig";
import { siteContact } from "@/data/publicContent";

const contactWhatsappUrl = `${leadAgenceConfig.whatsappUrl}?text=${encodeURIComponent(
  "Bonjour, je viens de remplir le formulaire de demande d'accompagnement et je souhaite échanger avec votre équipe.",
)}`;

const LeadAgenceFormationPage = () => (
  <LeadShell>
    <Helmet>
      <title>Votre demande a bien été reçue | Agence LGM</title>
      <meta
        name="description"
        content="Votre demande a bien été reçue. Un membre de l'équipe LGM vous contactera sous 24 heures pour mieux comprendre votre situation."
      />
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <section className="section-charcoal">
      <div className="container-narrow flex min-h-[calc(100vh-164px)] items-center py-12 md:py-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <ScoreResultBadge caption="Diagnostic enregistre" />
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bronze/40 bg-bronze/10 text-bronze">
            <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
          </div>

          <p className="section-kicker mt-6">Demande confirmée</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-platinum [text-wrap:balance]">
            Votre demande a bien été reçue
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum/75 md:text-lg md:leading-8">
            Un membre de notre équipe vous contactera sous 24 heures pour mieux comprendre votre situation, vos objectifs
            et les moyens que vous pouvez mobiliser pour votre projet.
          </p>

          <div className="dx-launcher mt-10 text-left">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex gap-3">
                <Clock3 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                <div>
                  <h2 className="text-sm font-bold text-platinum">Sous 24 heures</h2>
                  <p className="mt-1 text-sm leading-6 text-platinum/65">Notre équipe examinera vos réponses avant de vous appeler.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <PhoneCall aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                <div>
                  <h2 className="text-sm font-bold text-platinum">Un échange humain</h2>
                  <p className="mt-1 text-sm leading-6 text-platinum/65">L'appel nous permettra de comprendre votre situation réelle.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MessageCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                <div>
                  <h2 className="text-sm font-bold text-platinum">Téléphone et WhatsApp</h2>
                  <p className="mt-1 text-sm leading-6 text-platinum/65">Gardez votre téléphone disponible et surveillez vos messages.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm leading-6 text-platinum/65">
              Vous souhaitez nous écrire avant notre appel ?
            </p>
            <a
              href={contactWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dx-btn-primary mt-4 w-full sm:w-auto"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Écrire à l'équipe sur WhatsApp
            </a>
            <p className="mt-4 text-xs font-semibold text-platinum/55">
              {siteContact.phoneDisplay} — {siteContact.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  </LeadShell>
);

export default LeadAgenceFormationPage;