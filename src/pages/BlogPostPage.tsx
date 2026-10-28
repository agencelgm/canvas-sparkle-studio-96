import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import { BackArrow, FinalCTA } from "@/components/public/PublicPrimitives";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";
import type { PageNode } from "@/data/siteGraph";
import { formatDateFr, readingMinutes, usePublishedPost, usePublishedPosts } from "@/hooks/usePublishedPosts";
import { OG_IMAGE, SITE_URL, absUrl, breadcrumbSchema } from "@/lib/site";

const slugify = (value: string) =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Shell = ({ children }: { children: React.ReactNode }) => (
  <PageLayout>
    <section className="public-page-hero !min-h-[70dvh]">
      <div className="container-narrow relative z-10 pt-16 text-center">{children}</div>
    </section>
  </PageLayout>
);

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError, refetch } = usePublishedPost(slug);
  const { data: allPosts } = usePublishedPosts();

  if (isLoading) {
    return (
      <Shell>
        <Helmet><title>Chargement de l'article | LGM</title></Helmet>
        <p className="public-lead mx-auto" role="status">Chargement de l'article…</p>
      </Shell>
    );
  }

  if (isError) {
    return (
      <Shell>
        <Helmet><title>Article indisponible | LGM</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="public-h2">Article momentanement indisponible</h1>
        <p className="public-lead mx-auto">Verifiez votre connexion puis reessayez.</p>
        <button onClick={() => refetch()} className="btn-cobalt mt-8">Reessayer</button>
      </Shell>
    );
  }

  if (!post) {
    return (
      <Shell>
        <Helmet><title>Article introuvable | LGM</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="public-h2">Article introuvable</h1>
        <p className="public-lead mx-auto">Cet article n'est pas publie ou a ete deplace.</p>
        <Link to="/blog" className="btn-cobalt mt-8">Retour au blog</Link>
      </Shell>
    );
  }

  const canonicalUrl = absUrl(`/blog/${post.slug}`);
  const excerpt = post.excerpt ?? "";
  const metaDescription = excerpt.length <= 158 ? excerpt : `${excerpt.slice(0, 157).trimEnd()}…`;
  const image = post.featured_image?.startsWith("http") ? post.featured_image : OG_IMAGE;
  const minutes = readingMinutes(post.content);
  const categoryName = post.category?.name ?? "Blog";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: excerpt,
    image,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "LGM, Les Gens du Marketing", url: SITE_URL },
    publisher: { "@type": "Organization", name: "LGM, Les Gens du Marketing", logo: { "@type": "ImageObject", url: absUrl("/lovable-uploads/lgm-logo-light.png") } },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection: categoryName,
  };

  const node: PageNode = {
    url: `/blog/${post.slug}`,
    title: post.title,
    type: "article",
    tags: ["blog", slugify(categoryName), ...post.title.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4)],
    description: excerpt,
    publishedAt: post.published_at ?? undefined,
  };
  const others = (allPosts ?? []).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageLayout>
      <Helmet>
        <title>{`${post.title} | Blog LGM`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title }]))}</script>
      </Helmet>

      <section className="public-page-hero !min-h-0">
        <div className="container-wide relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)] lg:items-start">
          <div>
            <Breadcrumbs className="mb-6" items={[{ label: "Accueil", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]} />
            <p className="section-kicker">{categoryName}</p>
            <h1 className="public-h1 !max-w-[18ch] !text-[clamp(2.6rem,6vw,5.4rem)]">{post.title}</h1>
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-platinum/70">
              <div><dt className="sr-only">Auteur</dt><dd>Par <strong className="text-platinum">LGM, Les Gens du Marketing</strong></dd></div>
              <div><dt className="inline">Mis a jour le </dt><dd className="inline"><time dateTime={post.updated_at}>{formatDateFr(post.updated_at)}</time></dd></div>
              <div><dt className="sr-only">Temps de lecture</dt><dd>{minutes} min de lecture</dd></div>
            </dl>
          </div>
          <DiagnosticHeroSlot sourcePage={`blog-post-${post.slug}`} />
        </div>
      </section>

      <section className="section-charcoal section-pad-tight">
        <div className="container-narrow">
          {excerpt && (
            <aside className="mb-10 rounded-lg border-l-4 border-cobalt-light bg-[#f6f8fb0d] p-6">
              <p className="section-kicker mb-2">En bref</p>
              <p className="text-lg leading-relaxed text-platinum">{excerpt}</p>
            </aside>
          )}
          <article className="public-prose">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          <Link to="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-cobalt-light">
            <BackArrow /> Tous les articles
          </Link>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-platinum section-pad-tight">
          <div className="container-wide">
            <p className="section-kicker !text-cobalt-dark">A lire ensuite</p>
            <ul className="grid gap-6 md:grid-cols-3">
              {others.map((p) => (
                <li key={p.id} className="panel-light p-6">
                  <p className="text-xs font-bold text-cobalt-dark">{p.category?.name}</p>
                  <Link to={`/blog/${p.slug}`} className="mt-2 block font-display text-2xl font-bold uppercase leading-none text-platinum-text hover:underline">{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RelatedLinks current={node} count={6} excludeUrls={[`/blog/${post.slug}`]} />

      <FinalCTA title="Vous voulez appliquer ces idees a votre entreprise ?" text="Le diagnostic identifie l'etape de votre parcours a corriger en premier." button="Faire mon diagnostic" />
    </PageLayout>
  );
};

export default BlogPostPage;
