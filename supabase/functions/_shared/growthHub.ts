import { nextBusinessSlot } from "./businessHours.ts";
import { hubTaskHeader, hubTaskTitle, type HubTier } from "./hubTask.ts";

// Envoie un prospect qualifie a Client Growth Hub, qui cree une tache urgente pour Deborah.
// La meme fonction sert pour les nouveaux prospects et le rattrapage des anciens.
export type HubLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: HubTier;
  score: number | null;
  createdAt: string;
  details: Record<string, string>;
};

export async function sendLeadToHub(lead: HubLead, now = new Date()): Promise<string> {
  const url = Deno.env.get("GROWTH_HUB_INTAKE_URL");
  const secret = Deno.env.get("LEAD_INTAKE_SECRET");
  if (!url || !secret) return "not_configured";
  const due = nextBusinessSlot(now);
  const digits = lead.phone.replace(/\D/g, "");
  const lines = [
    ...hubTaskHeader(lead.tier),
    "",
    `Nom : ${lead.name}`,
    `WhatsApp : ${lead.phone} — https://wa.me/${digits}`,
    `Email : ${lead.email}`,
    `Score : ${lead.score ?? "—"}/100`,
    `Formulaire rempli le : ${new Date(lead.createdAt).toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" })}`,
    "",
    ...Object.entries(lead.details).filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`),
  ];
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lead-secret": secret },
      body: JSON.stringify({
        source_key: `lgm-lead:${lead.id}`,
        title: hubTaskTitle(lead.tier, lead.name),
        description: lines.join("\n"),
        priority: "urgent",
        due_date: due.toISOString().slice(0, 10),
        scheduled_start_at: due.toISOString(),
        assignee_email: "deborahlgm146@gmail.com",
      }),
    });
    const body = await res.text();
    if (!res.ok) {
      console.error(`hub intake [${res.status}]: ${body}`);
      return `error_${res.status}`;
    }
    try { if (JSON.parse(body)?.duplicate) return "duplicate"; } catch { /* ignore */ }
    return "sent";
  } catch (e) {
    console.error("hub intake", e);
    return "error_network";
  }
}

type Row = Record<string, any>;
/** Construit le prospect a partir d'une ligne enregistree (utilise par le rattrapage). */
export function leadFromRow(r: Row, labels: Record<string, Record<string, string>>): HubLead {
  const a = r.answers ?? {};
  const utm = r.utm ?? {};
  const tier: HubTier = !r.qualified ? "pilot_offer"
    : r.eligibility_status === "qualifie_programme_pilote" ? "pilot" : "full";
  return {
    id: r.id, name: r.name, email: r.email, phone: r.phone, tier, score: r.score, createdAt: r.created_at,
    details: {
      "Secteur": r.industry,
      "Entreprise": r.company_name ?? "",
      "Lieu": r.location,
      "Objectif 90 jours": r.objective_90_days,
      "Chiffre d'affaires": labels.revenue?.[a.revenue] ?? a.revenue ?? "",
      "Peut investir 270 000 FCFA/mois": labels.minimum?.[a.minimum] ?? r.budget_raw ?? "",
      "Confirmation budget": a.confirmMinimum ?? "",
      "Tranche de budget": labels.budgetRange?.[a.budgetRange] ?? "",
      "Déjà investi en marketing": a.invested ?? "",
      "Budget pub passé": labels.pastBudget?.[a.pastBudget] ?? r.past_marketing_budget_raw ?? "",
      "Décideur": labels.decision?.[a.decision] ?? a.decision ?? "",
      "Site / réseaux": r.website_or_social ?? "",
      "Page d'origine": r.source_page ?? "",
      "Source pub": [utm.utm_source, utm.utm_medium, utm.utm_campaign, utm.utm_content].filter(Boolean).join(" / "),
      "Version de page": r.variant ?? "",
    },
  };
}
