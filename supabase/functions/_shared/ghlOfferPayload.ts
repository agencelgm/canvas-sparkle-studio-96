// Construit le corps envoye a GoHighLevel quand un prospect non qualifie dit oui a une offre.
//
// Regle metier (20/11/2026) : dans GHL, ce prospect est traite comme QUALIFIE —
// la branche "Qualifie site" teste inboundWebhookRequest.qualified === true —
// meme si son budget est plus bas. En revanche, pour Meta il reste "non" :
// fb_qualifie ne doit jamais passer a "oui" ici, sinon les campagnes Facebook
// optimisent sur des leads que nous ne considérons pas qualifiés.

export type Offer = "pilote" | "formation";

export function buildOfferPayload(payload: Record<string, unknown>, offer: Offer): Record<string, unknown> {
  const tags = [...new Set([...((payload.tags as string[]) ?? []), "lead-qualifie", "non-qualifie-offre", `offre-${offer}`])];
  const body: Record<string, unknown> = { ...payload, tags, qualified: true, fb_qualifie: "non", offre_acceptee: offer };
  if ("status" in payload) body.status = "qualified_offer";
  return body;
}
