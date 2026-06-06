interface ParticleBackgroundProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
}

const ParticleBackground = (_props: ParticleBackgroundProps = {}) => {
  return <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(232,201,107,0.08),transparent_34%)]" aria-hidden="true" />;
};

export default ParticleBackground;

