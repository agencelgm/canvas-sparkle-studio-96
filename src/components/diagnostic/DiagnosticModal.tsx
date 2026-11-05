import { firePixelLeadOnce, readFbCookie } from "@/lib/facebookPixel";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getAbVisitorId } from "@/hooks/useAbTest";
const noTrackAb = () => { try { return sessionStorage.getItem("lgm_ab_notrack") === "1"; } catch { return false; } };
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Info, Loader2, Lock, ShieldCheck, Sparkles, Target, X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { questionSteps, decisionBlocker, PILOT_WARNING, type QuestionStep } from "@/data/diagnosticContent";
import { computeDiagnosticScore, QUALIFIED_THRESHOLD, type DiagnosticAnswers } from "@/lib/diagnosticScore";

const countries = [
  { code: "+225", label: "CI" }, { code: "+221", label: "SN" }, { code: "+223", label: "ML" },
  { code: "+226", label: "BF" }, { code: "+228", label: "TG" }, { code: "+229", label: "BJ" },
  { code: "+237", label: "CM" }, { code: "+224", label: "GN" }, { code: "+33", label: "FR" },
];

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Indiquez votre prenom").max(80),
  lastName: z.string().trim().max(80),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().trim().max(30),
  country: z.string(),
}).superRefine((v, ctx) => {
  const n = normalizePhone(v.phone, v.country);
  if (n.length < 8 || n.length > 12) ctx.addIssue({ code: "custom", path: ["phone"], message: "Entrez votre numero WhatsApp (8 a 10 chiffres)" });
});

/** Garde uniquement les chiffres et retire l'indicatif s'il a ete tape dans le numero. */
export function normalizePhone(raw: string, country: string): string {
  let d = raw.replace(/\D/g, "");
  const cc = country.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (cc && d.startsWith(cc) && d.length - cc.length >= 8) d = d.slice(cc.length);
  return d;
}

type Contact = { firstName: string; lastName: string; email: string; phone: string; country: string };

const STAGES = ["Votre activite", "Publicite et budget", "Votre entreprise", "Vos coordonnees"];

const scoreLabel = (s: number) =>
  s >= 80 ? "Excellent potentiel" : s >= QUALIFIED_THRESHOLD ? "Bon niveau de compatibilite" : s >= 40 ? "Evolution en cours" : "Estimation en cours";

const readUtm = () => {
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v.slice(0, 300);
  });
  return out;
};

