import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newName, setNewName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("id, name, slug")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const addCategory = async () => {
    if (!newName.trim()) return;

    const { error } = await supabase.from("blog_categories").insert({
      name: newName.trim(),
      slug: generateSlug(newName),
    });

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Catégorie créée" });
      setNewName("");
      setIsAdding(false);
      fetchCategories();
    }
  };

  const updateCategory = async (id: string) => {
    if (!editName.trim()) return;

    const { error } = await supabase
      .from("blog_categories")
      .update({
        name: editName.trim(),
        slug: generateSlug(editName),
      })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Catégorie mise à jour" });
      setEditingId(null);
      fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;

    const { error } = await supabase.from("blog_categories").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Catégorie supprimée" });
      fetchCategories();
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Catégories</h1>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle catégorie
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {isAdding && (
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nom de la catégorie"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                />
                <Button size="icon" onClick={addCategory}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setIsAdding(false);
                    setNewName("");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {categories.length === 0 && !isAdding ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucune catégorie. Créez votre première catégorie !
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
                >
                  {editingId === category.id ? (
                    <div className="flex items-center gap-3 flex-1">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => e.key === "Enter" && updateCategory(category.id)}
                      />
                      <Button size="icon" onClick={() => updateCategory(category.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span className="font-medium text-foreground">{category.name}</span>
                        <span className="text-muted-foreground text-sm ml-3">/{category.slug}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEdit(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCategory(category.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
