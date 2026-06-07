import { useState } from "react";
import { motion, MotionStyle } from "framer-motion";

interface PhoneImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: MotionStyle;
  placeholderIcon?: React.ReactNode;
}

const PhoneImage = ({ src, alt, className = "", style, placeholderIcon }: PhoneImageProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <motion.div
        className={`relative flex items-center justify-center rounded-2xl ${className}`}
        style={{
          background: "linear-gradient(135deg, #141414 0%, #1a1a1a 50%, #0f0f0f 100%)",
          border: "1px solid rgba(201,162,39,0.15)",
          aspectRatio: "3/4",
          minHeight: "300px",
          ...style,
        }}
      >
        {/* Phone silhouette */}
        <div className="flex flex-col items-center gap-4 opacity-40">
          <div
            className="w-24 h-40 rounded-2xl border-2 border-cobalt/40 relative flex items-center justify-center"
            style={{ background: "rgba(201,162,39,0.05)" }}
          >
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full bg-cobalt/20" />
            {/* Screen content placeholder */}
            <div className="flex flex-col gap-1.5 w-16">
              <div className="h-1 rounded bg-cobalt/30 w-full" />
              <div className="h-1 rounded bg-cobalt/20 w-3/4" />
              <div className="h-1 rounded bg-cobalt/20 w-5/6" />
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-cobalt/20" />
          </div>
          {placeholderIcon && (
            <div className="text-cobalt/50">{placeholderIcon}</div>
          )}
        </div>

        {/* Gold glow dots â€” mimics the 3D floating elements */}
        {[
          { top: "15%", left: "10%", size: 8, delay: 0 },
          { top: "25%", right: "12%", size: 10, delay: 0.3 },
          { bottom: "30%", left: "8%", size: 7, delay: 0.6 },
          { bottom: "20%", right: "10%", size: 9, delay: 0.9 },
          { top: "50%", left: "5%", size: 6, delay: 1.2 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cobalt/20"
            style={{
              width: dot.size,
              height: dot.size,
              top: dot.top,
              left: (dot as Record<string, unknown>).left as string,
              right: (dot as Record<string, unknown>).right as string,
              bottom: dot.bottom,
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay }}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  );
};

export default PhoneImage;
