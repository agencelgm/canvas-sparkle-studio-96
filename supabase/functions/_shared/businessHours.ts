// Heures d'ouverture LGM : lundi-vendredi, 9h-17h, heure d'Abidjan (UTC+0, sans heure d'ete).
export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 17;

/** Moment ou la tache doit etre traitee : maintenant si c'est ouvert, sinon la prochaine ouverture. */
export function nextBusinessSlot(now: Date): Date {
  const d = new Date(now.getTime());
  const day = d.getUTCDay();
  const hour = d.getUTCHours();
  const isWeekday = day >= 1 && day <= 5;
  if (isWeekday && hour >= OPEN_HOUR && hour < CLOSE_HOUR) return d;
  const slot = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), OPEN_HOUR));
  if (!(isWeekday && hour < OPEN_HOUR)) slot.setUTCDate(slot.getUTCDate() + 1);
  while (slot.getUTCDay() === 0 || slot.getUTCDay() === 6) slot.setUTCDate(slot.getUTCDate() + 1);
  return slot;
}
