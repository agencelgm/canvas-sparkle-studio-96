import { Helmet } from "react-helmet-async";
import LeadShell from "@/components/lead/LeadShell";
import VideoSlot from "@/components/lead/VideoSlot";
import { leadAgenceConfig } from "@/data/leadAgenceConfig";
import { siteContact } from "@/data/publicContent";

const checklist = [
  {
    title: "Preparez vos chiffres",
    body: "Chiffre d'affaires mensuel approximatif, panier moyen, et d'ou viennent vos clients aujourd'hui.",
  },
  {
    title: "Clarifiez votre objectif",
    body: "Combien de nouveaux clients voulez-vous par mois dans les 90 prochains jours ?",
  },
  {
    title: "Fixez votre budget",
    body: "Le montant que vous pouvez engager chaque mois en publicite, sans mettre l'entreprise sous pression.",
  },
  {
    title: "Soyez au calme, avec le decideur",
    body: "L'appel dure 45 minutes. Si une autre personne decide avec vous, invitez-la des maintenant.",
  },
];

const LeadAgenceRendezVousConfirmePage = () => (
  <LeadShell>
    <Helmet>
      <title>Rendez-vous confirme | Agence LGM</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <section className="section-charcoal">
      <div className="container-narrow py-12 md:py-16">
        <div className="text-center">
          <p className="section-kicker">Rendez-vous enregistre</p>
          <h1 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-[#f0d996] [text-wrap:balance]">
            Votre rendez-vous est reserve
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-platinum/75">
            Vous recevez la confirmation par email. Regardez la video ci-dessous : elle explique exactement ce qui vous
            attend et comment preparer l'appel.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <div className="public-card p-4 md:p-6">
            <p className="section-kicker mb-3">A regarder avant l'appel</p>
            <VideoSlot
              url={leadAgenceConfig.videos.rendezVousConfirme}
              title="Quelle est la prochaine etape ?"
              placeholder="La video vous explique le deroule de l'appel et ce que vous devez preparer."
            />
          </div>

          <div className="public-card p-5 md:p-7">
            <p className="section-kicker mb-2">Preparez votre appel</p>
            <h2 className="font-display text-xl font-extrabold text-platinum md:text-2xl">
              Quatre choses a avoir sous la main
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {checklist.map((item) => (
                <div key={item.title} className="rounded-md border border-[rgba(240,217,150,0.18)] p-4">
                  <p className="text-base font-bold text-platinum">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-platinum/70">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-platinum/70">
              Un imprevu ? Ecrivez-nous au{" "}
              <a
                href={leadAgenceConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#f0d996] underline"
              >
                {siteContact.phoneDisplay}
              </a>{" "}
              pour deplacer le rendez-vous. {siteContact.hours}.
            </p>
          </div>

          <div className="public-card p-5 md:p-7">
            <p className="section-kicker mb-2">Conseils gratuits</p>
            <h2 className="font-display text-xl font-extrabold text-platinum md:text-2xl">
              Rejoignez notre chaine WhatsApp
            </h2>
            <p className="mt-3 text-sm leading-7 text-platinum/70">
              2 a 3 conseils concrets par semaine pour attirer des prospects qualifies vers votre entreprise.
            </p>
            <a
              href={leadAgenceConfig.whatsappChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cobalt mt-5 w-full sm:w-auto"
            >
              Rejoindre la chaine WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </LeadShell>
);

export default LeadAgenceRendezVousConfirmePage;
