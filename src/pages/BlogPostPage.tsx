import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { BackArrow, FinalCTA, Reveal } from "@/components/public/PublicPrimitives";
import { publicImages } from "@/data/publicContent";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  blog_categories: { id: string; name: string; slug: string } | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Date a venir";
  return new Date(dateString).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

const toAbsoluteImage = (src: string | null | undefined) => {
  const fallback = `https://lgm.marketing${publicImages.og}`;
  if (!src) return fallback;
  if (src.startsWith("http")) return src;
  return `https://lgm.marketing${src}`;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const { data, error: queryError } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(*)")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (queryError) setError(true);
      setPost(data as BlogPost | null);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <section className="public-page-hero min-h-[70dvh]">
          <div className="container-narrow relative z-10 pt-32">
            <div className="public-card h-12 animate-pulse" />
            <div className="public-card mt-5 h-40 animate-pulse" />
          </div>
        </section>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <section className="public-page-hero min-h-[70dvh]">
          <div className="container-narrow relative z-10 pt-32 text-center">
            <h1 className="public-h2">Article introuvable</h1>
            <p className="public-lead mx-auto">Cette note n'est pas publiee ou a ete deplacee.</p>
            <Link to="/blog" className="btn-cobalt mt-8">Retour au blog</Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const canonicalUrl = `https://lgm.marketing/blog/${post.slug}`;
  const ogImage = toAbsoluteImage(post.featured_image || publicImages.og);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    image: ogImage,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { "@type": "Organization", name: "LGM, Les Gens du Marketing", url: "https://lgm.marketing" },
    publisher: {
      "@type": "Organization",
      name: "LGM, Les Gens du Marketing",
      logo: { "@type": "ImageObject", url: `https://lgm.marketing${publicImages.og}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection: post.blog_categories?.name || "Insight",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lgm.marketing/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://lgm.marketing/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{post.title} | LGM Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="public-page-hero">
        <img src={post.featured_image || publicImages.blog} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.62),rgba(7,11,18,0.92))]" />
        <div className="container-narrow relative z-10 pt-32">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#f0d996]">
            <BackArrow />
            Retour au blog
          </Link>
          <Reveal>
            <p className="section-kicker">{post.blog_categories?.name || "Insight"}</p>
            <h1 className="public-h1 max-w-[13ch]">{post.title}</h1>
            <p className="mt-6 text-sm font-bold text-platinum/64">{formatDate(post.published_at)}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-charcoal section-pad-tight">
        <div className="container-narrow">
          <article className="public-prose">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </section>

      <FinalCTA title="Vous voulez appliquer ces idees a votre entreprise ?" text="Nous pouvons analyser votre acquisition, votre conversion et votre fidelisation avec une lecture concrete de vos chiffres." button="Demander un audit" />
    </PageLayout>
  );
};

export default BlogPostPage;
