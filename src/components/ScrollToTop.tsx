import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

type LenisLike = { scrollTo: (target: number, opts?: { immediate?: boolean; force?: boolean }) => void };

const scrollToTop = () => {
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  }
  window.scrollTo(0, 0);
};

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      if (location.hash === "#diagnostic") scrollToDiagnostic();
      return;
    }

    scrollToTop();
    // Re-apply after paint in case images/Helmet/framer shift layout
    requestAnimationFrame(scrollToTop);
  }, [location.key, location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToTop;
