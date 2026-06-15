import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { siteContact } from "@/data/publicContent";
import { EASE } from "@/components/public/PublicPrimitives";

const TOTAL_STEPS = 7;

type Pack = "essentiel" | "professionnel" | "identite-marque" | "";
type Style = "minimaliste" | "classique" | "ludique" | "autre" | "";
type Usage = "digital" | "impression" | "";

interface FormState {
  packSelectionne: Pack;
  nomEntreprise: string;
  couleursPref: string;
  couleursEviter: string;
  stylePreference: Style;
  styleAutre: string;
  elementsVisuels: string;
  exemplesAimes: string;
  concurrentsEviter: string;
  usage: Usage;
  slogan: string;
  anciennete: string;
  systemAcquisition: string;
  nom: string;
  whatsapp: string;
  email: string;
}

const initialState: FormState = {
  packSelectionne: "",
  nomEntreprise: "",
  couleursPref: "",
  couleursEviter: "",
  stylePreference: "",
  styleAutre: "",
  elementsVisuels: "",
  exemplesAimes: "",
  concurrentsEviter: "",
  usage: "",
  slogan: "",
  anciennete: "",
  systemAcquisition: "",
  nom: "",
  whatsapp: "",
  email: "",
};

const packLabels: Record<string, string> = {
  essentiel: "Pack Essentiel - 50 000 FCFA",
  professionnel: "Pack Professionnel - 95 000 FCFA",
  "identite-marque": "Pack Identite de Marque - 170 000 FCFA",
};

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const StyleCard = ({
  id,
  label,
  selected,
  onClick,
  visual,
}: {
  id: Style;
  label: string;
  selected: boolean;
  onClick: () => void;
  visual: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col overflow-hidden rounded-[8px] text-left transition-all duration-300 hover:-translate-y-0.5"
    style={{
      border: selected ? "2px solid var(--cobalt)" : "1px solid rgba(240,217,150,0.18)",
      background: selected ? "rgba(215,180,106,0.1)" : "rgba(246,248,251,0.04)",
      boxShadow: selected ? "0 0 0 3px rgba(215,180,106,0.18)" : "none",
    }}
    aria-pressed={selected}
  >
    <div className="flex h-24 items-center justify-center">{visual}</div>
    <div className="px-3 pb-3 pt-1">
      <span className="text-[0.82rem] font-semibold text-platinum">{label}</span>
    </div>
  </button>
);

const PackSelectCard = ({
  id,
  label,
  price,
  selected,
  onClick,
}: {
  id: Pack;
  label: string;
  price: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col rounded-[8px] p-4 text-left transition-all duration-300 hover:-translate-y-0.5"
    style={{
      border: selected ? "2px solid var(--cobalt)" : "1px solid rgba(240,217,150,0.18)",
      background: selected ? "rgba(215,180,106,0.1)" : "rgba(246,248,251,0.04)",
      boxShadow: selected ? "0 0 0 3px rgba(215,180,106,0.18)" : "none",
    }}
    aria-pressed={selected}
  >
    <span className="mb-1 text-[0.82rem] font-semibold" style={{ color: "var(--cobalt-light)" }}>
      {label}
    </span>
    <span className="font-display text-[1.6rem] font-extrabold leading-none text-platinum">
      {price}
    </span>
    <span className="text-[0.72rem] mt-0.5" style={{ color: "rgba(246,248,251,0.48)" }}>
      FCFA
    </span>
  </button>
);

export default function LogoQuestionnaire({ initialPack }: { initialPack?: string | null }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>({
    ...initialState,
    packSelectionne: (initialPack as Pack) || "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (step === 1 && !form.packSelectionne) errs.packSelectionne = "Choisissez un pack pour continuer.";
    if (step === 2 && !form.nomEntreprise.trim()) errs.nomEntreprise = "Le nom de l'entreprise est requis.";
    if (step === 3 && !form.stylePreference) errs.stylePreference = "Choisissez un style pour continuer.";
    if (step === 5 && !form.usage) errs.usage = "Selectionnez l'usage prevu.";
    if (step === 7) {
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
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    const { error } = await (supabase as ReturnType<typeof import("@supabase/supabase-js").createClient>)
      .from("demandes_services")
      .insert({
        type: "logo",
        pack_selectionne: form.packSelectionne,
        reponses: {
          nomEntreprise: form.nomEntreprise,
          couleursPref: form.couleursPref,
          couleursEviter: form.couleursEviter,
          stylePreference: form.stylePreference,
          styleAutre: form.styleAutre,
          elementsVisuels: form.elementsVisuels,
          exemplesAimes: form.exemplesAimes,
          concurrentsEviter: form.concurrentsEviter,
          usage: form.usage,
          slogan: form.slogan,
          anciennete: form.anciennete,
          systemAcquisition: form.systemAcquisition,
        },
        nom: form.nom,
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
          href={`${siteContact.whatsapp}?text=${encodeURIComponent("Bonjour, j'ai rempli le questionnaire logo sur votre site. Je souhaite en savoir plus.")}`}
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

      {/* Contenu des etapes */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.34, ease: EASE }}
        >
          {/* Etape 1 : Choix du pack */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Quel pack vous interesse ?</h3>
                <p className="public-body mt-2">
                  Si vous avez deja clique sur un pack, il est pre-selectionne. Vous pouvez le modifier ici.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <PackSelectCard id="essentiel" label="Pack Essentiel" price="50 000" selected={form.packSelectionne === "essentiel"} onClick={() => set("packSelectionne", "essentiel")} />
                <PackSelectCard id="professionnel" label="Pack Professionnel" price="95 000" selected={form.packSelectionne === "professionnel"} onClick={() => set("packSelectionne", "professionnel")} />
                <PackSelectCard id="identite-marque" label="Pack Identite de Marque" price="170 000" selected={form.packSelectionne === "identite-marque"} onClick={() => set("packSelectionne", "identite-marque")} />
              </div>
              {errors.packSelectionne && <p className="contact-error">{errors.packSelectionne}</p>}
            </div>
          )}

          {/* Etape 2 : Nom de l'entreprise */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Quel est le nom de votre entreprise ?</h3>
                <p className="public-body mt-2">
                  Donnez-nous le nom exact tel qu'il doit apparaitre sur le logo. Orthographe precise.
                </p>
              </div>
              <div>
                <label htmlFor="nomEntreprise" className="contact-label">Nom exact de l'entreprise *</label>
                <input
                  id="nomEntreprise"
                  type="text"
                  className="contact-field"
                  placeholder="Ex : Kouame & Associes, SARL DigiCi..."
                  value={form.nomEntreprise}
                  onChange={(e) => set("nomEntreprise", e.target.value)}
                  autoFocus
                />
                {errors.nomEntreprise && <p className="contact-error">{errors.nomEntreprise}</p>}
              </div>
            </div>
          )}

          {/* Etape 3 : Couleurs et style */}
          {step === 3 && (
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="public-h3 text-platinum">Couleurs et style</h3>
                <p className="public-body mt-2">
                  Ces informations nous aident a comprendre votre univers visuel.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="couleursPref" className="contact-label">Couleurs preferees</label>
                  <textarea
                    id="couleursPref"
                    className="contact-field resize-none"
                    rows={3}
                    placeholder="Ex : bleu marine, or, vert..."
                    value={form.couleursPref}
                    onChange={(e) => set("couleursPref", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="couleursEviter" className="contact-label">Couleurs a eviter</label>
                  <textarea
                    id="couleursEviter"
                    className="contact-field resize-none"
                    rows={3}
                    placeholder="Ex : rouge, rose vif..."
                    value={form.couleursEviter}
                    onChange={(e) => set("couleursEviter", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="contact-label mb-4 block">Style prefere *</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StyleCard
                    id="minimaliste"
                    label="Minimaliste / Moderne"
                    selected={form.stylePreference === "minimaliste"}
                    onClick={() => set("stylePreference", "minimaliste")}
                    visual={
                      <div className="flex items-center justify-center">
                        <span
                          className="font-display text-4xl font-light tracking-[0.22em]"
                          style={{ color: "rgba(246,248,251,0.82)", letterSpacing: "0.22em" }}
                        >
                          AB
                        </span>
                      </div>
                    }
                  />
                  <StyleCard
                    id="classique"
                    label="Classique / Elegant"
                    selected={form.stylePreference === "classique"}
                    onClick={() => set("stylePreference", "classique")}
                    visual={
                      <div className="flex items-center justify-center">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full"
                          style={{ border: "1.5px solid rgba(215,180,106,0.6)" }}
                        >
                          <span className="font-display text-lg font-bold" style={{ color: "var(--cobalt)" }}>
                            BC
                          </span>
                        </div>
                      </div>
                    }
                  />
                  <StyleCard
                    id="ludique"
                    label="Ludique / Colore"
                    selected={form.stylePreference === "ludique"}
                    onClick={() => set("stylePreference", "ludique")}
                    visual={
                      <div className="flex items-center justify-center">
                        <span
                          className="font-display text-3xl font-black"
                          style={{
                            background: "linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          fun!
                        </span>
                      </div>
                    }
                  />
                  <StyleCard
                    id="autre"
                    label="Autre"
                    selected={form.stylePreference === "autre"}
                    onClick={() => set("stylePreference", "autre")}
                    visual={
                      <div className="flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                          <circle cx="16" cy="16" r="13" stroke="rgba(246,248,251,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
                          <path d="M16 10v6M16 20v2" stroke="rgba(246,248,251,0.5)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    }
                  />
                </div>
                {errors.stylePreference && <p className="contact-error mt-2">{errors.stylePreference}</p>}

                {form.stylePreference === "autre" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-4"
                  >
                    <label htmlFor="styleAutre" className="contact-label">Decrivez le style souhaite</label>
                    <input
                      id="styleAutre"
                      type="text"
                      className="contact-field"
                      placeholder="Ex : traditionnel africain, tech moderne, artisanal..."
                      value={form.styleAutre}
                      onChange={(e) => set("styleAutre", e.target.value)}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Etape 4 : Elements et references */}
          {step === 4 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Vos references et inspirations</h3>
                <p className="public-body mt-2">
                  Ces informations nous permettent de vous creer un logo unique et personnalise.
                </p>
              </div>
              <div>
                <label htmlFor="elementsVisuels" className="contact-label">Symboles ou elements lies a votre activite</label>
                <textarea
                  id="elementsVisuels"
                  className="contact-field resize-none"
                  rows={3}
                  placeholder="Ex : un ordinateur, une plume, une feuille... ou aucun element precis"
                  value={form.elementsVisuels}
                  onChange={(e) => set("elementsVisuels", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="exemplesAimes" className="contact-label">Exemples de logos que vous aimez</label>
                <textarea
                  id="exemplesAimes"
                  className="contact-field resize-none"
                  rows={3}
                  placeholder="Nommez des marques dont vous appreciez le logo (Nike, Orange CI, MTN...)"
                  value={form.exemplesAimes}
                  onChange={(e) => set("exemplesAimes", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="concurrentsEviter" className="contact-label">Logos de concurrents a eviter</label>
                <textarea
                  id="concurrentsEviter"
                  className="contact-field resize-none"
                  rows={3}
                  placeholder="Nommez vos concurrents directs dont vous voulez vous distinguer visuellement"
                  value={form.concurrentsEviter}
                  onChange={(e) => set("concurrentsEviter", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Etape 5 : Usage et slogan */}
          {step === 5 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Usage et slogan</h3>
                <p className="public-body mt-2">
                  Savoir ou votre logo sera utilise nous aide a choisir les bons formats de livraison.
                </p>
              </div>

              <div>
                <label className="contact-label mb-4 block">Usage prevu *</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "digital" as Usage, label: "Digital uniquement", desc: "Reseaux sociaux, site web, emails" },
                    { id: "impression" as Usage, label: "Aussi a l'impression", desc: "Cartes de visite, enseignes, textile..." },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => set("usage", opt.id)}
                      className="flex flex-col rounded-[8px] p-4 text-left transition-all duration-300"
                      style={{
                        border: form.usage === opt.id ? "2px solid var(--cobalt)" : "1px solid rgba(240,217,150,0.18)",
                        background: form.usage === opt.id ? "rgba(215,180,106,0.1)" : "rgba(246,248,251,0.04)",
                      }}
                      aria-pressed={form.usage === opt.id}
                    >
                      <span className="font-semibold text-platinum">{opt.label}</span>
                      <span className="mt-1 text-[0.82rem]" style={{ color: "rgba(246,248,251,0.52)" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
                {errors.usage && <p className="contact-error mt-2">{errors.usage}</p>}
              </div>

              <div>
                <label htmlFor="slogan" className="contact-label">
                  Slogan a integrer{" "}
                  <span style={{ color: "rgba(246,248,251,0.4)", fontWeight: 400 }}>(optionnel)</span>
                </label>
                <input
                  id="slogan"
                  type="text"
                  className="contact-field"
                  placeholder="Ex : L'excellence a portee de main"
                  value={form.slogan}
                  onChange={(e) => set("slogan", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Etape 6 : Contexte entreprise */}
          {step === 6 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Pour mieux vous connaitre</h3>
                <p className="public-body mt-2">
                  Ces questions nous aident a comprendre ou vous en etes et ce dont vous avez le plus besoin.
                </p>
              </div>
              <div>
                <label htmlFor="anciennete" className="contact-label">Depuis combien de temps votre entreprise est-elle active ?</label>
                <select
                  id="anciennete"
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
                <label htmlFor="systemAcquisition" className="contact-label">
                  Avez-vous un systeme en place pour attirer de nouveaux clients regulierement ?
                </label>
                <textarea
                  id="systemAcquisition"
                  className="contact-field resize-none"
                  rows={4}
                  placeholder="Ex : publicite Facebook, bouche-a-oreille uniquement, reseaux sociaux, aucun systeme..."
                  value={form.systemAcquisition}
                  onChange={(e) => set("systemAcquisition", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Etape 7 : Coordonnees */}
          {step === 7 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="public-h3 text-platinum">Vos coordonnees</h3>
                <p className="public-body mt-2">
                  On vous recontacte sous 24 a 48h avec une proposition personnalisee.
                </p>
              </div>

              {form.packSelectionne && (
                <div
                  className="flex items-center gap-3 rounded-[8px] px-4 py-3"
                  style={{ background: "rgba(215,180,106,0.08)", border: "1px solid rgba(215,180,106,0.22)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="rgba(215,180,106,0.18)" />
                    <path d="M5 8l2 2 4-4" stroke="#d7b46a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[0.85rem]" style={{ color: "var(--cobalt-light)" }}>
                    {packLabels[form.packSelectionne] || form.packSelectionne}
                  </span>
                </div>
              )}

              <div>
                <label htmlFor="nom" className="contact-label">Nom complet *</label>
                <input
                  id="nom"
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
                <label htmlFor="whatsapp" className="contact-label">Numero WhatsApp *</label>
                <input
                  id="whatsapp"
                  type="tel"
                  className="contact-field"
                  placeholder="+225 07 XX XX XX XX"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                />
                {errors.whatsapp && <p className="contact-error">{errors.whatsapp}</p>}
              </div>
              <div>
                <label htmlFor="email" className="contact-label">Email *</label>
                <input
                  id="email"
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

      {/* Boutons navigation */}
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
          <button
            type="button"
            onClick={nextStep}
            className="btn-cobalt"
          >
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
