import { useCallback, useEffect, useState } from "react";
import { ExternalLink, Loader2, Play, Sparkles, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const PAGES: { key: string; name: string; path: string }[] = [
  { key: "lead-agence-marketing", name: "Page campagne", path: "/lead-agence-marketing" },
  { key: "rendez-vous", name: "Rendez-vous (qualifiés)", path: "/lead-agence-marketing/rendez-vous" },
  { key: "programme-pilote", name: "Programme pilote (non qualifiés)", path: "/lead-agence-marketing/programme-pilote" },
  { key: "formation-facebook", name: "Formation Facebook", path: "/lead-agence-marketing/formation-facebook" },
  { key: "groupe-whatsapp", name: "Groupe WhatsApp", path: "/lead-agence-marketing/groupe-whatsapp" },
];
const CONVERSION: Record<string, string> = {
  "lead-agence-marketing": "prospect qualifié (65+)",
  "rendez-vous": "rendez-vous réservé",
  "programme-pilote": "clic « Oui, je veux une place »",
  "formation-facebook": "clic sur la réservation",
  "groupe-whatsapp": "clic pour rejoindre",
};

type Variant = { id: string; variant: "a" | "b"; label: string; change_description: string; content: Record<string, string> };
type Exp = {
  id: string; page_key: string; name: string; status: string; started_at: string | null; ended_at: string | null;
  winner: string | null; decision_reason: string | null; ai_rationale: string | null;
  final_stats: Record<string, { views: number; conversions: number; submits?: number }>; ab_variants: Variant[];
};
type Arm = { views: number; conversions: number; submits: number };

const rate = (a: Arm | undefined) => (a && a.views ? `${((a.conversions / a.views) * 100).toFixed(1)} %` : "—");
const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString("fr-FR") : "—");

