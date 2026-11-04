import { Helmet } from "react-helmet-async";
import { MessageCircle } from "lucide-react";
import { useAbTest } from "@/hooks/useAbTest";
import LeadShell from "@/components/lead/LeadShell";
import { leadAgenceConfig } from "@/data/leadAgenceConfig";

const LeadAgenceGroupeWhatsappPage = () => {
  const { content, convert } = useAbTest("groupe-whatsapp");
  return (
  <LeadShell>
    <Helmet>
      <title>Chaîne WhatsApp gratuite LGM | Agence LGM</title>
      <meta name="description" content="Rejoignez la chaîne WhatsApp gratuite de LGM pour recevoir nos conseils marketing." />
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <section className="section-charcoal">
      <div className="container-narrow flex min-h-[calc(100vh-164px)] items-center py-12 md:py-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bronze/40 bg-bronze/10 text-bronze">
            <MessageCircle aria-hidden="true" className="h-7 w-7" />
          </div>
          <p className="section-kicker mt-6">Dernière étape</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-platinum [text-wrap:balance]">
            {content.headline ?? "Restez connecté gratuitement"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum/75 md:text-lg md:leading-8">
            Rejoignez notre chaîne WhatsApp gratuite pour recevoir nos conseils marketing et être informé dès
            qu'une place se libère dans le programme pilote.
          </p>
          <a href={leadAgenceConfig.whatsappChannelUrl} target="_blank" rel="noopener noreferrer" onClick={convert} className="dx-btn-primary mt-8 w-full sm:w-auto">
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            {content.cta ?? "Rejoindre la chaîne WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  </LeadShell>
  );
};

export default LeadAgenceGroupeWhatsappPage;
