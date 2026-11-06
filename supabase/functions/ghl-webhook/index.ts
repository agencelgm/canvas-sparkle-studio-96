import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";
const LEAD_ALERT_RECIPIENTS = ["deborahlgm146@gmail.com", "agencelgm@gmail.com"];
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
  variant: z.enum(["a","b"]).optional(),
  ab: z.object({ experimentId: z.string().uuid(), visitorId: z.string().min(8).max(64) }).optional(),
  utm: z.record(z.string().max(300)).optional().default({}),
  fbp: z.string().max(200).optional(),
  fbc: z.string().max(400).optional(),
  answers: z.object({
    sector: opt(["btp", "industrie", "commerce", "services", "sante", "autre"]),
    objective: opt(["prospects", "ventes", "devis", "visibilite"]),
    objectiveOther: z.string().trim().max(300).optional(),
    invested: opt(["oui", "non"]),
    pastBudget: opt(["moins_150k", "150k_300k", "300k_600k", "plus_600k"]),
    minimum: opt(["oui", "pas_encore", "discuter"]),
    budgetRange: opt(["moins_100k", "100k_200k", "200k_270k", "plus_270k"]),
    revenue: opt(["moins_1m", "1m_5m", "5m_20m", "plus_20m"]),
    confirmMinimum: opt(["oui", "non"]),
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
      variant: d.variant ?? null,
    })
    .select("id")
    .single();
  if (error) {
    console.error("insert failed", error);
    return json({ error: "Enregistrement impossible" }, 500);
  }

  // Test A/B : formulaire envoye + prospect qualifie (le qualifie decide du gagnant).
  if (d.ab && d.variant) {
    const { data: exp } = await supabase.from("ab_experiments").select("status").eq("id", d.ab.experimentId).maybeSingle();
    if (exp?.status === "running") {
      const base = { experiment_id: d.ab.experimentId, variant: d.variant, visitor_id: d.ab.visitorId };
      const rows = [{ ...base, event_type: "submit" }, ...(result.qualified ? [{ ...base, event_type: "convert" }] : [])];
      const { error: abErr } = await supabase.from("ab_events").upsert(rows, { onConflict: "experiment_id,visitor_id,event_type", ignoreDuplicates: true });
      if (abErr) console.error("ab events", abErr);
    }
  }

  // Envoi vers GoHighLevel (webhook entrant -> automatisations / assignation).
  // Regle : seuls les prospects qualifies partent tout de suite. Les autres sont "held"
  // et ne partent que s'ils disent oui a une offre (fonction ghl-offer-accept).
  let ghlStatus = "skipped";
  const url = Deno.env.get("GHL_WEBHOOK_URL");
  const ghlPayload = {
          first_name: d.firstName,
          last_name: d.lastName,
          full_name: fullName,
          email: d.email,
          phone: d.phone,
          score: result.score,
          qualified: result.qualified,
          status: statusLabel,
          programme_pilote: result.tier === "pilot",
          tags: ["diagnostic-site", statusLabel.replace(/_/g, "-"), ...(d.variant ? [`lp-version-${d.variant}`] : [])],
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
          version_page: d.variant ?? "",
          ...d.utm,
          submission_id: row.id,
  };
  if (!result.qualified) {
    ghlStatus = "held";
    await supabase.from("qualification_submissions").update({ answers: { ...a, breakdown: result.breakdown, ghl_payload: ghlPayload } }).eq("id", row.id);
  } else if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ghlPayload),
      });
      ghlStatus = res.ok ? "sent" : `error_${res.status}`;
      if (!res.ok) console.error("GHL", res.status, await res.text());
    } catch (e) {
      console.error("GHL fetch", e);
      ghlStatus = "error_network";
    }
  }
  // Facebook "Lead" : uniquement pour un prospect qualifie (65+ ou programme pilote), jamais pour < 100 000 FCFA.
  const fbEligible = result.qualified && result.tier !== "excluded";
  const fbEventId = fbEligible ? `lead-${row.id}` : null;
  let fbStatus = "skipped_not_qualified";
  const fbToken = Deno.env.get("FACEBOOK_CAPI_TOKEN");
  if (fbEligible && !fbToken) fbStatus = "error_missing_token";
  if (fbEligible && fbToken) {
    try {
      const sha = async (v: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v.trim().toLowerCase())))).map((b) => b.toString(16).padStart(2, "0")).join("");
      const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
      const userData: Record<string, unknown> = {
        client_user_agent: req.headers.get("user-agent") ?? undefined,
        em: [await sha(d.email)],
        ph: [await sha(d.phone.replace(/[^\d]/g, ""))],
        fn: [await sha(d.firstName)],
      };
      if (d.lastName) userData.ln = [await sha(d.lastName)];
      if (ip) userData.client_ip_address = ip;
      if (d.fbp) userData.fbp = d.fbp;
      if (d.fbc) userData.fbc = d.fbc;
      const res = await fetch(`https://graph.facebook.com/v21.0/673688814007270/events?access_token=${encodeURIComponent(fbToken)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [{
          event_name: "Lead", event_time: Math.floor(Date.now() / 1000), event_id: fbEventId,
          event_source_url: d.pageUrl || "https://agencelgm.com/lead-agence-marketing", action_source: "website", user_data: userData,
        }] }),
      });
      fbStatus = res.ok ? "sent" : `error_${res.status}`;
      if (!res.ok) console.error("CAPI", res.status, await res.text());
    } catch (e) {
      console.error("CAPI fetch", e);
      fbStatus = "error_network";
    }
  }
  // Alerte email a l'equipe administrative pour chaque prospect qualifie.
  if (result.qualified) {
    const data = {
      name: fullName, phone: d.phone, email: d.email,
      sector: optionLabels.sector[a.sector ?? ""] ?? "",
      objective: a.objectiveOther?.trim() || optionLabels.objective[a.objective ?? ""] || "",
      budget: a.minimum === "oui" ? "Oui (270 000 FCFA/mois)" : optionLabels.budgetRange[a.budgetRange ?? ""] ?? "",
      revenue: optionLabels.revenue[a.revenue ?? ""] ?? "",
      score: result.score,
      type: result.tier === "pilot" ? "Programme pilote" : "Accompagnement complet",
    };
    for (const to of LEAD_ALERT_RECIPIENTS) {
      try {
        await sendTemplateEmail("qualified-lead-alert", to, { templateData: data, idempotencyKey: `lead-alert-${row.id}-${to}` });
      } catch (e) {
        console.error("lead alert email", to, e);
      }
    }
  }
  await supabase.from("qualification_submissions").update({ ghl_status: ghlStatus, fb_status: fbStatus }).eq("id", row.id);

  return json({ id: row.id, score: result.score, qualified: result.qualified, tier: result.tier, ghl: ghlStatus, fbEventId });
});
