import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import DiagnosticHeroSlot from "@/components/DiagnosticHeroSlot";
import PageLayout from "@/components/layout/PageLayout";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Arrow, FinalCTA } from "@/components/public/PublicPrimitives";
import { publicImages } from "@/data/publicContent";
import { formatDateFr, readingMinutes, usePublishedPosts } from "@/hooks/usePublishedPosts";
import { OG_IMAGE, absUrl, breadcrumbSchema } from "@/lib/site";

const title = "Blog marketing, acquisition et vente | LGM Abidjan";
const description = "Guides LGM pour attirer, convertir et fideliser vos clients : publicite Facebook, SEO, pages, qualification, CRM et automatisation.";

const BlogPage = () => {
  const { data: posts, isLoading, isError, refetch } = usePublishedPosts();
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    posts?.forEach((p) => p.category && map.set(p.category.id, p.category.name));
    return [...map.entries()];
  }, [posts]);

  const filtered = (posts ?? []).filter((p) => !category || p.category?.id === category);
  const [featured, ...rest] = filtered;

  return (
    <PageLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={absUrl("/blog")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absUrl("/blog")} />
        <meta property="og:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Blog" }]))}</script>
      </Helmet>

      <section className="public-page-hero !min-h-0">
        <div className="container-wide relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)] lg:items-start">
          <div>
            <Breadcrumbs className="mb-6" items={[{ label: "Accueil", to: "/" }, { label: "Blog" }]} />
            <p className="section-kicker">Blog</p>
            <h1 className="public-h1">Des guides concrets pour mieux vendre.</h1>
            <p className="public-lead">
              Notes de terrain et methodes pour chaque etape du parcours : attirer, capter, qualifier, obtenir des rendez-vous, vendre et fideliser.
            </p>
          </div>
          <DiagnosticHeroSlot sourcePage="blog-hero" />
        </div>
      </section>

      <section className="section-charcoal section-pad-tight" aria-busy={isLoading}>
        <div className="container-wide">
          {categories.length > 1 && (
            <div className="mb-10 flex flex-wrap gap-2 border-b border-[#f0d9961f] pb-6" role="group" aria-label="Filtrer par categorie">
              <button aria-pressed={category === null} onClick={() => setCategory(null)} className={category === null ? "btn-cobalt min-h-0 px-5 py-2" : "btn-cobalt-outline min-h-0 px-5 py-2"}>Tous</button>
              {categories.map(([id, name]) => (
                <button key={id} aria-pressed={category === id} onClick={() => setCategory(id)} className={category === id ? "btn-cobalt min-h-0 px-5 py-2" : "btn-cobalt-outline min-h-0 px-5 py-2"}>{name}</button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Chargement des articles">
              {[0, 1, 2].map((i) => <div key={i} className="h-80 animate-pulse rounded-lg bg-[#f6f8fb0d]" />)}
            </div>
          )}

          {isError && (
            <div className="public-card p-8 text-center" role="alert">
              <h2 className="public-h3">Impossible de charger les articles</h2>
              <p className="public-body mx-auto mt-3 max-w-xl">Verifiez votre connexion puis reessayez.</p>
              <button onClick={() => refetch()} className="btn-cobalt mt-6">Reessayer</button>
            </div>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="public-card p-8 text-center">
              <h2 className="public-h3">Aucun article publie pour le moment</h2>
              <p className="public-body mx-auto mt-3 max-w-xl">Les prochains guides apparaitront ici des leur publication.</p>
            </div>
          )}

          {featured && (
            <Link to={`/blog/${featured.slug}`} className="group mb-10 grid overflow-hidden rounded-lg border border-[#f0d99626] bg-[#f6f8fb0a] text-platinum lg:grid-cols-[1.1fr_1fr]">
              <img src={featured.featured_image || publicImages.blog} alt="" className="aspect-[16/10] h-full w-full object-cover" loading="lazy" />
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-cobalt-light">{featured.category?.name} · {readingMinutes(featured.content)} min</p>
                <h2 className="public-h2 mt-3 !text-[clamp(2rem,3.6vw,3.4rem)] group-hover:text-cobalt-light">{featured.title}</h2>
                {featured.excerpt && <p className="public-body mt-4">{featured.excerpt}</p>}
                <span className="public-text-link mt-6">Lire l'article <Arrow /></span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <li key={post.id}>
                  <Link to={`/blog/${post.slug}`} className="blog-card group h-full text-platinum">
                    <img src={post.featured_image || publicImages.blog} alt="" className="aspect-[1.6] w-full object-cover" loading="lazy" />
                    <div className="flex flex-col p-5 md:p-6">
                      <p className="flex justify-between gap-4 text-xs font-bold text-cobalt-light">
                        <span>{post.category?.name}</span>
                        <time dateTime={post.published_at ?? undefined}>{formatDateFr(post.published_at)}</time>
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-none group-hover:text-cobalt-light">{post.title}</h2>
                      {post.excerpt && <p className="public-body mt-3 line-clamp-3">{post.excerpt}</p>}
                      <p className="mt-4 text-xs font-semibold text-platinum/50">{readingMinutes(post.content)} min de lecture</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <FinalCTA title="Vous voulez appliquer ces methodes a votre entreprise ?" text="Le diagnostic identifie l'etape de votre parcours a corriger en premier." button="Faire mon diagnostic" />
    </PageLayout>
  );
};

export default BlogPage;
