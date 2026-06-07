import { useEffect, useState } from "react";
import { ClipboardCheck, FileText, FolderOpen, Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  posts: number;
  categories: number;
  contacts: number;
  qualifications: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ posts: 0, categories: 0, contacts: 0, qualifications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [postsRes, categoriesRes, contactsRes, qualificationsRes] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("blog_categories").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("qualification_submissions").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        posts: postsRes.count || 0,
        categories: categoriesRes.count || 0,
        contacts: contactsRes.count || 0,
        qualifications: qualificationsRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Articles", value: stats.posts, icon: FileText, color: "bg-amber-500" },
    { label: "Categories", value: stats.categories, icon: FolderOpen, color: "bg-green-500" },
    { label: "Messages", value: stats.contacts, icon: Mail, color: "bg-orange-500" },
    { label: "Qualifications", value: stats.qualifications, icon: ClipboardCheck, color: "bg-purple-500" },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-8 text-3xl font-bold text-foreground">Tableau de bord</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
