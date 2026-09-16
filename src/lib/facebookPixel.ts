import { supabase } from "@/integrations/supabase/client";

export const FACEBOOK_PIXEL_ID = "673688814007270";

type Fbq = ((...args: unknown[]) => void) | undefined;

export type TrackContact = {
  email?: string | null;
  phone?: string | null;
  name?: string | null;
};

const readStoredContact = (): TrackContact => {
  try {
    const raw = localStorage.getItem("lgm_lead_contact");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { email?: string | null; telephone?: string | null; nom?: string | null };
    return { email: parsed.email ?? undefined, phone: parsed.telephone ?? undefined, name: parsed.nom ?? undefined };
  } catch {
    return {};
  }
};

const readCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
};

/**
 * Evenement "Lead" — envoye uniquement pour les prospects qualifies.
 * Envoi navigateur (pixel) + envoi serveur (API de conversions) avec le meme
 * identifiant d'evenement pour eviter les doublons.
 */
export const trackQualifiedLead = async (override?: TrackContact) => {
  const eventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const stored = readStoredContact();
  const contact: TrackContact = {
    email: override?.email || stored.email,
    phone: override?.phone || stored.phone,
    name: override?.name || stored.name,
  };

  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  fbq?.(
    "track",
    "Lead",
    { content_name: "Qualification agence" },
    { eventID: eventId },
  );

  try {
    await supabase.functions.invoke("facebook-capi", {
      body: {
        event_name: "Lead",
        event_id: eventId,
        event_source_url: window.location.href,
        email: contact.email,
        phone: contact.phone,
        name: contact.name,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
      },
    });
  } catch (error) {
    console.error("facebook capi", error);
  }
};
