import { describe, expect, it } from "vitest";
import { nextBusinessSlot } from "../../supabase/functions/_shared/businessHours";

const at = (iso: string) => nextBusinessSlot(new Date(iso)).toISOString();

describe("heures d'ouverture 9h-17h, lundi-vendredi (Abidjan)", () => {
  it("avant 9h un jour de semaine : le jour meme a 9h", () => {
    expect(at("2026-11-10T07:30:00Z")).toBe("2026-11-10T09:00:00.000Z");
  });
  it("entre 9h et 17h : tout de suite", () => {
    expect(at("2026-11-10T11:15:00Z")).toBe("2026-11-10T11:15:00.000Z");
  });
  it("apres 17h : le lendemain ouvre a 9h", () => {
    expect(at("2026-11-10T17:00:00Z")).toBe("2026-11-11T09:00:00.000Z");
  });
  it("vendredi apres 17h : lundi 9h", () => {
    expect(at("2026-11-13T18:00:00Z")).toBe("2026-11-16T09:00:00.000Z");
  });
  it("samedi et dimanche : lundi 9h", () => {
    expect(at("2026-11-14T10:00:00Z")).toBe("2026-11-16T09:00:00.000Z");
    expect(at("2026-11-15T08:00:00Z")).toBe("2026-11-16T09:00:00.000Z");
  });
});
