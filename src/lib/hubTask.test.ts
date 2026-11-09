import { describe, expect, it } from "vitest";
import { hubTaskHeader, hubTaskTitle } from "../../supabase/functions/_shared/hubTask";

describe("tâche Deborah selon l'offre", () => {
  it("offre habituelle à 270 000 F", () => {
    expect(hubTaskTitle("full", "Awa")).toContain("Offre habituelle 270 000 F");
    expect(hubTaskHeader("full").join(" ")).not.toContain("PILOTE");
  });
  it("programme pilote à 175 000 F, pas qualifié pour 270 000 F", () => {
    expect(hubTaskTitle("pilot", "Awa")).toContain("PROGRAMME PILOTE 175 000 F");
    expect(hubTaskHeader("pilot").join(" ")).toContain("Pas qualifié pour l'offre à 270 000 F");
  });
  it("a choisi le pilote après le diagnostic", () => {
    expect(hubTaskTitle("pilot_offer", "Awa")).toContain("PROGRAMME PILOTE");
    expect(hubTaskHeader("pilot_offer").join(" ")).toContain("A choisi le programme pilote");
  });
});
