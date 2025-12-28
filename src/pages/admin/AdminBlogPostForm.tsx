import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

const AdminBlogPostForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from("blog_categories")
        .select("id, name")
        .order("name");

      setCategories(categoriesData || []);

      // If editing, fetch post
      if (isEditing) {
        const { data: post, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !post) {
          toast({
            title: "Erreur",
            description: "Article non trouvé",
            variant: "destructive",
          });
          navigate("/admin/posts");
          return;
        }

        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content);
        setFeaturedImage(post.featured_image || "");
        setCategoryId(post.category_id || "");
        setPublished(post.published);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, isEditing, navigate, toast]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !content) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const postData = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featured_image: featuredImage || null,
      category_id: categoryId || null,
      published,
      published_at: published ? new Date().toISOString() : null,
    };

    let error;

    if (isEditing) {
      const result = await supabase.from("blog_posts").update(postData).eq("id", id);
      error = result.error;
    } else {
      const result = await supabase.from("blog_posts").insert(postData);
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: isEditing ? "Article mis à jour" : "Article créé" });
      navigate("/admin/posts");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/posts")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux articles
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-8">
          {isEditing ? "Modifier l'article" : "Nouvel article"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Titre de l'article"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-de-larticle"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image mise en avant</Label>
              <Input
                id="image"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Extrait</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Courte description de l'article..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenu de l'article (HTML supporté)..."
              rows={15}
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">Publier l'article</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Enregistrement..." : isEditing ? "Mettre à jour" : "Créer l'article"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/posts")}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPostForm;
