import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import ParticleBackground from "@/components/canvas/ParticleBackground";

// Loyalty flywheel: orbiting dots around a center
function LoyaltyFlywheel() {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef1 = useRef<THREE.Group>(null);
  const orbitRef2 = useRef<THREE.Group>(null);
  const orbitRef3 = useRef<THREE.Group>(null);
  const violetColor = "#8B5CF6";

  const orbitRings = [
    { ref: orbitRef1, radius: 0.7, dotCount: 5, speed: 0.22, color: violetColor },
    { ref: orbitRef2, radius: 1.1, dotCount: 8, speed: -0.14, color: "#A78BFA" },
    { ref: orbitRef3, radius: 1.55, dotCount: 11, speed: 0.09, color: "#C4B5FD" },
  ];

  useFrame((state) => {
    if (orbitRef1.current) orbitRef1.current.rotation.z = state.clock.elapsedTime * orbitRings[0].speed;
    if (orbitRef2.current) orbitRef2.current.rotation.z = state.clock.elapsedTime * orbitRings[1].speed;
    if (orbitRef3.current) orbitRef3.current.rotation.z = state.clock.elapsedTime * orbitRings[2].speed;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.25;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.07) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center core */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color={violetColor} emissive={violetColor} emissiveIntensity={0.9} metalness={0.9} roughness={0.05} />
      </mesh>

      {orbitRings.map((ring, ri) => (
        <group key={ri} ref={ring.ref}>
          {Array.from({ length: ring.dotCount }, (_, i) => {
            const angle = (i / ring.dotCount) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(angle) * ring.radius, Math.sin(angle) * ring.radius, 0]}>
                <sphereGeometry args={[0.04 - ri * 0.008, 12, 12]} />
                <meshStandardMaterial
                  color={ring.color}
                  emissive={ring.color}
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.85 - ri * 0.12}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      <Sparkles count={50} scale={4} size={0.9} speed={0.18} opacity={0.35} color={violetColor} />
    </group>
  );
}

const FEATURES = [
  { label: "Campagnes de réactivation", desc: "Vos anciens clients rachetent grâce à des messages ciblés au bon moment." },
  { label: "Programme de parrainage", desc: "Vos clients satisfaits deviennent vos meilleurs commerciaux." },
  { label: "Upsell & cross-sell automatiques", desc: "Augmentez la valeur de chaque client sans effort supplémentaire." },
  { label: "Suivi satisfaction & avis clients", desc: "Votre réputation construite méthodiquement, partout en ligne." },
];

const FidelisationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1.02, 0.97]);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 overflow-hidden flex items-center" style={{ height: "100dvh" }}>
        <ParticleBackground count={300} color="#8B5CF6" size={0.008} spread={10} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 75% 50%, rgba(139,92,246,0.055) 0%, transparent 70%)" }}
        />

        <div className="container-wide relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text left */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1">
            <div className="relative mb-2">
              <span className="section-number absolute -top-2 -left-2 select-none pointer-events-none">03</span>
            </div>
            <div className="pt-10">
              <h2
                className="font-serif text-foreground mb-5 leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Fidélisation
              </h2>
              <p
                className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-[46ch]"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)" }}
              >
                Vos clients actuels sont votre actif le plus précieux. Un client fidèle coûte 5x moins cher qu'un nouveau — et il vous recommande.
              </p>
            </div>

            <div className="flex flex-col">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="feature-item"
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: "#8B5CF6" }} />
                  <div>
                    <p className="text-foreground/90 font-medium text-sm mb-0.5">{f.label}</p>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D canvas right */}
          <motion.div
            style={{ scale: canvasScale }}
            className="order-1 lg:order-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div
              className="rounded-2xl p-px"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(139,92,246,0.12)",
                height: "clamp(280px, 44vw, 460px)",
              }}
            >
              <div
                className="w-full h-full rounded-[calc(1rem-1px)] overflow-hidden relative"
                style={{ background: "rgba(12,12,16,0.9)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)" }}
              >
                <Canvas
                  camera={{ position: [0, 0, 4.5], fov: 55 }}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                  style={{ background: "transparent", width: "100%", height: "100%" }}
                  dpr={[1, 2]}
                >
                  <ambientLight intensity={0.35} />
                  <pointLight position={[3, 3, 3]} intensity={1.4} color="#8B5CF6" />
                  <pointLight position={[-3, -2, 1]} intensity={0.4} color="#ffffff" />
                  <LoyaltyFlywheel />
                </Canvas>
                <div className="absolute bottom-5 right-5">
                  <div className="card-glass rounded-lg px-4 py-2.5 text-right" style={{ border: "1px solid rgba(139,92,246,0.15)" }}>
                    <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest mb-0.5">Valeur client</p>
                    <p className="font-display font-bold" style={{ fontSize: "1.5rem", color: "#8B5CF6" }}>×2</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom progress */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-4 h-0.5 rounded-full bg-white/15" />
          <div className="w-4 h-0.5 rounded-full bg-white/15" />
          <div className="w-8 h-0.5 rounded-full" style={{ background: "#8B5CF6" }} />
        </div>
      </div>
    </div>
  );
};

export default FidelisationSection;
