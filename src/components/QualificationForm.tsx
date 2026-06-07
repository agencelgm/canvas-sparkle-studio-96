import { useMemo, useState } from "react";
import { qualificationServiceOptions } from "@/data/publicContent";
import { supabase } from "@/integrations/supabase/client";

const MINIMUM_INVESTMENT = 270000;
const DAILY_AD_BUDGET = 10000;
const MONTHLY_AD_BUDGET = 300000;

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

type StepId = "identity" | "business" | "service" | "history" | "objective" | "budget";
type YesNo = "" | "yes" | "no";
type DailyReadiness = "" | "yes" | "no" | "later";

type FormData = {
  name: string;
  email: string;
  phone: string;
  hasBusiness: YesNo;
  companyName: string;
  industry: string;
  location: string;
  websiteOrSocial: string;
  service: string;
  hasInvestedMarketing: YesNo;
  pastMarketingBudgetRaw: string;
  pastMarketingResult: string;
  objective90: string;
  objective90Details: string;
  canInvestMinimum: YesNo;
  monthlyBudgetRaw: string;
  dailyAdBudgetReady: DailyReadiness;
};

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  hasBusiness: "",
  companyName: "",
  industry: "",
  location: "",
  websiteOrSocial: "",
  service: "",
  hasInvestedMarketing: "",
  pastMarketingBudgetRaw: "",
  pastMarketingResult: "",
  objective90: "",
  objective90Details: "",
  canInvestMinimum: "",
  monthlyBudgetRaw: "",
  dailyAdBudgetReady: "",
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

const getAbbreviatedOptions = (value: number) => (value > 0 && value < 1000 ? [value, value * 1000, value * 10000] : null);

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
  tone?: "dark" | "light";
  className?: string;
};

