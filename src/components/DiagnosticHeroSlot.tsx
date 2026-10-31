import DiagnosticLauncher from "@/components/diagnostic/DiagnosticLauncher";

const DiagnosticHeroSlot = ({ sourcePage }: { sourcePage: string }) => (
  <div id="diagnostic">
    <DiagnosticLauncher sourcePage={sourcePage} />
  </div>
);

export default DiagnosticHeroSlot;
