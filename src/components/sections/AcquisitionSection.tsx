import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import ParticleBackground from "@/components/canvas/ParticleBackground";

// Network of pulsing nodes representing lead inflow
function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;
  const nodeData = Array.from({ length: count }, (_, i) => ({
    x: Math.cos((i / count) * Math.PI * 2) * (1.1 + (i % 3) * 0.25),
    y: Math.sin((i / count) * Math.PI * 2) * (0.75 + (i % 2) * 0.3),
    z: ((i % 5) - 2) * 0.2,
    active: i % 3 !== 2,
    phase: (i / count) * Math.PI * 2,
  }));

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.07;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.11) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Center magnet */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#C9A227" emissive="#C9A227" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>

      {nodeData.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[node.active ? 0.052 : 0.028, 16, 16]} />
          <meshStandardMaterial
            color={node.active ? "#C9A227" : "#ffffff"}
            emissive={node.active ? "#C9A227" : "#666666"}
            emissiveIntensity={node.active ? 0.55 : 0.08}
            transparent
            opacity={node.active ? 0.9 : 0.3}
          />
        </mesh>
      ))}

      <Sparkles count={55} scale={3.5} size={0.9} speed={0.28} opacity={0.35} color="#C9A227" />
    </group>
  );
}

const FEATURES = [
  { label: "Publicités Meta & Google", desc: "Ciblage précis, créatifs qui convertissent, budget maîtrisé." },
  { label: "SEO & visibilité organique", desc: "Votre entreprise trouvée avant vos concurrents, chaque jour." },
  { label: "Réseaux sociaux & contenu", desc: "Contenu qui attire, engage et convertit votre audience cible." },
  { label: "Génération de leads qualifiés", desc: "Des prospects qui vous cherchent déjà — pas du bruit." },
];

const AcquisitionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1.02, 0.97]);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 overflow-hidden flex items-center" style={{ height: "100dvh" }}>
        <ParticleBackground count={300} color="#C9A227" size={0.008} spread={10} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 75% 50%, rgba(201,162,39,0.055) 0%, transparent 70%)" }}
        />

        <div className="container-wide relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text left */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1">
            <div className="relative mb-2">
              <span className="section-number absolute -top-2 -left-2 select-none pointer-events-none">01</span>
            </div>
            <div className="pt-10">
              <h2
                className="font-serif text-foreground mb-5 leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Acquisition
              </h2>
              <p
                className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-[46ch]"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)" }}
              >
                Chaque jour, de nouveaux prospects apprennent votre existence et entrent dans votre système. Sans acquisition, tout s'arrête.
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
                  <span className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: "#C9A227" }} />
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
                border: "1px solid rgba(201,162,39,0.12)",
                height: "clamp(280px, 44vw, 460px)",
              }}
            >
              <div
                className="w-full h-full rounded-[calc(1rem-1px)] overflow-hidden relative"
                style={{ background: "rgba(12,12,16,0.9)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)" }}
              >
                <Canvas
                  camera={{ position: [0, 0, 4], fov: 55 }}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                  style={{ background: "transparent", width: "100%", height: "100%" }}
                  dpr={[1, 2]}
                >
                  <ambientLight intensity={0.35} />
                  <pointLight position={[3, 3, 3]} intensity={1.4} color="#C9A227" />
                  <pointLight position={[-3, -2, 1]} intensity={0.4} color="#ffffff" />
                  <NetworkNodes />
                </Canvas>
                <div className="absolute bottom-5 right-5">
                  <div className="card-glass rounded-lg px-4 py-2.5 text-right" style={{ border: "1px solid rgba(201,162,39,0.15)" }}>
                    <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest mb-0.5">Leads / mois</p>
                    <p className="font-display font-bold" style={{ fontSize: "1.5rem", color: "#C9A227" }}>×3</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom progress */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-8 h-0.5 rounded-full" style={{ background: "#C9A227" }} />
          <div className="w-4 h-0.5 rounded-full bg-white/15" />
          <div className="w-4 h-0.5 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
};

export default AcquisitionSection;
