import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const PIXEL_ID = "673688814007270";

const BodySchema = z.object({
  event_name: z.string().min(1).max(64),
  event_id: z.string().min(1).max(128),
  event_source_url: z.string().url().max(2048),
  email: z.string().email().max(320).optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  name: z.string().max(200).optional().nullable(),
  fbp: z.string().max(200).optional().nullable(),
  fbc: z.string().max(400).optional().nullable(),
});

const sha256 = async (value: string) => {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const token = Deno.env.get("FACEBOOK_CAPI_TOKEN");
  if (!token) {
    return new Response(JSON.stringify({ error: "missing_token" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parsed = BodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const body = parsed.data;
  const clientIp = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const userData: Record<string, unknown> = {
    client_user_agent: req.headers.get("user-agent") ?? undefined,
  };
  if (clientIp) userData.client_ip_address = clientIp;
  if (body.email) userData.em = [await sha256(body.email)];
  if (body.phone) userData.ph = [await sha256(body.phone.replace(/[^\d]/g, ""))];
  if (body.name) {
    const parts = body.name.trim().split(/\s+/);
    if (parts[0]) userData.fn = [await sha256(parts[0])];
    if (parts.length > 1) userData.ln = [await sha256(parts.slice(1).join(" "))];
  }
  if (body.fbp) userData.fbp = body.fbp;
  if (body.fbc) userData.fbc = body.fbc;

  // Meta rejette l'evenement s'il n'y a aucun identifiant fort.
  const hasStrongIdentifier = Boolean(
    body.email || body.phone || body.fbp || body.fbc || (clientIp && req.headers.get("user-agent")),
  );
  if (!hasStrongIdentifier) {
    return new Response(JSON.stringify({ ok: false, skipped: "insufficient_user_data" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }


  const payload = {
    data: [
      {
        event_name: body.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        event_source_url: body.event_source_url,
        action_source: "website",
        user_data: userData,
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json().catch(() => ({}));
  if (!response.ok) console.error("capi rejected", JSON.stringify(result));
  // On renvoie 200 meme en cas de refus de Meta: le suivi ne doit jamais casser la page.
  return new Response(JSON.stringify({ ok: response.ok, result }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
