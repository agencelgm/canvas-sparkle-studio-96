import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Calendar, Mail, MapPin, Phone, Wallet } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface QualificationSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  has_business: boolean;
  company_name: string | null;
  industry: string;
  location: string;
  website_or_social: string | null;
  service: string;
  has_invested_marketing: boolean | null;
  past_marketing_budget_raw: string | null;
  past_marketing_budget_normalized: number | null;
  past_marketing_result: string | null;
  objective_90_days: string;
  budget_raw: string;
  budget_normalized: number;
  can_invest_minimum: boolean;
  can_invest_10000_daily: boolean | null;
  eligibility_status: string;
  source_page: string | null;
  created_at: string;
  monthly_revenue_band: string | null;
  team_size_band: string | null;
  anchor_reaction: string | null;
  daily_ad_budget_ready_5k: boolean | null;
  coherence_score: number | null;
  budget_band: string | null;
  coherence_flags: string[] | null;
}

const revenueBandLabel: Record<string, string> = {
  lt_500k: "Moins de 500 000 FCFA",
  "500k_2m": "500 000 a 2 000 000 FCFA",
  "2m_10m": "2 a 10 millions FCFA",
  "10m_50m": "10 a 50 millions FCFA",
  gt_50m: "Plus de 50 millions FCFA",
};

const teamSizeLabel: Record<string, string> = {
  solo: "Solo / freelance",
  "2_5": "2 a 5 personnes",
  "6_20": "6 a 20 personnes",
  "21_50": "21 a 50 personnes",
  gt_50: "Plus de 50",
};

const anchorReactionLabel: Record<string, string> = {
  affordable: "Dans mes moyens",
  possible: "Eleve mais possible si ROI",
  too_much: "Trop pour aujourd'hui",
};

const bandBadge = (band: string | null, flags: string[] | null) => {
  const hasFlags = Array.isArray(flags) && flags.length > 0;
  if (hasFlags) return { label: "A requalifier", className: "bg-red-500/15 text-red-400 border-red-500/30" };
  if (band === "high") return { label: "Budget eleve", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" };
  if (band === "medium") return { label: "Budget moyen", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" };
  if (band === "low") return { label: "Budget faible", className: "bg-orange-500/15 text-orange-400 border-orange-500/30" };
  return { label: "Non calibre", className: "bg-muted text-muted-foreground border-border" };
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatAmount = (amount: number | null) => (amount === null ? "Non renseigne" : `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`);

const boolLabel = (value: boolean | null) => {
  if (value === null) return "Non applicable";
  return value ? "Oui" : "Non";
};

const AdminQualifications = () => {
  const [qualifications, setQualifications] = useState<QualificationSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<QualificationSubmission | null>(null);

  useEffect(() => {
    const fetchQualifications = async () => {
      const { data, error } = await supabase
        .from("qualification_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching qualification submissions:", error);
      } else {
        setQualifications(data || []);
        setSelected((data || [])[0] || null);
      }
      setLoading(false);
    };

    fetchQualifications();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Qualifications</h1>
        <p className="mb-8 text-muted-foreground">Applications filtrees par budget, objectif 90 jours et capacite d'investissement.</p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : qualifications.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">Aucune qualification recue.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-3">
              {qualifications.map((qualification) => (
                <button
                  key={qualification.id}
                  onClick={() => setSelected(qualification)}
                  className={`w-full rounded-lg border bg-card p-4 text-left transition-colors ${
                    selected?.id === qualification.id ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{qualification.name}</h3>
                      <p className="text-sm text-muted-foreground">{qualification.company_name || "Sans entreprise"}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(qualification.created_at)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{qualification.service}</span>
                    <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{formatAmount(qualification.budget_normalized)}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-foreground">{qualification.objective_90_days}</p>
                </button>
              ))}
            </div>

            {selected ? (
              <div className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-8">
                <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selected.name}</h2>
                    <p className="mt-1 text-muted-foreground">{selected.company_name || "Sans entreprise"} · {selected.industry}</p>
                  </div>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{selected.eligibility_status}</span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Info icon={<Mail className="h-4 w-4" />} label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                  <Info icon={<Phone className="h-4 w-4" />} label="Telephone" value={selected.phone} href={`tel:${selected.phone}`} />
                  <Info icon={<MapPin className="h-4 w-4" />} label="Localisation" value={selected.location} />
                  <Info icon={<Calendar className="h-4 w-4" />} label="Date" value={formatDate(selected.created_at)} />
                  <Info icon={<Wallet className="h-4 w-4" />} label="Budget mensuel" value={formatAmount(selected.budget_normalized)} />
                  <Info icon={<Wallet className="h-4 w-4" />} label="Budget brut" value={selected.budget_raw} />
                </div>

                <div className="mt-6 grid gap-5">
                  <Detail label="A deja une entreprise" value={boolLabel(selected.has_business)} />
                  <Detail label="Site ou reseau social" value={selected.website_or_social || "Non renseigne"} />
                  <Detail label="Service demande" value={selected.service} />
                  <Detail label="Objectif a 90 jours" value={selected.objective_90_days} />
                  <Detail label="A deja investi en marketing/publicite" value={boolLabel(selected.has_invested_marketing)} />
                  {selected.has_invested_marketing && (
                    <>
                      <Detail label="Budget marketing deja investi" value={`${selected.past_marketing_budget_raw || "Non renseigne"} (${formatAmount(selected.past_marketing_budget_normalized)})`} />
                      <Detail label="Resultat de l'investissement passe" value={selected.past_marketing_result || "Non renseigne"} />
                    </>
                  )}
                  <Detail label="Capable d'investir minimum 270 000 FCFA" value={boolLabel(selected.can_invest_minimum)} />
                  <Detail label="Pret a investir 10 000 FCFA / jour en publicite" value={boolLabel(selected.can_invest_10000_daily)} />
                  <Detail label="Source" value={selected.source_page || "Non renseigne"} />
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card p-6 text-muted-foreground">
                Selectionnez une qualification pour voir les details
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const Info = ({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) => (
  <div className="rounded-lg border border-border p-4">
    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
      {icon}
      {label}
    </div>
    {href ? (
      <a href={href} className="break-words font-medium text-foreground hover:text-primary">{value}</a>
    ) : (
      <p className="break-words font-medium text-foreground">{value}</p>
    )}
  </div>
);

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="mt-1 whitespace-pre-wrap font-medium text-foreground">{value}</p>
  </div>
);

export default AdminQualifications;
