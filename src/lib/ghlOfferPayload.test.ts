import { describe, expect, it } from "vitest";
import { buildOfferPayload } from "../../supabase/functions/_shared/ghlOfferPayload";

const base = {
  email: "prospect@example.com",
  score: 41,
  qualified: false,
  status: "non_qualifie",
  fb_qualifie: "non",
  tags: ["diagnostic-site", "lead-non-qualifie", "non-qualifie"],
};

describe("prospect non qualifie qui dit oui a une offre", () => {
  it("est envoye a GHL comme qualifie, statut qualified_offer", () => {
    const body = buildOfferPayload({ ...base }, "pilote");
    expect(body.qualified).toBe(true);
    expect(body.status).toBe("qualified_offer");
  });

  it("garde le tag lead-qualifie, plus les tags offre", () => {
    const body = buildOfferPayload({ ...base }, "formation");
    const tags = body.tags as string[];
    expect(tags).toContain("lead-qualifie");
    expect(tags).toContain("non-qualifie-offre");
    expect(tags).toContain("offre-formation");
    expect(tags).toContain("diagnostic-site");
    expect(new Set(tags).size).toBe(tags.length);
  });

  it("reste non qualifie aux yeux de Meta et mentionne l'offre acceptee", () => {
    const body = buildOfferPayload({ ...base }, "pilote");
    expect(body.fb_qualifie).toBe("non");
    expect(body.offre_acceptee).toBe("pilote");
  });

  it("ne cree pas de cle status si le payload n'en a pas", () => {
    const { status, ...sans } = base;
    expect("status" in buildOfferPayload({ ...sans }, "pilote")).toBe(false);
  });
});
