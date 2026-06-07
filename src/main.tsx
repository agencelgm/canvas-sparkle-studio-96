import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Lenis from "lenis";

// Disable browser scroll restoration so route changes always start at top
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Silky inertial scroll — expo ease-out curve
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

// Expose for route-level scroll resets
(window as unknown as { __lenis?: Lenis }).__lenis = lenis;

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(<App />);
