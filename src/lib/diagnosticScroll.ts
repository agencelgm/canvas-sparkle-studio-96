const HEADER_OFFSET = 104;

export const DIAGNOSTIC_HASH = "#diagnostic";

export const scrollToDiagnostic = (behavior: ScrollBehavior = "smooth") => {
  window.requestAnimationFrame(() => {
    const target = document.getElementById(DIAGNOSTIC_HASH.slice(1));
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
  });
};

export const isDiagnosticTarget = (to: unknown) => {
  if (typeof to === "string") return to.includes(DIAGNOSTIC_HASH);
  if (to && typeof to === "object" && "hash" in to) return to.hash === DIAGNOSTIC_HASH;
  return false;
};
