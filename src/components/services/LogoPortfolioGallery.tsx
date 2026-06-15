import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/public/PublicPrimitives";
import { logoPortfolio } from "@/data/logoPortfolio";


export default function LogoPortfolioGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  if (logoPortfolio.length === 0) return null;

  return (
    <section className="section-charcoal section-pad">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: EASE }}
          className="mb-14 max-w-2xl"
        >
          <p className="section-kicker">Portfolio</p>
          <h2 className="public-h2">
            Des logos qu'on a deja<br />
            <span className="corporate-accent">realises</span>
          </h2>
          <p className="public-lead">
            Chaque marque est unique. Voici quelques exemples de ce qu'on a cree pour nos clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {logoPortfolio.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.64, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-[8px]"
              style={{
                border: "1px solid rgba(240,217,150,0.14)",
                background: "rgba(246,248,251,0.04)",
                aspectRatio: "4/3",
              }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-6 transition-transform duration-700"
                style={{ transform: hovered === item.id ? "scale(1.04)" : "scale(1)" }}
              />

              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{
                  background: "linear-gradient(to top, rgba(7,11,18,0.78) 0%, transparent 55%)",
                  opacity: hovered === item.id ? 1 : 0,
                  transition: "opacity 300ms cubic-bezier(0.32,0.72,0,1)",
                }}
              >
                <p className="text-[0.82rem] font-semibold text-platinum">{item.client}</p>
                {item.categorie && (
                  <p className="text-[0.72rem] mt-0.5" style={{ color: "var(--cobalt-light)" }}>
                    {item.categorie}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
