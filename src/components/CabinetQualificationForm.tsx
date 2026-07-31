import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cabinetLeadConfig } from "@/data/cabinetLeadConfig";
import { siteContact } from "@/data/publicContent";

const formatAmount = (amount: number) => `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;

const parseBudgetAmount = (raw: string) => {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false as const, reason: "empty" as const };
  if (/\p{L}/u.test(trimmed)) return { ok: false as const, reason: "letters" as const };

  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return { ok: false as const, reason: "invalid" as const };

  const value = Number(digits);
  if (!Number.isSafeInteger(value) || value <= 0) return { ok: false as const, reason: "invalid" as const };
  return { ok: true as const, value };
};

const clientSourceOptions = [
  "Bouche-à-oreille / recommandations",
  "Réseau & partenariats",
  "Publicité en ligne",
  "Pas de démarche structurée pour le moment",
];

// Fourchettes proposées quand le budget de 405 000 FCFA n'est pas envisageable.
// `value` = borne basse, utilisée pour budget_normalized et le seuil de qualification.
const budgetRangeOptions = [
  { label: "Moins de 50 000 FCFA", value: 25000 },
  { label: "50 000 à 150 000 FCFA", value: 50000 },
  { label: "150 000 à 300 000 FCFA", value: 150000 },
  { label: "300 000 à 400 000 FCFA", value: 300000 },
] as const;

const whatsappHelpUrl = `${siteContact.whatsapp}?text=${encodeURIComponent(
  "Bonjour, je n'arrive pas à envoyer le formulaire pour mon cabinet comptable sur votre site.",
)}`;

type YesNo = "" | "yes" | "no";

type FormData = {
  cabinetName: string;
  clientSource: string;
  hasInvestedAds: YesNo;
  pastAdBudgetRaw: string;
  objectiveText: string;
  canInvestMinimum: YesNo;
  budgetRange: string;
  isDecisionMaker: YesNo;
  fullName: string;
  phone: string;
  email: string;
};

const emptyForm: FormData = {
  cabinetName: "",
  clientSource: "",
  hasInvestedAds: "",
  pastAdBudgetRaw: "",
  objectiveText: "",
  canInvestMinimum: "",
  budgetRange: "",
  isDecisionMaker: "",
  fullName: "",
  phone: "",
  email: "",
};

type StepId = "cabinet" | "marketing" | "budget" | "contact";

const steps: { id: StepId; label: string }[] = [
  { id: "cabinet", label: "Votre cabinet" },
  { id: "marketing", label: "Votre marketing" },
  { id: "budget", label: "Budget" },
  { id: "contact", label: "Contact" },
];

const stepFields: Record<StepId, (keyof FormData)[]> = {
  cabinet: ["cabinetName", "clientSource"],
  marketing: ["hasInvestedAds", "pastAdBudgetRaw", "objectiveText"],
  budget: ["canInvestMinimum", "budgetRange", "isDecisionMaker"],
  contact: ["fullName", "phone", "email"],
};

const optionClass = (active: boolean) =>
  `min-h-[48px] rounded-md border px-4 py-3 text-left text-sm font-semibold transition-colors ${
    active
      ? "border-[#f0d996] bg-[#f0d99614] text-platinum"
      : "border-[rgba(240,217,150,0.2)] text-platinum/70 hover:border-[#f0d99666] hover:text-platinum"
  }`;

const questionLabelClass = "mb-3 block text-base font-bold text-platinum";

const CabinetQualificationForm = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle");

  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const isLastStep = currentStep.id === "contact";

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validateAll = () => {
    const errors: Record<string, string> = {};

    if (formData.cabinetName.trim().length < 2) errors.cabinetName = "Indiquez le nom de votre cabinet.";
    if (!formData.clientSource) errors.clientSource = "Indiquez comment vous obtenez vos clients aujourd'hui.";
    if (!formData.hasInvestedAds) errors.hasInvestedAds = "Indiquez si vous avez déjà investi en publicité en ligne.";
    if (formData.hasInvestedAds === "yes") {
      const parsed = parseBudgetAmount(formData.pastAdBudgetRaw);
      if (!parsed.ok)
        errors.pastAdBudgetRaw =
          parsed.reason === "letters"
            ? "Entrez un montant complet en chiffres (exemple : 150000)."
            : "Indiquez votre budget mensuel moyen.";
    }
    if (formData.objectiveText.trim().length < 10)
      errors.objectiveText = "Décrivez ce que vous cherchez à obtenir.";
    if (!formData.canInvestMinimum) errors.canInvestMinimum = "Répondez à la question sur le budget.";
    if (formData.canInvestMinimum === "no" && !formData.budgetRange)
      errors.budgetRange = "Choisissez la fourchette qui correspond à votre budget.";
    if (!formData.isDecisionMaker) errors.isDecisionMaker = "Indiquez si vous êtes la personne décisionnaire.";
    if (formData.fullName.trim().length < 2) errors.fullName = "Indiquez votre nom complet.";
    if (formData.phone.trim().replace(/[^\d]/g, "").length < 8)
      errors.phone = "Indiquez un numéro WhatsApp ou téléphone valide.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) errors.email = "Indiquez un email valide.";

    return errors;
  };

  const validateStep = (stepId: StepId) => {
    const all = validateAll();
    const errors: Record<string, string> = {};
    for (const field of stepFields[stepId]) {
      if (all[field]) errors[field] = all[field];
    }
    setFieldErrors(errors);
    return errors;
  };

  const scrollToField = (key: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(`cab-${key}`) ?? document.getElementById(`cab-block-${key}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const scrollToFormTop = () => {
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const goNext = () => {
    const errors = validateStep(currentStep.id);
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      scrollToField(firstError);
      return;
    }
    setStepIndex((value) => Math.min(value + 1, steps.length - 1));
    scrollToFormTop();
  };

  const goBack = () => {
    setFieldErrors({});
    setStepIndex((value) => Math.max(value - 1, 0));
    scrollToFormTop();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLastStep) {
      goNext();
      return;
    }
    const errors = validateStep("contact");
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      scrollToField(firstError);
      return;
    }

    const selectedRange = budgetRangeOptions.find((option) => option.label === formData.budgetRange);
    const monthlyBudget =
      formData.canInvestMinimum === "yes" ? cabinetLeadConfig.anchorMonthly : (selectedRange?.value ?? 0);
    if (!monthlyBudget) return;

    const pastBudget = formData.hasInvestedAds === "yes" ? parseBudgetAmount(formData.pastAdBudgetRaw) : null;
    const objective = formData.objectiveText.trim();

    const eligibility =
      monthlyBudget >= cabinetLeadConfig.priorityMinBudget
        ? "priorite"
        : monthlyBudget >= cabinetLeadConfig.qualifiedMinBudget
          ? "qualifie"
          : "nurture";

    setSubmitState("loading");
    try {
      const { error } = await supabase.from("qualification_submissions").insert({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        has_business: true,
        company_name: formData.cabinetName.trim(),
        industry: "Cabinet comptable",
        location: "Abidjan",
        website_or_social: null,
        service: "accompagnement-mensuel",
        has_invested_marketing: formData.hasInvestedAds === "yes",
        past_marketing_budget_raw: formData.hasInvestedAds === "yes" ? formData.pastAdBudgetRaw.trim() : null,
        past_marketing_budget_normalized: pastBudget?.ok ? pastBudget.value : null,
        past_marketing_result: `Acquisition clients actuelle : ${formData.clientSource} | Décisionnaire : ${
          formData.isDecisionMaker === "yes" ? "oui" : "non, doit en discuter avec un associé"
        }`,
        objective_90_days: objective,
        budget_raw:
          formData.canInvestMinimum === "yes" ? String(cabinetLeadConfig.anchorMonthly) : formData.budgetRange,
        budget_normalized: monthlyBudget,
        can_invest_minimum: formData.canInvestMinimum === "yes",
        eligibility_status: eligibility,
        source_page: "cabinets-comptables",
      });
      if (error) throw error;
      const tier = monthlyBudget >= cabinetLeadConfig.qualifiedMinBudget ? "ok" : "low";
      navigate(`${cabinetLeadConfig.merciPath}?b=${tier}`);
    } catch {
      setSubmitState("error");
    }
  };

  const fieldError = (key: keyof FormData | string) =>
    fieldErrors[key] ? (
      <p id={`cab-error-${key}`} role="alert" className="mt-2 text-sm font-semibold text-[#ffb5a6]">
        {fieldErrors[key]}
      </p>
    ) : null;

  const inputClass = (key: keyof FormData) =>
    `contact-field ${fieldErrors[key] ? "!border-[#ffb5a680]" : ""}`;

  const inputA11y = (key: keyof FormData) => ({
    "aria-invalid": Boolean(fieldErrors[key]),
    "aria-describedby": fieldErrors[key] ? `cab-error-${key}` : undefined,
  });

  const yesNoButtons = (key: keyof FormData, yesLabel: string, noLabel: string) => (
    <div className="grid gap-3 sm:grid-cols-2">
      <button type="button" className={optionClass(formData[key] === "yes")} onClick={() => updateField(key, "yes")}>
        {yesLabel}
      </button>
      <button type="button" className={optionClass(formData[key] === "no")} onClick={() => updateField(key, "no")}>
        {noLabel}
      </button>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="scroll-mt-6 space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((item, index) => (
          <span
            key={item.id}
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
              index === stepIndex
                ? "border-[#f0d996] text-[#f0d996]"
                : index < stepIndex
                  ? "border-[rgba(240,217,150,0.4)] text-platinum/70"
                  : "border-[rgba(240,217,150,0.18)] text-platinum/40"
            }`}
          >
            {index + 1}. {item.label}
          </span>
        ))}
      </div>
      <p className="text-xs font-semibold text-platinum/60">
        Étape {stepIndex + 1} sur {steps.length}
      </p>

      {currentStep.id === "cabinet" && (
        <div className="space-y-6">
          <div id="cab-block-cabinetName">
            <label htmlFor="cab-cabinetName" className={questionLabelClass}>
              Quel est le nom de votre cabinet ? *
            </label>
            <input
              id="cab-cabinetName"
              className={inputClass("cabinetName")}
              autoComplete="organization"
              value={formData.cabinetName}
              onChange={(e) => updateField("cabinetName", e.target.value)}
              placeholder="Cabinet XYZ"
              {...inputA11y("cabinetName")}
            />
            {fieldError("cabinetName")}
          </div>

          <div id="cab-block-clientSource">
            <p className={questionLabelClass}>Comment obtenez-vous vos clients aujourd'hui ? *</p>
            <div className="grid gap-3">
              {clientSourceOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={optionClass(formData.clientSource === option)}
                  onClick={() => updateField("clientSource", option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {fieldError("clientSource")}
          </div>
        </div>
      )}

      {currentStep.id === "marketing" && (
        <div className="space-y-6">
          <div id="cab-block-hasInvestedAds">
            <p className={questionLabelClass}>
              Avez-vous déjà investi dans la publicité en ligne (Facebook, Google, etc.) ? *
            </p>
            {yesNoButtons("hasInvestedAds", "Oui", "Non, pas encore")}
            {fieldError("hasInvestedAds")}
          </div>

          {formData.hasInvestedAds === "yes" && (
            <div id="cab-block-pastAdBudgetRaw">
              <label htmlFor="cab-pastAdBudgetRaw" className={questionLabelClass}>
                Quel était votre budget mensuel moyen ? *
              </label>
              <input
                id="cab-pastAdBudgetRaw"
                className={inputClass("pastAdBudgetRaw")}
                inputMode="numeric"
                value={formData.pastAdBudgetRaw}
                onChange={(e) => updateField("pastAdBudgetRaw", e.target.value)}
                placeholder="Exemple : 150000"
                {...inputA11y("pastAdBudgetRaw")}
              />
              {fieldError("pastAdBudgetRaw")}
            </div>
          )}

          <div id="cab-block-objectiveText">
            <label htmlFor="cab-objectiveText" className={questionLabelClass}>
              Que cherchez-vous exactement à obtenir dans les 90 prochains jours ? *
            </label>
            <textarea
              id="cab-objectiveText"
              className={`${inputClass("objectiveText")} min-h-[120px] resize-y`}
              value={formData.objectiveText}
              onChange={(e) => updateField("objectiveText", e.target.value)}
              placeholder="Exemple : signer 3 nouveaux mandats comptables de PME, remplir mon agenda de rendez-vous pendant la période fiscale..."
              {...inputA11y("objectiveText")}
            />
            {fieldError("objectiveText")}
          </div>
        </div>
      )}

      {currentStep.id === "budget" && (
        <div className="space-y-6">
          <div id="cab-block-canInvestMinimum">
            <p className={questionLabelClass}>
              Pour vous donner un ordre d'idée : notre accompagnement complet démarre à{" "}
              {formatAmount(cabinetLeadConfig.anchorMonthly)}/mois — campagnes publicitaires, site, SEO et suivi
              inclus. Souvent, quelques prospects convertis en clients réguliers suffisent à couvrir cet
              investissement.
            </p>
            <p className="-mt-1 mb-3 text-sm font-semibold text-platinum/70">
              Ce niveau d'investissement est-il envisageable pour votre cabinet dès maintenant ? *
            </p>
            {yesNoButtons("canInvestMinimum", "Oui", "Pas encore, mon budget est inférieur")}
            {fieldError("canInvestMinimum")}
          </div>

          {formData.canInvestMinimum === "no" && (
            <div id="cab-block-budgetRange">
              <p className={questionLabelClass}>Quel budget mensuel pourriez-vous investir ? *</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {budgetRangeOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={optionClass(formData.budgetRange === option.label)}
                    onClick={() => updateField("budgetRange", option.label)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {fieldError("budgetRange")}
            </div>
          )}

          <div id="cab-block-isDecisionMaker">
            <p className={questionLabelClass}>Êtes-vous la personne décisionnaire dans votre cabinet ? *</p>
            {yesNoButtons("isDecisionMaker", "Oui", "Non, je dois en discuter avec un associé")}
            {fieldError("isDecisionMaker")}
          </div>
        </div>
      )}

      {currentStep.id === "contact" && (
        <div className="space-y-5">
          <p className="text-sm font-bold text-[#f0d996]">Dernière étape : où vous recontacter ?</p>
          <div id="cab-block-fullName">
            <label htmlFor="cab-fullName" className={questionLabelClass}>
              Votre nom complet *
            </label>
            <input
              id="cab-fullName"
              className={inputClass("fullName")}
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Prénom et nom"
              {...inputA11y("fullName")}
            />
            {fieldError("fullName")}
          </div>
          <div id="cab-block-phone">
            <label htmlFor="cab-phone" className={questionLabelClass}>
              Téléphone / WhatsApp *
            </label>
            <input
              id="cab-phone"
              type="tel"
              className={inputClass("phone")}
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+225 07 00 00 00 00"
              {...inputA11y("phone")}
            />
            {fieldError("phone")}
          </div>
          <div id="cab-block-email">
            <label htmlFor="cab-email" className={questionLabelClass}>
              Email *
            </label>
            <input
              id="cab-email"
              type="email"
              className={inputClass("email")}
              autoComplete="email"
              inputMode="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="vous@cabinet.com"
              {...inputA11y("email")}
            />
            {fieldError("email")}
          </div>
        </div>
      )}

      {submitState === "error" && (
        <p className="rounded-md border border-[#ffb5a640] bg-[#ffb5a612] p-4 text-sm font-semibold text-[#ffb5a6]">
          Le formulaire n'a pas pu être envoyé. Réessayez ou{" "}
          <a href={whatsappHelpUrl} target="_blank" rel="noopener noreferrer" className="underline">
            écrivez-nous directement sur WhatsApp
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-3">
        {isLastStep ? (
          <button
            type="submit"
            className="btn-cobalt w-full flex-col gap-0 py-4 !whitespace-normal text-center"
            disabled={submitState === "loading"}
          >
            <span className="text-base font-extrabold uppercase tracking-wide">
              {submitState === "loading" ? "Envoi en cours..." : "Vérifier si mon cabinet est éligible"}
            </span>
            {submitState !== "loading" && (
              <span className="text-xs font-semibold opacity-80">
                Étude de votre demande sous 24h ouvrées — sans engagement
              </span>
            )}
          </button>
        ) : (
          <button type="submit" className="btn-cobalt w-full py-4 text-base font-extrabold">
            Continuer
          </button>
        )}
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            disabled={submitState === "loading"}
            className="btn-cobalt-outline w-full py-3 text-sm"
          >
            Retour
          </button>
        )}
        {isLastStep && (
          <p className="text-center text-xs font-semibold text-platinum/60">
            Vos informations restent confidentielles.
          </p>
        )}
      </div>
    </form>
  );
};

export default CabinetQualificationForm;
