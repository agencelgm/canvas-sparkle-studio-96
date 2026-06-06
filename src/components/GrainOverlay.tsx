/**
 * Fixed grain texture overlay — subtle film grain over the entire page.
 * pointer-events-none so it never intercepts clicks.
 * z-index 60 sits above content but below modals/toasts (z-[70]+).
 */
const GrainOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none select-none"
    aria-hidden="true"
    style={{ zIndex: 60 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ opacity: 0.038, display: "block" }}
    >
      <filter id="lgm-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#lgm-grain)" />
    </svg>
  </div>
);

export default GrainOverlay;
