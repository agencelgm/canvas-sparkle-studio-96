import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Calendar, Mail, Phone } from "lucide-react";

interface LeadSubmission {
  id: string;
  nom: string | null;
  email: string | null;
  telephone: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  payload: unknown;
  created_at: string;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminLeadsAgence = () => {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<LeadSubmission | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("lead_agence_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching leads:", error);
      else setLeads((data as unknown as LeadSubmission[]) || []);
      setLoading(false);
    };

    fetchLeads();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Leads agence</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Soumissions captees sur la lead page. Elles restent aussi disponibles dans GoHighLevel.
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">Aucun lead enregistre pour le moment.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className={`cursor-pointer rounded-lg border bg-card p-4 transition-colors ${
                    selected?.id === lead.id ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{lead.nom || "Sans nom"}</h3>
                    <span className="text-xs text-muted-foreground">{formatDate(lead.created_at)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.email || "Email non transmis"}</p>
                  {lead.utm_campaign && (
                    <span className="mt-2 inline-block rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {lead.utm_campaign}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {selected ? (
              <div className="sticky top-8 h-fit rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">{selected.nom || "Sans nom"}</h2>
                <div className="mb-6 space-y-3 text-muted-foreground">
                  {selected.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${selected.email}`} className="hover:text-primary">
                        {selected.email}
                      </a>
                    </div>
                  )}
                  {selected.telephone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${selected.telephone}`} className="hover:text-primary">
                        {selected.telephone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selected.created_at)}</span>
                  </div>
                </div>

                <div className="mb-4 text-sm">
                  <span className="text-muted-foreground">Page d'origine :</span>{" "}
                  <span className="font-medium text-foreground">{selected.source_page || "—"}</span>
                </div>
                <div className="mb-4 text-sm">
                  <span className="text-muted-foreground">Source de campagne :</span>{" "}
                  <span className="font-medium text-foreground">{selected.utm_source || "—"}</span>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Donnees completes recues :</span>
                  <pre className="mt-2 max-h-80 overflow-auto rounded bg-muted p-3 text-xs text-foreground">
                    {JSON.stringify(selected.payload, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card p-6 text-muted-foreground">
                Selectionnez un lead pour voir les details
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLeadsAgence;
