import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, FolderOpen, Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Stats {
  posts: number;
  categories: number;
  contacts: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ posts: 0, categories: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [postsRes, categoriesRes, contactsRes] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("blog_categories").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        posts: postsRes.count || 0,
        categories: categoriesRes.count || 0,
        contacts: contactsRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Articles", value: stats.posts, icon: FileText, color: "bg-blue-500" },
    { label: "Catégories", value: stats.categories, icon: FolderOpen, color: "bg-green-500" },
    { label: "Messages", value: stats.contacts, icon: Mail, color: "bg-orange-500" },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-8">Tableau de bord</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-6 flex items-center gap-4"
              >
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
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
