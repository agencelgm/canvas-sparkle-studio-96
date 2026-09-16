import { useEffect } from "react";
import { leadAgenceConfig } from "@/data/leadAgenceConfig";

/** Charge une seule fois le script d'integration GoHighLevel (formulaires + calendriers). */
export const useGhlEmbedScript = () => {
  useEffect(() => {
    const src = leadAgenceConfig.ghlEmbedScriptSrc;
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);
};