const QualificationForm = ({ sourcePage, tone = "dark", className = "" }: QualificationFormProps) => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [budgetOptions, setBudgetOptions] = useState<number[] | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<number | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isPaidAdvertising = paidAdvertisingServices.has(formData.service);
  const optionButtonClass = tone === "light" ? lightOptionClass : optionClass;
  const mutedText = tone === "light" ? "text-platinum-muted" : "text-platinum/64";
  const strongText = tone === "light" ? "text-platinum-text" : "text-platinum";

  const steps = useMemo(() => {
    const base: { id: StepId; label: string }[] = [
      { id: "identity", label: "Identite" },
      { id: "business", label: "Entreprise" },
      { id: "service", label: "Besoin" },
    ];
    if (isPaidAdvertising) base.push({ id: "history", label: "Publicite" });
    base.push({ id: "objective", label: "90 jours" }, { id: "budget", label: "Budget" });
    return base;
  }, [isPaidAdvertising]);

  const currentStep = Math.min(step, steps.length - 1);
  const current = steps[currentStep];

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]);
    if (name === "monthlyBudgetRaw") {
      setBudgetChoice(null);
      setBudgetOptions(null);
    }
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
    }

    if (current.id === "business") {
      if (!formData.hasBusiness) nextErrors.push("Precisez si vous avez deja une entreprise.");
      if (formData.hasBusiness === "yes" && formData.companyName.trim().length < 2) nextErrors.push("Indiquez le nom de votre entreprise.");
      if (formData.industry.trim().length < 2) nextErrors.push("Indiquez votre secteur d'activite ou votre projet.");
      if (formData.location.trim().length < 2) nextErrors.push("Indiquez votre ville et pays.");
    }

    if (current.id === "service" && !formData.service) {
      nextErrors.push("Choisissez le besoin principal.");
    }

    if (current.id === "history") {
      if (!formData.hasInvestedMarketing) nextErrors.push("Precisez si vous avez deja investi dans le marketing ou la publicite.");
      if (formData.hasInvestedMarketing === "yes") {
        const parsed = parseBudgetAmount(formData.pastMarketingBudgetRaw);
        if (!parsed.ok) nextErrors.push(parsed.reason === "letters" ? "Le budget deja investi doit etre un montant complet en chiffres." : "Indiquez le budget deja investi.");
        if (formData.pastMarketingResult.trim().length < 5) nextErrors.push("Expliquez rapidement ce que cet investissement a donne.");
      }
    }

    if (current.id === "objective") {
      if (!formData.objective90) nextErrors.push("Choisissez votre objectif principal a 90 jours.");
      if (formData.objective90Details.trim().length < 10) nextErrors.push("Precisez ce que vous voulez obtenir dans les 90 jours.");
    }

    if (current.id === "budget") {
      if (formData.canInvestMinimum !== "yes") {
        nextErrors.push(`Pour travailler avec LGM, vous devez etre en mesure d'investir au minimum ${formatAmount(MINIMUM_INVESTMENT)}.`);
      }

      const parsed = parseBudgetAmount(formData.monthlyBudgetRaw);
      if (!parsed.ok) {
        nextErrors.push(parsed.reason === "letters" ? "Entrez votre budget en montant complet, sans k, mille ou lettres." : "Indiquez votre budget marketing mensuel complet en FCFA.");
      } else {
        const abbreviatedOptions = getAbbreviatedOptions(parsed.value);
        if (abbreviatedOptions && !budgetChoice) {
          setBudgetOptions(abbreviatedOptions);
          nextErrors.push("Confirmez le montant exact que vous voulez indiquer.");
        }
        const normalizedBudget = abbreviatedOptions ? budgetChoice : parsed.value;
        if (normalizedBudget !== null && normalizedBudget < MINIMUM_INVESTMENT) {
          nextErrors.push(`Votre budget indique moins que le minimum requis de ${formatAmount(MINIMUM_INVESTMENT)}.`);
        }
      }

      if (isPaidAdvertising && formData.dailyAdBudgetReady !== "yes") {
        nextErrors.push(`Pour une demande publicite, vous devez etre pret a investir au moins ${formatAmount(DAILY_AD_BUDGET)} par jour, soit environ ${formatAmount(MONTHLY_AD_BUDGET)} par mois.`);
      }
    }

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setStep((value) => Math.min(value + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors([]);
    setStep((value) => Math.max(value - 1, 0));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (current.id !== "budget") {
      goNext();
      return;
    }
    if (!validateCurrentStep()) return;

    const monthlyBudget = getNormalizedMonthlyBudget();
    if (!monthlyBudget) return;

    const hasPaidHistory = isPaidAdvertising && formData.hasInvestedMarketing === "yes";
    const pastBudget = hasPaidHistory ? parseBudgetAmount(formData.pastMarketingBudgetRaw) : null;

    setSubmitState("loading");
    try {
      const { error } = await supabase.from("qualification_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        has_business: formData.hasBusiness === "yes",
        company_name: formData.hasBusiness === "yes" ? formData.companyName.trim() : null,
        industry: formData.industry.trim(),
        location: formData.location.trim(),
        website_or_social: formData.websiteOrSocial.trim() || null,
        service: formData.service,
        has_invested_marketing: isPaidAdvertising ? formData.hasInvestedMarketing === "yes" : null,
        past_marketing_budget_raw: hasPaidHistory ? formData.pastMarketingBudgetRaw.trim() : null,
        past_marketing_budget_normalized: pastBudget?.ok ? pastBudget.value : null,
        past_marketing_result: hasPaidHistory ? formData.pastMarketingResult.trim() : null,
        objective_90_days: `${formData.objective90} - ${formData.objective90Details.trim()}`,
        budget_raw: formData.monthlyBudgetRaw.trim(),
        budget_normalized: monthlyBudget,
        can_invest_minimum: true,
        can_invest_10000_daily: isPaidAdvertising ? true : null,
        eligibility_status: "eligible",
        source_page: sourcePage,
      });
      if (error) throw error;
      setSubmitState("success");
      setFormData(emptyForm);
      setBudgetChoice(null);
      setBudgetOptions(null);
      setStep(0);
      setErrors([]);
    } catch {
      setSubmitState("error");
      setErrors(["Le formulaire n'a pas pu etre envoye. Reessayez ou contactez-nous directement."]);
    }
  };

  return (
    <form onSubmit={submit} className={`public-card p-5 md:p-7 ${className}`} noValidate>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {steps.map((item, index) => (
          <span
            key={item.id}
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
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

      <div className="mb-6">
        <p className="section-kicker mb-2">Formulaire d'application</p>
        <h3 className={`public-h3 ${strongText}`}>Valider si LGM est la bonne agence pour vous.</h3>
        <p className={`public-body mt-3 ${mutedText}`}>
          Ces questions nous aident a filtrer les demandes et a comprendre votre objectif commercial avant un premier echange.
        </p>
      </div>

      {current.id === "identity" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${sourcePage}-name`} className="contact-label">Nom complet *</label>
            <input id={`${sourcePage}-name`} className="contact-field" value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Votre nom" />
          </div>
          <div>
            <label htmlFor={`${sourcePage}-phone`} className="contact-label">Telephone / WhatsApp *</label>
            <input id={`${sourcePage}-phone`} className="contact-field" value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+225 07 00 00 00 00" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${sourcePage}-email`} className="contact-label">Email *</label>
            <input id={`${sourcePage}-email`} type="email" className="contact-field" value={formData.email} onChange={(event) => updateField("email", event.target.value)} placeholder="vous@entreprise.com" />
          </div>
        </div>
      )}

      {current.id === "business" && (
        <div className="space-y-5">
          <div>
            <p className="contact-label">Avez-vous deja une entreprise ? *</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className={optionButtonClass(formData.hasBusiness === "yes")} onClick={() => updateField("hasBusiness", "yes")}>Oui, j'ai deja une entreprise</button>
              <button type="button" className={optionButtonClass(formData.hasBusiness === "no")} onClick={() => updateField("hasBusiness", "no")}>Pas encore / projet en creation</button>
            </div>
          </div>
          {formData.hasBusiness === "yes" && (
            <div>
              <label htmlFor={`${sourcePage}-company`} className="contact-label">Nom de l'entreprise *</label>
              <input id={`${sourcePage}-company`} className="contact-field" value={formData.companyName} onChange={(event) => updateField("companyName", event.target.value)} placeholder="Nom de votre entreprise" />
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${sourcePage}-industry`} className="contact-label">Secteur d'activite *</label>
              <input id={`${sourcePage}-industry`} className="contact-field" value={formData.industry} onChange={(event) => updateField("industry", event.target.value)} placeholder="Immobilier, e-commerce, education..." />
            </div>
            <div>
              <label htmlFor={`${sourcePage}-location`} className="contact-label">Ville / pays *</label>
              <input id={`${sourcePage}-location`} className="contact-field" value={formData.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Abidjan, Cote d'Ivoire" />
            </div>
          </div>
          <div>
            <label htmlFor={`${sourcePage}-web`} className="contact-label">Site, page Facebook, Instagram ou LinkedIn</label>
            <input id={`${sourcePage}-web`} className="contact-field" value={formData.websiteOrSocial} onChange={(event) => updateField("websiteOrSocial", event.target.value)} placeholder="https://..." />
          </div>
        </div>
      )}

      {current.id === "service" && (
        <div>
          <p className="contact-label">Quel est votre besoin principal ? *</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {qualificationServiceOptions.map((service) => (
              <button key={service} type="button" className={optionButtonClass(formData.service === service)} onClick={() => updateField("service", service)}>
                {service}
              </button>
            ))}
          </div>
        </div>
      )}

      {current.id === "history" && (
        <div className="space-y-5">
          <div>
            <p className="contact-label">Avez-vous deja investi dans le marketing ou la publicite ? *</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className={optionButtonClass(formData.hasInvestedMarketing === "yes")} onClick={() => updateField("hasInvestedMarketing", "yes")}>Oui, deja investi</button>
              <button type="button" className={optionButtonClass(formData.hasInvestedMarketing === "no")} onClick={() => updateField("hasInvestedMarketing", "no")}>Non, pas encore</button>
            </div>
          </div>
          {formData.hasInvestedMarketing === "yes" && (
            <>
              <div>
                <label htmlFor={`${sourcePage}-past-budget`} className="contact-label">Quel budget aviez-vous investi ? *</label>
                <input id={`${sourcePage}-past-budget`} className="contact-field" inputMode="numeric" value={formData.pastMarketingBudgetRaw} onChange={(event) => updateField("pastMarketingBudgetRaw", event.target.value)} placeholder="Exemple : 500000" />
              </div>
              <div>
                <label htmlFor={`${sourcePage}-past-result`} className="contact-label">Qu'est-ce que cet investissement a donne ? *</label>
                <textarea id={`${sourcePage}-past-result`} className="contact-field min-h-[130px] resize-y" value={formData.pastMarketingResult} onChange={(event) => updateField("pastMarketingResult", event.target.value)} placeholder="Resultats, blocages, ce qui a fonctionne ou non." />
              </div>
            </>
          )}
        </div>
      )}

      {current.id === "objective" && (
        <div className="space-y-5">
          <div>
            <p className="contact-label">Quel est votre objectif principal au bout de 90 jours ? *</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {objectiveOptions.map((objective) => (
                <button key={objective} type="button" className={optionButtonClass(formData.objective90 === objective)} onClick={() => updateField("objective90", objective)}>
                  {objective}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor={`${sourcePage}-objective-details`} className="contact-label">Precisez votre objectif en quelques phrases *</label>
            <textarea id={`${sourcePage}-objective-details`} className="contact-field min-h-[140px] resize-y" value={formData.objective90Details} onChange={(event) => updateField("objective90Details", event.target.value)} placeholder="Exemple : obtenir 80 demandes qualifiees par mois, lancer une campagne Facebook rentable, automatiser le suivi client..." />
          </div>
        </div>
      )}

      {current.id === "budget" && (
        <div className="space-y-5">
          <div>
            <p className="contact-label">Etes-vous en mesure d'investir au minimum {formatAmount(MINIMUM_INVESTMENT)} pour travailler avec LGM ? *</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className={optionButtonClass(formData.canInvestMinimum === "yes")} onClick={() => updateField("canInvestMinimum", "yes")}>Oui, je peux investir ce minimum</button>
              <button type="button" className={optionButtonClass(formData.canInvestMinimum === "no")} onClick={() => updateField("canInvestMinimum", "no")}>Non, pas pour le moment</button>
            </div>
          </div>
          <div>
            <label htmlFor={`${sourcePage}-monthly-budget`} className="contact-label">Quel est votre budget marketing mensuel complet en FCFA ? *</label>
            <input id={`${sourcePage}-monthly-budget`} className="contact-field" inputMode="numeric" value={formData.monthlyBudgetRaw} onChange={(event) => updateField("monthlyBudgetRaw", event.target.value)} placeholder="Exemple : 270000" />
            <p className={`mt-2 text-xs font-semibold ${mutedText}`}>Entrez le montant complet. Exemple : 270000, pas 270k ni 270 mille.</p>
          </div>
          {budgetOptions && (
            <div className="rounded-md border border-[#f0d99640] p-4">
              <p className={`text-sm font-bold ${strongText}`}>Confirmez votre montant : vous voulez dire...</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
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
          {isPaidAdvertising && (
            <div>
              <p className="contact-label">Etes-vous pret a investir au moins {formatAmount(DAILY_AD_BUDGET)} par jour dans la publicite de votre entreprise, soit environ {formatAmount(MONTHLY_AD_BUDGET)} par mois ? *</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <button type="button" className={optionButtonClass(formData.dailyAdBudgetReady === "yes")} onClick={() => updateField("dailyAdBudgetReady", "yes")}>Oui</button>
                <button type="button" className={optionButtonClass(formData.dailyAdBudgetReady === "no")} onClick={() => updateField("dailyAdBudgetReady", "no")}>Non</button>
                <button type="button" className={optionButtonClass(formData.dailyAdBudgetReady === "later")} onClick={() => updateField("dailyAdBudgetReady", "later")}>Pas encore</button>
              </div>
            </div>
          )}
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-5 rounded-md border border-[#ffb5a640] bg-[#ffb5a612] p-4">
          {errors.map((error) => (
            <p key={error} className="contact-error mt-0">{error}</p>
          ))}
        </div>
      )}

      {submitState === "success" && (
        <p className="mt-5 rounded-md border border-[#f0d99640] bg-[#f0d99614] p-4 text-sm font-semibold text-[#f0d996]">
          Application recue. Nous analysons votre demande et nous revenons vers vous si LGM est le bon partenaire.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {currentStep > 0 && (
          <button type="button" className="btn-cobalt-outline min-h-0 px-5 py-3" onClick={goBack} disabled={submitState === "loading"}>
            Retour
          </button>
        )}
        <button type="submit" className="btn-cobalt min-h-0 flex-1 px-5 py-3" disabled={submitState === "loading"}>
          {submitState === "loading" ? "Envoi en cours" : current.id === "budget" ? "Envoyer mon application" : "Continuer"}
        </button>
      </div>
    </form>
  );
};

export default QualificationForm;
