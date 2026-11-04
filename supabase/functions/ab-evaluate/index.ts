import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import { createOpenAI } from "npm:@ai-sdk/openai@2";
import { streamText } from "npm:ai@5";
import { z } from "npm:zod@3";
import { decideWinner } from "../_shared/abRule.ts";

const PAGE_CONTEXT: Record<string, string> = {
  "lead-agence-marketing": "Page campagne publicitaire : formulaire de diagnostic pour savoir si l'agence LGM (Abidjan) peut generer des prospects qualifies. Conversion = prospect qualifie (score 65+).",
  "rendez-vous": "Page pour les prospects qualifies : video puis reservation d'un appel de 45 min. Conversion = rendez-vous reserve.",
  "programme-pilote": "Page pour les prospects sans budget de 270 000 FCFA/mois : video puis bouton WhatsApp pour rejoindre le programme pilote (5 places). Conversion = clic sur le bouton WhatsApp.",
  "formation-facebook": "Page de la formation publicite Facebook et Instagram a 50 000 FCFA. Conversion = clic sur le bouton de reservation de place.",
  "groupe-whatsapp": "Derniere etape : inviter a rejoindre la chaine WhatsApp gratuite de LGM. Conversion = clic pour rejoindre.",
};

const Proposal = z.object({
  headline: z.string().min(5).max(160),
  subtitle: z.string().max(300),
  cta: z.string().max(80),
  change_description: z.string().max(300),
  rationale: z.string().max(400),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

async function statsFor(sb: SupabaseClient, id: string) {
  const { data } = await sb.rpc("ab_stats", { _experiment_id: id });
  const s = { a: { views: 0, conversions: 0, submits: 0 }, b: { views: 0, conversions: 0, submits: 0 } };
  (data ?? []).forEach((r: { variant: "a" | "b"; event_type: string; n: number }) => {
    const arm = s[r.variant];
    if (!arm) return;
    if (r.event_type === "view") arm.views = Number(r.n);
    if (r.event_type === "convert") arm.conversions = Number(r.n);
    if (r.event_type === "submit") arm.submits = Number(r.n);
  });
  return s;
}

async function proposeChallenger(sb: SupabaseClient, pageKey: string, control: Record<string, unknown>) {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) throw new Error("LOVABLE_API_KEY manquant");
  const { data: history } = await sb
    .from("ab_experiments")
    .select("name, winner, decision_reason, ab_variants(variant, change_description, content)")
    .eq("page_key", pageKey)
    .eq("status", "concluded")
    .order("ended_at", { ascending: false })
    .limit(8);

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system:
      "Tu es un expert en conversion pour une agence marketing a Abidjan. Tu ecris en francais simple, pour des patrons de PME ivoiriennes. Jamais de promesse de resultats garantis, jamais de chiffres inventes. Propose UNE variante B qui teste une seule idee claire contre la version A. Reponds uniquement en JSON avec les cles headline, subtitle, cta, change_description (ce qui change, une phrase, commence par 'B :'), rationale (pourquoi ca pourrait mieux convertir, une phrase).",
    messages: [{
      role: "user",
      content: `Page : ${PAGE_CONTEXT[pageKey]}\nVersion A actuelle (gagnante) : ${JSON.stringify(control)}\nHistorique des tests (json) : ${JSON.stringify(history ?? [])}`,
    }],
    providerOptions: {
      openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"], textVerbosity: "low" },
    },
  });
  let text = "";
  for await (const chunk of result.textStream) text += chunk;
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Reponse IA vide");
  return Proposal.parse(JSON.parse(match[0]));
}

async function createProposal(sb: SupabaseClient, pageKey: string, control: { label: string; content: Record<string, unknown> }) {
  const p = await proposeChallenger(sb, pageKey, control.content);
  const { data: exp, error } = await sb
    .from("ab_experiments")
    .insert({ page_key: pageKey, name: p.change_description, status: "proposed", ai_rationale: p.rationale })
    .select("id")
    .single();
  if (error) throw error;
  const { layout } = control.content as { layout?: string };
  await sb.from("ab_variants").insert([
    { experiment_id: exp.id, variant: "a", label: control.label, change_description: "Version gagnante du test precedent", content: control.content },
    {
      experiment_id: exp.id, variant: "b", label: "Proposition IA", change_description: p.change_description,
      content: { ...(layout ? { layout } : {}), headline: p.headline, subtitle: p.subtitle, cta: p.cta },
    },
  ]);
  return exp.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const body = await req.json().catch(() => ({}));

  // Demande manuelle d'une proposition IA : reservee aux admins.
  if (body?.action === "propose") {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "") ?? "";
    const { data: u } = await sb.auth.getUser(token);
    if (!u.user) return json({ error: "Non autorise" }, 401);
    const { data: isAdmin } = await sb.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
    if (!isAdmin) return json({ error: "Non autorise" }, 403);
    const pageKey = z.enum(Object.keys(PAGE_CONTEXT) as [string, ...string[]]).safeParse(body.pageKey);
    if (!pageKey.success) return json({ error: "Page inconnue" }, 400);
    const content = z.record(z.string().max(300)).safeParse(body.control ?? {});
    if (!content.success) return json({ error: "Contenu invalide" }, 400);
    try {
      const id = await createProposal(sb, pageKey.data, { label: "Version actuelle", content: content.data });
      return json({ id });
    } catch (e) {
      console.error(e);
      return json({ error: "La proposition IA a echoue. Reessayez plus tard." }, 502);
    }
  }

  // Evaluation de tous les tests en cours (lancee chaque nuit et a l'ouverture de l'admin).
  const { data: running } = await sb.from("ab_experiments").select("id, page_key, ab_variants(variant, label, content)").eq("status", "running");
  const out: unknown[] = [];
  for (const exp of running ?? []) {
    const s = await statsFor(sb, exp.id);
    const d = decideWinner(s.a, s.b);
    if (d.status !== "winner") {
      out.push({ id: exp.id, status: d.status, reason: d.reason });
      continue;
    }
    // Cloture atomique : seul le premier appel passe (verrou sur le statut).
    const { data: closed } = await sb
      .from("ab_experiments")
      .update({ status: "concluded", ended_at: new Date().toISOString(), winner: d.winner, decision_reason: d.reason, final_stats: s })
      .eq("id", exp.id)
      .eq("status", "running")
      .select("id");
    if (!closed?.length) continue;
    const win = (exp.ab_variants as { variant: string; label: string; content: Record<string, unknown> }[]).find((v) => v.variant === d.winner)!;
    let proposal: string | null = null;
    try {
      proposal = await createProposal(sb, exp.page_key, { label: win.label, content: win.content });
    } catch (e) {
      console.error("proposal failed", e);
    }
    out.push({ id: exp.id, status: "winner", winner: d.winner, proposal });
  }
  return json({ results: out });
});
