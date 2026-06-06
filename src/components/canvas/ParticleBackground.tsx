import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
}

function Particles({ count = 600, color = "#C9A227", size = 0.012, spread = 8 }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
      speeds[i] = 0.0003 + Math.random() * 0.0005;
    }
    return { positions, speeds };
  }, [count, spread]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      pos[i * 3] += Math.sin(t * 0.2 + i * 0.01) * 0.0004;
      if (pos[i * 3 + 1] > spread / 2) {
        pos[i * 3 + 1] = -spread / 2;
        pos[i * 3] = (Math.random() - 0.5) * spread;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface ParticleBackgroundProps {
  className?: string;
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
}

const ParticleBackground = ({
  className = "",
  count = 600,
  color = "#C9A227",
  size = 0.012,
  spread = 8,
}: ParticleBackgroundProps) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power", preserveDrawingBuffer: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Particles count={count} color={color} size={size} spread={spread} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
