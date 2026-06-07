import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { codeGraph, withBlogNodes, type PageNode } from "@/data/siteGraph";
import { anchorFor, getRelatedLinks, relatedKickerFor } from "@/lib/internalLinking";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  current: PageNode;
  count?: number;
  tone?: "dark" | "light";
  excludeUrls?: string[];
  pinnedUrls?: string[]; // override manuel : ces URLs sont forcees en tete
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const RelatedLinks = ({ current, count = 6, tone = "dark", excludeUrls = [], pinnedUrls = [] }: Props) => {
  const [blogNodes, setBlogNodes] = useState<PageNode[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("title, slug, excerpt, published_at, blog_categories(name)")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(50);
      if (cancelled || !data) return;
      setBlogNodes(
        data.map((row) => {
          const categoryName = (row as unknown as { blog_categories?: { name?: string } }).blog_categories?.name;
          const tags = [
            "blog",
            ...(categoryName ? [slugify(categoryName)] : []),
            ...row.title.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4),
          ];
          return {
            url: `/blog/${row.slug}`,
            title: row.title,
            type: "article" as const,
            tags,
            description: row.excerpt ?? undefined,
            publishedAt: row.published_at ?? undefined,
          };
        }),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const links = useMemo(() => {
    const graph = withBlogNodes(blogNodes).filter((n) => !excludeUrls.includes(n.url));
    const auto = getRelatedLinks(current, graph, { count: Math.max(count, pinnedUrls.length + count) });
    const pinned = pinnedUrls
      .map((url) => graph.find((n) => n.url === url))
      .filter((n): n is PageNode => Boolean(n))
      .map((node) => ({ node, score: 1000 }));
    const seen = new Set<string>();
    return [...pinned, ...auto].filter((l) => {
      if (seen.has(l.node.url)) return false;
      seen.add(l.node.url);
      return true;
    }).slice(0, count);
  }, [blogNodes, current, count, excludeUrls, pinnedUrls]);

  if (links.length === 0) return null;

  const isLight = tone === "light";
  const sectionClass = isLight ? "section-platinum section-pad-tight" : "section-charcoal section-pad-tight";
  const kickerClass = isLight ? "section-kicker text-[#d7b46a]" : "section-kicker";
  const titleClass = isLight ? "public-h3 text-platinum-text" : "public-h3 text-platinum";
  const cardClass = isLight
    ? "block rounded-md border border-[rgba(16,24,39,0.12)] bg-white/60 p-5 transition-colors hover:border-[#d7b46a] hover:bg-white"
    : "block rounded-md border border-[rgba(240,217,150,0.18)] bg-[#0f1623] p-5 transition-colors hover:border-[#f0d996] hover:bg-[#121a29]";
  const cardTitleClass = isLight ? "font-display text-lg font-bold text-platinum-text" : "font-display text-lg font-bold text-platinum";
  const cardMetaClass = isLight ? "mt-1 text-xs font-bold uppercase tracking-wider text-platinum-muted" : "mt-1 text-xs font-bold uppercase tracking-wider text-platinum/64";

  const typeLabel = (t: PageNode["type"]) => {
    switch (t) {
      case "service": return "Service";
      case "zone": return "Zone";
      case "article": return "Blog";
      case "hub": return "Hub";
      case "home": return "Accueil";
      default: return "Page";
    }
  };

  return (
    <section className={sectionClass} aria-label="Pages liees">
      <div className="container-wide">
        <p className={`${kickerClass} mb-3`}>{relatedKickerFor(current)}</p>
        <h2 className={`${titleClass} mb-8`}>Pages liees a {current.title.toLowerCase()}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(({ node }) => (
            <li key={node.url}>
              <Link to={node.url} className={cardClass}>
                <p className={cardMetaClass}>{typeLabel(node.type)}</p>
                <p className={`${cardTitleClass} mt-2`}>{anchorFor(node)}</p>
                {node.description && (
                  <p className={`${isLight ? "text-platinum-muted" : "text-platinum/70"} mt-2 text-sm leading-6`}>
                    {node.description.length > 130 ? `${node.description.slice(0, 130)}...` : node.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedLinks;
