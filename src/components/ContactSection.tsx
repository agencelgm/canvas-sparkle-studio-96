import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const EASE = [0.32, 0.72, 0, 1] as const;

const services = [
  "Génération de leads",
  "SEO & visibilité locale",
  "Tunnel de conversion",
  "Automatisation & IA",
  "Réseaux sociaux",
  "Développement web",
  "Autre / Je ne sais pas encore",
];

type FormState = "idle" | "loading" | "success" | "error";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          service: formData.service || null,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setFormState("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setFormState("error");
      setErrorMsg("Une erreur est survenue. Veuillez réessayer ou nous écrire directement.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(196, 154, 42, 0.18)",
    borderRadius: "4px",
    padding: "0.85rem 1rem",
    fontSize: "0.88rem",
    color: "#F0E8D5",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.68rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(240, 232, 213, 0.38)",
    marginBottom: "0.5rem",
    fontFamily: "inherit",
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(196,154,42,0.07) 0%, transparent 60%), radial-gradient(ellipse at 90% 90%, rgba(42,31,14,0.4) 0%, transparent 50%), var(--warm-dark)",
        paddingTop: "clamp(5rem, 12vw, 9rem)",
        paddingBottom: "clamp(5rem, 12vw, 9rem)",
      }}
    >
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Intro */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Animated gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                width: "36px",
                height: "1px",
                background: "var(--akan-gold)",
                transformOrigin: "left",
                marginBottom: "2rem",
              }}
            />

            <h2
              className="font-serif mb-5"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.022em",
                lineHeight: 1.12,
                color: "#F5EFE0",
                maxWidth: "18ch",
                textWrap: "balance",
              }}
            >
              Parlons de votre{" "}
              <em style={{ color: "var(--akan-gold-light)" }}>croissance.</em>
            </h2>

            <p
              className="font-sans mb-10"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.72,
                color: "rgba(240, 232, 213, 0.5)",
                maxWidth: "38ch",
              }}
            >
              Premier échange sans engagement. Nous analysons votre situation
              et vous proposons une approche adaptée à votre marché et vos objectifs.
            </p>

            {/* Direct contact alternatives */}
            <div
              style={{
                borderTop: "1px solid rgba(196, 154, 42, 0.10)",
                paddingTop: "2rem",
              }}
            >
              <p
                className="font-display mb-4"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(240, 232, 213, 0.28)",
                  fontWeight: 700,
                }}
              >
                Contact direct
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/2250767009629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(196,154,42,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(196,154,42,0.65)">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-sans" style={{ fontSize: "0.84rem", color: "#F0E8D5", display: "block" }}>
                      WhatsApp
                    </span>
                    <span className="font-sans" style={{ fontSize: "0.75rem", color: "rgba(240,232,213,0.38)" }}>
                      +225 07 67 00 96 29
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:contact@lgm.marketing"
                  className="flex items-center gap-3"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(196,154,42,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(196,154,42,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-sans" style={{ fontSize: "0.84rem", color: "#F0E8D5", display: "block" }}>
                      Email
                    </span>
                    <span className="font-sans" style={{ fontSize: "0.75rem", color: "rgba(240,232,213,0.38)" }}>
                      contact@lgm.marketing
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            {formState === "success" ? (
              <div
                style={{
                  padding: "3rem 2rem",
                  border: "1px solid rgba(196,154,42,0.2)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1px solid rgba(196,154,42,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--akan-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-serif" style={{ fontSize: "1.4rem", fontWeight: 400, color: "#F5EFE0", marginBottom: "0.75rem" }}>
                  Message reçu.
                </p>
                <p className="font-sans" style={{ fontSize: "0.84rem", color: "rgba(240,232,213,0.48)", lineHeight: 1.65 }}>
                  Nous vous répondrons dans les 24 heures ouvrées.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-5">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="font-display" style={labelStyle}>Nom complet *</label>
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleChange}
                        placeholder="Votre nom" style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.18)")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="font-display" style={labelStyle}>Email *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="vous@entreprise.com" style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.18)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="font-display" style={labelStyle}>Téléphone / WhatsApp</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+225 07 00 00 00 00" style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.18)")}
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="font-display" style={labelStyle}>Besoin principal</label>
                    <select
                      id="service" name="service"
                      value={formData.service} onChange={handleChange}
                      style={{
                        ...inputStyle,
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='rgba(196,154,42,0.5)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        paddingRight: "2.5rem",
                        cursor: "pointer",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.18)")}
                    >
                      <option value="" style={{ background: "#2A1F0E" }}>Sélectionner un service</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: "#2A1F0E" }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="font-display" style={labelStyle}>Votre situation *</label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={formData.message} onChange={handleChange}
                      placeholder="Décrivez votre activité, vos objectifs et ce que vous cherchez à accomplir..."
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(196,154,42,0.18)")}
                    />
                  </div>

                  {formState === "error" && (
                    <p className="font-sans" style={{ fontSize: "0.82rem", color: "rgba(220,80,80,0.8)" }}>
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn-akan"
                    style={{ justifyContent: "center", opacity: formState === "loading" ? 0.7 : 1 }}
                  >
                    {formState === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
                  </button>

                  <p className="font-sans text-center" style={{ fontSize: "0.72rem", color: "rgba(240,232,213,0.25)" }}>
                    Réponse garantie sous 24h ouvrées. Sans engagement.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
