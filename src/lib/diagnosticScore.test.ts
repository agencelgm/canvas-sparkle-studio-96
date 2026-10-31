import { describe, expect, it } from "vitest";
import { computeDiagnosticScore, QUALIFIED_THRESHOLD } from "./diagnosticScore";

describe("grille du diagnostic", () => {
  const base = { sector: "btp", objective: "prospects", invested: "oui", pastBudget: "plus_600k", revenue: "plus_20m", decision: "moi" } as const;
  it("moins de 100 000 FCFA est exclu meme avec un bon profil", () => {
    const r = computeDiagnosticScore({ ...base, minimum: "pas_encore", budgetRange: "moins_100k" });
    expect(r.tier).toBe("excluded");
    expect(r.qualified).toBe(false);
  });
  it("100 000 a 270 000 FCFA va au programme pilote meme avec un score faible", () => {
    const r = computeDiagnosticScore({ minimum: "discuter", budgetRange: "100k_200k", decision: "autre" });
    expect(r.score).toBeLessThan(65);
    expect(r.tier).toBe("pilot");
    expect(r.qualified).toBe(true);
  });
  it("270 000 FCFA ou plus suit la regle des 65 points", () => {
    expect(computeDiagnosticScore({ ...base, minimum: "pas_encore", budgetRange: "plus_270k" }).tier).toBe("full");
    expect(computeDiagnosticScore({ minimum: "oui", decision: "autre" }).tier).toBe("none");
  });

  it("le seuil de qualification est 65", () => {
    expect(QUALIFIED_THRESHOLD).toBe(65);
  });

  it("un score de 65 est qualifie", () => {
    const r = computeDiagnosticScore({ sector: "btp", objective: "ventes", invested: "oui", pastBudget: "moins_150k", minimum: "oui", revenue: "1m_5m" });
    expect(r.score).toBe(65);
    expect(r.qualified).toBe(true);
  });

  it("un score de 61 n'est pas qualifie", () => {
    const r = computeDiagnosticScore({ sector: "btp", objective: "visibilite", invested: "oui", pastBudget: "moins_150k", minimum: "oui", revenue: "1m_5m" });
    expect(r.score).toBe(61);
    expect(r.qualified).toBe(false);
  });

  it("le meilleur profil obtient 100", () => {
    const r = computeDiagnosticScore({ sector: "commerce", objective: "prospects", invested: "oui", pastBudget: "plus_600k", minimum: "oui", revenue: "plus_20m", decision: "moi" });
    expect(r.score).toBe(100);
  });

  it("une incoherence budget / chiffre d'affaires retire 10 points", () => {
    const r = computeDiagnosticScore({ sector: "btp", objective: "prospects", invested: "non", minimum: "oui", revenue: "moins_1m", decision: "moi" });
    expect(r.flags).toContain("budget_vs_revenu");
    expect(r.score).toBe(10 + 10 + 0 + 25 + 2 + 15 - 10);
  });
});
