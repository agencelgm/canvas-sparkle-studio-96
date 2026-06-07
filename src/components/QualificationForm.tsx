import { useMemo, useRef, useState } from "react";
import { qualificationServiceOptions } from "@/data/publicContent";
import { supabase } from "@/integrations/supabase/client";

const MINIMUM_INVESTMENT = 405000;
const DAILY_AD_BUDGET = 10000;
const MONTHLY_AD_BUDGET = 300000;
const ANCHOR_PRICE = 500000;

const paidAdvertisingServices = new Set([
  "Publicite digitale / agence de publicite",
  "Facebook / Meta Ads",
  "Generation de leads",
]);

const objectiveOptions = [
  "Plus de leads qualifies",
  "Plus de ventes",
  "Plus de visibilite",
  "Automatiser un process",
  "Ameliorer l'image de marque",
  "Creer un logiciel ou un process interne",
  "Autre objectif",
];

const revenueBandOptions = [
  { value: "lt_500k", label: "Moins de 500 000 FCFA" },
  { value: "500k_2m", label: "500 000 a 2 000 000 FCFA" },
  { value: "2m_10m", label: "2 a 10 millions FCFA" },
  { value: "10m_50m", label: "10 a 50 millions FCFA" },
  { value: "gt_50m", label: "Plus de 50 millions FCFA" },
] as const;

const teamSizeOptions = [
  { value: "solo", label: "Solo / freelance" },
  { value: "2_5", label: "2 a 5 personnes" },
  { value: "6_20", label: "6 a 20 personnes" },
  { value: "21_50", label: "21 a 50 personnes" },
  { value: "gt_50", label: "Plus de 50" },
] as const;

const anchorReactionOptions = [
  { value: "affordable", label: "C'est dans mes moyens" },
  { value: "possible", label: "C'est eleve mais possible si le ROI est la" },
  { value: "too_much", label: "C'est trop pour moi aujourd'hui" },
] as const;

type StepId = "identity" | "business" | "service" | "objective";
type YesNo = "" | "yes" | "no";
type RevenueBand = "" | typeof revenueBandOptions[number]["value"];
type TeamSize = "" | typeof teamSizeOptions[number]["value"];
type AnchorReaction = "" | typeof anchorReactionOptions[number]["value"];

type FormData = {
  name: string;
  email: string;
  phone: string;
  hasBusiness: YesNo;
  companyName: string;
  industry: string;
  monthlyRevenueBand: RevenueBand;
  teamSize: TeamSize;
  services: string[];
  hasInvestedMarketing: YesNo;
  pastMarketingBudgetRaw: string;
  pastMarketingResult: string;
  objectives: string[];
  objective90Details: string;
  dailyAdBudget5k: YesNo;
  canInvestMinimum: YesNo;
  monthlyBudgetRaw: string;
  anchorReaction: AnchorReaction;
};

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  hasBusiness: "",
  companyName: "",
  industry: "",
  monthlyRevenueBand: "",
  teamSize: "",
  services: [],
  hasInvestedMarketing: "",
  pastMarketingBudgetRaw: "",
  pastMarketingResult: "",
  objectives: [],
  objective90Details: "",
  dailyAdBudget5k: "",
  canInvestMinimum: "",
  monthlyBudgetRaw: "",
  anchorReaction: "",
};

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

const getAbbreviatedOptions = (value: number) =>
  value > 0 && value < 1000 ? [value * 1000, value * 10000, value * 100000] : null;

// ============== CALIBRATION ENGINE ==============

type BudgetBand = "low" | "medium" | "high";

type Calibration = {
  score: number;
  band: BudgetBand;
  flags: string[];
  strong: boolean;
  blockingMessage?: string;
};

const revenueBandScore: Record<string, number> = {
  lt_500k: 0,
  "500k_2m": 30,
  "2m_10m": 60,
  "10m_50m": 85,
  gt_50m: 100,
};

const teamScore: Record<string, number> = {
  solo: 20,
  "2_5": 35,
  "6_20": 65,
  "21_50": 85,
  gt_50: 100,
};

