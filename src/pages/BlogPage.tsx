import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { Arrow, ImageFrame, PageHero, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages } from "@/data/publicContent";
import { supabase } from "@/integrations/supabase/client";

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

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Date a venir";
  return new Date(dateString).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [postsResult, categoriesResult] = await Promise.all([
        supabase.from("blog_posts").select("*, blog_categories(*)").eq("published", true).order("published_at", { ascending: false }),
        supabase.from("blog_categories").select("*").order("name"),
      ]);

      if (postsResult.error || categoriesResult.error) {
        setError(true);
      } else {
        setPosts((postsResult.data || []) as BlogPost[]);
        setCategories(categoriesResult.data || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory ? posts.filter((post) => post.category_id === selectedCategory) : posts;

  return (
    <PageLayout>
      <Helmet>
        <title>Blog marketing, publicite, SEO et IA | LGM Abidjan</title>
        <meta name="description" content="Insights LGM depuis Abidjan sur agence marketing, publicite Facebook, SEO/AEO/GEO, generation de leads, IA, automatisation, logiciel sur mesure et communication." />
        <link rel="canonical" href="https://lgm.marketing/blog" />
        <meta property="og:url" content="https://lgm.marketing/blog" />
        <meta property="og:image" content={`https://lgm.marketing${publicImages.og}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
            { "@type": "ListItem", position: 2, name: "Blog" },
          ],
        })}</script>
      </Helmet>

      <PageHero
        eyebrow="Insights"
        title={<>Des idees marketing pour les marches qui <span className="corporate-accent">bougent vite.</span></>}
        lead="Guides, analyses et notes de terrain pour comprendre ce qui fait avancer acquisition, conversion et fidelisation."
        image={publicImages.blog}
        imageAlt="Bureau editorial avec calendrier de contenu, veille marketing et analytics de croissance"
        rightSlot={<DiagnosticHeroSlot sourcePage="blog-hero" />}
      />

      <section className="section-charcoal section-pad-tight">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap gap-3 border-b border-[#f0d9961f] pb-6">
              <button onClick={() => setSelectedCategory(null)} className={selectedCategory === null ? "btn-cobalt min-h-0 px-5 py-2" : "btn-cobalt-outline min-h-0 px-5 py-2"}>
                Tous
              </button>
              {categories.map((category) => (
                <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={selectedCategory === category.id ? "btn-cobalt min-h-0 px-5 py-2" : "btn-cobalt-outline min-h-0 px-5 py-2"}>
                  {category.name}
                </button>
              ))}
            </div>
          </Reveal>

          {loading ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((item) => <div key={item} className="public-card h-80 animate-pulse" />)}
            </div>
          ) : error ? (
            <div className="mt-12 public-card p-8 text-center">
              <h2 className="public-h3 text-platinum">Impossible de charger les articles</h2>
              <p className="public-body mx-auto mt-3 max-w-xl">Reessayez dans quelques instants ou contactez LGM directement.</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="mt-12 public-card p-8 text-center">
              <h2 className="public-h3 text-platinum">Aucun article pour cette selection</h2>
              <p className="public-body mx-auto mt-3 max-w-xl">Les prochaines notes de terrain seront publiees ici.</p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <Reveal key={post.id} delay={index * 0.045}>
                  <Link to={`/blog/${post.slug}`} className="blog-card group h-full text-platinum">
                    <div className="aspect-[1.38] overflow-hidden bg-[#101827]">
                      <img
                        src={post.featured_image || publicImages.blog}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex h-full flex-col p-5 md:p-6">
                      <div className="flex items-center justify-between gap-4 text-xs font-bold text-[#f0d996]">
                        <span>{post.blog_categories?.name || "LGM"}</span>
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      <h2 className="public-h3 mt-5 text-[clamp(1.25rem,2vw,1.8rem)] transition-colors group-hover:text-[#f0d996]">{post.title}</h2>
                      {post.excerpt && <p className="public-body mt-3 line-clamp-3">{post.excerpt}</p>}
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#f0d996]">
                        Lire l'article <Arrow />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPage;
