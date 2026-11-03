import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { GraduationCap, MessageCircle } from "lucide-react";
import LeadShell from "@/components/lead/LeadShell";
import { formationWhatsappUrl, leadAgenceConfig } from "@/data/leadAgenceConfig";

const LeadAgenceFormationFacebookPage = () => (
  <LeadShell>
    <Helmet>
      <title>Formation publicité Facebook | Agence LGM</title>
      <meta name="description" content="Apprenez à lancer vos publicités Facebook avec un petit budget, accompagné par LGM." />
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <section className="section-charcoal">
      <div className="container-narrow flex min-h-[calc(100vh-164px)] items-center py-12 md:py-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bronze/40 bg-bronze/10 text-bronze">
            <GraduationCap aria-hidden="true" className="h-7 w-7" />
          </div>
          <p className="section-kicker mt-6">Formation publicité Facebook</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-platinum [text-wrap:balance]">
            Lancez vous-même vos publicités Facebook
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum/75 md:text-lg md:leading-8">
            Pas encore le budget pour un accompagnement ? Apprenez à faire de la publicité Facebook avec 50 000 F
            et commencez à attirer vos premiers prospects.
          </p>

          <a href={formationWhatsappUrl} target="_blank" rel="noopener noreferrer" className="dx-btn-primary mt-8 w-full sm:w-auto">
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Je m'inscris à la formation
          </a>

          <p className="mt-8 text-sm text-platinum/60">
            <Link to={leadAgenceConfig.groupeWhatsappPath} className="underline underline-offset-4 hover:text-platinum">
              Pas intéressé par la formation ? Rejoignez notre chaîne WhatsApp gratuite
            </Link>
          </p>
        </div>
      </div>
    </section>
  </LeadShell>
);

export default LeadAgenceFormationFacebookPage;
