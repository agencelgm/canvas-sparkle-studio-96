import { leadAgenceConfig } from "@/data/leadAgenceConfig";
import { useGhlEmbedScript } from "./useGhlEmbedScript";

const GhlCalendar = () => {
  useGhlEmbedScript();

  return (
    <div className="overflow-hidden rounded-md bg-white">
      <iframe
        src={leadAgenceConfig.ghlCalendarUrl}
        allow="payment"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "640px" }}
        scrolling="no"
        id={leadAgenceConfig.ghlCalendarIframeId}
        title="Reserver un appel avec l'equipe LGM"
      />
    </div>
  );
};

export default GhlCalendar;
