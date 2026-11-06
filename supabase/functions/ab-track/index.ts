import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const PAGE_KEYS = ["lead-agence-marketing", "rendez-vous", "programme-pilote", "formation-facebook", "groupe-whatsapp"] as const;

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("config"), pageKey: z.enum(PAGE_KEYS) }),
  z.object({
    action: z.literal("track"),
    experimentId: z.string().uuid(),
    variant: z.enum(["a", "b"]),
    visitorId: z.string().min(8).max(64),
    eventType: z.enum(["view", "convert", "video_play", "video_25", "decline"]),
  }),
]);

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  let parsed;
  try {
    parsed = Body.safeParse(await req.json());
  } catch {
    return json({ error: "JSON invalide" }, 400);
  }
  if (!parsed.success) return json({ error: parsed.error.flatten() }, 400);
  const d = parsed.data;
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  if (d.action === "config") {
    const { data: exp } = await sb
      .from("ab_experiments")
      .select("id, ab_variants(variant, content)")
      .eq("page_key", d.pageKey)
      .eq("status", "running")
      .maybeSingle();
    if (!exp) return json({ experiment: null });
    const variants: Record<string, unknown> = {};
    (exp.ab_variants as { variant: string; content: unknown }[]).forEach((v) => { variants[v.variant] = v.content; });
    return json({ experiment: { id: exp.id, variants } });
  }

  const { data: exp } = await sb.from("ab_experiments").select("status").eq("id", d.experimentId).maybeSingle();
  if (!exp || exp.status !== "running") return json({ ok: false });
  const { error } = await sb.from("ab_events").upsert(
    { experiment_id: d.experimentId, variant: d.variant, visitor_id: d.visitorId, event_type: d.eventType },
    { onConflict: "experiment_id,visitor_id,event_type", ignoreDuplicates: true },
  );
  if (error) {
    console.error(error);
    return json({ error: "track failed" }, 500);
  }
  return json({ ok: true });
});
