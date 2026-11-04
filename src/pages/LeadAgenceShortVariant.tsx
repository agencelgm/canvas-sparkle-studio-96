import DiagnosticModal from "@/components/diagnostic/DiagnosticModal";
import type { AbContent } from "@/hooks/useAbTest";

/** Version B du test A/B : titre, promesse et formulaire uniquement. */
const LeadAgenceShortVariant = ({ variant, experimentId, content }: { variant: "a" | "b"; experimentId?: string; content: AbContent }) => (
  <section className="section-charcoal min-h-screen">
    <div className="container-wide mx-auto max-w-2xl py-8 md:py-14">
      <h1 className="text-center font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.05] text-[#f0d996] [text-wrap:balance]">
        {content.headline ?? "Des prospects qualifies pour votre entreprise chaque jour"}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-base text-platinum/80 md:text-lg">
        {content.subtitle ?? "Publicites, page de vente, relances : nous installons le systeme qui fait sonner votre telephone."}
      </p>
      <div id="formulaire" className="mt-6 scroll-mt-6">
        <DiagnosticModal inline variant={variant} experimentId={experimentId} source="lead-agence-marketing" onClose={() => {}} />
      </div>
      <p className="mt-4 text-center text-sm text-platinum/60">Gratuit · Sans engagement · 1 minute</p>
    </div>
  </section>
);

export default LeadAgenceShortVariant;
