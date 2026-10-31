// Grille d'evaluation du diagnostic LGM (sur 100). Partagee entre le site et le serveur.
export const QUALIFIED_THRESHOLD = 65;

export type DiagnosticAnswers = {
  sector?: string;
  objective?: string;
  objectiveOther?: string;
  invested?: "oui" | "non";
  pastBudget?: string;
  minimum?: "oui" | "pas_encore" | "discuter";
  revenue?: string;
  decision?: string;
};

export const SCORE_TABLE = {
  sector: { btp: 10, industrie: 10, commerce: 10, services: 10, sante: 10, autre: 6 } as Record<string, number>,
  objective: { prospects: 10, ventes: 10, devis: 10, visibilite: 6 } as Record<string, number>,
  invested: { oui: 10, non: 0 } as Record<string, number>,
  pastBudget: { moins_150k: 3, "150k_300k": 8, "300k_600k": 12, plus_600k: 15 } as Record<string, number>,
  minimum: { oui: 25, discuter: 15, pas_encore: 8 } as Record<string, number>,
  revenue: { moins_1m: 2, "1m_5m": 7, "5m_20m": 12, plus_20m: 15 } as Record<string, number>,
  decision: { moi: 15, associe: 9, autre: 3 } as Record<string, number>,
};

export const INCOHERENCE_PENALTY = 10;

export type ScoreResult = {
  score: number;
  qualified: boolean;
  breakdown: Record<string, number>;
  flags: string[];
};

export function computeDiagnosticScore(a: DiagnosticAnswers): ScoreResult {
  const pick = (table: Record<string, number>, key?: string) => (key && table[key]) || 0;
  const breakdown: Record<string, number> = {
    sector: pick(SCORE_TABLE.sector, a.sector),
    objective: pick(SCORE_TABLE.objective, a.objective) || (a.objectiveOther?.trim() ? 6 : 0),
    invested: pick(SCORE_TABLE.invested, a.invested),
    pastBudget: a.invested === "oui" ? pick(SCORE_TABLE.pastBudget, a.pastBudget) : 0,
    minimum: pick(SCORE_TABLE.minimum, a.minimum),
    revenue: pick(SCORE_TABLE.revenue, a.revenue),
    decision: pick(SCORE_TABLE.decision, a.decision),
  };
  const flags: string[] = [];
  // Coherence : dire "oui" a 405 000 FCFA/mois avec un tres petit chiffre d'affaires.
  if (a.minimum === "oui" && a.revenue === "moins_1m") flags.push("budget_vs_revenu");
  if (a.minimum === "oui" && a.invested === "oui" && a.pastBudget === "moins_150k" && a.revenue === "moins_1m") {
    flags.push("budget_vs_historique");
  }
  const raw = Object.values(breakdown).reduce((s, v) => s + v, 0) - flags.length * INCOHERENCE_PENALTY;
  const score = Math.max(0, Math.min(100, raw));
  return { score, qualified: score >= QUALIFIED_THRESHOLD, breakdown, flags };
}
