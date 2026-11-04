// Regle du gagnant des tests A/B : 100 visites minimum par version, +20 % de conversion relative.
export const MIN_VIEWS = 100;
export const MIN_LIFT = 0.2;

export type ArmStats = { views: number; conversions: number };
export type Decision =
  | { status: "waiting"; reason: string }
  | { status: "continue"; reason: string; lift: number }
  | { status: "winner"; winner: "a" | "b"; reason: string; lift: number };

const pct = (x: number) => `${(x * 100).toFixed(1)} %`;

export const decideWinner = (a: ArmStats, b: ArmStats): Decision => {
  if (a.views < MIN_VIEWS || b.views < MIN_VIEWS) {
    return { status: "waiting", reason: `En attente de ${MIN_VIEWS} visites par version (A : ${a.views}, B : ${b.views}).` };
  }
  const ra = a.conversions / a.views;
  const rb = b.conversions / b.views;
  const [best, other, rBest, rOther] = rb >= ra ? (["b", "a", rb, ra] as const) : (["a", "b", ra, rb] as const);
  const lift = rOther === 0 ? (rBest > 0 ? Infinity : 0) : (rBest - rOther) / rOther;
  const summary = `${best.toUpperCase()} : ${pct(rBest)} contre ${other.toUpperCase()} : ${pct(rOther)}`;
  if (lift >= MIN_LIFT) {
    const liftTxt = Number.isFinite(lift) ? `+${Math.round(lift * 100)} %` : "l'autre version n'a aucune conversion";
    return { status: "winner", winner: best, lift, reason: `${summary} (${liftTxt}), au-dessus du seuil de +20 %.` };
  }
  return { status: "continue", lift, reason: `${summary} (+${Math.round(lift * 100)} %) : écart sous le seuil de +20 %, le test continue.` };
};
