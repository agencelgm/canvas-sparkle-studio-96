import PageLayout from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight } from "lucide-react";
import HexagonPattern from "@/components/HexagonPattern";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  category_id: string | null;
  blog_categories: BlogCategory | null;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [postsResult, categoriesResult] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("*, blog_categories(*)")
          .eq("published", true)
          .order("published_at", { ascending: false }),
        supabase
          .from("blog_categories")
          .select("*")
          .order("name")
      ]);

      if (postsResult.data) setPosts(postsResult.data as BlogPost[]);
      if (categoriesResult.data) setCategories(categoriesResult.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category_id === selectedCategory)
    : posts;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Blog | LGM - Les Gens du Marketing</title>
        <meta name="description" content="Découvrez nos articles sur le marketing digital, le SEO, la stratégie et les réseaux sociaux." />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <HexagonPattern />
        </div>
        
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-bronze/20 to-bronze-dark/10 rounded-full blur-3xl hidden md:block" />
        
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-bronze text-sm font-medium tracking-wider uppercase mb-4 animate-fade-up">
              Blog
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6 animate-fade-up animation-delay-100">
              Insights & <span className="text-gradient-bronze">Stratégies</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up animation-delay-200">
              Articles, guides et études de cas pour booster votre marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 border-b border-border">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null 
                  ? "bg-bronze text-background" 
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id 
                    ? "bg-bronze text-background" 
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-wide">
          {loading ? (
            <div className="text-center text-muted-foreground">Chargement...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                Aucun article pour le moment.
              </p>
              <p className="text-sm text-muted-foreground">
                Revenez bientôt pour découvrir nos prochains contenus !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border/50 rounded-lg overflow-hidden hover:border-bronze/50 transition-all duration-300"
                >
                  {post.featured_image ? (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-bronze/10 to-bronze-dark/5 flex items-center justify-center">
                      <span className="text-bronze/30 font-serif text-4xl">LGM</span>
                    </div>
                  )}
                  
                  <div className="p-5 lg:p-6">
                    {post.blog_categories && (
                      <span className="text-xs text-bronze font-medium uppercase tracking-wider">
                        {post.blog_categories.name}
                      </span>
                    )}
                    
                    <h2 className="font-serif text-lg lg:text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-bronze transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.published_at)}
                      </div>
                      
                      <div className="flex items-center gap-1 text-bronze text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Lire
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPage;
