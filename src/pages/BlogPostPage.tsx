import PageLayout from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar } from "lucide-react";
import HexagonPattern from "@/components/HexagonPattern";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  blog_categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      const { data } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(*)")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      setPost(data as BlogPost | null);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="section-padding container-narrow text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="section-padding container-narrow text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-bronze hover:underline">
            Retour au blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <title>{post.title} | LGM Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <HexagonPattern />
        </div>
        
        <div className="container-narrow relative z-10">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {post.blog_categories && (
            <span className="inline-block text-bronze text-sm font-medium uppercase tracking-wider mb-4">
              {post.blog_categories.name}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {formatDate(post.published_at)}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="pb-8">
          <div className="container-narrow">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-padding pt-0">
        <div className="container-narrow">
          <article className="prose prose-invert prose-bronze max-w-none">
            <div 
              className="text-muted-foreground leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card/50">
        <div className="container-narrow text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-foreground mb-4">
            Besoin d'aide pour votre marketing ?
          </h2>
          <p className="text-muted-foreground mb-6">
            Discutons de comment nous pouvons appliquer ces stratégies à votre entreprise.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-bronze hover:bg-bronze-dark text-background font-medium rounded-md transition-colors"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPostPage;
