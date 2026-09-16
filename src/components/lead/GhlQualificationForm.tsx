import { leadAgenceConfig } from "@/data/leadAgenceConfig";
import { useGhlEmbedScript } from "./useGhlEmbedScript";
import { useLeadCapture } from "@/hooks/useLeadCapture";

/**
 * Formulaire de qualification GoHighLevel.
 * Les redirections (qualifie / non qualifie) sont configurees dans GoHighLevel.
 */
const GhlQualificationForm = () => {
  useGhlEmbedScript();
  useLeadCapture();

  return (
    <iframe
      src={`https://api.leadconnectorhq.com/widget/form/${leadAgenceConfig.ghlFormId}`}
      style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
      id={`inline-${leadAgenceConfig.ghlFormId}`}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name={leadAgenceConfig.ghlFormName}
      data-height={leadAgenceConfig.ghlFormHeight}
      data-layout-iframe-id={`inline-${leadAgenceConfig.ghlFormId}`}
      data-form-id={leadAgenceConfig.ghlFormId}
      data-cookie-consent="true"
      data-cookie-consent-provider="auto"
      title={leadAgenceConfig.ghlFormName}
      scrolling="no"
    />
  );
};

export default GhlQualificationForm;
