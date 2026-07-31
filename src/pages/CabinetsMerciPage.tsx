import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { cabinetLeadConfig } from "@/data/cabinetLeadConfig";
import { siteContact } from "@/data/publicContent";

const whatsappBookingUrl = `${siteContact.whatsapp}?text=${encodeURIComponent(
  "Bonjour, je viens de remplir le formulaire pour mon cabinet comptable et je souhaite réserver un appel.",
)}`;

const WhatsAppChannelCard = ({ title }: { title: string }) => (
  <div className="public-card p-5 md:p-7">
    <p className="section-kicker mb-2">{title}</p>
    <h2 className="font-display text-xl font-extrabold text-platinum md:text-2xl">
      Rejoignez notre chaîne WhatsApp
    </h2>
    <p className="mt-3 text-sm leading-7 text-platinum/70">
      2 à 3 conseils concrets par semaine pour attirer des prospects qualifiés vers votre cabinet : exemples de
      publicités qui fonctionnent à Abidjan, scripts de relance, erreurs à éviter. Gratuit — et vous partez quand
      vous voulez.
    </p>
    <a
      href={cabinetLeadConfig.whatsappChannelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-cobalt mt-5 w-full sm:w-auto"
    >
      Rejoindre la chaîne WhatsApp
    </a>
  </div>
);

const CabinetsMerciPage = () => {
  const [searchParams] = useSearchParams();
  const isQualified = searchParams.get("b") !== "low";

  useEffect(() => {
    if (!isQualified) return;
    const existing = document.querySelector(`script[src="${cabinetLeadConfig.ghlEmbedScriptSrc}"]`);
    if (existing) return;
    const script = document.createElement("script");
    script.src = cabinetLeadConfig.ghlEmbedScriptSrc;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, [isQualified]);

  return (
    <div className="public-shell">
      <Helmet>
        <title>Merci — réservez votre appel | Agence LGM</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="border-b border-[rgba(240,217,150,0.14)]">
        <div className="container-wide flex items-center justify-between py-4">
          <span className="font-display text-lg font-extrabold tracking-tight text-platinum">
            LGM<span className="text-[#f0d996]">.</span>
          </span>
          <span className="text-xs font-semibold text-platinum/60">Agence de marketing digital — Abidjan</span>
        </div>
      </header>

      <main className="public-main section-charcoal">
        <div className="container-narrow py-12 md:py-16">
          <div className="text-center">
            <p className="section-kicker">Demande bien reçue</p>
            <h1 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-[#f0d996] [text-wrap:balance]">
              {isQualified
                ? "Nous avons bien reçu vos informations — nous pensons pouvoir vous aider."
                : "Merci — votre demande est bien enregistrée."}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-platinum/75">
              {isQualified
                ? "Prochaine étape : réservez dès maintenant un appel avec un membre de notre équipe pour parler de votre cabinet et de vos objectifs."
                : "Rejoignez notre chaîne WhatsApp pour recevoir dès aujourd'hui des conseils concrets pour développer votre cabinet."}
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {isQualified && (
              <div className="public-card p-3 md:p-6">
                <p className="section-kicker mb-2">Étape 1 — Réservez votre appel</p>
                <h2 className="font-display text-xl font-extrabold text-platinum md:text-2xl">
                  Choisissez un créneau avec notre équipe
                </h2>
                <p className="mt-2 text-sm leading-6 text-platinum/70">
                  L'appel dure environ 45 minutes. Venez avec vos questions : objectifs, budget, délais.
                </p>
                <div className="mt-4 overflow-hidden rounded-md bg-white">
                  <iframe
                    src={cabinetLeadConfig.ghlCalendarUrl}
                    allow="payment"
                    style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "580px" }}
                    scrolling="no"
                    id={cabinetLeadConfig.ghlCalendarIframeId}
                    title="Réserver un appel avec l'équipe LGM"
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-platinum/70">
                  Vous préférez WhatsApp ? Écrivez-nous directement au{" "}
                  <a
                    href={whatsappBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#f0d996] underline"
                  >
                    {siteContact.phoneDisplay}
                  </a>{" "}
                  et nous vous proposons un créneau.
                </p>
                <p className="mt-3 text-sm leading-6 text-platinum/70">
                  Notre équipe vous contacte du lundi au vendredi, de 9h à 17h. En dehors de ces horaires, nous
                  revenons vers vous le jour ouvré suivant.
                </p>
              </div>
            )}

            <WhatsAppChannelCard title={isQualified ? "Étape 2 — Conseils gratuits" : "Conseils gratuits"} />
          </div>
        </div>
      </main>

      <footer className="border-t border-[rgba(240,217,150,0.14)] bg-[#070b12]">
        <div className="container-wide py-6 text-center text-xs font-semibold text-platinum/60">
          © {new Date().getFullYear()} Agence LGM — {siteContact.address}
        </div>
      </footer>
    </div>
  );
};

export default CabinetsMerciPage;
