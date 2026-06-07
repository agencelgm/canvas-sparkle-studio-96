import QualificationForm from "@/components/QualificationForm";

const DiagnosticHeroSlot = ({ sourcePage }: { sourcePage: string }) => (
  <div id="diagnostic">
    <QualificationForm sourcePage={sourcePage} variant="hero" />
  </div>
);

export default DiagnosticHeroSlot;
