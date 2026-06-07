import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      if (location.hash === "#diagnostic") scrollToDiagnostic();
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.key, location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToTop;
