import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

type Row = { variant: string | null; score: number | null; qualified: boolean | null; eligibility_status: string };
type Stats = { leads: number; qualified: number; pilot: number; excluded: number; avg: number };

const empty = (): Stats => ({ leads: 0, qualified: 0, pilot: 0, excluded: 0, avg: 0 });

const AdminAbTest = () => {
  const [stats, setStats] = useState<Record<"a" | "b", Stats> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("qualification_submissions")
      .select("variant, score, qualified, eligibility_status")
      .eq("source_page", "lead-agence-marketing")
      .not("variant", "is", null)
      .then(({ data, error }) => {
        if (error) return setError(error.message);
        const s = { a: empty(), b: empty() };
        const sums = { a: 0, b: 0 };
        (data as Row[]).forEach((r) => {
          const v = r.variant === "b" ? "b" : "a";
          s[v].leads++;
          if (r.qualified) s[v].qualified++;
          if (r.eligibility_status === "qualifie_programme_pilote") s[v].pilot++;
          if (r.eligibility_status === "non_qualifie_budget_insuffisant") s[v].excluded++;
          sums[v] += r.score ?? 0;
        });
        (["a", "b"] as const).forEach((v) => { s[v].avg = s[v].leads ? Math.round(sums[v] / s[v].leads) : 0; });
        setStats(s);
      });
  }, []);

  const pct = (n: number, d: number) => (d ? `${Math.round((n / d) * 100)} %` : "—");

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Test A/B — page campagne</h1>
      <p className="mt-1 text-sm text-muted-foreground">A = page complète, B = page courte. Leads reçus depuis le lancement du test.</p>
      {error && <p className="mt-4 text-destructive">{error}</p>}
      {stats && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(["a", "b"] as const).map((v) => (
            <div key={v} className="rounded-lg border bg-card p-5">
              <p className="text-lg font-bold">Version {v.toUpperCase()} {v === "a" ? "(complète)" : "(courte)"}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><dt>Leads</dt><dd className="font-semibold">{stats[v].leads}</dd></div>
                <div className="flex justify-between"><dt>Qualifiés</dt><dd className="font-semibold">{stats[v].qualified} ({pct(stats[v].qualified, stats[v].leads)})</dd></div>
                <div className="flex justify-between"><dt>Programme pilote</dt><dd className="font-semibold">{stats[v].pilot}</dd></div>
                <div className="flex justify-between"><dt>Exclus (budget)</dt><dd className="font-semibold">{stats[v].excluded}</dd></div>
                <div className="flex justify-between"><dt>Score moyen</dt><dd className="font-semibold">{stats[v].avg}/100</dd></div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminAbTest;
