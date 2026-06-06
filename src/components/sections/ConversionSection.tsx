import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import ParticleBackground from "@/components/canvas/ParticleBackground";

// Funnel shape: stacked cylinders that fill progressively
function ConversionFunnel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  const tealColor = "#4ECDC4";
  const levels = [
    { y: 1.2, r: 0.9, h: 0.18, opacity: 0.35, label: "Prospects" },
    { y: 0.7, r: 0.72, h: 0.18, opacity: 0.5, label: "Leads" },
    { y: 0.25, r: 0.55, h: 0.18, opacity: 0.65, label: "Qualifiés" },
    { y: -0.18, r: 0.38, h: 0.18, opacity: 0.8, label: "Devis" },
    { y: -0.6, r: 0.22, h: 0.18, opacity: 1, label: "Clients" },
  ];

  return (
    <group ref={groupRef}>
      {levels.map((level, i) => (
        <mesh key={i} position={[0, level.y, 0]}>
          <cylinderGeometry args={[level.r, level.r * 0.82, level.h, 64]} />
          <meshStandardMaterial
            color={tealColor}
            emissive={tealColor}
            emissiveIntensity={0.3 + level.opacity * 0.3}
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={level.opacity * 0.8}
          />
        </mesh>
      ))}

      {/* Bottom conversion glow */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color={tealColor} emissive={tealColor} emissiveIntensity={1} metalness={0.9} roughness={0.05} />
      </mesh>

      <Sparkles count={45} scale={3} size={0.8} speed={0.2} opacity={0.4} color={tealColor} />
    </group>
  );
}

const FEATURES = [
  { label: "Tunnel de vente automatisé", desc: "Votre prospect guidé du premier contact jusqu'au paiement." },
  { label: "Relance & nurturing email / WhatsApp", desc: "Aucun lead ne tombe aux oubliettes grâce à des séquences automatiques." },
  { label: "Offre et argumentaire sur mesure", desc: "Ce que vous présentez convainc — pas par hasard, par méthode." },
  { label: "CRM & suivi des opportunités", desc: "Chaque deal visible, chaque opportunité suivie en temps réel." },
];

const ConversionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1.02, 0.97]);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 overflow-hidden flex items-center" style={{ height: "100dvh" }}>
        <ParticleBackground count={300} color="#4ECDC4" size={0.008} spread={10} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 25% 50%, rgba(78,205,196,0.055) 0%, transparent 70%)" }}
        />

        <div className="container-wide relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 3D canvas left */}
          <motion.div
            style={{ scale: canvasScale }}
            className="order-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div
              className="rounded-2xl p-px"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(78,205,196,0.12)",
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
                  <pointLight position={[3, 3, 3]} intensity={1.4} color="#4ECDC4" />
                  <pointLight position={[-3, -2, 1]} intensity={0.4} color="#ffffff" />
                  <ConversionFunnel />
                </Canvas>
                <div className="absolute bottom-5 left-5">
                  <div className="card-glass rounded-lg px-4 py-2.5" style={{ border: "1px solid rgba(78,205,196,0.15)" }}>
                    <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest mb-0.5">Taux de conversion</p>
                    <p className="font-display font-bold" style={{ fontSize: "1.5rem", color: "#4ECDC4" }}>+67%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text right */}
          <motion.div style={{ y: textY }} className="order-2">
            <div className="relative mb-2">
              <span className="section-number absolute -top-2 -left-2 select-none pointer-events-none">02</span>
            </div>
            <div className="pt-10">
              <h2
                className="font-serif text-foreground mb-5 leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Conversion
              </h2>
              <p
                className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-[46ch]"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)" }}
              >
                Attirer des prospects ne suffit pas. Il faut un système qui transforme ces contacts en clients payants — sans effort manuel constant.
              </p>
            </div>

            <div className="flex flex-col">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="feature-item"
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: "#4ECDC4" }} />
                  <div>
                    <p className="text-foreground/90 font-medium text-sm mb-0.5">{f.label}</p>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom progress */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-4 h-0.5 rounded-full bg-white/15" />
          <div className="w-8 h-0.5 rounded-full" style={{ background: "#4ECDC4" }} />
          <div className="w-4 h-0.5 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
};

export default ConversionSection;
