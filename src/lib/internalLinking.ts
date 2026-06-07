import type { PageNode } from "@/data/siteGraph";

/**
 * Scoring du maillage interne.
 * Plus le score est eleve, plus le lien est pertinent depuis la page courante.
 */
const scorePair = (current: PageNode, candidate: PageNode): number => {
  if (current.url === candidate.url) return -1;

  let score = 0;

  // 1. Tags partages (le plus fort signal)
  const sharedTags = current.tags.filter((t) => candidate.tags.includes(t));
  score += sharedTags.length * 10;

  // 2. Service <-> zone : un service "performance" lie aux zones, et l'inverse
  if (current.type === "service" && candidate.type === "zone") score += 6;
  if (current.type === "zone" && candidate.type === "service") score += 6;

  // 3. Article <-> service/zone correspondants
  if (current.type === "article" && (candidate.type === "service" || candidate.type === "zone")) {
    if (sharedTags.length > 0) score += 8;
  }
  if ((current.type === "service" || current.type === "zone") && candidate.type === "article") {
    if (sharedTags.length > 0) score += 8;
  }

  // 4. Articles entre eux : meme thematique
  if (current.type === "article" && candidate.type === "article") {
    score += sharedTags.length * 4;
  }

  // 5. Spokes -> hub correspondant
  if (candidate.type === "hub") {
    if (current.type === "service" && candidate.url === "/services") score += 5;
    if (current.type === "zone" && candidate.url === "/services") score += 4;
    if (current.type === "article" && candidate.url === "/blog") score += 5;
  }

  // 6. Hubs et statiques -> home (faible)
  if (candidate.type === "home" && current.type !== "home") score += 1;

  // 7. Recence pour les articles
  if (candidate.type === "article" && candidate.publishedAt) {
    const days = (Date.now() - new Date(candidate.publishedAt).getTime()) / 86400000;
    if (days < 30) score += 2;
    else if (days < 90) score += 1;
  }

  return score;
};

export type ScoredLink = { node: PageNode; score: number };

export const getRelatedLinks = (
  current: PageNode,
  graph: PageNode[],
  options: { count?: number; types?: PageNode["type"][] } = {},
): ScoredLink[] => {
  const { count = 6, types } = options;

  const scored = graph
    .filter((n) => (types ? types.includes(n.type) : true))
    .map((n) => ({ node: n, score: scorePair(current, n) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // Diversification : pas plus de 3 noeuds du meme type a la suite
  const result: ScoredLink[] = [];
  const typeCount: Record<string, number> = {};
  for (const candidate of scored) {
    const t = candidate.node.type;
    typeCount[t] = (typeCount[t] ?? 0) + 1;
    if (typeCount[t] > 3) continue;
    result.push(candidate);
    if (result.length >= count) break;
  }

  // Fallback : completer avec n'importe quel autre noeud si on n'a pas assez
  if (result.length < count) {
    for (const n of graph) {
      if (n.url === current.url) continue;
      if (result.some((r) => r.node.url === n.url)) continue;
      result.push({ node: n, score: 0 });
      if (result.length >= count) break;
    }
  }

  return result;
};

/**
 * Renvoie une ancre variee pour un lien donne, en fonction du type de la cible.
 * Evite la repetition mecanique du title brut.
 */
export const anchorFor = (node: PageNode): string => {
  switch (node.type) {
    case "service":
      return node.title;
    case "zone":
      return node.title;
    case "article":
      return node.title;
    case "hub":
      return node.url === "/services" ? "Voir tous les services" : "Aller au blog";
    case "home":
      return "Accueil LGM";
    default:
      return node.title;
  }
};

/**
 * Bibliotheque de phrases d'introduction pour le bloc RelatedLinks selon
 * le contexte de la page courante.
 */
export const relatedKickerFor = (current: PageNode): string => {
  switch (current.type) {
    case "service":
      return "Continuer dans l'ecosysteme LGM";
    case "zone":
      return "Approfondir vos leviers locaux";
    case "article":
      return "Sur le meme sujet";
    case "hub":
      return "Explorer";
    default:
      return "Pour aller plus loin";
  }
};
