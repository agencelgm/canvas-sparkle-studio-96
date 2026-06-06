import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Orbital ring for each ACF lever
function OrbitalRing({
  color,
  rotation,
  radius,
  tube,
  speed,
  offset = 0,
}: {
  color: string;
  rotation: [number, number, number];
  radius: number;
  tube: number;
  speed: number;
  offset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed + offset;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={ref} rotation={rotation}>
        <torusGeometry args={[radius, tube, 64, 128]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

// Central sphere
function CenterSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial
        color="#C9A227"
        emissive="#C9A227"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient + point lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#C9A227" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#4ECDC4" />
      <pointLight position={[0, -4, -2]} intensity={0.5} color="#8B5CF6" />

      {/* Acquisition ring — bronze/gold */}
      <OrbitalRing
        color="#C9A227"
        rotation={[0.4, 0, 0]}
        radius={1.4}
        tube={0.022}
        speed={0.18}
        offset={0}
      />

      {/* Conversion ring — teal */}
      <OrbitalRing
        color="#4ECDC4"
        rotation={[1.1, 0.5, 0]}
        radius={1.0}
        tube={0.018}
        speed={-0.22}
        offset={1.2}
      />

      {/* Fidélisation ring — violet */}
      <OrbitalRing
        color="#8B5CF6"
        rotation={[-0.6, 1.0, 0.3]}
        radius={0.65}
        tube={0.014}
        speed={0.28}
        offset={2.4}
      />

      {/* Central gold sphere */}
      <CenterSphere />

      {/* Particle sparkles */}
      <Sparkles
        count={120}
        scale={4}
        size={1.2}
        speed={0.25}
        opacity={0.5}
        color="#C9A227"
      />
    </>
  );
}

const FrameworkACF3D = () => {
  const levers = [
    {
      number: "01",
      label: "Acquisition",
      color: "#C9A227",
      desc: "Attirer de nouveaux prospects chaque jour grâce à des stratégies ciblées et mesurables.",
    },
    {
      number: "02",
      label: "Conversion",
      color: "#4ECDC4",
      desc: "Transformer vos leads en clients payants avec les bons processus de vente.",
    },
    {
      number: "03",
      label: "Fidélisation",
      color: "#8B5CF6",
      desc: "Faire revenir vos clients, augmenter leur valeur vie et activer le bouche-à-oreille.",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2
            className="font-serif text-foreground mb-6"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            Le framework ACF
          </h2>
          <p
            className="text-muted-foreground font-sans mx-auto max-w-[52ch] leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
          >
            Trois leviers interconnectés. Un seul système pour accélérer votre croissance de façon durable et prévisible.
          </p>
        </motion.div>

        {/* Main grid: 3D canvas left, levers right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
            style={{ height: "clamp(320px, 50vw, 520px)" }}
          >
            {/* Outer shell (double-bezel) */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "2px",
              }}
            >
              <div
                className="w-full h-full rounded-[calc(1rem-2px)] overflow-hidden"
                style={{
                  background: "rgba(14,14,18,0.8)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                }}
              >
                <Canvas
                  camera={{ position: [0, 0, 3.5], fov: 55 }}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
                  style={{ background: "transparent", width: "100%", height: "100%" }}
                  dpr={[1, 2]}
                >
                  <Scene />
                </Canvas>
              </div>
            </div>

            {/* Label badge overlay */}
            <div className="absolute bottom-5 left-5">
              <span className="pill-gold text-[10px]">Framework ACF</span>
            </div>
          </motion.div>

          {/* Levers list */}
          <div className="flex flex-col gap-6">
            {levers.map((lever, i) => (
              <motion.div
                key={lever.label}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Outer shell */}
                <div
                  className="rounded-xl p-px"
                  style={{
                    background: `linear-gradient(135deg, ${lever.color}22, transparent)`,
                    border: `1px solid ${lever.color}18`,
                  }}
                >
                  {/* Inner core */}
                  <div
                    className="rounded-[calc(0.75rem-1px)] px-6 py-5 flex items-start gap-5"
                    style={{
                      background: "rgba(14,14,18,0.85)",
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Number */}
                    <span
                      className="font-display flex-shrink-0 select-none"
                      style={{
                        color: lever.color,
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontWeight: 800,
                        lineHeight: 1,
                        opacity: 0.9,
                      }}
                    >
                      {lever.number}
                    </span>

                    <div>
                      <h3
                        className="font-serif text-foreground mb-2"
                        style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 600 }}
                      >
                        {lever.label}
                      </h3>
                      <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                        {lever.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameworkACF3D;
