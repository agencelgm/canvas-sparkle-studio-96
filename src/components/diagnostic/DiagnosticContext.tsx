import { createContext, lazy, Suspense, useCallback, useContext, useState } from "react";

const DiagnosticModal = lazy(() => import("./DiagnosticModal"));

type Ctx = { open: (source: string) => void };
const DiagnosticCtx = createContext<Ctx>({ open: () => {} });

export const DiagnosticProvider = ({ children }: { children: React.ReactNode }) => {
  const [source, setSource] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const open = useCallback((s: string) => { setMounted(true); setSource(s); }, []);
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
