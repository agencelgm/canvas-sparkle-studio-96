import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { leadAgenceConfig } from "@/data/leadAgenceConfig";

const STORAGE_KEY = "lgm_lead_agence_last";

type AnyRecord = Record<string, unknown>;

const readUtm = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  };
};

const pick = (payload: AnyRecord, keys: string[]) => {
  for (const key of Object.keys(payload)) {
    if (keys.includes(key.toLowerCase())) {
      const value = payload[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }
  return null;
};

const flatten = (input: unknown, depth = 0): AnyRecord => {
  if (!input || typeof input !== "object" || depth > 3) return {};
  let out: AnyRecord = {};
  for (const [key, value] of Object.entries(input as AnyRecord)) {
    if (value && typeof value === "object") {
      out = { ...out, ...flatten(value, depth + 1) };
    } else {
      out[key] = value;
    }
  }
  return out;
};

/**
 * Ecoute la soumission du formulaire GoHighLevel (message envoye par l'iframe a la page)
 * et enregistre le prospect dans la base du site, en plus de GoHighLevel.
 */
export const useLeadCapture = () => {
  useEffect(() => {
    const utm = readUtm();

    const save = async (payload: AnyRecord) => {
      const flat = flatten(payload);
      const fingerprint = JSON.stringify({ flat, t: Math.floor(Date.now() / 60000) });
      if (sessionStorage.getItem(STORAGE_KEY) === fingerprint) return;
      sessionStorage.setItem(STORAGE_KEY, fingerprint);

      const composedName = [
        pick(flat, ["first_name", "firstname", "prenom"]),
        pick(flat, ["last_name", "lastname"]),
      ]
        .filter(Boolean)
        .join(" ");
      const nom = pick(flat, ["full_name", "fullname", "name", "nom"]) ?? (composedName || null);

      const record = {
        form_id: leadAgenceConfig.ghlFormId,
        payload: payload as never,
        nom: nom || null,
        email: pick(flat, ["email", "email_address", "courriel"]),
        telephone: pick(flat, ["phone", "phone_number", "telephone", "whatsapp"]),
        source_page: window.location.pathname,
        ...utm,
      };

      const { error } = await supabase.from("lead_agence_submissions").insert(record);
      if (error) console.error("lead capture", error.message);

      try {
        localStorage.setItem(
          "lgm_lead_contact",
          JSON.stringify({ email: record.email, telephone: record.telephone, nom: record.nom }),
        );
      } catch {
        /* stockage indisponible */
      }
    };

    const onMessage = (event: MessageEvent) => {
      const origin = event.origin || "";
      if (!/leadconnectorhq\.com$|msgsndr\.com$/.test(new URL(origin || window.location.href).hostname)) {
        return;
      }

      let data: unknown = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || typeof data !== "object") return;

      const record = data as AnyRecord;
      const type = String(record.type ?? record.event ?? record.action ?? "").toLowerCase();
      const looksLikeSubmit =
        type.includes("submit") || type.includes("form_submitted") || "formData" in record || "submission" in record;
      if (!looksLikeSubmit) return;

      void save(record);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
};
