import { motion } from "framer-motion";
import { EASE } from "@/components/public/PublicPrimitives";


export type Option = {
  label: string;
  prix: string;
  note?: string;
};

interface OptionsAdditionnellesProps {
  titre: string;
  options: Option[];
  theme?: "light" | "dark";
}

export default function OptionsAdditionnelles({ titre, options, theme = "light" }: OptionsAdditionnellesProps) {
  const isDark = theme === "dark";

  return (
    <section className={isDark ? "section-charcoal section-pad-tight" : "section-pad-tight"} style={!isDark ? { background: "#f0f3f9" } : undefined}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.68, ease: EASE }}
        >
          <h3 className="public-h3 mb-8" style={{ color: isDark ? "var(--platinum)" : "var(--platinum-text)" }}>
            {titre}
          </h3>

          <ul className="flex flex-col divide-y" style={{ borderColor: isDark ? "rgba(240,217,150,0.12)" : "rgba(16,24,39,0.1)" }}>
            {options.map((opt, i) => (
              <motion.li
                key={opt.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.52, delay: i * 0.06, ease: EASE }}
                className="flex flex-col gap-0.5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="text-[0.95rem] font-semibold" style={{ color: isDark ? "var(--platinum)" : "var(--platinum-text)" }}>
                    {opt.label}
                  </span>
                  {opt.note && (
                    <p className="text-[0.8rem] mt-0.5" style={{ color: isDark ? "rgba(246,248,251,0.52)" : "var(--platinum-muted)" }}>
                      {opt.note}
                    </p>
                  )}
                </div>
                <span
                  className="shrink-0 rounded-full px-3 py-1 text-[0.82rem] font-bold tabular-nums"
                  style={{
                    background: isDark ? "rgba(215,180,106,0.14)" : "rgba(215,180,106,0.12)",
                    color: "var(--cobalt-dark)",
                  }}
                >
                  {opt.prix}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
