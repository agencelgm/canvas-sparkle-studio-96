import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";
import { computeDiagnosticScore } from "../_shared/diagnosticScore.ts";
import { optionLabels } from "./labels.ts";

const opt = (vals: [string, ...string[]]) => z.enum(vals).optional();

const Body = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  sourcePage: z.string().trim().max(200).optional().default(""),
  pageUrl: z.string().trim().max(1000).optional().default(""),
  utm: z.record(z.string().max(300)).optional().default({}),
  answers: z.object({
    sector: opt(["btp", "industrie", "commerce", "services", "sante", "autre"]),
    objective: opt(["prospects", "ventes", "devis", "visibilite"]),
    objectiveOther: z.string().trim().max(300).optional(),
    invested: opt(["oui", "non"]),
    pastBudget: opt(["moins_150k", "150k_300k", "300k_600k", "plus_600k"]),
    minimum: opt(["oui", "pas_encore", "discuter"]),
    budgetRange: opt(["moins_100k", "100k_200k", "200k_270k", "plus_270k"]),
    revenue: opt(["moins_1m", "1m_5m", "5m_20m", "plus_20m"]),
    decision: opt(["moi", "associe", "autre"]),
  }),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let parsed;
  try {
    parsed = Body.safeParse(await req.json());
  } catch {
    return json({ error: "JSON invalide" }, 400);
  }
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const d = parsed.data;
  const a = d.answers;
  const result = computeDiagnosticScore(a);
  const fullName = `${d.firstName} ${d.lastName}`.trim();
  const rangeValue: Record<string, number> = { moins_100k: 50000, "100k_200k": 150000, "200k_270k": 235000, plus_270k: 270000 };
  const budgetNormalized = a.minimum === "oui" ? 270000 : rangeValue[a.budgetRange ?? ""] ?? 0;
  const statusLabel = { full: "qualifie", pilot: "qualifie_programme_pilote", none: "non_qualifie", excluded: "non_qualifie_budget_insuffisant" }[result.tier];

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: row, error } = await supabase
    .from("qualification_submissions")
    .insert({
      name: fullName,
      email: d.email,
      phone: d.phone,
      has_business: true,
      industry: optionLabels.sector[a.sector ?? ""] ?? "Non precise",
      location: "Cote d'Ivoire",
      service: "diagnostic-popup",
      has_invested_marketing: a.invested ? a.invested === "oui" : null,
      past_marketing_budget_raw: a.pastBudget ? optionLabels.pastBudget[a.pastBudget] : null,
      objective_90_days: a.objectiveOther?.trim() || optionLabels.objective[a.objective ?? ""] || "Non precise",
      budget_raw: optionLabels.minimum[a.minimum ?? ""] ?? "Non precise",
      budget_normalized: budgetNormalized,
      can_invest_minimum: a.minimum === "oui",
      monthly_revenue_band: a.revenue ?? null,
      eligibility_status: statusLabel,
      budget_band: a.budgetRange ?? (a.minimum === "oui" ? "plus_270k" : null),
      coherence_flags: result.flags,
      coherence_score: result.score,
      score: result.score,
      qualified: result.qualified,
      answers: { ...a, breakdown: result.breakdown },
      utm: d.utm,
      source_page: d.sourcePage,
    })
    .select("id")
    .single();
  if (error) {
    console.error("insert failed", error);
    return json({ error: "Enregistrement impossible" }, 500);
  }

  // Envoi vers GoHighLevel (webhook entrant -> automatisations / assignation).
  let ghlStatus = "skipped";
  const url = Deno.env.get("GHL_WEBHOOK_URL");
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: d.firstName,
          last_name: d.lastName,
          full_name: fullName,
          email: d.email,
          phone: d.phone,
          score: result.score,
          qualified: result.qualified,
          status: statusLabel,
          programme_pilote: result.tier === "pilot",
          tags: ["diagnostic-site", statusLabel.replace(/_/g, "-")],
          secteur: optionLabels.sector[a.sector ?? ""] ?? "",
          objectif: a.objectiveOther?.trim() || optionLabels.objective[a.objective ?? ""] || "",
          deja_investi: a.invested ?? "",
          budget_pub_mensuel: a.pastBudget ? optionLabels.pastBudget[a.pastBudget] : "",
          budget_270k: optionLabels.minimum[a.minimum ?? ""] ?? "",
          budget_tranche: optionLabels.budgetRange[a.budgetRange ?? ""] ?? "",
          budget_mensuel_estime: budgetNormalized,
          chiffre_affaires: optionLabels.revenue[a.revenue ?? ""] ?? "",
          decideur: optionLabels.decision[a.decision ?? ""] ?? "",
          detail_score: result.breakdown,
          alertes: result.flags,
          source_page: d.sourcePage,
          page_url: d.pageUrl,
          ...d.utm,
          submission_id: row.id,
        }),
      });
      ghlStatus = res.ok ? "sent" : `error_${res.status}`;
      if (!res.ok) console.error("GHL", res.status, await res.text());
    } catch (e) {
      console.error("GHL fetch", e);
      ghlStatus = "error_network";
    }
  }
  await supabase.from("qualification_submissions").update({ ghl_status: ghlStatus }).eq("id", row.id);

  return json({ id: row.id, score: result.score, qualified: result.qualified, tier: result.tier, ghl: ghlStatus });
});
