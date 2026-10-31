import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useState } from "react";

const DiagnosticModal = lazy(() => import("./DiagnosticModal"));

type Ctx = { open: (source: string) => void };
const DiagnosticCtx = createContext<Ctx>({ open: () => {} });

export const DiagnosticProvider = ({ children }: { children: React.ReactNode }) => {
  const [source, setSource] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const open = useCallback((s: string) => { setMounted(true); setSource(s); }, []);
  // Tout lien "#diagnostic" du site ouvre directement le pop-up.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (!href.endsWith("#diagnostic")) return;
      e.preventDefault();
      e.stopPropagation();
      open(`cta-${window.location.pathname}`);
    };
    document.addEventListener("click", onClick, true);
    if (window.location.hash === "#diagnostic") {
      window.history.replaceState({}, "", window.location.pathname + window.location.search);
      open(`lien-${window.location.pathname}`);
    }
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  return (
    <DiagnosticCtx.Provider value={{ open }}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <DiagnosticModal source={source} onClose={() => setSource(null)} />
        </Suspense>
      )}
    </DiagnosticCtx.Provider>
  );
};

export const useDiagnostic = () => useContext(DiagnosticCtx);
