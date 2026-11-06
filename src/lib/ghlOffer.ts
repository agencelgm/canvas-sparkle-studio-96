// Prospect non qualifie qui dit oui a une offre : on l'envoie alors a GoHighLevel (une fois par offre).
const KEY = "lgm_submission_id";

export const rememberSubmission = (id?: string) => {
  try { if (id) sessionStorage.setItem(KEY, id); } catch { /* ignore */ }
};

export const acceptOffer = (offer: "pilote" | "formation") => {
  let id: string | null = null;
  try { id = sessionStorage.getItem(KEY); } catch { /* ignore */ }
  if (!id) return;
  const base = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/ghl-offer-accept`;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  fetch(base, {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify({ submissionId: id, offer }),
  }).catch(() => {});
};
