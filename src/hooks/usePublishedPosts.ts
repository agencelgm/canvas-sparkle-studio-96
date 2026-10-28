import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as legacyPosts } from "@/data/blogContent";

// Repli : si la base ne renvoie aucun article publie, on affiche les
// anciens articles embarques pour ne jamais casser les URL existantes.
const legacy = (): PublicPost[] =>
  legacyPosts.filter((p) => p.published).map((p) => ({
    id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, content: p.content,
    featured_image: p.featured_image, published_at: p.published_at, updated_at: p.published_at,
    category: p.blog_categories,
  }));

// Meme source que l'admin : table blog_posts. Seuls les articles publies
// sont lus (la politique d'acces masque aussi les brouillons).
export type PublicPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  published_at: string | null;
  updated_at: string;
  category: { id: string; name: string; slug: string } | null;
};

const select = "id, slug, title, excerpt, content, featured_image, published_at, updated_at, category:blog_categories(id, name, slug)";

export const usePublishedPosts = () =>
  useQuery({
    queryKey: ["public-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(select)
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      if (error) throw error;
      const rows = (data ?? []) as unknown as PublicPost[];
      return rows.length > 0 ? rows : legacy();
    },
    staleTime: 60_000,
  });

export const usePublishedPost = (slug?: string) =>
  useQuery({
    queryKey: ["public-post", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(select)
        .eq("published", true)
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      if (data) return data as unknown as PublicPost;
      const { count } = await supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("published", true);
      return count ? null : legacy().find((p) => p.slug === slug) ?? null;
    },
  });

export const readingMinutes = (html: string) => {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

export const formatDateFr = (date: string | null) =>
  date ? new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";
