// Titre et en-tete de la tache Deborah selon l'offre attribuee au prospect.
export const FULL_PRICE = "270 000 F";
export const PILOT_PRICE = "175 000 F";

export type HubTier = "full" | "pilot" | "pilot_offer";

export function hubTaskTitle(tier: HubTier, name: string): string {
  const offer = tier === "full" ? `Offre habituelle ${FULL_PRICE}` : `PROGRAMME PILOTE ${PILOT_PRICE}`;
  return `Appeler ${name} — ${offer} — RDV Koffi ou Ousmane`;
}

export function hubTaskHeader(tier: HubTier): string[] {
  if (tier === "full") {
    return [`OFFRE : habituelle à ${FULL_PRICE}/mois.`, "Prospect qualifié — appeler pour fixer un rendez-vous avec Koffi ou Ousmane."];
  }
  const head = tier === "pilot_offer"
    ? [`A choisi le programme pilote (${PILOT_PRICE}) après le diagnostic.`]
    : [];
  return [
    "⚠ OFFRE PROMOTIONNELLE : PROGRAMME PILOTE",
    ...head,
    `Pas qualifié pour l'offre à ${FULL_PRICE}. Qualifié pour le programme pilote à ${PILOT_PRICE}/mois.`,
    "Présenter cette offre promotionnelle pendant l'appel et le préciser à Koffi/Ousmane lors du briefing.",
  ];
}
