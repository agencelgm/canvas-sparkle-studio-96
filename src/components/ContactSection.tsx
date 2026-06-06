import { useState } from "react";
import { publicImages, serviceOptions, siteContact } from "@/data/publicContent";
import { ImageFrame, Reveal } from "@/components/public/PublicPrimitives";
import { supabase } from "@/integrations/supabase/client";

const emptyForm = { name: "", email: "", phone: "", service: "", message: "" };
type FormState = "idle" | "loading" | "success" | "error";

const ContactSection = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormState("loading");
    setErrorMsg("");

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service || null,
        message: formData.message,
      });
      if (error) throw error;
      setFormState("success");
      setFormData(emptyForm);
    } catch {
      setFormState("error");
      setErrorMsg("Le message n'a pas pu etre envoye. Vous pouvez aussi nous ecrire directement par email ou WhatsApp.");
    }
  };

  return (
    <section id="contact" className="section-espresso section-pad relative overflow-hidden">
      <div className="public-ambient public-ambient-one" aria-hidden="true" />
      <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-[0.86fr_1fr] lg:items-start">
        <Reveal>
          <p className="section-kicker">Contact</p>
          <h2 className="public-h2 max-w-3xl">Parlons de votre prochaine phase de croissance.</h2>
          <p className="public-lead">
            Premier echange sans engagement : nous regardons votre contexte, vos objectifs et les points ou ACF peut creer le plus d'impact.
          </p>
          <div className="mt-8">
            <ImageFrame src={publicImages.contact} alt="Scene editoriale de contact et de strategie chez LGM" className="min-h-[340px]" />
          </div>
          <div className="mt-7 grid gap-3 text-sm font-semibold text-ivory/64 sm:grid-cols-2">
            <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="public-card p-4 transition-colors hover:text-ivory">WhatsApp<br />{siteContact.phoneDisplay}</a>
            <a href={`mailto:${siteContact.email}`} className="public-card p-4 transition-colors hover:text-ivory">Email<br />{siteContact.email}</a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form onSubmit={handleSubmit} className="public-card p-5 md:p-7" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="home-name" className="contact-label">Nom complet *</label>
                <input id="home-name" name="name" value={formData.name} onChange={handleChange} className="contact-field" placeholder="Votre nom" required />
              </div>
              <div>
                <label htmlFor="home-email" className="contact-label">Email *</label>
                <input id="home-email" name="email" type="email" value={formData.email} onChange={handleChange} className="contact-field" placeholder="vous@entreprise.com" required />
              </div>
              <div>
                <label htmlFor="home-phone" className="contact-label">Telephone / WhatsApp</label>
                <input id="home-phone" name="phone" value={formData.phone} onChange={handleChange} className="contact-field" placeholder="+225 07 67 00 96 29" />
              </div>
              <div>
                <label htmlFor="home-service" className="contact-label">Besoin principal</label>
                <select id="home-service" name="service" value={formData.service} onChange={handleChange} className="contact-field">
                  <option value="">Selectionner</option>
                  {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="home-message" className="contact-label">Votre situation *</label>
                <textarea id="home-message" name="message" rows={5} value={formData.message} onChange={handleChange} className="contact-field min-h-[150px] resize-y" placeholder="Decrivez votre activite, vos objectifs et ce que vous voulez ameliorer." required />
              </div>
            </div>

            {formState === "success" && <p className="mt-5 rounded-md border border-[#e8c96b40] bg-[#e8c96b14] p-4 text-sm font-semibold text-[#e8c96b]">Message recu. Nous revenons vers vous sous 24h ouvrees.</p>}
            {formState === "error" && <p className="contact-error">{errorMsg}</p>}

            <button type="submit" className="btn-akan mt-6 w-full justify-center" disabled={formState === "loading"}>
              {formState === "loading" ? "Envoi en cours" : "Envoyer ma demande"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