const anchorScore: Record<string, number> = {
  too_much: 0,
  possible: 60,
  affordable: 100,
};

const toBand = (score: number): BudgetBand => (score >= 65 ? "high" : score >= 35 ? "medium" : "low");

const computeCalibration = (form: FormData, isPaid: boolean, normalizedBudget: number | null): Calibration => {
  const signals: number[] = [];
  if (form.monthlyRevenueBand) signals.push(revenueBandScore[form.monthlyRevenueBand] ?? 0);
  if (form.teamSize) signals.push(teamScore[form.teamSize] ?? 0);
  if (form.anchorReaction) signals.push(anchorScore[form.anchorReaction] ?? 0);
  signals.push(form.canInvestMinimum === "yes" ? 80 : 0);
  if (isPaid) signals.push(form.dailyAdBudget5k === "yes" ? 80 : 0);
  if (normalizedBudget !== null) {
    if (normalizedBudget >= 1000000) signals.push(100);
    else if (normalizedBudget >= MINIMUM_INVESTMENT) signals.push(60);
    else signals.push(20);
  }

  const score = signals.length ? Math.round(signals.reduce((a, b) => a + b, 0) / signals.length) : 0;
  const band = toBand(score);

  const flags: string[] = [];
  let strong = false;
  let blockingMessage: string | undefined;

  if (form.monthlyRevenueBand === "lt_500k" && form.canInvestMinimum === "yes") {
    flags.push("CA < 500k mais capacite 405k declaree");
    strong = true;
  }
  if (form.monthlyRevenueBand === "lt_500k" && form.anchorReaction === "affordable") {
    flags.push("CA < 500k mais plan 500k 'dans mes moyens'");
    strong = true;
  }
  if (form.canInvestMinimum === "no" && form.anchorReaction === "affordable") {
    flags.push("Refuse 405k mais plan 500k 'dans mes moyens'");
    strong = true;
  }
  if (form.teamSize === "solo" && form.monthlyRevenueBand === "gt_50m") {
    flags.push("Solo mais CA > 50M");
  }
  if (isPaid && form.dailyAdBudget5k === "no" && form.canInvestMinimum === "yes") {
    flags.push("Refuse 10k/jour mais accepte 405k minimum");
  }

  if (strong) {
    blockingMessage =
      "Vos reponses semblent incoherentes. Reprenez les etapes precedentes pour les harmoniser avant d'envoyer.";
  }

  return { score, band, flags, strong, blockingMessage };
};

// ============== STYLES ==============

const optionClass = (active: boolean) =>
  `rounded-md border px-4 py-3 text-left text-sm font-semibold transition-colors ${
    active
      ? "border-[#f0d996] bg-[#f0d99614] text-platinum"
      : "border-[rgba(240,217,150,0.2)] text-platinum/70 hover:border-[#f0d99666] hover:text-platinum"
  }`;

const lightOptionClass = (active: boolean) =>
  `rounded-md border px-4 py-3 text-left text-sm font-semibold transition-colors ${
    active
      ? "border-[#d7b46a] bg-[#d7b46a14] text-platinum-text"
      : "border-[rgba(16,24,39,0.16)] text-platinum-muted hover:border-[#d7b46a66] hover:text-platinum-text"
  }`;

type QualificationFormProps = {
  sourcePage: string;
  variant?: "full" | "hero";
  tone?: "dark" | "light";
  className?: string;
  introTitle?: string;
  introBody?: string;
};