const AdminAbTest = () => {
  const [exps, setExps] = useState<Exp[]>([]);
  const [stats, setStats] = useState<Record<string, Record<string, Arm>>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("ab_experiments").select("*, ab_variants(*)").order("created_at", { ascending: false });
    const list = (data ?? []) as unknown as Exp[];
    setExps(list);
    const s: Record<string, Record<string, Arm>> = {};
    await Promise.all(list.filter((e) => e.status === "running").map(async (e) => {
      const { data: rows } = await supabase.rpc("ab_stats", { _experiment_id: e.id });
      const arms: Record<string, Arm> = { a: { views: 0, conversions: 0, submits: 0 }, b: { views: 0, conversions: 0, submits: 0 } };
      (rows ?? []).forEach((r) => {
        const arm = arms[r.variant];
        if (!arm) return;
        if (r.event_type === "view") arm.views = Number(r.n);
        if (r.event_type === "convert") arm.conversions = Number(r.n);
        if (r.event_type === "submit") arm.submits = Number(r.n);
      });
      s[e.id] = arms;
    }));
    setStats(s);
  }, []);

  useEffect(() => {
    // Revérifie la règle du gagnant à l'ouverture, puis affiche.
    supabase.functions.invoke("ab-evaluate", { body: {} }).finally(load);
  }, [load]);

  const launch = async (e: Exp) => {
    setBusy(e.id);
    const running = exps.find((x) => x.page_key === e.page_key && x.status === "running");
    if (running) await supabase.from("ab_experiments").update({ status: "stopped", ended_at: new Date().toISOString(), decision_reason: "Arrêté manuellement pour lancer un nouveau test." }).eq("id", running.id);
    const { error } = await supabase.from("ab_experiments").update({ status: "running", started_at: new Date().toISOString() }).eq("id", e.id);
    setMsg(error ? "Lancement impossible." : "Test lancé.");
    setBusy(null);
    load();
  };
  const reject = async (e: Exp) => {
    await supabase.from("ab_experiments").update({ status: "rejected", ended_at: new Date().toISOString() }).eq("id", e.id);
    load();
  };
  const saveB = async (v: Variant, field: string, value: string) => {
    await supabase.from("ab_variants").update({ content: { ...v.content, [field]: value } }).eq("id", v.id);
  };
  const askAi = async (pageKey: string) => {
    setBusy(pageKey);
    setMsg(null);
    const { data, error } = await supabase.functions.invoke("ab-evaluate", { body: { action: "propose", pageKey, control: {} } });
    setMsg(error || data?.error ? (data?.error ?? "La proposition IA a échoué.") : "Nouvelle proposition prête ci-dessous.");
    setBusy(null);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Tests A/B du parcours</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Règle : 100 visites minimum par version, puis la meilleure gagne si elle convertit au moins 20 % de plus. Sinon le test continue.
        Vos visites via les boutons « Voir » ne sont pas comptées.
      </p>
      {msg && <p className="mt-3 text-sm font-semibold">{msg}</p>}

      <div className="mt-6 space-y-6">
        {PAGES.map((p) => {
          const running = exps.find((e) => e.page_key === p.key && e.status === "running");
          const proposals = exps.filter((e) => e.page_key === p.key && e.status === "proposed");
          const history = exps.filter((e) => e.page_key === p.key && ["concluded", "stopped"].includes(e.status));
          const st = running ? stats[running.id] : undefined;
          return (
            <section key={p.key} className="rounded-lg border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold">{p.name}</h2>
                <span className="text-xs text-muted-foreground">Conversion : {CONVERSION[p.key]}</span>
              </div>

              {running ? (
                <div className="mt-4">
                  <p className="text-sm font-semibold">Test en cours depuis le {fmt(running.started_at)} : {running.name}</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {(["a", "b"] as const).map((k) => {
                      const v = running.ab_variants.find((x) => x.variant === k);
                      const arm = st?.[k];
                      return (
                        <div key={k} className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <p className="font-bold">Version {k.toUpperCase()} — {v?.label}</p>
                            <a href={`${p.path}?v=${k}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold underline">
                              Voir <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{v?.change_description}</p>
                          <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                            <div><dt className="text-muted-foreground">Visites</dt><dd className="font-bold">{arm?.views ?? 0}/100</dd></div>
                            <div><dt className="text-muted-foreground">Conversions</dt><dd className="font-bold">{arm?.conversions ?? 0}</dd></div>
                            <div><dt className="text-muted-foreground">Taux</dt><dd className="font-bold">{rate(arm)}</dd></div>
                          </dl>
                          {p.key === "lead-agence-marketing" && <p className="mt-2 text-xs text-muted-foreground">Formulaires envoyés : {arm?.submits ?? 0}</p>}
                          <div className="mt-2 h-1.5 rounded bg-muted"><div className="h-1.5 rounded bg-primary" style={{ width: `${Math.min(100, arm?.views ?? 0)}%` }} /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">Aucun test en cours sur cette page.</p>
              )}

              {proposals.map((e) => {
                const b = e.ab_variants.find((x) => x.variant === "b");
                return (
                  <div key={e.id} className="mt-4 rounded-md border border-dashed p-4">
                    <p className="text-sm font-bold">Proposition à valider : {e.name}</p>
                    {e.ai_rationale && <p className="mt-1 text-sm text-muted-foreground">Pourquoi : {e.ai_rationale}</p>}
                    {b && (["headline", "subtitle", "cta"] as const).filter((f) => f in b.content).map((f) => (
                      <label key={f} className="mt-2 block text-xs font-semibold">
                        {{ headline: "Titre", subtitle: "Sous-titre", cta: "Bouton" }[f]}
                        <Textarea defaultValue={b.content[f]} rows={2} className="mt-1" onBlur={(ev) => saveB(b, f, ev.target.value)} />
                      </label>
                    ))}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => launch(e)} disabled={busy === e.id}><Play className="mr-1 h-4 w-4" />Lancer ce test</Button>
                      <Button size="sm" variant="outline" onClick={() => reject(e)}><X className="mr-1 h-4 w-4" />Refuser</Button>
                    </div>
                  </div>
                );
              })}

              {!proposals.length && (
                <Button size="sm" variant="outline" className="mt-4" onClick={() => askAi(p.key)} disabled={busy === p.key}>
                  {busy === p.key ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Sparkles className="mr-1 h-4 w-4" />}
                  Demander une proposition à l'IA
                </Button>
              )}

              {history.length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold">Historique ({history.length})</summary>
                  <ul className="mt-2 space-y-2 text-sm">
                    {history.map((e) => (
                      <li key={e.id} className="rounded border p-3">
                        <p className="font-semibold">{fmt(e.started_at)} → {fmt(e.ended_at)} · {e.name}</p>
                        <p className="text-muted-foreground">
                          {e.winner ? `Gagnant : version ${e.winner.toUpperCase()} (${e.ab_variants.find((v) => v.variant === e.winner)?.label ?? ""}).` : "Arrêté sans gagnant."} {e.decision_reason}
                        </p>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </section>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminAbTest;
