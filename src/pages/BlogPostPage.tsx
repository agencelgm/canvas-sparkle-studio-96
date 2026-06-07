import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { BackArrow, FinalCTA, Reveal } from "@/components/public/PublicPrimitives";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { findPost } from "@/data/blogContent";
import { publicImages } from "@/data/publicContent";
import type { PageNode } from "@/data/siteGraph";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Date a venir";
  return new Date(dateString).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findPost(slug) : null;

  if (!post) {
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
  const ogImage = `https://lgm.marketing${publicImages.og}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { "@type": "Organization", name: "LGM, Les Gens du Marketing", url: "https://lgm.marketing" },
    publisher: {
      "@type": "Organization",
      name: "LGM, Les Gens du Marketing",
      logo: { "@type": "ImageObject", url: ogImage },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection: post.blog_categories.name,
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

  const metaDescription = post.excerpt.length <= 158 ? post.excerpt : `${post.excerpt.slice(0, 157).trimEnd()}…`;

  return (
    <PageLayout>
      <Helmet>
        <title>{post.title} | LGM Blog</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="public-page-hero">
        <img src={publicImages.blog} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.62),rgba(7,11,18,0.92))]" />
        <div className="container-wide relative z-10 grid gap-10 pt-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:items-start">
          <div>
            <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#f0d996]">
              <BackArrow />
              Retour au blog
            </Link>
            <Reveal>
              <p className="section-kicker">{post.blog_categories.name}</p>
              <h1 className="public-h1 max-w-[13ch]">{post.title}</h1>
              <p className="mt-6 text-sm font-bold text-platinum/64">{formatDate(post.published_at)}</p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="diagnostic-hero-panel">
            <DiagnosticHeroSlot sourcePage={`blog-post-${post.slug}`} />
          </Reveal>
        </div>
      </section>

      <section className="section-charcoal section-pad-tight">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: "Accueil", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.title },
            ]}
          />
          <article className="public-prose">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </section>

      {(() => {
        const node: PageNode = {
          url: `/blog/${post.slug}`,
          title: post.title,
          type: "article",
          tags: [
            "blog",
            slugify(post.blog_categories.name),
            ...post.title.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4),
          ],
          description: post.excerpt,
          publishedAt: post.published_at,
        };
        return <RelatedLinks current={node} count={6} excludeUrls={[`/blog/${post.slug}`]} />;
      })()}

      <FinalCTA title="Vous voulez appliquer ces idees a votre entreprise ?" text="Nous pouvons analyser votre acquisition, votre conversion et votre fidelisation avec une lecture concrete de vos chiffres." button="Demander un audit" />
    </PageLayout>
  );
};

export default BlogPostPage;
