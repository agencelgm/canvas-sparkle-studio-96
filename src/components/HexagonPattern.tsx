interface HexagonPatternProps {
  className?: string;
}

const HexagonPattern = ({ className = "" }: HexagonPatternProps) => {
  return (
    <svg className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern
          id="hexagons"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.5)"
        >
          {/* Hexagon shape */}
          <path
            d="M28,2 L52,17 L52,47 L28,62 L4,47 L4,17 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-bronze"
          />
          <path
            d="M28,40 L52,55 L52,85 L28,100 L4,85 L4,55 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-bronze"
          />
        </pattern>
        <linearGradient id="hex-fade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="50%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="hex-mask">
          <rect width="100%" height="100%" fill="url(#hex-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#hexagons)"
        mask="url(#hex-mask)"
      />
    </svg>
  );
};

export default HexagonPattern;