const QualificationForm = ({
  sourcePage,
  variant = "full",
  tone = "dark",
  className = "",
  introTitle,
  introBody,
}: QualificationFormProps) => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [budgetOptions, setBudgetOptions] = useState<number[] | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<number | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const isPaidAdvertising = formData.services.some((s) => paidAdvertisingServices.has(s));
  const isHero = variant === "hero";
  const optionButtonClass = tone === "light" ? lightOptionClass : optionClass;
  const mutedText = tone === "light" ? "text-platinum-muted" : "text-platinum/64";
  const strongText = tone === "light" ? "text-platinum-text" : "text-platinum";
  const questionLabelClass = `mb-3 block text-base font-bold md:text-lg ${strongText}`;
  const formTitle = introTitle || "Voyez si LGM peut vraiment vous aider.";
  const formBody =
    introBody ||
    "En quelques questions, vous clarifiez votre objectif, votre budget et le levier prioritaire avant de perdre du temps dans un appel inutile.";
  const identityGridClass = isHero ? "grid gap-4" : "grid gap-5 sm:grid-cols-2";
  const optionGridClass = isHero ? "grid gap-2" : "grid gap-3 sm:grid-cols-2";
  const threeOptionGridClass = isHero ? "grid gap-2" : "grid gap-3 sm:grid-cols-3";

  const steps: { id: StepId; label: string }[] = [
    { id: "identity", label: "Identite" },
    { id: "business", label: "Entreprise" },
    { id: "service", label: "Besoin" },
    { id: "objective", label: "Objectif" },
  ];

  const currentStep = Math.min(step, steps.length - 1);
  const current = steps[currentStep];

  const scrollToFormTop = () => {
    requestAnimationFrame(() => {
      const el = formRef.current;
      if (!el) return;
      const HEADER_OFFSET = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      const target = Math.max(0, top);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean; force?: boolean }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(target, { force: true });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    });
  };

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]);
    if (name === "monthlyBudgetRaw") {
      setBudgetChoice(null);
      setBudgetOptions(null);
    }
  };

  const toggleArrayValue = (name: "services" | "objectives", value: string) => {
    setFormData((prev) => {
      const exists = prev[name].includes(value);
      return { ...prev, [name]: exists ? prev[name].filter((v) => v !== value) : [...prev[name], value] };
    });
    setErrors([]);
  };

  const getNormalizedMonthlyBudget = () => {
    const parsed = parseBudgetAmount(formData.monthlyBudgetRaw);
    if (!parsed.ok) return null;
    const abbreviatedOptions = getAbbreviatedOptions(parsed.value);
    if (abbreviatedOptions) return budgetChoice;
    return parsed.value;
  };

  const validateCurrentStep = () => {
    const nextErrors: string[] = [];
    setBudgetOptions(null);

    if (current.id === "identity") {
      if (formData.name.trim().length < 2) nextErrors.push("Indiquez votre nom complet.");
      if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) nextErrors.push("Indiquez un email valide.");
      if (formData.phone.trim().length < 8) nextErrors.push("Indiquez un numero WhatsApp ou telephone valide.");
      if (!formData.monthlyRevenueBand) nextErrors.push("Indiquez votre chiffre d'affaires mensuel approximatif.");
    }

    if (current.id === "business") {
      if (!formData.hasBusiness) nextErrors.push("Precisez si vous avez deja une entreprise.");
      if (formData.hasBusiness === "yes" && formData.companyName.trim().length < 2)
        nextErrors.push("Indiquez le nom de votre entreprise.");
      if (formData.industry.trim().length < 2)
        nextErrors.push("Indiquez votre secteur d'activite ou votre projet.");
      if (!formData.teamSize) nextErrors.push("Indiquez la taille de votre equipe.");
      if (!formData.anchorReaction) nextErrors.push("Indiquez votre reaction au plan d'accompagnement propose.");
    }

    if (current.id === "service") {
      if (formData.services.length === 0) nextErrors.push("Choisissez au moins un besoin principal.");
      if (isPaidAdvertising) {
        if (!formData.hasInvestedMarketing)
          nextErrors.push("Precisez si vous avez deja investi dans le marketing ou la publicite.");
        if (formData.hasInvestedMarketing === "yes") {
          const parsed = parseBudgetAmount(formData.pastMarketingBudgetRaw);
          if (!parsed.ok)
            nextErrors.push(
              parsed.reason === "letters"
                ? "Le budget deja investi doit etre un montant complet en chiffres."
                : "Indiquez le budget deja investi.",
            );
          if (formData.pastMarketingResult.trim().length < 5)
            nextErrors.push("Expliquez rapidement ce que cet investissement a donne.");
        }
        if (!formData.dailyAdBudget5k)
          nextErrors.push(
            `Indiquez si vous pouvez investir au moins ${formatAmount(DAILY_AD_BUDGET)} par jour dans votre marketing.`,
          );
      }
    }

    if (current.id === "objective") {
      if (formData.objectives.length === 0) nextErrors.push("Choisissez au moins un objectif a 90 jours.");
      if (formData.objective90Details.trim().length < 10)
        nextErrors.push("Precisez ce que vous voulez obtenir dans les 90 jours.");
      if (!formData.canInvestMinimum)
        nextErrors.push(`Indiquez si vous pouvez investir au minimum ${formatAmount(MINIMUM_INVESTMENT)}.`);

      if (formData.canInvestMinimum === "no") {
        const parsed = parseBudgetAmount(formData.monthlyBudgetRaw);
        if (!parsed.ok) {
          nextErrors.push(
            parsed.reason === "letters"
              ? "Entrez votre budget en montant complet, sans k, mille ou lettres."
              : "Indiquez votre budget marketing mensuel complet en FCFA.",
          );
        } else {
          const abbreviatedOptions = getAbbreviatedOptions(parsed.value);
          if (abbreviatedOptions && !budgetChoice) {
            setBudgetOptions(abbreviatedOptions);
            nextErrors.push("Confirmez le montant exact que vous voulez indiquer.");
          }
        }
      }
    }

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setStep((value) => Math.min(value + 1, steps.length - 1));
    scrollToFormTop();
  };

  const goBack = () => {
    setErrors([]);
    setStep((value) => Math.max(value - 1, 0));
    scrollToFormTop();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (current.id !== "objective") {
      goNext();
      return;
    }
    if (!validateCurrentStep()) return;

    const monthlyBudget = formData.canInvestMinimum === "no" ? getNormalizedMonthlyBudget() : null;
    if (formData.canInvestMinimum === "no" && !monthlyBudget) return;

    const calibration = computeCalibration(formData, isPaidAdvertising, monthlyBudget);
    if (calibration.strong) {
      setErrors([calibration.blockingMessage || "Vos reponses semblent incoherentes."]);
      return;
    }

    const hasPaidHistory = isPaidAdvertising && formData.hasInvestedMarketing === "yes";
    const pastBudget = hasPaidHistory ? parseBudgetAmount(formData.pastMarketingBudgetRaw) : null;
    const servicesJoined = formData.services.join(" | ");
    const objectivesJoined = formData.objectives.join(" | ");

    setSubmitState("loading");
    try {
      const { error } = await supabase.from("qualification_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        has_business: formData.hasBusiness === "yes",
        company_name: formData.hasBusiness === "yes" ? formData.companyName.trim() : null,
        industry: formData.industry.trim(),
        location: "Non renseigne",
        website_or_social: null,
        service: servicesJoined,
        has_invested_marketing: isPaidAdvertising ? formData.hasInvestedMarketing === "yes" : null,
        past_marketing_budget_raw: hasPaidHistory ? formData.pastMarketingBudgetRaw.trim() : null,
        past_marketing_budget_normalized: pastBudget?.ok ? pastBudget.value : null,
        past_marketing_result: hasPaidHistory ? formData.pastMarketingResult.trim() : null,
        objective_90_days: `${objectivesJoined} - ${formData.objective90Details.trim()}`,
        budget_raw: monthlyBudget ? formData.monthlyBudgetRaw.trim() : "",
        budget_normalized: monthlyBudget ?? 0,
        can_invest_minimum: formData.canInvestMinimum === "yes",
        can_invest_10000_daily: isPaidAdvertising ? formData.dailyAdBudget5k === "yes" : null,
        monthly_revenue_band: formData.monthlyRevenueBand || null,
        team_size_band: formData.teamSize || null,
        anchor_reaction: formData.anchorReaction || null,
        daily_ad_budget_ready_5k: isPaidAdvertising ? formData.dailyAdBudget5k === "yes" : null,
        coherence_score: calibration.score,
        budget_band: calibration.band,
        coherence_flags: calibration.flags,
        eligibility_status:
          calibration.flags.length === 0 && calibration.band !== "low" && formData.canInvestMinimum === "yes"
            ? "eligible"
            : "to_review",
        source_page: sourcePage,
      });
      if (error) throw error;
      setSubmitState("success");
      setFormData(emptyForm);
      setBudgetChoice(null);
      setBudgetOptions(null);
      setStep(0);
      setErrors([]);
      scrollToFormTop();
    } catch {
      setSubmitState("error");
      setErrors(["Le formulaire n'a pas pu etre envoye. Reessayez ou contactez-nous directement."]);
    }
  };

  const surfaceClass = isHero
    ? "rounded-md border border-[#f0d99633] bg-[#0f1623] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:p-5 xl:p-6"
    : "public-card p-5 md:p-7";
  return (
    <form ref={formRef} onSubmit={submit} className={`${surfaceClass} ${className}`} noValidate>
      <div className={`${isHero ? "mb-4" : "mb-6"} flex flex-wrap items-center gap-2`}>
        {steps.map((item, index) => (
          <span
            key={item.id}
            className={`rounded-full border ${isHero ? "px-2.5 py-1 text-[0.66rem]" : "px-3 py-1 text-xs"} font-bold ${
              index === currentStep
                ? "border-[#f0d996] text-[#f0d996]"
                : tone === "light"
                  ? "border-[rgba(16,24,39,0.14)] text-platinum-muted"
                  : "border-[rgba(240,217,150,0.18)] text-platinum/42"
            }`}
          >
            {index + 1}. {item.label}
          </span>
        ))}
      </div>

      <div className={isHero ? "mb-5" : "mb-6"}>
        <p className="section-kicker mb-2">{isHero ? "Diagnostic" : "Diagnostic LGM"}</p>
        <h3 className={`public-h3 text-[clamp(1.2rem,1.8vw,1.6rem)] ${strongText}`}>{formTitle}</h3>
        <p className={`public-body mt-3 ${isHero ? "text-sm leading-6" : ""} ${mutedText}`}>{formBody}</p>
      </div>

      {current.id === "identity" && (
        <div className="space-y-5">
          <div className={identityGridClass}>
            <div>
              <label htmlFor={`${sourcePage}-name`} className={questionLabelClass}>
                Nom complet *
              </label>
              <input
                id={`${sourcePage}-name`}
                className="contact-field"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor={`${sourcePage}-phone`} className={questionLabelClass}>
                Telephone / WhatsApp *
              </label>
              <input
                id={`${sourcePage}-phone`}
                className="contact-field"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+225 07 00 00 00 00"
              />
            </div>
            <div className={isHero ? "" : "sm:col-span-2"}>
              <label htmlFor={`${sourcePage}-email`} className={questionLabelClass}>
                Email *
              </label>
              <input
                id={`${sourcePage}-email`}
                type="email"
                className="contact-field"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="vous@entreprise.com"
              />
            </div>
          </div>
          <div>
            <p className={questionLabelClass}>Quel est votre chiffre d'affaires mensuel approximatif ? *</p>
            <div className={optionGridClass}>
              {revenueBandOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={optionButtonClass(formData.monthlyRevenueBand === option.value)}
                  onClick={() => updateField("monthlyRevenueBand", option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {current.id === "business" && (
        <div className="space-y-5">
          <div>
            <p className={questionLabelClass}>Avez-vous deja une entreprise ? *</p>
            <div className={optionGridClass}>
              <button
                type="button"
                className={optionButtonClass(formData.hasBusiness === "yes")}
                onClick={() => updateField("hasBusiness", "yes")}
              >
                Oui, j'ai deja une entreprise
              </button>
              <button
                type="button"
                className={optionButtonClass(formData.hasBusiness === "no")}
                onClick={() => updateField("hasBusiness", "no")}
              >
                Pas encore / projet en creation
              </button>
            </div>
          </div>
          {formData.hasBusiness === "yes" && (
            <div>
              <label htmlFor={`${sourcePage}-company`} className={questionLabelClass}>
                Nom de l'entreprise *
              </label>
              <input
                id={`${sourcePage}-company`}
                className="contact-field"
                value={formData.companyName}
                onChange={(event) => updateField("companyName", event.target.value)}
                placeholder="Nom de votre entreprise"
              />
            </div>
          )}
          <div>
            <label htmlFor={`${sourcePage}-industry`} className={questionLabelClass}>
              Secteur d'activite *
            </label>
            <input
              id={`${sourcePage}-industry`}
              className="contact-field"
              value={formData.industry}
              onChange={(event) => updateField("industry", event.target.value)}
              placeholder="Immobilier, e-commerce, education..."
            />
          </div>
          <div>
            <p className={questionLabelClass}>Combien d'employes a temps plein avez-vous ? *</p>
            <div className={optionGridClass}>
              {teamSizeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={optionButtonClass(formData.teamSize === option.value)}
                  onClick={() => updateField("teamSize", option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={questionLabelClass}>
              Si LGM vous proposait un plan d'accompagnement a {formatAmount(ANCHOR_PRICE)} par mois, votre premiere
              reaction serait : *
            </p>
            <div className={optionGridClass}>
              {anchorReactionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={optionButtonClass(formData.anchorReaction === option.value)}
                  onClick={() => updateField("anchorReaction", option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {current.id === "service" && (
        <div className="space-y-5">
          <div>
            <p className={questionLabelClass}>Quel est votre besoin principal ? (plusieurs choix possibles) *</p>
            <div className={optionGridClass}>
              {qualificationServiceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  className={optionButtonClass(formData.services.includes(service))}
                  onClick={() => toggleArrayValue("services", service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {isPaidAdvertising && (
            <>
              <div>
                <p className={questionLabelClass}>
                  Avez-vous deja investi dans le marketing ou la publicite ? *
                </p>
                <div className={optionGridClass}>
                  <button
                    type="button"
                    className={optionButtonClass(formData.hasInvestedMarketing === "yes")}
                    onClick={() => updateField("hasInvestedMarketing", "yes")}
                  >
                    Oui, deja investi
                  </button>
                  <button
                    type="button"
                    className={optionButtonClass(formData.hasInvestedMarketing === "no")}
                    onClick={() => updateField("hasInvestedMarketing", "no")}
                  >
                    Non, pas encore
                  </button>
                </div>
              </div>
              {formData.hasInvestedMarketing === "yes" && (
                <>
                  <div>
                    <label htmlFor={`${sourcePage}-past-budget`} className={questionLabelClass}>
                      Quel budget aviez-vous investi ? *
                    </label>
                    <input
                      id={`${sourcePage}-past-budget`}
                      className="contact-field"
                      inputMode="numeric"
                      value={formData.pastMarketingBudgetRaw}
                      onChange={(event) => updateField("pastMarketingBudgetRaw", event.target.value)}
                      placeholder="Exemple : 500000"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${sourcePage}-past-result`} className={questionLabelClass}>
                      Qu'est-ce que cet investissement a donne ? *
                    </label>
                    <textarea
                      id={`${sourcePage}-past-result`}
                      className="contact-field min-h-[130px] resize-y"
                      value={formData.pastMarketingResult}
                      onChange={(event) => updateField("pastMarketingResult", event.target.value)}
                      placeholder="Resultats, blocages, ce qui a fonctionne ou non."
                    />
                  </div>
                </>
              )}
              <div>
                <p className={questionLabelClass}>
                  Pouvez-vous mettre au moins {formatAmount(DAILY_AD_BUDGET)} par jour dans votre marketing ? (soit un
                  budget mensuel d'environ {formatAmount(MONTHLY_AD_BUDGET)}) *
                </p>
                <div className={optionGridClass}>
                  <button
                    type="button"
                    className={optionButtonClass(formData.dailyAdBudget5k === "yes")}
                    onClick={() => updateField("dailyAdBudget5k", "yes")}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={optionButtonClass(formData.dailyAdBudget5k === "no")}
                    onClick={() => updateField("dailyAdBudget5k", "no")}
                  >
                    Non
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {current.id === "objective" && (
        <div className="space-y-5">
          <div>
            <p className={questionLabelClass}>
              Quel est votre objectif principal au bout de 90 jours ? (plusieurs choix possibles) *
            </p>
            <div className={optionGridClass}>
              {objectiveOptions.map((objective) => (
                <button
                  key={objective}
                  type="button"
                  className={optionButtonClass(formData.objectives.includes(objective))}
                  onClick={() => toggleArrayValue("objectives", objective)}
                >
                  {objective}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor={`${sourcePage}-objective-details`} className={questionLabelClass}>
              Precisez votre objectif en quelques phrases *
            </label>
            <textarea
              id={`${sourcePage}-objective-details`}
              className="contact-field min-h-[140px] resize-y"
              value={formData.objective90Details}
              onChange={(event) => updateField("objective90Details", event.target.value)}
              placeholder="Exemple : obtenir 80 demandes qualifiees par mois, lancer une campagne Facebook rentable, automatiser le suivi client..."
            />
          </div>
          <div>
            <p className={questionLabelClass}>
              Etes-vous en mesure d'investir au minimum {formatAmount(MINIMUM_INVESTMENT)} pour travailler avec LGM ? *
            </p>
            <div className={optionGridClass}>
              <button
                type="button"
                className={optionButtonClass(formData.canInvestMinimum === "yes")}
                onClick={() => updateField("canInvestMinimum", "yes")}
              >
                Oui, je peux investir ce minimum
              </button>
              <button
                type="button"
                className={optionButtonClass(formData.canInvestMinimum === "no")}
                onClick={() => updateField("canInvestMinimum", "no")}
              >
                Non, pas pour le moment
              </button>
            </div>
          </div>
          {formData.canInvestMinimum === "no" && (
            <>
              <div>
                <label htmlFor={`${sourcePage}-monthly-budget`} className={questionLabelClass}>
                  Quel est votre budget marketing mensuel complet en FCFA ? *
                </label>
                <input
                  id={`${sourcePage}-monthly-budget`}
                  className="contact-field"
                  inputMode="numeric"
                  value={formData.monthlyBudgetRaw}
                  onChange={(event) => updateField("monthlyBudgetRaw", event.target.value)}
                  placeholder="Exemple : 200000"
                />
                <p className={`mt-2 text-xs font-semibold ${mutedText}`}>
                  Entrez le montant complet. Exemple : 200000, pas 200k ni 200 mille.
                </p>
              </div>
              {budgetOptions && (
                <div className="rounded-md border border-[#f0d99640] p-4">
                  <p className={`text-sm font-bold ${strongText}`}>Confirmez votre montant : vous voulez dire...</p>
                  <div className={`mt-3 ${threeOptionGridClass}`}>
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={optionButtonClass(budgetChoice === option)}
                        onClick={() => {
                          setBudgetChoice(option);
                          setErrors([]);
                        }}
                      >
                        {formatAmount(option)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-5 rounded-md border border-[#ffb5a640] bg-[#ffb5a612] p-4">
          {errors.map((error) => (
            <p key={error} className="contact-error mt-0">
              {error}
            </p>
          ))}
        </div>
      )}

      {submitState === "success" && (
        <p className="mt-5 rounded-md border border-[#f0d99640] bg-[#f0d99614] p-4 text-sm font-semibold text-[#f0d996]">
          Diagnostic recu. Nous analysons votre situation et nous revenons vers vous si LGM peut vraiment vous aider.
        </p>
      )}

      <div className={`${isHero ? "mt-5" : "mt-7"} flex flex-col gap-3 sm:flex-row`}>
        {currentStep > 0 && (
          <button
            type="button"
            className="btn-cobalt-outline min-h-0 px-5 py-3"
            onClick={goBack}
            disabled={submitState === "loading"}
          >
            Retour
          </button>
        )}
        <button type="submit" className="btn-cobalt min-h-0 flex-1 px-5 py-3" disabled={submitState === "loading"}>
          {submitState === "loading"
            ? "Envoi en cours"
            : current.id === "objective"
              ? "Envoyer mon diagnostic"
              : "Continuer"}
        </button>
      </div>
    </form>
  );
};

export default QualificationForm;
