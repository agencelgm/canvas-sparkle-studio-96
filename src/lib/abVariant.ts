export type LpVariant = "a" | "b";

const KEY = "lgm_lp_variant";

/** Tirage 50/50 mémorisé sur l'appareil ; `?v=a` ou `?v=b` force une version. */
export const getLpVariant = (): LpVariant => {
  try {
    const forced = new URLSearchParams(window.location.search).get("v");
    if (forced === "a" || forced === "b") {
      localStorage.setItem(KEY, forced);
      return forced;
    }
    const saved = localStorage.getItem(KEY);
    if (saved === "a" || saved === "b") return saved;
    const v: LpVariant = Math.random() < 0.5 ? "a" : "b";
    localStorage.setItem(KEY, v);
    return v;
  } catch {
    return "a";
  }
};
