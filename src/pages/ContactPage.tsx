import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "@/components/layout/PageLayout";
import { FinalCTA, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages, serviceOptions, siteContact } from "@/data/publicContent";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caracteres").max(100, "Le nom est trop long"),
  email: z.string().trim().email("Email invalide").max(255, "Email trop long"),
  phone: z.string().trim().max(20, "Numero trop long").optional(),
  service: z.string().optional(),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caracteres").max(1000, "Le message est trop long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitState("idle");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message,
      });
      if (error) throw error;
      setSubmitState("success");
      form.reset();
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Contact | LGM</title>
        <meta name="description" content="Contactez LGM a Abidjan pour un audit marketing digital et une lecture claire de vos leviers acquisition, conversion et fidelisation." />
        <link rel="canonical" href="https://lgm.marketing/contact" />
        <meta property="og:url" content="https://lgm.marketing/contact" />
        <meta property="og:image" content={publicImages.og} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
            { "@type": "ListItem", position: 2, name: "Contact" },
          ],
        })}</script>
      </Helmet>

      <PageHero
        eyebrow="Contact"
        title={<>Un premier echange, puis une <span className="editorial-accent">lecture nette.</span></>}
        lead="Expliquez-nous votre contexte. Nous vous repondrons avec les prochaines questions utiles, pas avec un package standard."
        image={publicImages.contact}
        imageAlt="Image de contact generative LGM"
      />

      <section className="section-espresso section-pad-tight">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.74fr_1fr] lg:items-start">
          <Reveal>
            <p className="section-kicker">Coordonnees</p>
            <h2 className="public-h2 max-w-3xl">Direct, humain, mesurable.</h2>
            <p className="public-lead">Vous pouvez passer par le formulaire ou nous ecrire directement. Dans les deux cas, votre demande arrive au meme endroit.</p>
            <div className="mt-8 grid gap-4">
              <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="public-card p-5 text-ivory/72 transition-colors hover:text-ivory">
                <span className="block text-sm font-bold text-[#e8c96b]">WhatsApp</span>
                <span className="mt-1 block text-lg font-bold">{siteContact.phoneDisplay}</span>
              </a>
              <a href={`mailto:${siteContact.email}`} className="public-card p-5 text-ivory/72 transition-colors hover:text-ivory">
                <span className="block text-sm font-bold text-[#e8c96b]">Email</span>
                <span className="mt-1 block text-lg font-bold">{siteContact.email}</span>
              </a>
              <div className="public-card p-5 text-ivory/72">
                <span className="block text-sm font-bold text-[#e8c96b]">Adresse</span>
                <span className="mt-1 block text-lg font-bold">{siteContact.address}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="public-card p-5 md:p-7" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="contact-label">Nom complet *</label>
                  <input id="name" className="contact-field" placeholder="Votre nom" {...form.register("name")} />
                  {form.formState.errors.name && <p className="contact-error">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="contact-label">Email *</label>
                  <input id="email" type="email" className="contact-field" placeholder="vous@entreprise.com" {...form.register("email")} />
                  {form.formState.errors.email && <p className="contact-error">{form.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="contact-label">Telephone</label>
                  <input id="phone" className="contact-field" placeholder="+225 07 67 00 96 29" {...form.register("phone")} />
                  {form.formState.errors.phone && <p className="contact-error">{form.formState.errors.phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="service" className="contact-label">Service souhaite</label>
                  <select id="service" className="contact-field" {...form.register("service")}>
                    <option value="">Selectionner</option>
                    {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="contact-label">Message *</label>
                  <textarea id="message" rows={6} className="contact-field min-h-[170px] resize-y" placeholder="Decrivez votre activite, vos objectifs et vos blocages actuels." {...form.register("message")} />
                  {form.formState.errors.message && <p className="contact-error">{form.formState.errors.message.message}</p>}
                </div>
              </div>

              {submitState === "success" && <p className="mt-5 rounded-md border border-[#e8c96b40] bg-[#e8c96b14] p-4 text-sm font-semibold text-[#e8c96b]">Message recu. Nous vous repondrons sous 24h ouvrees.</p>}
              {submitState === "error" && <p className="contact-error mt-5">Le message n'a pas pu etre envoye. Ecrivez-nous directement a {siteContact.email}.</p>}

              <button type="submit" className="btn-akan mt-6 w-full justify-center" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours" : "Envoyer le message"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section-ivory section-pad-tight">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <Reveal>
            <p className="section-kicker text-[#8b6914]">Avant l'appel</p>
            <h2 className="public-h2 max-w-4xl text-ivory-text">Les bonnes informations accelerent le diagnostic.</h2>
            <p className="public-lead text-ivory-muted">Partagez votre offre, vos canaux actuels, vos objectifs commerciaux et ce qui ne fonctionne plus. Nous construirons la conversation autour de ces points.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <ImageFrame src={publicImages.contact} alt="Preparation d'un audit marketing" tone="light" className="min-h-[340px]" />
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
