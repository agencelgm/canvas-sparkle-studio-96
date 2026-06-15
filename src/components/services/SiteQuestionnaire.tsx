import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { siteContact } from "@/data/publicContent";
import { EASE } from "@/components/public/PublicPrimitives";


type SiteType = "vitrine" | "ecommerce" | "";

interface FormState {
  siteType: SiteType;
  nomEcommerce: string;
  telEcommerce: string;
  pagesSouhaitees: string;
  identiteExistante: string;
  textesPrets: string;
  domaineExistant: string;
  langues: string;
  exemplessites: string;
  delaiSouhaite: string;
  anciennete: string;
  systemAcquisition: string;
  nom: string;
  whatsapp: string;
  email: string;
}

const initialState: FormState = {
  siteType: "",
  nomEcommerce: "",
  telEcommerce: "",
  pagesSouhaitees: "",
  identiteExistante: "",
  textesPrets: "",
  domaineExistant: "",
  langues: "",
  exemplessites: "",
  delaiSouhaite: "",
  anciennete: "",
  systemAcquisition: "",
  nom: "",
  whatsapp: "",
  email: "",
};

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const RadioOption = ({
  id,
  label,
  desc,
  selected,
  onClick,
}: {
  id: string;
  label: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col rounded-[8px] p-4 text-left transition-all duration-300"
    style={{
      border: selected ? "2px solid var(--cobalt)" : "1px solid rgba(240,217,150,0.18)",
      background: selected ? "rgba(215,180,106,0.1)" : "rgba(246,248,251,0.04)",
    }}
    aria-pressed={selected}
  >
    <span className="font-semibold text-platinum">{label}</span>
    {desc && <span className="mt-1 text-[0.82rem]" style={{ color: "rgba(246,248,251,0.52)" }}>{desc}</span>}
  </button>
);

export default function SiteQuestionnaire() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isEcommerce = form.siteType === "ecommerce";
  const TOTAL_STEPS = isEcommerce ? 2 : 5;

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (step === 1) {
      if (!form.siteType) errs.siteType = "Choisissez un type de site pour continuer.";
      if (isEcommerce && !form.nomEcommerce.trim()) errs.nomEcommerce = "Votre nom est requis.";
      if (isEcommerce && !form.telEcommerce.trim()) errs.telEcommerce = "Votre numero est requis.";
    }
    if (!isEcommerce && step === TOTAL_STEPS) {
      if (!form.nom.trim()) errs.nom = "Votre nom est requis.";
      if (!form.whatsapp.trim()) errs.whatsapp = "Votre numero WhatsApp est requis.";
      if (!form.email.trim()) errs.email = "Votre email est requis.";
    }
    if (isEcommerce && step === 2) {
      if (!form.nom.trim()) errs.nom = "Votre nom est requis.";
      if (!form.whatsapp.trim()) errs.whatsapp = "Votre numero WhatsApp est requis.";
      if (!form.email.trim()) errs.email = "Votre email est requis.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (!validate()) return;
    setDirection(1);
    if (isEcommerce && step === 1) {
      setStep(2);
    } else {
      setStep((s) => Math.min(s + 1, isEcommerce ? 2 : 5));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    const { error } = await supabase
      .from("demandes_services")
      .insert({
        type: "site",
        pack_selectionne: null,
        reponses: {
          siteType: form.siteType,
          nomEcommerce: form.nomEcommerce,
          telEcommerce: form.telEcommerce,
          pagesSouhaitees: form.pagesSouhaitees,
          identiteExistante: form.identiteExistante,
          textesPrets: form.textesPrets,
          domaineExistant: form.domaineExistant,
          langues: form.langues,
          exemplessites: form.exemplessites,
          delaiSouhaite: form.delaiSouhaite,
          anciennete: form.anciennete,
          systemAcquisition: form.systemAcquisition,
        },
        nom: isEcommerce ? form.nomEcommerce : form.nom,
        whatsapp: form.whatsapp,
        email: form.email,
      });
    setSubmitting(false);
    if (error) {
      setSubmitError("Une erreur s'est produite. Veuillez reessayer ou nous ecrire directement sur WhatsApp.");
    } else {
      setSubmitted(true);
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col items-center gap-6 py-16 text-center"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(215,180,106,0.18)" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M7 14l5 5 9-9" stroke="#d7b46a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="public-h3 text-platinum">Merci !</h3>
        <p className="public-lead text-center">
          On revient vers toi avec une proposition personnalisee sous 24 a 48h.
        </p>
        <a
          href={`${siteContact.whatsapp}?text=${encodeURIComponent("Bonjour, j'ai rempli le questionnaire site internet sur votre site. Je souhaite en savoir plus.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cobalt mt-2"
        >
          Nous ecrire sur WhatsApp
          <span className="btn-arrow-orb">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.78rem] font-semibold" style={{ color: "rgba(246,248,251,0.52)" }}>
            Etape {step} sur {TOTAL_STEPS}
          </span>
          <span className="text-[0.78rem] font-bold" style={{ color: "var(--cobalt-light)" }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(246,248,251,0.1)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--cobalt)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${step}-${isEcommerce}`}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.34, ease: EASE }}
        >
          {/* Etape 1 : Type de site */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Quel type de site souhaitez-vous ?</h3>
                <p className="public-body mt-2">
                  Le type de projet determine les prochaines questions.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <RadioOption
                  id="vitrine"
                  label="Site Vitrine"
                  desc="Presentez votre activite, vos services et vos coordonnees"
                  selected={form.siteType === "vitrine"}
                  onClick={() => set("siteType", "vitrine")}
                />
                <RadioOption
                  id="ecommerce"
                  label="Site E-commerce"
                  desc="Vendre des produits ou services en ligne"
                  selected={form.siteType === "ecommerce"}
                  onClick={() => set("siteType", "ecommerce")}
                />
              </div>
              {errors.siteType && <p className="contact-error">{errors.siteType}</p>}

              {/* Cas e-commerce : message + coordonnees */}
              <AnimatePresence>
                {isEcommerce && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col gap-5"
                  >
                    <div
                      className="rounded-[8px] px-5 py-4"
                      style={{ background: "rgba(215,180,106,0.08)", border: "1px solid rgba(215,180,106,0.22)" }}
                    >
                      <p className="text-[0.92rem] leading-relaxed" style={{ color: "var(--cobalt-light)" }}>
                        Les projets e-commerce sont traites sur devis personnalise. Laissez-nous vos coordonnees et on vous recontacte pour un appel de cadrage de 30 minutes.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="nomEcommerce" className="contact-label">Votre nom *</label>
                      <input
                        id="nomEcommerce"
                        type="text"
                        className="contact-field"
                        placeholder="Votre nom et prenom"
                        value={form.nomEcommerce}
                        onChange={(e) => set("nomEcommerce", e.target.value)}
                      />
                      {errors.nomEcommerce && <p className="contact-error">{errors.nomEcommerce}</p>}
                    </div>
                    <div>
                      <label htmlFor="telEcommerce" className="contact-label">Votre numero de telephone *</label>
                      <input
                        id="telEcommerce"
                        type="tel"
                        className="contact-field"
                        placeholder="+225 07 XX XX XX XX"
                        value={form.telEcommerce}
                        onChange={(e) => set("telEcommerce", e.target.value)}
                      />
                      {errors.telEcommerce && <p className="contact-error">{errors.telEcommerce}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Etape 2 : Coordonnees (e-commerce) */}
          {step === 2 && isEcommerce && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Vos coordonnees</h3>
                <p className="public-body mt-2">
                  On vous contacte rapidement pour planifier votre appel de cadrage.
                </p>
              </div>
              <div>
                <label htmlFor="whatsapp-ecom" className="contact-label">Numero WhatsApp *</label>
                <input
                  id="whatsapp-ecom"
                  type="tel"
                  className="contact-field"
                  placeholder="+225 07 XX XX XX XX"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                />
                {errors.whatsapp && <p className="contact-error">{errors.whatsapp}</p>}
              </div>
              <div>
                <label htmlFor="email-ecom" className="contact-label">Email *</label>
                <input
                  id="email-ecom"
                  type="email"
                  className="contact-field"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                {errors.email && <p className="contact-error">{errors.email}</p>}
              </div>
              {submitError && (
                <p className="rounded-[6px] px-4 py-3 text-[0.88rem]" style={{ background: "rgba(255,90,70,0.1)", color: "#ffb5a6" }}>
                  {submitError}
                </p>
              )}
            </div>
          )}

          {/* Etape 2 (Vitrine) : Contenu du site */}
          {step === 2 && !isEcommerce && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Le contenu de votre site</h3>
                <p className="public-body mt-2">Dites-nous ce que vous voulez sur votre site.</p>
              </div>
              <div>
                <label htmlFor="pagesSouhaitees" className="contact-label">Pages et sections souhaitees</label>
                <textarea
                  id="pagesSouhaitees"
                  className="contact-field resize-none"
                  rows={3}
                  placeholder="Ex : Accueil, Nos services, A propos, Galerie, Contact..."
                  value={form.pagesSouhaitees}
                  onChange={(e) => set("pagesSouhaitees", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="contact-label mb-3 block">Avez-vous deja une identite visuelle (logo, couleurs) ?</label>
                  <div className="flex gap-3">
                    {["Oui", "Non"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("identiteExistante", opt)}
                        className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all duration-300"
                        style={{
                          border: form.identiteExistante === opt ? "2px solid var(--cobalt)" : "1px solid rgba(240,217,150,0.18)",
                          background: form.identiteExistante === opt ? "rgba(215,180,106,0.1)" : "rgba(246,248,251,0.04)",
                          color: form.identiteExistante === opt ? "var(--cobalt-light)" : "rgba(246,248,251,0.68)",
                        }}
                        aria-pressed={form.identiteExistante === opt}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="contact-label mb-3 block">Textes et photos deja prets ?</label>
                  <div className="flex gap-3">
                    {["Oui", "Non"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("textesPrets", opt)}
                        className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all duration-300"
                        style={{
                          border: form.textesPrets === opt ? "2px solid var(--cobalt)" : "1px solid rgba(240,217,150,0.18)",
                          background: form.textesPrets === opt ? "rgba(215,180,106,0.1)" : "rgba(246,248,251,0.04)",
                          color: form.textesPrets === opt ? "var(--cobalt-light)" : "rgba(246,248,251,0.68)",
                        }}
                        aria-pressed={form.textesPrets === opt}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Etape 3 (Vitrine) : Domaine et langue */}
          {step === 3 && !isEcommerce && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Domaine et preferences</h3>
                <p className="public-body mt-2">Ces details nous aident a pleinement adapter votre site.</p>
              </div>
              <div>
                <label className="contact-label mb-3 block">Avez-vous deja un nom de domaine ?</label>
                <div className="flex gap-3">
                  {["Oui", "Non - a acheter"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("domaineExistant", opt)}
                      className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all duration-300"
                      style={{
                        border: form.domaineExistant === opt ? "2px solid var(--cobalt)" : "1px solid rgba(240,217,150,0.18)",
                        background: form.domaineExistant === opt ? "rgba(215,180,106,0.1)" : "rgba(246,248,251,0.04)",
                        color: form.domaineExistant === opt ? "var(--cobalt-light)" : "rgba(246,248,251,0.68)",
                      }}
                      aria-pressed={form.domaineExistant === opt}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="langues" className="contact-label">Langues du site</label>
                <input
                  id="langues"
                  type="text"
                  className="contact-field"
                  placeholder="Ex : Francais uniquement / Francais et Anglais..."
                  value={form.langues}
                  onChange={(e) => set("langues", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="exemplessites" className="contact-label">Exemples de sites que vous aimez</label>
                <textarea
                  id="exemplessites"
                  className="contact-field resize-none"
                  rows={3}
                  placeholder="Copiez les URL de sites dont vous appreciez le design"
                  value={form.exemplessites}
                  onChange={(e) => set("exemplessites", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="delaiSouhaite" className="contact-label">Delai souhaite pour la mise en ligne</label>
                <input
                  id="delaiSouhaite"
                  type="text"
                  className="contact-field"
                  placeholder="Ex : Dans 1 mois, avant le 15 mars, pas de date precise..."
                  value={form.delaiSouhaite}
                  onChange={(e) => set("delaiSouhaite", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Etape 4 (Vitrine) : Contexte entreprise */}
          {step === 4 && !isEcommerce && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Pour mieux vous connaitre</h3>
                <p className="public-body mt-2">
                  Ces informations nous aident a mieux comprendre votre situation et vos besoins.
                </p>
              </div>
              <div>
                <label htmlFor="anciennete-site" className="contact-label">Depuis combien de temps votre entreprise est-elle active ?</label>
                <select
                  id="anciennete-site"
                  className="contact-field"
                  value={form.anciennete}
                  onChange={(e) => set("anciennete", e.target.value)}
                >
                  <option value="" disabled>Selectionnez une option</option>
                  <option value="moins-6-mois">Moins de 6 mois</option>
                  <option value="6-12-mois">6 a 12 mois</option>
                  <option value="1-3-ans">1 a 3 ans</option>
                  <option value="plus-3-ans">Plus de 3 ans</option>
                  <option value="pas-encore-lancee">Pas encore lancee</option>
                </select>
              </div>
              <div>
                <label htmlFor="systemAcquisition-site" className="contact-label">
                  Avez-vous un systeme en place pour attirer de nouveaux clients ?
                </label>
                <textarea
                  id="systemAcquisition-site"
                  className="contact-field resize-none"
                  rows={4}
                  placeholder="Ex : publicite Facebook, bouche-a-oreille, reseaux sociaux, aucun systeme..."
                  value={form.systemAcquisition}
                  onChange={(e) => set("systemAcquisition", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Etape 5 (Vitrine) : Coordonnees */}
          {step === 5 && !isEcommerce && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Vos coordonnees</h3>
                <p className="public-body mt-2">
                  On vous recontacte sous 24 a 48h avec une proposition personnalisee.
                </p>
              </div>
              <div>
                <label htmlFor="nom-site" className="contact-label">Nom complet *</label>
                <input
                  id="nom-site"
                  type="text"
                  className="contact-field"
                  placeholder="Votre nom et prenom"
                  value={form.nom}
                  onChange={(e) => set("nom", e.target.value)}
                  autoFocus
                />
                {errors.nom && <p className="contact-error">{errors.nom}</p>}
              </div>
              <div>
                <label htmlFor="whatsapp-site" className="contact-label">Numero WhatsApp *</label>
                <input
                  id="whatsapp-site"
                  type="tel"
                  className="contact-field"
                  placeholder="+225 07 XX XX XX XX"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                />
                {errors.whatsapp && <p className="contact-error">{errors.whatsapp}</p>}
              </div>
              <div>
                <label htmlFor="email-site" className="contact-label">Email *</label>
                <input
                  id="email-site"
                  type="email"
                  className="contact-field"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                {errors.email && <p className="contact-error">{errors.email}</p>}
              </div>
              {submitError && (
                <p className="rounded-[6px] px-4 py-3 text-[0.88rem]" style={{ background: "rgba(255,90,70,0.1)", color: "#ffb5a6" }}>
                  {submitError}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300"
            style={{ border: "1px solid rgba(240,217,150,0.22)", color: "rgba(246,248,251,0.68)", background: "transparent" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Precedent
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button type="button" onClick={nextStep} className="btn-cobalt">
            Suivant
            <span className="btn-arrow-orb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-cobalt"
            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
            {!submitting && (
              <span className="btn-arrow-orb">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
