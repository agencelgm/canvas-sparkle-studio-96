import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { computeDiagnosticScore } from "../_shared/diagnosticScore.ts";

Deno.test("oui a 270k avec score bas = qualifie", () => {
  const r = computeDiagnosticScore({ minimum: "oui", sector: "autre", objective: "visibilite", revenue: "1m_5m", decision: "autre" });
  assertEquals(r.score < 65, true);
  assertEquals(r.tier, "full");
});

Deno.test("oui + CA < 1M + confirmation oui = qualifie", () => {
  assertEquals(computeDiagnosticScore({ minimum: "oui", revenue: "moins_1m", confirmMinimum: "oui" }).tier, "full");
});

Deno.test("oui + CA < 1M + confirmation non = non qualifie", () => {
  const r = computeDiagnosticScore({ minimum: "oui", revenue: "moins_1m", confirmMinimum: "non" });
  assertEquals(r.tier, "none");
  assertEquals(r.qualified, false);
});

Deno.test("100k-270k = pilote, < 100k = exclu", () => {
  assertEquals(computeDiagnosticScore({ minimum: "pas_encore", budgetRange: "100k_200k" }).tier, "pilot");
  assertEquals(computeDiagnosticScore({ minimum: "discuter", budgetRange: "moins_100k" }).tier, "excluded");
});
