import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AbPageKey = "lead-agence-marketing" | "rendez-vous" | "programme-pilote" | "formation-facebook" | "groupe-whatsapp";
export type AbContent = { headline?: string; subtitle?: string; cta?: string; layout?: "full" | "short" };
type Assignment = { experimentId: string; variant: "a" | "b"; content: AbContent };

const visitorId = () => {
  try {
    let id = localStorage.getItem("lgm_ab_visitor");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("lgm_ab_visitor", id);
    }
    return id;
  } catch {
    return "anon-" + Math.random().toString(36).slice(2, 12);
  }
};

const forcedVariant = (): "a" | "b" | null => {
  const v = new URLSearchParams(window.location.search).get("v");
  if (v === "a" || v === "b") {
    try { sessionStorage.setItem("lgm_ab_notrack", "1"); } catch { /* ignore */ }
    return v;
  }
  return null;
};
const noTrack = () => {
  try { return sessionStorage.getItem("lgm_ab_notrack") === "1"; } catch { return false; }
};

const send = (body: Record<string, unknown>) => supabase.functions.invoke("ab-track", { body });

/** Lit l'assignation memorisee d'une page (pour attribuer une conversion depuis une autre page). */
export const getStoredAssignment = (pageKey: AbPageKey): { experimentId: string; variant: "a" | "b" } | null => {
  try {
    const raw = localStorage.getItem(`lgm_ab_${pageKey}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const trackAbConversion = (pageKey: AbPageKey) => {
  const a = getStoredAssignment(pageKey);
  if (!a || noTrack()) return;
  void send({ action: "track", experimentId: a.experimentId, variant: a.variant, visitorId: visitorId(), eventType: "convert" });
};

export const getAbVisitorId = visitorId;

/** Tirage 50/50 par experience, memorise sur l'appareil ; `?v=a|b` force la version sans compter la visite. */
export const useAbTest = (pageKey: AbPageKey) => {
  const [state, setState] = useState<{ ready: boolean; a: Assignment | null }>({ ready: false, a: null });

  useEffect(() => {
    let cancelled = false;
    const done = (a: Assignment | null) => { if (!cancelled) setState({ ready: true, a }); };
    const timer = window.setTimeout(() => done(null), 2500);
    send({ action: "config", pageKey })
      .then(({ data }) => {
        window.clearTimeout(timer);
        const exp = data?.experiment as { id: string; variants: Record<string, AbContent> } | null;
        if (!exp) return done(null);
        const stored = getStoredAssignment(pageKey);
        const forced = forcedVariant();
        const variant: "a" | "b" = forced ?? (stored?.experimentId === exp.id ? stored.variant : Math.random() < 0.5 ? "a" : "b");
        if (!forced) {
          try { localStorage.setItem(`lgm_ab_${pageKey}`, JSON.stringify({ experimentId: exp.id, variant })); } catch { /* ignore */ }
          if (!noTrack()) void send({ action: "track", experimentId: exp.id, variant, visitorId: visitorId(), eventType: "view" });
        }
        const w = window as unknown as { clarity?: (...x: unknown[]) => void };
        w.clarity?.("set", `ab_${pageKey}`, variant);
        done({ experimentId: exp.id, variant, content: exp.variants[variant] ?? {} });
      })
      .catch(() => done(null));
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [pageKey]);

  const convert = useCallback(() => trackAbConversion(pageKey), [pageKey]);
  return { ready: state.ready, variant: state.a?.variant ?? "a", experimentId: state.a?.experimentId, content: state.a?.content ?? {}, convert };
};
