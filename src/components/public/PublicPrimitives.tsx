import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const EASE = [0.32, 0.72, 0, 1] as const;

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BackArrow = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.24 }}
    transition={{ duration: 0.78, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MagneticLink = ({
  to,
  children,
  variant = "gold",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: "gold" | "ivory" | "outline";
  className?: string;
}) => {
  const base = variant === "ivory" ? "btn-ivory" : variant === "outline" ? "btn-akan-outline" : "btn-akan";
  return (
    <Link to={to} className={`${base} group ${className}`}>
      <span>{children}</span>
      <span className="btn-arrow-orb">
        <Arrow />
      </span>
    </Link>
  );
};

export const TextLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="public-text-link group">
    <span>{children}</span>
    <Arrow className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
  </Link>
);

export const ImageFrame = ({
  src,
  alt,
  tone = "dark",
  className = "",
}: {
  src: string;
  alt: string;
  tone?: "dark" | "light";
  className?: string;
}) => (
  <div className={`image-frame ${tone === "light" ? "image-frame-light" : ""} ${className}`}>
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  </div>
);

export const PageHero = ({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  image: string;
  imageAlt: string;
  align?: "left" | "center";
}) => (
  <section className="public-page-hero">
    <div className="public-ambient public-ambient-one" aria-hidden="true" />
    <div className="container-wide relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:items-end">
      <Reveal className={align === "center" ? "text-center lg:col-span-2 mx-auto max-w-5xl" : "max-w-4xl"}>
        <p className="section-kicker">{eyebrow}</p>
        <h1 className="public-h1">{title}</h1>
        <p className="public-lead">{lead}</p>
      </Reveal>
      {align !== "center" && (
        <Reveal delay={0.12}>
          <ImageFrame src={image} alt={imageAlt} className="min-h-[360px] lg:min-h-[520px]" />
        </Reveal>
      )}
    </div>
  </section>
);

export const FinalCTA = ({ title, text, button = "Parler a LGM" }: { title: string; text: string; button?: string }) => (
  <section className="section-espresso public-cta-band">
    <div className="container-wide grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <Reveal>
        <p className="section-kicker">Decision</p>
        <h2 className="public-h2 max-w-4xl">{title}</h2>
        <p className="public-body max-w-2xl">{text}</p>
      </Reveal>
      <Reveal delay={0.12}>
        <MagneticLink to="/contact">{button}</MagneticLink>
      </Reveal>
    </div>
  </section>
);