const DiagnosticModal = ({ source, onClose, inline = false, variant, experimentId }: { source: string | null; onClose: () => void; inline?: boolean; variant?: "a" | "b"; experimentId?: string }) => {
  const isOpen = source !== null && !inline;
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [step, setStep] = useState(inline ? 1 : 0); // 0 accueil, 1..n questions, n+1 coordonnees, n+2 resultat
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [contact, setContact] = useState<Contact>({ firstName: "", lastName: "", email: "", phone: "", country: "+225" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [result, setResult] = useState<{ score: number; qualified: boolean; tier: string } | null>(null);
  const [delta, setDelta] = useState<number | null>(null);
  const prevScore = useRef(0);
  const advanceTimer = useRef<number>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (inline) {
      const el = panelRef.current;
      if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return;
    }
    scrollRef.current?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [step, reduce, inline]);

  // Questions actives (on saute le budget passe si jamais investi)
  const questions = useMemo(
    () => questionSteps.filter((q) => {
      if (q.id === "pastBudget") return answers.invested === "oui";
      if (q.id === "budgetRange") return answers.minimum === "pas_encore" || answers.minimum === "discuter";
      return true;
    }),
    [answers.invested, answers.minimum],
  );
  const contactStep = questions.length + 1;
  const resultStep = questions.length + 2;
  const TOTAL = resultStep + 1;
  const live = computeDiagnosticScore(answers);
  const score = result?.score ?? (step === 0 ? 0 : live.score);

  useEffect(() => {
    const d = score - prevScore.current;
    if (d > 0 && step > 1) setDelta(d);
    prevScore.current = score;
  }, [score, step]);

  // Ouverture : verrouillage du defilement + Echap
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [isOpen, onClose]);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  const go = (to: number) => { setDir(to > step ? 1 : -1); setStep(to); setSendError(null); };

  const choose = (q: QuestionStep, value: string) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      setDir(1);
      setStep((s) => s + 1);
    }, reduce ? 0 : 380);
  };

  const submit = async () => {
    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { e[String(i.path[0])] = i.message; });
      setErrors(e);
      return;
    }
    setErrors({});
    setSending(true);
    setSendError(null);
    const phone = `${contact.country} ${normalizePhone(contact.phone, contact.country)}`;
    const { data, error } = await supabase.functions.invoke("ghl-webhook", {
      body: {
        firstName: contact.firstName.trim(),
        lastName: contact.lastName.trim(),
        email: contact.email.trim(),
        phone,
        sourcePage: source ?? "",
        pageUrl: window.location.href.slice(0, 1000),
        utm: readUtm(),
        variant,
        ab: experimentId && !noTrackAb() ? { experimentId, visitorId: getAbVisitorId() } : undefined,
        answers,
        fbp: readFbCookie("_fbp"),
        fbc: readFbCookie("_fbc"),
      },
    });
    setSending(false);
    if (error || !data) {
      setSendError("L'envoi n'a pas abouti. Verifiez votre connexion et reessayez.");
      return;
    }
    try {
      localStorage.setItem("lgm_lead_contact", JSON.stringify({
        email: contact.email.trim(), telephone: phone, nom: `${contact.firstName} ${contact.lastName}`.trim(),
      }));
    } catch { /* stockage indisponible */ }
    if (data.fbEventId) firePixelLeadOnce(data.fbEventId);
    setResult({ score: data.score, qualified: data.qualified, tier: data.tier });
    go(resultStep);
  };

  const finish = () => {
    if (!result) return;
    const target = result.qualified ? "/lead-agence-marketing/rendez-vous" : "/lead-agence-marketing/programme-pilote";
    onClose();
    window.setTimeout(() => {
      setStep(inline ? 1 : 0); setAnswers({}); setResult(null);
    }, 400);
    navigate(`${target}?score=${result.score}${result.tier === "pilot" ? "&pilote=1" : ""}`);
  };

  const blockers = [
    answers.minimum && answers.minimum !== "oui" ? "Le budget de 270 000 FCFA/mois n'est pas encore valide." : null,
    answers.decision ? decisionBlocker[answers.decision] : null,
    live.flags.length ? "Certaines reponses sur le budget meritent d'etre precisees." : null,
  ].filter(Boolean) as string[];

  const stageOf = (id: string) => (id === "sector" || id === "objective" ? 0 : id === "revenue" || id === "decision" ? 2 : 1);
  const stage = (() => {
    if (step >= resultStep) return { index: 3, fill: 1 };
    if (step === contactStep) return { index: 3, fill: 0.5 };
    if (step === 0) return { index: 0, fill: 0 };
    const idx = stageOf(questions[step - 1].id);
    const inStage = questions.filter((x) => stageOf(x.id) === idx);
    const pos = inStage.findIndex((x) => x.id === questions[step - 1].id);
    return { index: idx, fill: (pos + 1) / (inStage.length + 1) };
  })();

  const slide: Variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 48 }),
    center: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1], staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.08 } },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -48, transition: { duration: reduce ? 0 : 0.22 } }),
  };
  const item: Variants = {
    enter: { opacity: 0, y: reduce ? 0 : 14 },
    center: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.35 } },
  };

  const breakdown = [
    { label: "Secteur", v: live.breakdown.sector, max: 10 },
    { label: "Objectifs", v: live.breakdown.objective, max: 10 },
    { label: "Experience publicitaire", v: live.breakdown.invested + live.breakdown.pastBudget, max: 25 },
    { label: "Budget", v: live.breakdown.minimum, max: 25 },
    { label: "Profil entreprise", v: live.breakdown.revenue, max: 15 },
    { label: "Prise de decision", v: live.breakdown.decision, max: 15 },
  ];

  const q = step >= 1 && step <= questions.length ? questions[step - 1] : null;

  const renderBody = () => {
    if (step === 0) {
      return (
        <>
          <motion.p variants={item} className="dx-kicker">Diagnostic gratuit</motion.p>
          <motion.h2 variants={item} id="dx-title" className="dx-title">
            Sommes-nous l'agence qu'il vous faut ?
          </motion.h2>
          <motion.p variants={item} className="dx-sub">
            4 petites sections pour savoir si notre accompagnement est adapte a votre entreprise.
          </motion.p>
          <ul className="mt-6 space-y-3">
            {[
              { icon: Clock3, t: "1 minute seulement" },
              { icon: Target, t: "Resultat immediat sur 100" },
              { icon: Sparkles, t: "Gratuit et sans engagement" },
            ].map(({ icon: Icon, t }) => (
              <motion.li key={t} variants={item} className="flex items-center gap-3 text-[0.95rem] font-semibold dx-ink">
                <Icon className="h-5 w-5 shrink-0 dx-muted" aria-hidden="true" />{t}
              </motion.li>
            ))}
          </ul>
          <motion.button variants={item} type="button" className="dx-btn-primary mt-7 w-full" onClick={() => go(1)}>
            Commencer le diagnostic <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </motion.button>
          <motion.p variants={item} className="mt-3 flex items-center justify-center gap-2 text-xs dx-muted">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Vos donnees sont securisees et ne seront jamais partagees.
          </motion.p>
        </>
      );
    }

    if (q) {
      const current = answers[q.id as keyof DiagnosticAnswers];
      return (
        <>
          <motion.p variants={item} className="dx-kicker">{q.kicker}</motion.p>
          <motion.h2 variants={item} id="dx-title" className="dx-title">
            {q.title.filter(Boolean).join("")}
          </motion.h2>
          <motion.p variants={item} className="dx-sub">{q.subtitle}</motion.p>
          <div role="radiogroup" aria-labelledby="dx-title" className="mt-6 grid gap-2.5">
            {q.options.map((o) => {
              const selected = current === o.value;
              return (
                <motion.button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  variants={item}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  onClick={() => choose(q, o.value)}
                  className={`dx-option ${selected ? "is-selected" : ""}`}
                >
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-[0.95rem] font-bold dx-ink">{o.label}</span>
                    {o.hint && <span className="mt-0.5 block text-xs leading-5 dx-muted">{o.hint}</span>}
                  </span>
                  <span className={`dx-check ${selected ? "is-on" : ""}`} aria-hidden="true">
                    <AnimatePresence>{selected && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                        <Check className="h-3.5 w-3.5" />
                      </motion.span>
                    )}</AnimatePresence>
                  </span>
                </motion.button>
              );
            })}
          </div>
          {q.id === "objective" && (
            <motion.label variants={item} className="mt-3 block">
              <span className="text-xs font-semibold dx-muted">Autre objectif (facultatif)</span>
              <input
                className="dx-input mt-1"
                maxLength={300}
                placeholder="Decrivez votre objectif…"
                value={answers.objectiveOther ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, objectiveOther: e.target.value }))}
              />
            </motion.label>
          )}
          {q.info && (
            <motion.p variants={item} className="dx-info mt-4"><Info className="h-4 w-4 shrink-0" aria-hidden="true" />{q.info}</motion.p>
          )}
        </>
      );
    }

    if (step === contactStep) {
      const field = (key: "firstName" | "lastName" | "email", label: string, type = "text", auto?: string) => (
        <motion.label variants={item} className="block">
          <span className="text-xs font-semibold dx-muted">{label}</span>
          <input
            type={type} autoComplete={auto} maxLength={key === "email" ? 255 : 80}
            className={`dx-input mt-1 ${errors[key] ? "has-error" : ""}`}
            value={contact[key]}
            onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
          />
          {errors[key] && <span className="mt-1 block text-xs dx-error">{errors[key]}</span>}
        </motion.label>
      );
      return (
        <>
          <motion.p variants={item} className="dx-kicker">Derniere etape</motion.p>
          <motion.h2 variants={item} id="dx-title" className="dx-title">Vos coordonnees</motion.h2>
          <motion.p variants={item} className="dx-sub">Pour recevoir votre diagnostic et etre recontacte par notre equipe.</motion.p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {field("firstName", "Prenom", "text", "given-name")}
            {field("lastName", "Nom", "text", "family-name")}
          </div>
          <div className="mt-3 grid gap-3">
            {field("email", "Adresse email", "email", "email")}
            <motion.div variants={item}>
              <span className="text-xs font-semibold dx-muted">Numero WhatsApp</span>
              <div className="mt-1 flex gap-2">
                <select
                  aria-label="Indicatif"
                  className="dx-input shrink-0"
                  style={{ width: "6.5rem", flex: "0 0 6.5rem" }}
                  value={contact.country}
                  onChange={(e) => setContact((c) => ({ ...c, country: e.target.value }))}
                >
                  {countries.map((c) => <option key={c.code} value={c.code}>{c.label} {c.code}</option>)}
                </select>
                <input
                  type="tel" autoComplete="tel-national" inputMode="tel" maxLength={30}
                  aria-label="Numero WhatsApp"
                  className={`dx-input min-w-0 flex-1 ${errors.phone ? "has-error" : ""}`}
                  style={{ width: "auto" }}
                  placeholder="07 00 00 00 00"
                  value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                />
              </div>
              {errors.phone && <span className="mt-1 block text-xs dx-error">{errors.phone}</span>}
            </motion.div>
          </div>
          <motion.p variants={item} className="dx-info mt-4"><ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />Vos informations sont confidentielles et ne seront jamais partagees.</motion.p>
          {sendError && <p role="alert" className="mt-3 text-sm dx-error">{sendError}</p>}
        </>
      );
    }

    // Resultat
    const ok = result?.qualified;
    return (
      <div className="text-center">
        <motion.div variants={item} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full dx-check is-on"><Check className="h-7 w-7" aria-hidden="true" /></motion.div>
        <motion.p variants={item} className="dx-kicker mt-4">{ok ? "Votre entreprise est eligible" : "Merci pour vos reponses"}</motion.p>
        <motion.h2 variants={item} id="dx-title" className="dx-title">
          {ok ? "Nous pouvons vous aider" : "Votre demande est bien recue"}
        </motion.h2>
        <motion.p variants={item} className="dx-sub mx-auto max-w-md">
          {ok
            ? "Prochaine etape : reservez votre appel strategique avec notre equipe."
            : "Un membre de notre equipe vous contacte sous 24 h pour faire le point sur votre situation."}
        </motion.p>
        {result?.tier === "pilot" && (
          <motion.p variants={item} className="dx-info mx-auto mt-5 max-w-md text-left"><Info className="h-4 w-4 shrink-0" aria-hidden="true" />{PILOT_WARNING}</motion.p>
        )}
        <motion.button variants={item} type="button" onClick={finish} className="dx-btn-primary mx-auto mt-6 w-full max-w-sm">
          {ok ? "Reserver mon appel" : "Continuer"} <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </div>
    );
  };

  const showNav = step > 0 && step < resultStep;
  const canBack = !(inline && step === 1);
  const canNext = q ? Boolean(answers[q.id as keyof DiagnosticAnswers]) || (q.id === "objective" && Boolean(answers.objectiveOther?.trim())) : true;

  const inner = (
    <>
            {!inline && <div className="dx-handle sm:hidden" aria-hidden="true" />}
            <header className={`dx-header${inline ? " justify-center" : ""}`}>
              {inline ? (
                <div className="w-full min-w-0 text-center">
                  <p className="font-display text-3xl sm:text-4xl font-extrabold leading-tight dx-ink">Sommes-nous l'agence qu'il vous faut ?</p>
                  <p className="mx-auto mt-2 max-w-xl text-lg sm:text-xl font-semibold leading-snug dx-ink">Répondez aux 4 petites questions ci-dessous pour le savoir — ça prend 1 minute.</p>
                  <ArrowDown className="mx-auto mt-2 h-6 w-6 dx-ink motion-safe:animate-bounce" aria-hidden="true" />
                </div>
              ) : <img src="/lovable-uploads/lgm-logo-light.png" alt="Agence LGM" className="h-8 w-auto" />}
              {!inline && <button type="button" onClick={onClose} className="dx-close" aria-label="Fermer le diagnostic"><X className="h-5 w-5" /></button>}
            </header>

            <div ref={scrollRef} className="dx-scroll" data-lenis-prevent>
              <div>
                <div className="min-w-0">
                  {/* Progression */}
                  <div className="mt-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="dx-ink">Section {stage.index + 1} / 4</span>
                      <span className="dx-muted">{STAGES[stage.index]}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-1" aria-hidden="true">
                      {STAGES.map((_, i) => (
                        <span key={i} className="dx-seg">
                          <motion.span className="dx-seg-fill" initial={false} animate={{ scaleX: i < stage.index ? 1 : i === stage.index ? stage.fill : 0 }} transition={{ duration: reduce ? 0 : 0.4 }} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-6 overflow-hidden">
                    <AnimatePresence mode="wait" custom={dir} initial={false}>
                      <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
                        {renderBody()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {showNav && (
              <footer className="dx-footer">
                <button type="button" className="dx-btn-ghost" onClick={() => go(step - 1)} disabled={!canBack} style={canBack ? undefined : { visibility: "hidden" }}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour
                </button>
                {step === contactStep ? (
                  <button type="button" className="dx-btn-primary" onClick={submit} disabled={sending}>
                    {sending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
                    Envoyer {!sending && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
                  </button>
                ) : q?.id === "objective" && answers.objectiveOther?.trim() ? (
                  <button type="button" className="dx-btn-primary" onClick={() => go(step + 1)}>
                    Suivant <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                ) : null}
              </footer>
            )}
    </>
  );

  if (inline) {
    return <div ref={panelRef} className="dx-panel dx-inline scroll-mt-24" aria-labelledby="dx-title">{inner}</div>;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="dx-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="dx-title"
            className="dx-panel"
            initial={{ opacity: 0, y: reduce ? 0 : 60, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.98 }}
            transition={{ type: reduce ? "tween" : "spring", stiffness: 260, damping: 28, duration: reduce ? 0 : undefined }}
          >
            {inner}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default DiagnosticModal;
