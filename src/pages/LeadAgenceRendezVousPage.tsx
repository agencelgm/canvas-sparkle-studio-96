import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import LeadShell from "@/components/lead/LeadShell";
import VideoSlot from "@/components/lead/VideoSlot";
import GhlCalendar from "@/components/lead/GhlCalendar";
import { leadAgenceConfig, rendezVousWhatsappUrl } from "@/data/leadAgenceConfig";
import { siteContact } from "@/data/publicContent";
import { trackQualifiedLead } from "@/lib/facebookPixel";
import { saveLead } from "@/hooks/useLeadCapture";

const callPoints = [
  "Vos chiffres actuels : d'ou viennent vos clients aujourd'hui.",
  "Votre objectif sur les 90 prochains jours.",
  "Le budget publicitaire que vous pouvez engager chaque mois.",
  "Le plan que nous mettrions en place, levier par levier.",
];

const readIdentityFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const get = (...keys: string[]) => {
    for (const key of keys) {
      const value = params.get(key);
      if (value && value.trim() && !value.includes("{{")) return value.trim();
    }
    return null;
  };
  const first = get("prenom", "first_name", "firstname");
  const last = get("nom", "last_name", "lastname");
  return {
    email: get("email", "courriel"),
    phone: get("phone", "telephone", "tel", "whatsapp"),
    name: [first, last].filter(Boolean).join(" ") || get("full_name", "fullname") || null,
    hasParams: Boolean(get("email", "courriel") || get("phone", "telephone", "tel", "whatsapp") || first || last),
  };
};

const LeadAgenceRendezVousPage = () => {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const run = async () => {
      const identity = readIdentityFromUrl();

      if (identity.hasParams) {
        await saveLead({
          email: identity.email,
          phone: identity.phone,
          full_name: identity.name,
          source: "ghl_redirect",
        });
        // On retire les coordonnees de la barre d'adresse.
        const url = new URL(window.location.href);
        ["email", "courriel", "phone", "telephone", "tel", "whatsapp", "prenom", "first_name", "firstname", "nom", "last_name", "lastname", "full_name", "fullname"].forEach(
          (key) => url.searchParams.delete(key),
        );
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      }

      await trackQualifiedLead({
        email: identity.email,
        phone: identity.phone,
        name: identity.name,
      });
    };

    void run();
  }, []);

  return (
    <LeadShell>
      <Helmet>
        <title>Felicitations — reservez votre appel | Agence LGM</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="section-charcoal">
        <div className="container-narrow py-12 md:py-16">
          <div className="text-center">
            <p className="section-kicker">Votre entreprise est eligible</p>
            <h1 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-[#f0d996] [text-wrap:balance]">
              Felicitations — nous pensons pouvoir vous aider
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-platinum/75">
              Prochaine etape : regardez la video ci-dessous, puis reservez votre appel avec un membre de notre equipe.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            <div className="public-card p-4 md:p-6">
              <p className="section-kicker mb-3">Etape 1 — Regardez cette video</p>
              <VideoSlot
                url={leadAgenceConfig.videos.rendezVous}
                title="Ce qui va se passer maintenant"
                placeholder="La video vous explique en 3 minutes comment se deroule l'appel et ce que vous en repartez avec."
              />
            </div>

            <div className="public-card p-4 md:p-6">
              <p className="section-kicker mb-2">Etape 2 — Reservez votre appel</p>
              <h2 className="font-display text-xl font-extrabold text-platinum md:text-2xl">
                Choisissez un creneau avec notre equipe
              </h2>
              <p className="mt-2 text-sm leading-6 text-platinum/70">
                L'appel dure environ 45 minutes, en ligne. Nous parlerons de :
              </p>
              <ul className="mt-3 space-y-2">
                {callPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-6 text-platinum/70">
                    <span className="mt-[2px] text-[#f0d996]">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <GhlCalendar />
              </div>

              <p className="mt-4 text-sm leading-6 text-platinum/70">
                Vous preferez WhatsApp ? Ecrivez-nous au{" "}
                <a
                  href={rendezVousWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#f0d996] underline"
                >
                  {siteContact.phoneDisplay}
                </a>{" "}
                et nous vous proposons un creneau. Notre equipe repond du lundi au vendredi, de 9h a 17h.
              </p>
            </div>

          </div>
        </div>
      </section>
    </LeadShell>
  );
};

export default LeadAgenceRendezVousPage;
