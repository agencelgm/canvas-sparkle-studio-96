// Envoie a GoHighLevel un prospect non qualifie qui dit oui a une offre (pilote ou formation).
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const Body = z.object({ submissionId: z.string().uuid(), offer: z.enum(["pilote", "formation"]) });
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  let parsed;
  try { parsed = Body.safeParse(await req.json()); } catch { return json({ error: "JSON invalide" }, 400); }
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { submissionId, offer } = parsed.data;

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: row } = await supabase.from("qualification_submissions").select("ghl_status, answers").eq("id", submissionId).maybeSingle();
  if (!row) return json({ error: "Introuvable" }, 404);
  const status = row.ghl_status ?? "";
  if (status === "sent" || status.split(",").includes(`sent_${offer}`)) return json({ ghl: "already_sent" });
  const payload = (row.answers as Record<string, unknown> | null)?.ghl_payload as Record<string, unknown> | undefined;
  if (!payload) return json({ ghl: "no_payload" });

  const url = Deno.env.get("GHL_WEBHOOK_URL");
  if (!url) return json({ ghl: "skipped" });
  const tags = [...((payload.tags as string[]) ?? []), `offre-${offer}`];
  let result = `error_network`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, tags, offre_acceptee: offer }),
    });
    result = res.ok ? `sent_${offer}` : `error_${res.status}`;
    if (!res.ok) console.error("GHL", res.status, await res.text());
  } catch (e) { console.error("GHL fetch", e); }
  const next = result.startsWith("sent_") ? [status === "held" ? "" : status, result].filter(Boolean).join(",") : status;
  await supabase.from("qualification_submissions").update({ ghl_status: next }).eq("id", submissionId);
  return json({ ghl: result });
});
