import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { leadFromRow, sendLeadToHub } from "../_shared/growthHub.ts";
import { optionLabels } from "../_shared/labels.ts";

// Rattrapage unique : cree une tache dans Client Growth Hub pour chaque ancien prospect qualifie.
// Reserve aux admins. Sans doublon grace au source_key cote Hub.
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const token = req.headers.get("Authorization")?.replace("Bearer ", "") ?? "";
  const { data: u } = await sb.auth.getUser(token);
  if (!u?.user) return json({ error: "unauthorized" }, 401);
  const { data: isAdmin } = await sb.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
  if (!isAdmin) return json({ error: "forbidden" }, 403);

  const { data: rows, error } = await sb.from("qualification_submissions").select("*")
    .eq("qualified", true).or("hub_task_status.is.null,hub_task_status.neq.sent").order("created_at");
  if (error) return json({ error: error.message }, 500);
  const results: Record<string, number> = {};
  for (const r of rows ?? []) {
    const status = await sendLeadToHub(leadFromRow(r, optionLabels as any));
    results[status] = (results[status] ?? 0) + 1;
    await sb.from("qualification_submissions").update({ hub_task_status: status }).eq("id", r.id);
    if (status === "not_configured") break;
  }
  return json({ total: rows?.length ?? 0, results });
});
