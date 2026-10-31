import { describe, expect, it } from "vitest";
import { computeDiagnosticScore, QUALIFIED_THRESHOLD } from "./diagnosticScore";

describe("grille du diagnostic", () => {
  it("le seuil de qualification est 65", () => {
    expect(QUALIFIED_THRESHOLD).toBe(65);
  });

  it("un score de 65 est qualifie", () => {
    // 10 + 10 + 10 + 3 + 15 + 2 + 15 = 65
    const r = computeDiagnosticScore({ sector: "btp", objective: "ventes", invested: "oui", pastBudget: "moins_150k", minimum: "discuter", revenue: "moins_1m", decision: "moi" });
    expect(r.score).toBe(65);
    expect(r.qualified).toBe(true);
  });

  it("un score de 64 n'est pas qualifie", () => {
    // 10 + 6 + 10 + 3 + 15 + 2 + 15 = 61 -> sous le seuil
    const r = computeDiagnosticScore({ sector: "btp", objective: "visibilite", invested: "oui", pastBudget: "moins_150k", minimum: "discuter", revenue: "moins_1m", decision: "moi" });
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
